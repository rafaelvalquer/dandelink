import {
  BriefcaseBusiness,
  Globe,
  HeartHandshake,
  Link2,
  MapPin,
  MessageCircle,
  QrCode,
  ShoppingBag,
  Sparkles,
  Store,
  UserRoundSearch,
} from "lucide-react";
import {
  FaDiscord,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhone,
  FaTelegram,
  FaThreads,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { createElement } from "react";
import { SiCalendly, SiIfood } from "react-icons/si";

function Food99Icon({ size = 20, ...props }) {
  return createElement(
    "svg",
    {
      viewBox: "0 0 24 24",
      width: size,
      height: size,
      fill: "none",
      "aria-hidden": "true",
      focusable: "false",
      ...props,
    },
    createElement("rect", {
      x: "2",
      y: "3",
      width: "20",
      height: "18",
      rx: "7",
      fill: "currentColor",
      opacity: "0.16",
    }),
    createElement(
      "text",
      {
        x: "12",
        y: "15.5",
        textAnchor: "middle",
        fill: "currentColor",
        fontFamily: "Inter, Arial, sans-serif",
        fontSize: "8.5",
        fontWeight: "900",
      },
      "99",
    ),
  );
}

function KeetaIcon({ size = 20, ...props }) {
  return createElement(
    "svg",
    {
      viewBox: "0 0 24 24",
      width: size,
      height: size,
      fill: "none",
      "aria-hidden": "true",
      focusable: "false",
      ...props,
    },
    createElement("circle", {
      cx: "12",
      cy: "12",
      r: "9",
      fill: "currentColor",
      opacity: "0.16",
    }),
    createElement("path", {
      d: "M8 16V8h2.2v3.1L13.5 8h2.8l-3.7 3.5 4 4.5h-2.9l-2.6-3.1-.9.9V16H8Z",
      fill: "currentColor",
    }),
  );
}

export const LINK_PICKER_CATEGORY_META = {
  essentials: {
    label: "Essenciais",
    Icon: Sparkles,
    description: "Acoes principais da pagina.",
  },
  shop: {
    label: "Loja",
    Icon: Store,
    description: "Entradas para produtos e catalogo.",
  },
  social: {
    label: "Social",
    Icon: UserRoundSearch,
    description: "Perfis e redes publicas.",
  },
  community: {
    label: "Comunidade",
    Icon: HeartHandshake,
    description: "Canais e comunidades.",
  },
  contact: {
    label: "Contato",
    Icon: MessageCircle,
    description: "Formas diretas de falar com voce.",
  },
  business: {
    label: "Negocio",
    Icon: BriefcaseBusiness,
    description: "Site, agenda e presenca comercial.",
  },
};

export const PRIMARY_LINK_PICKER_OPTIONS = [
  {
    id: "link",
    scope: "primary",
    category: "essentials",
    label: "Link",
    description: "Adicione um link externo com URL completa.",
    keywords: ["url", "site", "externo", "link"],
    Icon: Link2,
    badgeStyle: {
      background: "linear-gradient(135deg, #ede9fe 0%, #dbeafe 100%)",
      color: "#6d28d9",
    },
  },
  {
    id: "whatsapp",
    scope: "primary",
    category: "essentials",
    label: "WhatsApp",
    description: "Leve a pessoa direto para uma conversa.",
    keywords: ["whatsapp", "mensagem", "contato", "zap"],
    Icon: MessageCircle,
    badgeStyle: {
      background: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
      color: "#15803d",
    },
  },
  {
    id: "pix",
    scope: "primary",
    category: "essentials",
    label: "PIX",
    description: "Mostre QR Code e chave PIX para pagamento.",
    keywords: ["pix", "qr code", "pagamento", "chave", "copia e cola"],
    Icon: QrCode,
    badgeStyle: {
      background: "linear-gradient(135deg, #ccfbf1 0%, #d9f99d 100%)",
      color: "#0f766e",
    },
  },
  {
    id: "location",
    scope: "primary",
    category: "essentials",
    label: "Localizacao",
    description: "Mostre o endereco com abertura para mapa.",
    keywords: ["local", "endereco", "mapa", "google maps"],
    Icon: MapPin,
    badgeStyle: {
      background: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
      color: "#dc2626",
    },
  },
  {
    id: "shop-preview",
    scope: "primary",
    category: "shop",
    label: "Previa da loja",
    description: "Exiba o mosaico de produtos e leve ao catalogo.",
    keywords: ["shop", "loja", "produtos", "catalogo", "preview"],
    Icon: ShoppingBag,
    badgeStyle: {
      background: "linear-gradient(135deg, #ede9fe 0%, #fae8ff 100%)",
      color: "#7c3aed",
    },
  },
];

export const SECONDARY_PLATFORM_META = {
  instagram: {
    label: "Instagram",
    Icon: FaInstagram,
    category: "social",
    primaryFieldLabel: "Perfil",
    primaryPlaceholder: "@perfil",
    modalDescription: "Divulgue seu perfil principal do Instagram.",
    keywords: ["instagram", "perfil", "social", "reels"],
    inputMode: "handle",
    badgeStyle: {
      background:
        "linear-gradient(135deg, #f58529 0%, #feda77 28%, #dd2a7b 62%, #8134af 82%, #515bd4 100%)",
      color: "#ffffff",
    },
  },
  facebook: {
    label: "Facebook",
    Icon: FaFacebookF,
    category: "social",
    primaryFieldLabel: "Perfil",
    primaryPlaceholder: "@perfil",
    modalDescription: "Direcione para sua pagina ou perfil do Facebook.",
    keywords: ["facebook", "pagina", "perfil", "social"],
    inputMode: "handle",
    badgeStyle: {
      background: "linear-gradient(135deg, #7aa7ff 0%, #1877f2 100%)",
      color: "#ffffff",
    },
  },
  linkedin: {
    label: "LinkedIn",
    Icon: FaLinkedinIn,
    category: "social",
    primaryFieldLabel: "URL",
    primaryPlaceholder: "https://www.linkedin.com/in/...",
    modalDescription: "Compartilhe seu perfil profissional completo.",
    keywords: ["linkedin", "curriculo", "trabalho", "profissional"],
    inputMode: "url",
    badgeStyle: {
      background: "linear-gradient(135deg, #60a5fa 0%, #0a66c2 100%)",
      color: "#ffffff",
    },
  },
  x: {
    label: "X / Twitter",
    Icon: FaXTwitter,
    category: "social",
    primaryFieldLabel: "Perfil",
    primaryPlaceholder: "@usuario",
    modalDescription: "Adicione seu perfil do X usando o @usuario.",
    keywords: ["x", "twitter", "tweet", "perfil", "social"],
    inputMode: "handle",
    badgeStyle: {
      background: "linear-gradient(135deg, #111827 0%, #000000 100%)",
      color: "#ffffff",
    },
  },
  threads: {
    label: "Threads",
    Icon: FaThreads,
    category: "social",
    primaryFieldLabel: "Perfil",
    primaryPlaceholder: "@usuario",
    modalDescription: "Leve para seu perfil do Threads com @usuario.",
    keywords: ["threads", "meta", "perfil", "social"],
    inputMode: "handle",
    badgeStyle: {
      background: "linear-gradient(135deg, #27272a 0%, #09090b 100%)",
      color: "#ffffff",
    },
  },
  tiktok: {
    label: "TikTok",
    Icon: FaTiktok,
    category: "social",
    primaryFieldLabel: "Perfil",
    primaryPlaceholder: "@perfil",
    modalDescription: "Compartilhe seu perfil do TikTok.",
    keywords: ["tiktok", "video", "perfil", "social"],
    inputMode: "handle",
    badgeStyle: {
      background: "linear-gradient(135deg, #0f172a 0%, #111827 100%)",
      color: "#ffffff",
    },
  },
  youtube: {
    label: "YouTube",
    Icon: FaYoutube,
    category: "social",
    primaryFieldLabel: "Perfil",
    primaryPlaceholder: "@canal",
    modalDescription: "Aponte para seu canal ou usuario do YouTube.",
    keywords: ["youtube", "video", "canal", "social"],
    inputMode: "handle",
    badgeStyle: {
      background: "linear-gradient(135deg, #ff4d4f 0%, #ff0033 100%)",
      color: "#ffffff",
    },
  },
  telegram: {
    label: "Telegram",
    Icon: FaTelegram,
    category: "community",
    primaryFieldLabel: "Perfil",
    primaryPlaceholder: "@usuario",
    modalDescription: "Leve para seu usuario ou canal do Telegram.",
    keywords: ["telegram", "canal", "grupo", "comunidade"],
    inputMode: "handle",
    badgeStyle: {
      background: "linear-gradient(135deg, #67e8f9 0%, #229ed9 100%)",
      color: "#ffffff",
    },
  },
  discord: {
    label: "Discord",
    Icon: FaDiscord,
    category: "community",
    primaryFieldLabel: "URL",
    primaryPlaceholder: "https://discord.gg/...",
    modalDescription: "Compartilhe o convite do seu servidor ou comunidade.",
    keywords: ["discord", "comunidade", "servidor", "convite"],
    inputMode: "url",
    badgeStyle: {
      background: "linear-gradient(135deg, #a5b4fc 0%, #5865f2 100%)",
      color: "#ffffff",
    },
  },
  email: {
    label: "E-mail",
    Icon: FaEnvelope,
    category: "contact",
    primaryFieldLabel: "E-mail",
    primaryPlaceholder: "voce@dominio.com",
    modalDescription: "Abra o aplicativo de e-mail com um toque.",
    keywords: ["email", "contato", "mensagem", "mail"],
    inputMode: "email",
    badgeStyle: {
      background: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
      color: "#dc2626",
    },
  },
  phone: {
    label: "Telefone",
    Icon: FaPhone,
    category: "contact",
    primaryFieldLabel: "Telefone",
    primaryPlaceholder: "5511999999999",
    modalDescription: "Permita que a pessoa toque para ligar.",
    keywords: ["telefone", "ligacao", "contato", "phone"],
    inputMode: "phone",
    badgeStyle: {
      background: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
      color: "#15803d",
    },
  },
  ifood: {
    label: "iFood",
    Icon: SiIfood,
    category: "shop",
    primaryFieldLabel: "URL",
    primaryPlaceholder: "https://www.ifood.com.br/...",
    modalDescription: "Leve para seu cardapio, restaurante ou loja no iFood.",
    keywords: ["ifood", "delivery", "comida", "restaurante", "cardapio"],
    inputMode: "url",
    badgeStyle: {
      background: "linear-gradient(135deg, #ff7a70 0%, #ea1d2c 100%)",
      color: "#ffffff",
    },
  },
  food99: {
    label: "99Food",
    Icon: Food99Icon,
    category: "shop",
    primaryFieldLabel: "URL",
    primaryPlaceholder: "https://...",
    modalDescription: "Direcione para seu perfil, loja ou cardapio no 99Food.",
    keywords: ["99food", "99", "delivery", "comida", "restaurante"],
    inputMode: "url",
    badgeStyle: {
      background: "linear-gradient(135deg, #ffe66d 0%, #ffb703 100%)",
      color: "#2b2100",
    },
  },
  keeta: {
    label: "Keeta",
    Icon: KeetaIcon,
    category: "shop",
    primaryFieldLabel: "URL",
    primaryPlaceholder: "https://...",
    modalDescription: "Leve para seu cardapio, vitrine ou loja no Keeta.",
    keywords: ["keeta", "delivery", "comida", "restaurante", "cardapio"],
    inputMode: "url",
    badgeStyle: {
      background: "linear-gradient(135deg, #b8f56a 0%, #19b85a 100%)",
      color: "#073b1b",
    },
  },
  site: {
    label: "Site",
    Icon: Globe,
    category: "business",
    primaryFieldLabel: "URL",
    primaryPlaceholder: "https://...",
    modalDescription: "Direcione para seu site, blog ou landing page.",
    keywords: ["site", "url", "pagina", "negocio"],
    inputMode: "url",
    badgeStyle: {
      background: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)",
      color: "#334155",
    },
  },
  calendly: {
    label: "Calendly",
    Icon: SiCalendly,
    category: "business",
    primaryFieldLabel: "URL",
    primaryPlaceholder: "https://calendly.com/...",
    modalDescription: "Leve para sua agenda de reunioes.",
    keywords: ["calendly", "agenda", "reuniao", "agendamento"],
    inputMode: "url",
    badgeStyle: {
      background: "linear-gradient(135deg, #bae6fd 0%, #006bff 100%)",
      color: "#ffffff",
    },
  },
};

