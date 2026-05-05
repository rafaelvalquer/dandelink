import MyPage from "../models/MyPage.js";
import {
  createLinkId,
  createProductId,
  createSecondaryLinkId,
} from "../utils/ids.js";
import {
  normalizeOrder,
  sortByOrder,
} from "../utils/order.js";
import { createHttpError } from "../utils/httpError.js";
import { logWarn } from "../utils/logger.js";
import { importShopProductFromUrl } from "./shopImport.service.js";
import { normalizeSlug } from "../utils/slug.js";

const THEME_DEFAULTS = {
  themePreset: "clean_light",
  brandLayout: "classic",
  backgroundStyle: "fill",
  backgroundGradientDirection: "linear_up",
  backgroundPatternVariant: "grid",
  surfaceStyle: "soft",
  surfacePatternVariant: "grid",
  surfaceColor: "#ffffff",
  buttonColor: "#0f172a",
  buttonTextColor: "#ffffff",
  pageTextColor: "#64748b",
  titleTextColor: "#0f172a",
  fontPreset: "inter",
  buttonStyle: "solid",
  buttonShadow: "none",
  buttonRadius: "round",
  primaryButtonsLayout: "stack",
  primaryButtonContentAlign: "center",
  primaryIconLayout: "circle_solid",
  primaryIconSize: "md",
  primaryIconBadgeColor: "",
  primaryIconColor: "",
  secondaryLinksStyle: "icon_text",
  secondaryLinksIconLayout: "brand_badge",
  secondaryLinksIconSize: "md",
  secondaryLinksIconBadgeColor: "",
  secondaryLinksIconColor: "",
  secondaryLinksSize: "medium",
  secondaryLinksAlign: "center",
  secondaryLinksPosition: "bottom",
  animationPreset: "subtle",
  backgroundColor: "#e2e8f0",
  cardColor: "#ffffff",
  textColor: "#64748b",
};

const LEGACY_BUTTON_STYLE_TO_RADIUS = {
  "rounded-soft": "round",
  "rounded-full": "pill",
  "square-soft": "square",
};

const VALID_THEME_OPTIONS = {
  fontPreset: new Set([
    "inter",
    "manrope",
    "jakarta",
    "sora",
    "editorial",
    "playfair",
    "cormorant",
    "bebas",
    "caveat",
  ]),
  buttonStyle: new Set(["solid", "soft", "outline", "glass", "metallic"]),
  buttonShadow: new Set(["none", "soft", "strong", "hard"]),
  buttonRadius: new Set(["square", "round", "pill"]),
  primaryButtonContentAlign: new Set(["center", "left"]),
  primaryIconLayout: new Set([
    "plain",
    "circle_soft",
    "circle_solid",
    "circle_neutral",
    "square_soft",
  ]),
  secondaryLinksIconLayout: new Set([
    "plain",
    "brand_badge",
    "circle_soft",
    "circle_solid",
    "square_soft",
  ]),
  iconSize: new Set(["sm", "md", "lg"]),
};

const PRIMARY_LINK_TYPES = new Set([
  "link",
  "shop-preview",
  "whatsapp",
  "location",
  "pix",
]);
const PIX_KEY_TYPES = new Set(["random", "cpf", "cnpj", "email", "phone", "other"]);
const SECONDARY_LINK_PLATFORMS = new Set([
  "instagram",
  "facebook",
  "linkedin",
  "x",
  "threads",
  "youtube",
  "tiktok",
  "telegram",
  "discord",
  "email",
  "phone",
  "site",
  "calendly",
]);
const HANDLE_BASED_PLATFORMS = new Set([
  "instagram",
  "facebook",
  "youtube",
  "tiktok",
  "x",
  "threads",
  "telegram",
]);
const SHOP_IMPORT_MODES = new Set([
  "manual",
  "mercadolivre-item-api",
  "mercadolivre-product-api",
  "mercadolivre",
  "amazon-json-ld",
  "amazon-open-graph",
  "amazon-html",
  "json-ld",
  "open-graph",
]);
const WHATSAPP_DEFAULT_MESSAGE =
  "Olá! Vim pela sua página pública e gostaria de mais informações.";
const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search";
const NOMINATIM_MIN_INTERVAL_MS = 1100;
let lastNominatimRequestAt = 0;

const SECONDARY_PLATFORM_LABELS = {
  instagram: "Instagram",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  x: "X / Twitter",
  threads: "Threads",
  youtube: "YouTube",
  tiktok: "TikTok",
  telegram: "Telegram",
  discord: "Discord",
  email: "E-mail",
  phone: "Telefone",
  site: "Site",
  calendly: "Calendly",
};
const SHOP_DEFAULTS = {
  isActive: true,
  title: "Ver loja completa",
  description: "0 produtos",
  productsCount: 0,
  products: [],
};

const DEFAULT_PAGE = {
  title: "Mutantwear",
  slug: "mutantwear",
  bio: "Viva a Mutação.",
  avatarUrl: "https://placehold.co/160x160/png?text=MW",
  theme: { ...THEME_DEFAULTS },
  links: [],
  secondaryLinks: [
    {
      id: createSecondaryLinkId(),
      title: "Instagram",
      url: "https://www.instagram.com/use.mutant/",
      isActive: true,
      order: 0,
      platform: "instagram",
      handle: "use.mutant",
    },
  ],
  shop: { ...SHOP_DEFAULTS },
};

function buildDefaultPage(ownerId, overrides = {}) {
  const ownerSuffix = String(ownerId || "").slice(-6).toLowerCase() || "owner";

  return {
    ownerId,
    ...DEFAULT_PAGE,
    ...overrides,
    slug:
      typeof overrides.slug === "string" && overrides.slug.trim()
        ? overrides.slug.trim()
        : `pagina-${ownerSuffix}`,
    theme: {
      ...THEME_DEFAULTS,
      ...(overrides.theme || {}),
    },
    secondaryLinks: Array.isArray(overrides.secondaryLinks)
      ? overrides.secondaryLinks
      : [],
    shop: normalizeShop(overrides.shop || DEFAULT_PAGE.shop),
  };
}

function toPlainObject(value) {
  if (!value) {
    return value;
  }

  return typeof value.toObject === "function" ? value.toObject() : { ...value };
}

function isPrimaryLinkType(value) {
  return PRIMARY_LINK_TYPES.has(String(value || "").trim().toLowerCase());
}

function normalizePixKeyType(value = "") {
  const normalizedValue = String(value || "").trim().toLowerCase();
  return PIX_KEY_TYPES.has(normalizedValue) ? normalizedValue : "random";
}

function isPrimaryLinkPlatform(value) {
  return SECONDARY_LINK_PLATFORMS.has(
    String(value || "").trim().toLowerCase(),
  );
}