export const SECONDARY_LINK_PICKER_OPTIONS = Object.entries(SECONDARY_PLATFORM_META).map(
  ([platform, meta]) => ({
    id: platform,
    scope: "secondary",
    category: meta.category,
    label: meta.label,
    description: meta.modalDescription,
    keywords: meta.keywords,
    Icon: meta.Icon,
    badgeStyle: meta.badgeStyle,
    platform,
  }),
);

export const PRIMARY_PLATFORM_LINK_PICKER_OPTIONS = Object.entries(
  SECONDARY_PLATFORM_META,
).map(([platform, meta]) => ({
  id: platform,
  scope: "primary",
  category: meta.category,
  label: meta.label,
  description: meta.modalDescription,
  keywords: meta.keywords,
  Icon: meta.Icon,
  badgeStyle: meta.badgeStyle,
  platform,
}));

export const SECONDARY_PLATFORM_OPTIONS = Object.entries(SECONDARY_PLATFORM_META).map(
  ([value, meta]) => ({
    value,
    label: meta.label,
  }),
);

export const PRIMARY_LINK_PLATFORM_OPTIONS = [
  {
    value: "",
    label: "Link generico",
  },
  ...SECONDARY_PLATFORM_OPTIONS,
];

const SECONDARY_HANDLE_PLATFORMS = new Set([
  "instagram",
  "facebook",
  "tiktok",
  "youtube",
  "x",
  "threads",
  "telegram",
]);

export function getPrimaryLinkPickerOptions({ hasShopPreview = false } = {}) {
  return [
    ...PRIMARY_LINK_PICKER_OPTIONS.map((option) =>
      option.id === "shop-preview" && hasShopPreview
        ? {
            ...option,
            disabled: true,
            disabledReason: "A pagina ja possui uma Previa da loja.",
          }
        : option,
    ),
    ...PRIMARY_PLATFORM_LINK_PICKER_OPTIONS,
  ];
}

export function buildPrimaryLinkCreatePayload(type = "link") {
  const normalizedType = String(type || "link").trim().toLowerCase();

  if (SECONDARY_PLATFORM_META[normalizedType]) {
    return {
      title: getSecondaryPlatformLabel(normalizedType),
      url: "",
      handle: "",
      platform: normalizedType,
      isActive: true,
      type: "link",
    };
  }

  if (normalizedType === "whatsapp") {
    return {
      title: "WhatsApp",
      url: "",
      phone: "",
      message: "Ola! Vim pela sua pagina publica e gostaria de mais informacoes.",
      isActive: true,
      type: "whatsapp",
    };
  }

  if (normalizedType === "location") {
    return {
      title: "Localizacao",
      url: "",
      address: "",
      placeId: "",
      showMap: false,
      isActive: true,
      type: "location",
    };
  }

  if (normalizedType === "pix") {
    return {
      title: "PIX",
      url: "",
      pixKey: "",
      pixKeyType: "random",
      isActive: true,
      type: "pix",
    };
  }

  if (normalizedType === "shop-preview") {
    return {
      title: "Previa da loja",
      url: "",
      isActive: true,
      type: "shop-preview",
    };
  }

  return {
    title: "Link",
    url: "",
    handle: "",
    platform: "",
    isActive: true,
    type: "link",
  };
}