function isSecondaryPlatform(value) {
  return SECONDARY_LINK_PLATFORMS.has(
    String(value || "").trim().toLowerCase(),
  );
}

function isHandlePlatform(platform) {
  return HANDLE_BASED_PLATFORMS.has(String(platform || "").trim().toLowerCase());
}

function getSecondaryPlatformLabel(platform = "") {
  const normalizedPlatform = String(platform || "").trim().toLowerCase();
  return SECONDARY_PLATFORM_LABELS[normalizedPlatform] || "Site";
}

function inferSecondaryPlatform(link = {}) {
  if (isSecondaryPlatform(link.platform)) {
    return String(link.platform).trim().toLowerCase();
  }

  const sample = `${link.title || ""} ${link.url || ""}`.toLowerCase();
  if (sample.includes("instagram")) return "instagram";
  if (sample.includes("facebook")) return "facebook";
  if (sample.includes("linkedin")) return "linkedin";
  if (sample.includes("threads.net") || sample.includes("threads")) return "threads";
  if (sample.includes("x.com") || sample.includes("twitter.com")) return "x";
  if (sample.includes("tiktok")) return "tiktok";
  if (sample.includes("t.me") || sample.includes("telegram")) return "telegram";
  if (sample.includes("discord.gg") || sample.includes("discord.com")) return "discord";
  if (sample.includes("youtube") || sample.includes("youtu.be")) return "youtube";
  if (sample.includes("calendly")) return "calendly";
  if (sample.includes("mailto:") || /\b[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}\b/i.test(sample)) {
    return "email";
  }
  if (sample.includes("tel:")) return "phone";
  return "site";
}