export function getSecondaryPlatformMeta(platform = "") {
  const normalizedPlatform = String(platform || "").trim().toLowerCase();
  return SECONDARY_PLATFORM_META[normalizedPlatform] || SECONDARY_PLATFORM_META.instagram;
}

export function getSecondaryPlatformLabel(platform = "") {
  return getSecondaryPlatformMeta(platform).label;
}

function extractSecondaryHandleFromUrl(value = "", platform = "") {
  const sample = String(value || "").trim();
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

export function normalizeSecondaryHandle(value = "", platform = "") {
  if (!SECONDARY_HANDLE_PLATFORMS.has(String(platform || "").trim().toLowerCase())) {
    return "";
  }

  const sample = String(value || "").trim();
  if (!sample) return "";

  const normalizedPlatform = String(platform || "").trim().toLowerCase();
  const extracted = /^(https?:\/\/)/i.test(sample) || /(?:^|\/)(?:www\.|m\.)?[a-z0-9-]+\.[a-z]{2,}/i.test(sample)
    ? extractSecondaryHandleFromUrl(sample, normalizedPlatform)
    : sample;

  return extracted.replace(/^@+/, "").replace(/\s+/g, "").replace(/\/+$/, "");
}

export function normalizeSecondaryEmail(value = "") {
  return String(value || "").trim().replace(/^mailto:/i, "").trim();
}

export function normalizeSecondaryPhone(value = "") {
  return String(value || "")
    .trim()
    .replace(/^tel:/i, "")
    .replace(/\D+/g, "");
}

export function isSecondaryHandlePlatform(platform = "") {
  return SECONDARY_HANDLE_PLATFORMS.has(
    String(platform || "").trim().toLowerCase(),
  );
}

export function buildSecondaryLinkUrl(platform = "", handle = "", fallbackUrl = "") {
  const normalizedPlatform = String(platform || "").trim().toLowerCase();
  const normalizedHandle = normalizeSecondaryHandle(handle, normalizedPlatform);

  if (normalizedPlatform === "instagram") {
    return normalizedHandle ? `https://www.instagram.com/${normalizedHandle}/` : "";
  }

  if (normalizedPlatform === "facebook") {
    return normalizedHandle
      ? `https://www.facebook.com/${normalizedHandle}`
      : String(fallbackUrl || "").trim();
  }

  if (normalizedPlatform === "tiktok") {
    return normalizedHandle ? `https://www.tiktok.com/@${normalizedHandle}` : "";
  }

  if (normalizedPlatform === "youtube") {
    return normalizedHandle ? `https://www.youtube.com/@${normalizedHandle}` : "";
  }

  if (normalizedPlatform === "x") {
    return normalizedHandle ? `https://x.com/${normalizedHandle}` : "";
  }

  if (normalizedPlatform === "threads") {
    return normalizedHandle ? `https://www.threads.net/@${normalizedHandle}` : "";
  }

  if (normalizedPlatform === "telegram") {
    return normalizedHandle ? `https://t.me/${normalizedHandle}` : "";
  }

  if (normalizedPlatform === "email") {
    const normalizedEmail = normalizeSecondaryEmail(fallbackUrl);
    return normalizedEmail ? `mailto:${normalizedEmail}` : "";
  }

  if (normalizedPlatform === "phone") {
    const normalizedPhone = normalizeSecondaryPhone(fallbackUrl);
    return normalizedPhone ? `tel:${normalizedPhone}` : "";
  }

  return String(fallbackUrl || "").trim();
}

export function getSecondaryPrimaryFieldValue(link = {}) {
  const platform = String(link.platform || "").trim().toLowerCase();

  if (platform === "email") {
    return normalizeSecondaryEmail(link.url || "");
  }

  if (platform === "phone") {
    return normalizeSecondaryPhone(link.url || "");
  }

  if (isSecondaryHandlePlatform(platform)) {
    return String(link.handle || "").trim();
  }

  return String(link.url || "").trim();
}

export function buildSecondaryLinkCreatePayload(platform = "instagram") {
  const normalizedPlatform = String(platform || "instagram").trim().toLowerCase();
  const label = getSecondaryPlatformLabel(normalizedPlatform);

  return {
    platform: normalizedPlatform,
    title: label,
    url: "",
    handle: "",
    isActive: true,
  };
}