function extractHandleFromUrl(url = "", platform = "") {
  const sample = String(url || "").trim();
  if (!sample) return "";

  const clean = sample.replace(/[?#].*$/, "").replace(/\/+$/, "");

  if (platform === "instagram") {
    const match = clean.match(/instagram\.com\/([^/?#]+)/i);
    return match ? match[1] : clean.split("/").pop() || "";
  }

  if (platform === "facebook") {
    const match = clean.match(/(?:m\.)?facebook\.com\/(?!profile\.php)([^/?#]+)/i);
    return match ? match[1] : clean.split("/").pop() || "";
  }

  if (platform === "tiktok") {
    const match = clean.match(/tiktok\.com\/@([^/?#]+)/i);
    return match ? match[1] : clean.split("/@").pop()?.split("/")[0] || "";
  }

  if (platform === "youtube") {
    const match = clean.match(/youtube\.com\/@([^/?#]+)/i);
    return match ? match[1] : clean.split("/@").pop()?.split("/")[0] || "";
  }

  if (platform === "x") {
    const match = clean.match(/(?:x|twitter)\.com\/([^/?#]+)/i);
    return match ? match[1] : clean.split("/").pop() || "";
  }

  if (platform === "threads") {
    const match = clean.match(/threads\.net\/@([^/?#]+)/i);
    return match ? match[1] : clean.split("/@").pop()?.split("/")[0] || "";
  }

  if (platform === "telegram") {
    const match = clean.match(/(?:t\.me|telegram\.me)\/([^/?#]+)/i);
    return match ? match[1] : clean.split("/").pop() || "";
  }

  return "";
}

function normalizeSecondaryHandle(value = "", platform = "") {
  if (!isHandlePlatform(platform)) return "";

  const sample = String(value || "").trim();
  if (!sample) return "";

  const extracted = /^https?:\/\//i.test(sample) || /(?:^|\/)(?:www\.|m\.)?[a-z0-9-]+\.[a-z]{2,}/i.test(sample)
    ? extractHandleFromUrl(sample, platform)
    : sample;

  return extracted.replace(/^@+/, "").replace(/\s+/g, "").replace(/\/+$/, "");
}

function normalizeEmailAddress(value = "") {
  return String(value || "")
    .trim()
    .replace(/^mailto:/i, "")
    .trim();
}

function normalizePhoneLinkValue(value = "") {
  return String(value || "")
    .trim()
    .replace(/^tel:/i, "")
    .replace(/\D+/g, "");
}

function buildSecondaryUrl(platform = "", handle = "", fallbackUrl = "") {
  const safeHandle = normalizeSecondaryHandle(handle, platform);

  if (platform === "instagram") {
    return safeHandle ? `https://www.instagram.com/${safeHandle}/` : "";
  }

  if (platform === "facebook") {
    return safeHandle
      ? `https://www.facebook.com/${safeHandle}`
      : String(fallbackUrl || "").trim();
  }

  if (platform === "tiktok") {
    return safeHandle ? `https://www.tiktok.com/@${safeHandle}` : "";
  }

  if (platform === "youtube") {
    return safeHandle ? `https://www.youtube.com/@${safeHandle}` : "";
  }

  if (platform === "x") {
    return safeHandle ? `https://x.com/${safeHandle}` : "";
  }

  if (platform === "threads") {
    return safeHandle ? `https://www.threads.net/@${safeHandle}` : "";
  }

  if (platform === "telegram") {
    return safeHandle ? `https://t.me/${safeHandle}` : "";
  }

  if (platform === "email") {
    const normalizedEmail = normalizeEmailAddress(fallbackUrl);
    return normalizedEmail ? `mailto:${normalizedEmail}` : "";
  }

  if (platform === "phone") {
    const normalizedPhone = normalizePhoneLinkValue(fallbackUrl);
    return normalizedPhone ? `tel:${normalizedPhone}` : "";
  }

  return String(fallbackUrl || "").trim();
}

function normalizePhoneNumber(value = "") {
  return String(value || "").replace(/\D+/g, "");
}

function normalizeWhatsappMessage(value = "") {
  const sample = String(value || "").trim();
  return sample || WHATSAPP_DEFAULT_MESSAGE;
}

function buildWhatsAppUrl(phone = "", message = "") {
  const normalizedPhone = normalizePhoneNumber(phone);
  if (!normalizedPhone) return "";

  const normalizedMessage = normalizeWhatsappMessage(message);
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(normalizedMessage)}`;
}

function buildLocationUrl(address = "", placeId = "") {
  const safeAddress = String(address || "").trim();
  const fallbackQuery = String(placeId || "").trim();

  if (!safeAddress && !fallbackQuery) return "";

  const params = new URLSearchParams();
  params.set("api", "1");
  params.set("query", safeAddress || fallbackQuery);

  return `https://www.google.com/maps/search/?${params.toString()}`;
}

async function waitForNominatimSlot() {
  const now = Date.now();
  const remaining = NOMINATIM_MIN_INTERVAL_MS - (now - lastNominatimRequestAt);

  if (remaining > 0) {
    await new Promise((resolve) => setTimeout(resolve, remaining));
  }

  lastNominatimRequestAt = Date.now();
}

function compactParts(parts = []) {
  return parts
    .map((part) => String(part || "").trim())
    .filter(Boolean)
    .filter((part, index, list) => list.indexOf(part) === index);
}

function formatNominatimSuggestion(item = {}) {
  const address = item?.address || {};
  const street = compactParts([
    address.road,
    address.pedestrian,
    address.cycleway,
    address.footway,
    address.residential,
    item?.name,
    String(item?.display_name || "").split(",")?.[0],
  ])[0] || "";
  const number = String(address.house_number || "").trim();
  const district = compactParts([
    address.suburb,
    address.neighbourhood,
    address.city_district,
    address.quarter,
    address.borough,
  ])[0] || "";
  const city = compactParts([
    address.city,
    address.town,
    address.village,
    address.municipality,
  ])[0] || "";
  const mainText = compactParts([street, number]).join(", ");
  const secondaryText = compactParts([district, city]).join(", ");
  const description = compactParts([mainText, secondaryText]).join(", ");

  return {
    description: description || String(item?.display_name || "").trim(),
    placeId: String(item?.place_id || "").trim(),
    mainText: mainText || street || String(item?.display_name || "").split(",")?.[0]?.trim() || "",
    secondaryText,
    lat: String(item?.lat || "").trim(),
    lon: String(item?.lon || "").trim(),
  };
}

function normalizeLink(link = {}, orderFallback = 0) {
  const source = toPlainObject(link) || {};
  const rawType =
    typeof source.type === "string" ? source.type.trim().toLowerCase() : "link";
  const type = isPrimaryLinkType(rawType) ? rawType : "link";
  const rawPlatform =
    typeof source.platform === "string"
      ? source.platform.trim().toLowerCase()
      : "";
  const platform = type === "link" && isPrimaryLinkPlatform(rawPlatform)
    ? rawPlatform
    : "";
  const title =
    typeof source.title === "string" && source.title.trim()
      ? source.title.trim()
      : type === "link" && platform
        ? getSecondaryPlatformLabel(platform)
        : type === "pix"
          ? "PIX"
        : "";
  const phone =
    type === "whatsapp" ? normalizePhoneNumber(source.phone) : "";
  const message =
    type === "whatsapp"
      ? normalizeWhatsappMessage(source.message)
      : "";
  const address =
    type === "location" && typeof source.address === "string"
      ? source.address.trim()
      : "";
  const placeId =
    type === "location" && typeof source.placeId === "string"
      ? source.placeId.trim()
      : "";
  const showMap =
    type === "location" ? source.showMap === true : false;
  const pixKey =
    type === "pix" && typeof source.pixKey === "string"
      ? source.pixKey.trim()
      : "";
  const pixKeyType =
    type === "pix" ? normalizePixKeyType(source.pixKeyType) : "random";
  const handle =
    type === "link" && isHandlePlatform(platform)
      ? normalizeSecondaryHandle(source.handle || source.url || "", platform)
      : "";
  const email =
    type === "link" && platform === "email"
      ? normalizeEmailAddress(source.url || source.handle || "")
      : "";
  const linkPhone =
    type === "link" && platform === "phone"
      ? normalizePhoneLinkValue(source.url || source.handle || "")
      : "";
  let url =
    typeof source.url === "string" ? source.url.trim() : "";

  if (type === "whatsapp") {
    url = buildWhatsAppUrl(phone, message);
  } else if (type === "location") {
    url = buildLocationUrl(address, placeId);
  } else if (type === "shop-preview" || type === "pix") {
    url = "";
  } else if (platform) {
    url = buildSecondaryUrl(
      platform,
      handle,
      platform === "email"
        ? email
        : platform === "phone"
          ? linkPhone
          : url,
    );
  }

  return {
    id:
      typeof source.id === "string" && source.id.trim()
        ? source.id.trim()
        : createLinkId(),
    title,
    url,
    platform,
    handle:
      type === "link" && platform !== "email" && platform !== "phone"
        ? handle
        : "",
    phone,
    message,
    address,
    placeId,
    showMap,
    pixKey,
    pixKeyType,
    isActive: source.isActive !== false,
    order: Number.isFinite(Number(source.order)) ? Number(source.order) : orderFallback,
    type,
  };
}

function normalizeLinks(links = []) {
  return normalizeOrder(links).map((link, index) => normalizeLink(link, index));
}

function normalizeSecondaryLink(link = {}, orderFallback = 0) {
  const source = toPlainObject(link) || {};
  const platform = inferSecondaryPlatform(source);
  const handle = normalizeSecondaryHandle(source.handle || source.url || "", platform);
  const email = platform === "email"
    ? normalizeEmailAddress(source.url || source.handle || "")
    : "";
  const phone = platform === "phone"
    ? normalizePhoneLinkValue(source.url || source.handle || "")
    : "";
  const url = buildSecondaryUrl(
    platform,
    handle,
    platform === "email" ? email : platform === "phone" ? phone : source.url,
  );
  const title = typeof source.title === "string" && source.title.trim()
    ? source.title.trim()
    : getSecondaryPlatformLabel(platform);

  return {
    id:
      typeof source.id === "string" && source.id.trim()
        ? source.id.trim()
        : createSecondaryLinkId(),
    platform,
    title,
    url,
    handle: platform === "email" || platform === "phone" ? "" : handle,
    isActive: source.isActive !== false,
    order: Number.isFinite(Number(source.order)) ? Number(source.order) : orderFallback,
  };
}

function buildSecondaryLinkSignature(link = {}) {
  return [
    String(link.platform || "").trim().toLowerCase(),
    String(link.handle || "").trim().toLowerCase(),
    String(link.url || "").trim().toLowerCase(),
    String(link.title || "").trim().toLowerCase(),
  ].join("::");
}

function normalizeSecondaryLinks(links = []) {
  const dedupe = new Set();

  return normalizeOrder(links)
    .map((link, index) => normalizeSecondaryLink(link, index))
    .filter((link) => {
      const signature = buildSecondaryLinkSignature(link);
      if (dedupe.has(signature)) {
        return false;
      }
      dedupe.add(signature);
      return true;
    })
    .map((link, index) => ({ ...link, order: index }));
}

function normalizeShopCurrency(value = "") {
  const sample = String(value || "BRL").trim().toUpperCase();
  if (!sample) return "BRL";
  if (sample === "R$") return "BRL";
  return sample.slice(0, 8);
}

function normalizeShopPrice(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
}

function normalizeShopProduct(product = {}, orderFallback = 0) {
  const source = toPlainObject(product) || {};
  const importMode = SHOP_IMPORT_MODES.has(String(source.importMode || "").trim().toLowerCase())
    ? String(source.importMode).trim().toLowerCase()
    : "manual";

  return {
    id:
      typeof source.id === "string" && source.id.trim()
        ? source.id.trim()
        : createProductId(),
    sourceUrl:
      typeof source.sourceUrl === "string" ? source.sourceUrl.trim() : "",
    title:
      typeof source.title === "string" ? source.title.trim() : "",
    price: normalizeShopPrice(source.price),
    currency: normalizeShopCurrency(source.currency),
    imageUrl:
      typeof source.imageUrl === "string" ? source.imageUrl.trim() : "",
    isActive: source.isActive !== false,
    order: Number.isFinite(Number(source.order)) ? Number(source.order) : orderFallback,
    importMode,
  };
}

function normalizeShopProducts(products = []) {
  return normalizeOrder(products)
    .map((product, index) => normalizeShopProduct(product, index))
    .map((product, index) => ({
      ...product,
      order: index,
    }));
}

function normalizeShop(shop = {}) {
  const source = toPlainObject(shop) || {};
  const products = normalizeShopProducts(source.products || []);
  const activeProductsCount = products.filter((product) => product.isActive).length;
  const description =
    typeof source.description === "string" && source.description.trim()
      ? source.description.trim()
      : `${activeProductsCount} produto${activeProductsCount === 1 ? "" : "s"}`;

  return {
    ...SHOP_DEFAULTS,
    ...source,
    isActive: source.isActive !== false,
    title:
      typeof source.title === "string" && source.title.trim()
        ? source.title.trim()
        : SHOP_DEFAULTS.title,
    description,
    productsCount: activeProductsCount,
    products,
  };
}

function reorderExistingItemsPreservingIdentity(items = [], ids = [], label = "items") {
  const currentItems = (items || []).map((item) => toPlainObject(item));
  const requestedIds = [];
  const requestedIdSet = new Set();

  (ids || []).forEach((itemId) => {
    const normalizedId = String(itemId || "").trim();
    if (!normalizedId || requestedIdSet.has(normalizedId)) {
      return;
    }

    requestedIds.push(normalizedId);
    requestedIdSet.add(normalizedId);
  });

  const itemMap = new Map();
  const missingIdItems = [];

  currentItems.forEach((item) => {
    const normalizedId = String(item?.id || "").trim();

    if (!normalizedId) {
      missingIdItems.push(item);
      return;
    }

    if (!itemMap.has(normalizedId)) {
      itemMap.set(normalizedId, item);
    }
  });

  if (missingIdItems.length) {
    logWarn("my-page.reorder.missing-stable-id", {
      label,
      missingItems: missingIdItems.length,
    });
  }

  const selected = requestedIds
    .map((itemId) => itemMap.get(itemId))
    .filter(Boolean);
  const remaining = currentItems.filter((item) => {
    const normalizedId = String(item?.id || "").trim();
    return !normalizedId || !requestedIdSet.has(normalizedId);
  });

  return [...selected, ...sortByOrder(remaining)].map((item, index) => ({
    ...item,
    order: index,
  }));
}

function normalizeTheme(theme = {}) {
  const normalizedTheme = toPlainObject(theme) || {};
  const legacyRadius =
    LEGACY_BUTTON_STYLE_TO_RADIUS[normalizedTheme.buttonStyle] || null;
  const legacyPrimaryIconLayout =
    normalizedTheme.primaryIconBadgeStyle === "neutral"
      ? "circle_neutral"
      : "circle_solid";
  const surfaceColor = normalizedTheme.surfaceColor || normalizedTheme.cardColor;
  const pageTextColor =
    normalizedTheme.pageTextColor || normalizedTheme.textColor;
  const titleTextColor =
    normalizedTheme.titleTextColor || normalizedTheme.textColor;

  return {
    ...THEME_DEFAULTS,
    ...normalizedTheme,
    backgroundColor:
      typeof normalizedTheme.backgroundColor === "string" &&
      normalizedTheme.backgroundColor.trim()
        ? normalizedTheme.backgroundColor.trim()
        : THEME_DEFAULTS.backgroundColor,
    surfaceColor:
      typeof surfaceColor === "string" && surfaceColor.trim()
        ? surfaceColor.trim()
        : THEME_DEFAULTS.surfaceColor,
    buttonColor:
      typeof normalizedTheme.buttonColor === "string" &&
      normalizedTheme.buttonColor.trim()
        ? normalizedTheme.buttonColor.trim()
        : THEME_DEFAULTS.buttonColor,
    buttonTextColor:
      typeof normalizedTheme.buttonTextColor === "string" &&
      normalizedTheme.buttonTextColor.trim()
        ? normalizedTheme.buttonTextColor.trim()
        : THEME_DEFAULTS.buttonTextColor,
    pageTextColor:
      typeof pageTextColor === "string" && pageTextColor.trim()
        ? pageTextColor.trim()
        : THEME_DEFAULTS.pageTextColor,
    titleTextColor:
      typeof titleTextColor === "string" && titleTextColor.trim()
        ? titleTextColor.trim()
        : THEME_DEFAULTS.titleTextColor,
    fontPreset:
      typeof normalizedTheme.fontPreset === "string" &&
      VALID_THEME_OPTIONS.fontPreset.has(normalizedTheme.fontPreset.trim())
        ? normalizedTheme.fontPreset.trim()
        : THEME_DEFAULTS.fontPreset,
    buttonStyle: legacyRadius
      ? THEME_DEFAULTS.buttonStyle
      : typeof normalizedTheme.buttonStyle === "string" &&
          VALID_THEME_OPTIONS.buttonStyle.has(normalizedTheme.buttonStyle.trim())
        ? normalizedTheme.buttonStyle.trim()
        : THEME_DEFAULTS.buttonStyle,
    buttonShadow:
      typeof normalizedTheme.buttonShadow === "string" &&
      VALID_THEME_OPTIONS.buttonShadow.has(normalizedTheme.buttonShadow.trim())
        ? normalizedTheme.buttonShadow.trim()
        : THEME_DEFAULTS.buttonShadow,
    buttonRadius:
      typeof normalizedTheme.buttonRadius === "string" &&
      VALID_THEME_OPTIONS.buttonRadius.has(normalizedTheme.buttonRadius.trim())
        ? normalizedTheme.buttonRadius.trim()
        : legacyRadius || THEME_DEFAULTS.buttonRadius,
    primaryButtonContentAlign:
      typeof normalizedTheme.primaryButtonContentAlign === "string" &&
      (normalizedTheme.primaryButtonContentAlign.trim() === "right" ||
        VALID_THEME_OPTIONS.primaryButtonContentAlign.has(
          normalizedTheme.primaryButtonContentAlign.trim(),
        ))
        ? normalizedTheme.primaryButtonContentAlign.trim() === "right"
          ? "left"
          : normalizedTheme.primaryButtonContentAlign.trim()
        : THEME_DEFAULTS.primaryButtonContentAlign,
    primaryIconLayout:
      typeof normalizedTheme.primaryIconLayout === "string" &&
      VALID_THEME_OPTIONS.primaryIconLayout.has(
        normalizedTheme.primaryIconLayout.trim(),
      )
        ? normalizedTheme.primaryIconLayout.trim()
        : typeof normalizedTheme.primaryIconBadgeStyle === "string"
          ? legacyPrimaryIconLayout
          : THEME_DEFAULTS.primaryIconLayout,
    primaryIconSize:
      typeof normalizedTheme.primaryIconSize === "string" &&
      VALID_THEME_OPTIONS.iconSize.has(normalizedTheme.primaryIconSize.trim())
        ? normalizedTheme.primaryIconSize.trim()
        : THEME_DEFAULTS.primaryIconSize,
    primaryIconBadgeColor:
      typeof normalizedTheme.primaryIconBadgeColor === "string"
        ? normalizedTheme.primaryIconBadgeColor.trim()
        : THEME_DEFAULTS.primaryIconBadgeColor,
    primaryIconColor:
      typeof normalizedTheme.primaryIconColor === "string"
        ? normalizedTheme.primaryIconColor.trim()
        : THEME_DEFAULTS.primaryIconColor,
    secondaryLinksIconLayout:
      typeof normalizedTheme.secondaryLinksIconLayout === "string" &&
      VALID_THEME_OPTIONS.secondaryLinksIconLayout.has(
        normalizedTheme.secondaryLinksIconLayout.trim(),
      )
        ? normalizedTheme.secondaryLinksIconLayout.trim()
        : THEME_DEFAULTS.secondaryLinksIconLayout,
    secondaryLinksIconSize:
      typeof normalizedTheme.secondaryLinksIconSize === "string" &&
      VALID_THEME_OPTIONS.iconSize.has(normalizedTheme.secondaryLinksIconSize.trim())
        ? normalizedTheme.secondaryLinksIconSize.trim()
        : THEME_DEFAULTS.secondaryLinksIconSize,
    secondaryLinksIconBadgeColor:
      typeof normalizedTheme.secondaryLinksIconBadgeColor === "string"
        ? normalizedTheme.secondaryLinksIconBadgeColor.trim()
        : THEME_DEFAULTS.secondaryLinksIconBadgeColor,
    secondaryLinksIconColor:
      typeof normalizedTheme.secondaryLinksIconColor === "string"
        ? normalizedTheme.secondaryLinksIconColor.trim()
        : THEME_DEFAULTS.secondaryLinksIconColor,
    secondaryLinksPosition:
      normalizedTheme.secondaryLinksPosition === "top" ||
      normalizedTheme.secondaryLinksPosition === "bottom"
          ? normalizedTheme.secondaryLinksPosition
          : THEME_DEFAULTS.secondaryLinksPosition,
      cardColor:
        typeof surfaceColor === "string" && surfaceColor.trim()
          ? surfaceColor.trim()
        : THEME_DEFAULTS.surfaceColor,
    textColor:
      typeof pageTextColor === "string" && pageTextColor.trim()
        ? pageTextColor.trim()
        : THEME_DEFAULTS.pageTextColor,
  };
}

function serializePage(pageDocument) {
  const page = toPlainObject(pageDocument);

  return {
    ...page,
    theme: normalizeTheme(page.theme || {}),
    links: normalizeLinks(page.links || []),
    secondaryLinks: normalizeSecondaryLinks(page.secondaryLinks || []),
    shop: normalizeShop(page.shop || {}),
  };
}

async function ensureUniqueSlug(slug, excludeId) {
  const query = { slug };

  if (excludeId) {
    query._id = { $ne: excludeId };
  }

  const existing = await MyPage.findOne(query).lean();

  if (existing) {
    throw createHttpError(409, "Slug já está em uso.", "SLUG_ALREADY_EXISTS");
  }
}

function getNormalizedLinkSets(page = {}) {
  const currentLinks = (page.links || []).map((link) => toPlainObject(link));
  const currentSecondaryLinks = (page.secondaryLinks || []).map((link) =>
    toPlainObject(link),
  );
  const legacySocialLinks = currentLinks.filter(
    (link) => String(link?.type || "").trim().toLowerCase() === "social",
  );
  const primaryLinks = currentLinks.filter(
    (link) => String(link?.type || "").trim().toLowerCase() !== "social",
  );

  return {
    links: normalizeLinks(primaryLinks),
    secondaryLinks: normalizeSecondaryLinks([
      ...currentSecondaryLinks,
      ...legacySocialLinks,
    ]),
    shop: normalizeShop(page.shop || {}),
  };
}

function applyDocumentNormalization(page) {
  const next = getNormalizedLinkSets(page);
  const currentLinks = JSON.stringify((page.links || []).map((link) => toPlainObject(link)));
  const currentSecondaryLinks = JSON.stringify(
    (page.secondaryLinks || []).map((link) => toPlainObject(link)),
  );
  const nextLinks = JSON.stringify(next.links);
  const nextSecondaryLinks = JSON.stringify(next.secondaryLinks);
  const currentShop = JSON.stringify(toPlainObject(page.shop || {}));
  const nextShop = JSON.stringify(next.shop);
  const changed =
    currentLinks !== nextLinks
    || currentSecondaryLinks !== nextSecondaryLinks
    || currentShop !== nextShop;

  page.links = next.links;
  page.secondaryLinks = next.secondaryLinks;
  page.shop = next.shop;

  return changed;
}

async function persistNormalizedPage(page) {
  const changed = applyDocumentNormalization(page);
  if (changed) {
    await page.save();
  }
  return page;
}

async function getPageDocumentByOwnerId(ownerId, { createIfMissing = true } = {}) {
  let page = await MyPage.findOne({ ownerId }).sort({ createdAt: 1 });

  if (!page && createIfMissing) {
    page = await MyPage.create(buildDefaultPage(ownerId));
  }

  if (!page) {
    throw createHttpError(404, "Página da conta não encontrada.", "PAGE_NOT_FOUND");
  }

  return persistNormalizedPage(page);
}

function findLinkIndex(page, id) {
  return (page.links || []).findIndex((link) => String(link.id) === String(id));
}

function findSecondaryLinkIndex(page, id) {
  return (page.secondaryLinks || []).findIndex(
    (link) => String(link.id) === String(id),
  );
}

function findOtherShopPreviewLink(page, excludeId) {
  return (page.links || []).find((link) => {
    const sameId = excludeId && String(link.id) === String(excludeId);
    return !sameId && String(link?.type || "").trim().toLowerCase() === "shop-preview";
  });
}

function findShopProductIndex(page, id) {
  return (page.shop?.products || []).findIndex(
    (product) => String(product.id) === String(id),
  );
}

function sanitizeProfilePayload(payload = {}) {
  return {
    title: typeof payload.title === "string" ? payload.title.trim() : undefined,
    slug: typeof payload.slug === "string" ? normalizeSlug(payload.slug) : undefined,
    bio: typeof payload.bio === "string" ? payload.bio.trim() : undefined,
    avatarUrl:
      typeof payload.avatarUrl === "string" ? payload.avatarUrl.trim() : undefined,
  };
}

function sanitizeThemePayload(payload = {}) {
  const updates = {};

  for (const key of [
    "themePreset",
    "brandLayout",
    "backgroundStyle",
    "backgroundGradientDirection",
    "backgroundPatternVariant",
    "surfaceStyle",
    "surfacePatternVariant",
    "surfaceColor",
    "buttonColor",
    "buttonTextColor",
    "pageTextColor",
    "titleTextColor",
    "fontPreset",
    "buttonShadow",
    "buttonRadius",
    "primaryButtonsLayout",
    "primaryButtonContentAlign",
    "primaryIconLayout",
    "primaryIconSize",
    "primaryIconBadgeColor",
    "primaryIconColor",
    "secondaryLinksStyle",
    "secondaryLinksIconLayout",
    "secondaryLinksIconSize",
    "secondaryLinksIconBadgeColor",
    "secondaryLinksIconColor",
    "secondaryLinksSize",
    "secondaryLinksAlign",
    "secondaryLinksPosition",
    "animationPreset",
    "backgroundColor",
    "cardColor",
    "textColor",
  ]) {
    if (typeof payload[key] === "string") {
      updates[key] = payload[key].trim();
    }
  }

  if (typeof payload.buttonStyle === "string") {
    const buttonStyle = payload.buttonStyle.trim();
    const legacyRadius = LEGACY_BUTTON_STYLE_TO_RADIUS[buttonStyle];
    if (legacyRadius) {
      updates.buttonRadius = legacyRadius;
    } else {
      updates.buttonStyle = buttonStyle;
    }
  }

  if (updates.cardColor && !updates.surfaceColor) {
    updates.surfaceColor = updates.cardColor;
  }

  if (updates.textColor) {
    if (!updates.pageTextColor) {
      updates.pageTextColor = updates.textColor;
    }
    if (!updates.titleTextColor) {
      updates.titleTextColor = updates.textColor;
    }
  }

  return updates;
}

function sanitizeLinkPayload(payload = {}) {
  const rawType =
    typeof payload.type === "string" ? payload.type.trim().toLowerCase() : undefined;
  const rawPlatform =
    typeof payload.platform === "string"
      ? payload.platform.trim().toLowerCase()
      : undefined;

  return {
    title: typeof payload.title === "string" ? payload.title.trim() : undefined,
    url: typeof payload.url === "string" ? payload.url.trim() : undefined,
    platform:
      rawPlatform === "" || isPrimaryLinkPlatform(rawPlatform)
        ? rawPlatform
        : undefined,
    handle:
      typeof payload.handle === "string" ? payload.handle.trim() : undefined,
    phone: typeof payload.phone === "string" ? payload.phone.trim() : undefined,
    message:
      typeof payload.message === "string" ? payload.message.trim() : undefined,
    address:
      typeof payload.address === "string" ? payload.address.trim() : undefined,
    placeId:
      typeof payload.placeId === "string" ? payload.placeId.trim() : undefined,
    showMap:
      typeof payload.showMap === "boolean" ? payload.showMap : undefined,
    pixKey:
      typeof payload.pixKey === "string" ? payload.pixKey.trim() : undefined,
    pixKeyType:
      typeof payload.pixKeyType === "string"
        ? normalizePixKeyType(payload.pixKeyType)
        : undefined,
    isActive:
      typeof payload.isActive === "boolean" ? payload.isActive : undefined,
    type: isPrimaryLinkType(rawType) ? rawType : undefined,
  };
}

function sanitizeSecondaryLinkPayload(payload = {}) {
  const rawPlatform =
    typeof payload.platform === "string"
      ? payload.platform.trim().toLowerCase()
      : undefined;

  return {
    platform: isSecondaryPlatform(rawPlatform) ? rawPlatform : undefined,
    title: typeof payload.title === "string" ? payload.title.trim() : undefined,
    url: typeof payload.url === "string" ? payload.url.trim() : undefined,
    handle: typeof payload.handle === "string" ? payload.handle.trim() : undefined,
    isActive:
      typeof payload.isActive === "boolean" ? payload.isActive : undefined,
  };
}

function sanitizeShopPayload(payload = {}) {
  return {
    isActive:
      typeof payload.isActive === "boolean" ? payload.isActive : undefined,
    title: typeof payload.title === "string" ? payload.title.trim() : undefined,
    description:
      typeof payload.description === "string"
        ? payload.description.trim()
        : undefined,
  };
}

function sanitizeShopProductPayload(payload = {}) {
  const importMode =
    typeof payload.importMode === "string"
      ? payload.importMode.trim().toLowerCase()
      : undefined;

  return {
    sourceUrl:
      typeof payload.sourceUrl === "string"
        ? payload.sourceUrl.trim()
        : typeof payload.url === "string"
          ? payload.url.trim()
          : undefined,
    title: typeof payload.title === "string" ? payload.title.trim() : undefined,
    price:
      typeof payload.price === "number"
        ? payload.price
        : payload.price === null || payload.price === ""
          ? null
          : Number.isFinite(Number(payload.price))
            ? Number(payload.price)
            : undefined,
    currency:
      typeof payload.currency === "string"
        ? normalizeShopCurrency(payload.currency)
        : undefined,
    imageUrl:
      typeof payload.imageUrl === "string" ? payload.imageUrl.trim() : undefined,
    isActive:
      typeof payload.isActive === "boolean" ? payload.isActive : undefined,
    importMode: SHOP_IMPORT_MODES.has(importMode) ? importMode : undefined,
  };
}

function validateShopProductPayload(payload = {}, { requireSourceUrl = true } = {}) {
  if (!payload.title) {
    throw createHttpError(400, "Informe o título do produto.", "SHOP_PRODUCT_TITLE_REQUIRED");
  }

  if (requireSourceUrl && !payload.sourceUrl) {
    throw createHttpError(400, "Informe a URL do produto.", "SHOP_PRODUCT_URL_REQUIRED");
  }
}

function ensureSingleShopPreviewLink(page, nextType, excludeId) {
  if (String(nextType || "").trim().toLowerCase() !== "shop-preview") {
    return;
  }

  const existingShopPreview = findOtherShopPreviewLink(page, excludeId);
  if (existingShopPreview) {
    throw createHttpError(
      409,
      "A página já possui uma Prévia da loja. Edite o item existente para continuar.",
      "SHOP_PREVIEW_ALREADY_EXISTS",
    );
  }
}

export async function getMyPage(ownerId) {
  const page = await getPageDocumentByOwnerId(ownerId);
  return serializePage(page);
}

export async function updateMyPage(ownerId, payload = {}) {
  const page = await getPageDocumentByOwnerId(ownerId);
  const updates = sanitizeProfilePayload(payload);

  if (Object.hasOwn(payload, "slug")) {
    if (!updates.slug) {
      throw createHttpError(400, "O slug não pode ficar vazio.", "INVALID_SLUG");
    }

    await ensureUniqueSlug(updates.slug, page._id);
  }

  for (const [key, value] of Object.entries(updates)) {
    if (value !== undefined) {
      page[key] = value;
    }
  }

  await page.save();
  return serializePage(page);
}

export async function updateTheme(ownerId, payload = {}) {
  const page = await getPageDocumentByOwnerId(ownerId);
  const updates = sanitizeThemePayload(payload);

  page.theme = normalizeTheme({
    ...normalizeTheme(page.theme || {}),
    ...Object.fromEntries(
      Object.entries(updates).filter(([, value]) => value !== undefined),
    ),
  });

  await page.save();
  return serializePage(page);
}

export async function createLink(ownerId, payload = {}) {
  const page = await getPageDocumentByOwnerId(ownerId);
  const data = sanitizeLinkPayload(payload);
  ensureSingleShopPreviewLink(page, data.type);

  page.links.push(normalizeLink({
    id: createLinkId(),
    title: data.title || "",
    url: data.url || "",
    platform: data.platform || "",
    handle: data.handle || "",
    phone: data.phone || "",
    message: data.message || "",
    address: data.address || "",
    placeId: data.placeId || "",
    showMap: data.showMap ?? false,
    pixKey: data.pixKey || "",
    pixKeyType: data.pixKeyType || "random",
    isActive: data.isActive ?? true,
    order: page.links.length,
    type: data.type || "link",
  }, page.links.length));

  applyDocumentNormalization(page);
  await page.save();
  return serializePage(page);
}

export async function updateLink(ownerId, id, payload = {}) {
  const page = await getPageDocumentByOwnerId(ownerId);
  const linkIndex = findLinkIndex(page, id);

  if (linkIndex === -1) {
    throw createHttpError(404, "Link não encontrado.", "LINK_NOT_FOUND");
  }

  const currentLink = toPlainObject(page.links[linkIndex]);
  const updates = sanitizeLinkPayload(payload);
  ensureSingleShopPreviewLink(page, updates.type ?? currentLink.type, id);

  page.links[linkIndex] = normalizeLink(
    {
      ...currentLink,
      ...Object.fromEntries(
        Object.entries(updates).filter(([, value]) => value !== undefined),
      ),
    },
    currentLink.order ?? linkIndex,
  );

  applyDocumentNormalization(page);
  await page.save();
  return serializePage(page);
}

export async function deleteLink(ownerId, id) {
  const page = await getPageDocumentByOwnerId(ownerId);
  const nextLinks = (page.links || []).filter(
    (link) => String(link.id) !== String(id),
  );

  if (nextLinks.length === (page.links || []).length) {
    throw createHttpError(404, "Link não encontrado.", "LINK_NOT_FOUND");
  }

  page.links = normalizeLinks(nextLinks.map((link) => toPlainObject(link)));
  await page.save();
  return serializePage(page);
}

export async function toggleLink(ownerId, id) {
  const page = await getPageDocumentByOwnerId(ownerId);
  const linkIndex = findLinkIndex(page, id);

  if (linkIndex === -1) {
    throw createHttpError(404, "Link não encontrado.", "LINK_NOT_FOUND");
  }

  const currentLink = toPlainObject(page.links[linkIndex]);
  page.links[linkIndex] = {
    ...currentLink,
    isActive: !currentLink.isActive,
  };

  await page.save();
  return serializePage(page);
}

export async function reorderLinks(ownerId, ids = []) {
  const page = await getPageDocumentByOwnerId(ownerId);

  page.links = reorderExistingItemsPreservingIdentity(
    page.links || [],
    ids,
    "links",
  );
  await page.save();
  return serializePage(page);
}

export async function createSecondaryLink(ownerId, payload = {}) {
  const page = await getPageDocumentByOwnerId(ownerId);
  const data = sanitizeSecondaryLinkPayload(payload);

  page.secondaryLinks.push({
    id: createSecondaryLinkId(),
    platform: data.platform || "instagram",
    title: data.title || getSecondaryPlatformLabel(data.platform || "instagram"),
    url: data.url || "",
    handle: data.handle || "",
    isActive: data.isActive ?? true,
    order: page.secondaryLinks.length,
  });

  applyDocumentNormalization(page);
  await page.save();
  return serializePage(page);
}

export async function updateSecondaryLink(ownerId, id, payload = {}) {
  const page = await getPageDocumentByOwnerId(ownerId);
  const linkIndex = findSecondaryLinkIndex(page, id);

  if (linkIndex === -1) {
    throw createHttpError(
      404,
      "Link secundário não encontrado.",
      "SECONDARY_LINK_NOT_FOUND",
    );
  }

  const currentLink = toPlainObject(page.secondaryLinks[linkIndex]);
  const updates = sanitizeSecondaryLinkPayload(payload);

  page.secondaryLinks[linkIndex] = {
    ...currentLink,
    ...Object.fromEntries(
      Object.entries(updates).filter(([, value]) => value !== undefined),
    ),
  };

  applyDocumentNormalization(page);
  await page.save();
  return serializePage(page);
}

export async function deleteSecondaryLink(ownerId, id) {
  const page = await getPageDocumentByOwnerId(ownerId);
  const nextLinks = (page.secondaryLinks || []).filter(
    (link) => String(link.id) !== String(id),
  );

  if (nextLinks.length === (page.secondaryLinks || []).length) {
    throw createHttpError(
      404,
      "Link secundário não encontrado.",
      "SECONDARY_LINK_NOT_FOUND",
    );
  }

  page.secondaryLinks = normalizeSecondaryLinks(
    nextLinks.map((link) => toPlainObject(link)),
  );
  await page.save();
  return serializePage(page);
}

export async function toggleSecondaryLink(ownerId, id) {
  const page = await getPageDocumentByOwnerId(ownerId);
  const linkIndex = findSecondaryLinkIndex(page, id);

  if (linkIndex === -1) {
    throw createHttpError(
      404,
      "Link secundário não encontrado.",
      "SECONDARY_LINK_NOT_FOUND",
    );
  }

  const currentLink = toPlainObject(page.secondaryLinks[linkIndex]);
  page.secondaryLinks[linkIndex] = {
    ...currentLink,
    isActive: !currentLink.isActive,
  };

  await page.save();
  return serializePage(page);
}

export async function reorderSecondaryLinks(ownerId, ids = []) {
  const page = await getPageDocumentByOwnerId(ownerId);

  page.secondaryLinks = reorderExistingItemsPreservingIdentity(
    page.secondaryLinks || [],
    ids,
    "secondaryLinks",
  );
  await page.save();
  return serializePage(page);
}

export async function updateShop(ownerId, payload = {}) {
  const page = await getPageDocumentByOwnerId(ownerId);
  const updates = sanitizeShopPayload(payload);

  page.shop = normalizeShop({
    ...toPlainObject(page.shop),
    ...Object.fromEntries(
      Object.entries(updates).filter(([, value]) => value !== undefined),
    ),
  });

  await page.save();
  return serializePage(page);
}

export async function importShopProductPreview(sourceUrl = "") {
  return importShopProductFromUrl(sourceUrl);
}

export async function createShopProduct(ownerId, payload = {}) {
  const page = await getPageDocumentByOwnerId(ownerId);
  const data = sanitizeShopProductPayload(payload);

  validateShopProductPayload(data, { requireSourceUrl: true });

  const currentShop = normalizeShop(page.shop || {});
  const nextProducts = [
    ...currentShop.products,
    normalizeShopProduct({
      id: createProductId(),
      sourceUrl: data.sourceUrl,
      title: data.title,
      price: data.price ?? null,
      currency: data.currency || "BRL",
      imageUrl: data.imageUrl || "",
      isActive: data.isActive ?? true,
      importMode: data.importMode || "manual",
      order: currentShop.products.length,
    }, currentShop.products.length),
  ];

  page.shop = normalizeShop({
    ...currentShop,
    products: nextProducts,
  });

  await page.save();
  return serializePage(page);
}

export async function updateShopProduct(ownerId, id, payload = {}) {
  const page = await getPageDocumentByOwnerId(ownerId);
  const currentShop = normalizeShop(page.shop || {});
  const productIndex = findShopProductIndex({ shop: currentShop }, id);

  if (productIndex === -1) {
    throw createHttpError(404, "Produto não encontrado.", "SHOP_PRODUCT_NOT_FOUND");
  }

  const currentProduct = toPlainObject(currentShop.products[productIndex]);
  const updates = sanitizeShopProductPayload(payload);
  const nextProduct = {
    ...currentProduct,
    ...Object.fromEntries(
      Object.entries(updates).filter(([, value]) => value !== undefined),
    ),
  };

  validateShopProductPayload(nextProduct, { requireSourceUrl: true });

  const nextProducts = currentShop.products.map((product, index) =>
    index === productIndex
      ? normalizeShopProduct(nextProduct, currentProduct.order ?? productIndex)
      : toPlainObject(product),
  );

  page.shop = normalizeShop({
    ...currentShop,
    products: nextProducts,
  });

  await page.save();
  return serializePage(page);
}

export async function deleteShopProduct(ownerId, id) {
  const page = await getPageDocumentByOwnerId(ownerId);
  const currentShop = normalizeShop(page.shop || {});
  const nextProducts = currentShop.products.filter(
    (product) => String(product.id) !== String(id),
  );

  if (nextProducts.length === currentShop.products.length) {
    throw createHttpError(404, "Produto não encontrado.", "SHOP_PRODUCT_NOT_FOUND");
  }

  page.shop = normalizeShop({
    ...currentShop,
    products: nextProducts,
  });

  await page.save();
  return serializePage(page);
}

export async function toggleShopProduct(ownerId, id) {
  const page = await getPageDocumentByOwnerId(ownerId);
  const currentShop = normalizeShop(page.shop || {});
  const productIndex = findShopProductIndex({ shop: currentShop }, id);

  if (productIndex === -1) {
    throw createHttpError(404, "Produto não encontrado.", "SHOP_PRODUCT_NOT_FOUND");
  }

  const nextProducts = currentShop.products.map((product, index) =>
    index !== productIndex
      ? toPlainObject(product)
      : {
          ...toPlainObject(product),
          isActive: !product.isActive,
        },
  );

  page.shop = normalizeShop({
    ...currentShop,
    products: nextProducts,
  });

  await page.save();
  return serializePage(page);
}

export async function reorderShopProducts(ownerId, ids = []) {
  const page = await getPageDocumentByOwnerId(ownerId);
  const currentShop = normalizeShop(page.shop || {});

  page.shop = normalizeShop({
    ...currentShop,
    products: reorderExistingItemsPreservingIdentity(
      currentShop.products || [],
      ids,
      "shopProducts",
    ),
  });

  await page.save();
  return serializePage(page);
}

export async function searchLocationSuggestions(query = "") {
  const normalizedQuery = String(query || "").trim();

  if (normalizedQuery.length < 3) {
    return [];
  }

  await waitForNominatimSlot();

  const params = new URLSearchParams({
    q: normalizedQuery,
    format: "jsonv2",
    addressdetails: "1",
    limit: "5",
    countrycodes: "br",
    "accept-language": "pt-BR",
  });

  const response = await fetch(`${NOMINATIM_BASE_URL}?${params.toString()}`, {
    headers: {
      "User-Agent": "dandelink/1.0 (admin address search)",
      "Accept-Language": "pt-BR",
    },
  });

  if (!response.ok) {
    throw createHttpError(
      502,
      "Falha ao consultar o serviço de busca de endereços.",
      "NOMINATIM_REQUEST_FAILED",
    );
  }

  const payload = await response.json();

  if (!Array.isArray(payload) || !payload.length) {
    return [];
  }

  return payload.map((item) => formatNominatimSuggestion(item));
}

export async function getPublicMyPageBySlug(slug) {
  const normalizedSlug = normalizeSlug(slug);

  if (!normalizedSlug) {
    throw createHttpError(400, "Slug inválido.", "INVALID_SLUG");
  }

  const page = await MyPage.findOne({ slug: normalizedSlug });

  if (!page) {
    throw createHttpError(404, "Página pública não encontrada.", "PUBLIC_PAGE_NOT_FOUND");
  }

  if (page.ownerId) {
    await persistNormalizedPage(page);
  }

  const publicPage = serializePage(page);
  const activeShopProducts = sortByOrder(publicPage.shop?.products || []).filter(
    (product) => product.isActive,
  );

  return {
    title: publicPage.title,
    slug: publicPage.slug,
    bio: publicPage.bio,
    avatarUrl: publicPage.avatarUrl,
    theme: publicPage.theme,
    links: sortByOrder(publicPage.links || []).filter((link) => link.isActive),
    secondaryLinks: sortByOrder(publicPage.secondaryLinks || []).filter(
      (link) => link.isActive,
    ),
    shop: publicPage.shop
      ? {
          ...publicPage.shop,
          products: activeShopProducts,
          productsCount: activeShopProducts.length,
        }
      : null,
  };
}

