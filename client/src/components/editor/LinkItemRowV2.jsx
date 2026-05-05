import { useEffect, useMemo, useRef, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  BarChart3,
  ChevronDown,
  GripVertical,
  Link2,
  MapPin,
  MessageCircle,
  Pencil,
  QrCode,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { searchLocationSuggestions } from "../../app/api.js";
import {
  PRIMARY_LINK_PLATFORM_OPTIONS,
  buildSecondaryLinkUrl,
  getSecondaryPlatformLabel,
  getSecondaryPlatformMeta,
  isSecondaryHandlePlatform,
  normalizeSecondaryEmail,
  normalizeSecondaryHandle,
  normalizeSecondaryPhone,
} from "./linkPickerCatalog.js";
import Input from "../ui/Input.jsx";
import Switch from "../ui/Switch.jsx";

const typeOptions = [
  { value: "link", label: "Link" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "location", label: "Localização" },
  { value: "shop-preview", label: "Prévia da loja" },
  { value: "pix", label: "PIX" },
];

const WHATSAPP_DEFAULT_MESSAGE =
  "Olá! Vim pela sua página pública e gostaria de mais informações.";

const PIX_KEY_TYPE_OPTIONS = [
  { value: "random", label: "Chave aleatória" },
  { value: "cpf", label: "CPF" },
  { value: "cnpj", label: "CNPJ" },
  { value: "email", label: "E-mail" },
  { value: "phone", label: "Telefone" },
  { value: "other", label: "Outra" },
];

const PIX_KEY_TYPE_LABELS = PIX_KEY_TYPE_OPTIONS.reduce(
  (labels, option) => ({
    ...labels,
    [option.value]: option.label,
  }),
  {},
);

const PIX_KEY_PLACEHOLDERS = {
  random: "Cole a chave aleatória",
  cpf: "000.000.000-00",
  cnpj: "00.000.000/0000-00",
  email: "nome@email.com",
  phone: "+55 11 99999-9999",
  other: "Digite a chave PIX",
};

const LINK_TYPE_META = {
  link: {
    label: "Link",
    Icon: Link2,
    primaryFieldLabel: "URL",
    primaryPlaceholder: "https://...",
    usesPrimaryField: true,
  },
  whatsapp: {
    label: "WhatsApp",
    Icon: MessageCircle,
    primaryFieldLabel: "Numero do WhatsApp",
    primaryPlaceholder: "5511999999999",
    usesPrimaryField: true,
  },
  location: {
    label: "Localização",
    Icon: MapPin,
    primaryFieldLabel: "Endereço",
    primaryPlaceholder: "Digite o endereço para ver sugestões",
    usesPrimaryField: true,
  },
  "shop-preview": {
    label: "Prévia da loja",
    Icon: ShoppingBag,
    primaryFieldLabel: "Preview da loja",
    primaryPlaceholder: "",
    usesPrimaryField: false,
  },
  pix: {
    label: "PIX",
    Icon: QrCode,
    primaryFieldLabel: "Chave PIX",
    primaryPlaceholder: "CPF, CNPJ, e-mail, telefone ou chave aleatória",
    usesPrimaryField: true,
  },
};

const INSIGHT_RANGE_OPTIONS = [
  { value: "7d", label: "Últimos 7 dias" },
  { value: "28d", label: "Últimos 28 dias" },
];

function isPlatformLink(link = {}) {
  return (
    String(link?.type || "").trim().toLowerCase() === "link" &&
    String(link?.platform || "").trim() !== ""
  );
}

function getTypeMeta(link = {}) {
  if (isPlatformLink(link)) {
    return getSecondaryPlatformMeta(link.platform);
  }

  const normalizedType = String(link?.type || "").trim().toLowerCase();
  return LINK_TYPE_META[normalizedType] || LINK_TYPE_META.link;
}

function isUrlType(type = "") {
  const normalizedType = String(type || "").trim().toLowerCase();
  return normalizedType === "link";
}

function normalizePixKeyType(value = "") {
  const normalizedValue = String(value || "").trim().toLowerCase();
  return PIX_KEY_TYPE_LABELS[normalizedValue] ? normalizedValue : "random";
}

function getPixKeyTypeLabel(value = "") {
  return PIX_KEY_TYPE_LABELS[normalizePixKeyType(value)] || "Chave aleatória";
}

function getPrimaryFieldValue(link = {}) {
  const linkType = String(link.type || "").trim().toLowerCase();

  if (linkType === "link" && String(link.platform || "").trim()) {
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

  if (linkType === "whatsapp") {
    return String(link.phone || "").trim();
  }

  if (linkType === "location") {
    return String(link.address || "").trim();
  }

  if (linkType === "pix") {
    return String(link.pixKey || "").trim();
  }

  return String(link.url || "").trim();
}

function sortActiveShopProducts(products = []) {
  return [...(products || [])]
    .filter((product) => product?.isActive)
    .sort((left, right) => Number(left?.order ?? 0) - Number(right?.order ?? 0));
}

function ShopPreviewGrid({ products = [] }) {
  const previewItems = sortActiveShopProducts(products).slice(0, 4);
  const mosaicCount = previewItems.length || 4;
  const cells = previewItems.length
    ? previewItems
    : Array.from({ length: 4 }, (_, index) => ({ id: `placeholder-${index}` }));

  return (
    <div className="link-card__shop-preview">
      <div
        className={[
          "link-card__shop-preview-grid",
          `is-count-${mosaicCount}`,
        ].join(" ")}
      >
        {cells.map((product, index) => (
          <div
            key={product.id || index}
            className={[
              "link-card__shop-preview-cell",
              mosaicCount === 3 && index === 0 ? "is-featured" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.title || "Produto da loja"} />
            ) : (
              <div className="link-card__shop-preview-placeholder">
                <ShoppingBag size={18} aria-hidden="true" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="link-card__shop-preview-copy">
        <strong>Ver loja completa</strong>
        <span>
          {previewItems.length} {previewItems.length === 1 ? "produto" : "produtos"}
        </span>
      </div>
    </div>
  );
}

function PixKeyPreview({ link = {} }) {
  const pixKey = String(link.pixKey || "").trim();

  if (!pixKey) {
    return (
      <div className="link-card__pix-empty">
        Informe a chave para gerar o QR Code.
      </div>
    );
  }

  return (
    <div className="link-card__pix-preview" aria-label="Prévia do QR Code PIX">
      <div className="link-card__pix-qr" aria-hidden="true">
        <QRCodeSVG
          value={pixKey}
          size={88}
          level="M"
          includeMargin={false}
          bgColor="#ffffff"
          fgColor="#111827"
        />
      </div>
      <div className="link-card__pix-copy">
        <strong>QR Code PIX</strong>
        <span>{getPixKeyTypeLabel(link.pixKeyType)}</span>
        <code>{pixKey}</code>
      </div>
    </div>
  );
}

function buildEditableLinkSnapshot(link = {}) {
  return JSON.stringify({
    title: String(link.title || ""),
    type: String(link.type || "link").trim().toLowerCase(),
    platform: String(link.platform || "").trim().toLowerCase(),
    handle: String(link.handle || "").trim(),
    url: String(link.url || ""),
    phone: String(link.phone || ""),
    message: String(link.message || ""),
    address: String(link.address || ""),
    placeId: String(link.placeId || ""),
    showMap: link.showMap === true,
    pixKey: String(link.pixKey || ""),
    pixKeyType: normalizePixKeyType(link.pixKeyType),
    isActive: link.isActive !== false,
  });
}

function hasPatchChanges(link = {}, patch = {}) {
  return (
    buildEditableLinkSnapshot({ ...link, ...patch }) !==
    buildEditableLinkSnapshot(link)
  );
}

function buildFieldPatch(link = {}, field, value, locationPlaceId = "") {
  if (field === "title") {
    return { title: value };
  }

  const linkType = String(link.type || "").trim().toLowerCase();

  if (linkType === "link" && String(link.platform || "").trim()) {
    const platform = String(link.platform || "").trim().toLowerCase();

    if (isSecondaryHandlePlatform(platform)) {
      const nextHandle = normalizeSecondaryHandle(value, platform);
      return {
        handle: nextHandle,
        url: buildSecondaryLinkUrl(platform, nextHandle),
      };
    }

    if (platform === "email") {
      const normalizedEmail = normalizeSecondaryEmail(value);
      return {
        handle: "",
        url: buildSecondaryLinkUrl("email", "", normalizedEmail),
      };
    }

    if (platform === "phone") {
      const normalizedPhone = normalizeSecondaryPhone(value);
      return {
        handle: "",
        url: buildSecondaryLinkUrl("phone", "", normalizedPhone),
      };
    }

    return {
      handle: "",
      url: value,
    };
  }

  if (linkType === "whatsapp") {
    return {
      phone: value,
    };
  }

  if (linkType === "location") {
    return {
      address: value,
      placeId: locationPlaceId,
    };
  }

  if (linkType === "pix") {
    return {
      pixKey: value,
    };
  }

  return { url: value };
}

function createTypeChangePatch(link = {}, nextType) {
  const normalizedNextType = String(nextType || "link").trim().toLowerCase();
  const currentType = String(link.type || "").trim().toLowerCase();

  if (normalizedNextType === "whatsapp") {
    return {
      type: "whatsapp",
      url: "",
      platform: "",
      handle: "",
      address: "",
      placeId: "",
      showMap: false,
      pixKey: "",
      pixKeyType: "random",
      phone: currentType === "whatsapp" ? String(link.phone || "") : "",
      message:
        currentType === "whatsapp"
          ? String(link.message || "") || WHATSAPP_DEFAULT_MESSAGE
          : WHATSAPP_DEFAULT_MESSAGE,
    };
  }

  if (normalizedNextType === "location") {
    return {
      type: "location",
      url: "",
      platform: "",
      handle: "",
      phone: "",
      message: "",
      address: currentType === "location" ? String(link.address || "") : "",
      placeId: currentType === "location" ? String(link.placeId || "") : "",
      showMap: currentType === "location" ? link.showMap === true : false,
      pixKey: "",
      pixKeyType: "random",
    };
  }

  if (normalizedNextType === "shop-preview") {
    return {
      type: "shop-preview",
      url: "",
      platform: "",
      handle: "",
      phone: "",
      message: "",
      address: "",
      placeId: "",
      showMap: false,
      pixKey: "",
      pixKeyType: "random",
    };
  }

  if (normalizedNextType === "pix") {
    return {
      type: "pix",
      url: "",
      platform: "",
      handle: "",
      phone: "",
      message: "",
      address: "",
      placeId: "",
      showMap: false,
      pixKey: currentType === "pix" ? String(link.pixKey || "") : "",
      pixKeyType:
        currentType === "pix" ? normalizePixKeyType(link.pixKeyType) : "random",
    };
  }

  return {
    type: normalizedNextType,
    url: isUrlType(currentType) ? String(link.url || "") : "",
    platform: currentType === "link" ? String(link.platform || "").trim().toLowerCase() : "",
    handle:
      currentType === "link" && isSecondaryHandlePlatform(link.platform || "")
        ? normalizeSecondaryHandle(link.handle || "", link.platform || "")
        : "",
    phone: "",
    message: "",
    address: "",
    placeId: "",
    showMap: false,
    pixKey: "",
    pixKeyType: "random",
  };
}

function createPlatformChangePatch(link = {}, nextPlatform) {
  const normalizedNextPlatform = String(nextPlatform || "").trim().toLowerCase();
  const currentPlatform = String(link.platform || "").trim().toLowerCase();
  const nextUsesHandle = isSecondaryHandlePlatform(normalizedNextPlatform);
  const currentUsesHandle = isSecondaryHandlePlatform(currentPlatform);
  const currentTitle = String(link.title || "").trim();
  const currentTypeMeta = getTypeMeta(link);
  const shouldReplaceTitle =
    !currentTitle ||
    currentTitle === "Link" ||
    currentTitle === currentTypeMeta.label;

  if (!normalizedNextPlatform) {
    return {
      type: "link",
      platform: "",
      handle: "",
      title: shouldReplaceTitle ? "Link" : currentTitle,
      url:
        currentUsesHandle || currentPlatform === "email" || currentPlatform === "phone"
          ? ""
          : String(link.url || "").trim(),
    };
  }

  if (nextUsesHandle) {
    const nextHandle = currentUsesHandle
      ? normalizeSecondaryHandle(link.handle, currentPlatform)
      : "";

    return {
      type: "link",
      platform: normalizedNextPlatform,
      title: shouldReplaceTitle
        ? getSecondaryPlatformLabel(normalizedNextPlatform)
        : currentTitle,
      handle: nextHandle,
      url: buildSecondaryLinkUrl(normalizedNextPlatform, nextHandle),
    };
  }

  return {
    type: "link",
    platform: normalizedNextPlatform,
    title: shouldReplaceTitle
      ? getSecondaryPlatformLabel(normalizedNextPlatform)
      : currentTitle,
    handle: "",
    url:
      normalizedNextPlatform === "email"
        ? buildSecondaryLinkUrl(
            "email",
            "",
            currentPlatform === "email"
              ? normalizeSecondaryEmail(link.url || "")
              : "",
          )
        : normalizedNextPlatform === "phone"
          ? buildSecondaryLinkUrl(
              "phone",
              "",
              currentPlatform === "phone"
                ? normalizeSecondaryPhone(link.url || "")
                : "",
            )
          : currentUsesHandle || currentPlatform === "email" || currentPlatform === "phone"
            ? ""
            : String(link.url || "").trim(),
  };
}

function formatClicksLabel(total = 0) {
  const safeTotal = Number(total || 0);
  return `${safeTotal} ${safeTotal === 1 ? "clique" : "cliques"}`;
}

function getInsightRangeLabel(range = "7d") {
  return INSIGHT_RANGE_OPTIONS.find((option) => option.value === range)?.label || "Últimos 7 dias";
}

function getInsightHeadline(total = 0) {
  const safeTotal = Number(total || 0);

  if (safeTotal <= 0) {
    return "Parece que este link ainda não recebeu cliques.";
  }

  if (safeTotal === 1) {
    return "Este link recebeu 1 clique.";
  }

  return `Este link recebeu ${safeTotal} cliques.`;
}

function getVisibleInsightRows(rows = []) {
  return (rows || []).filter(
    (row) =>
      row?.label === "Total"
      || Number(row?.lifetime || 0) > 0
      || Number(row?.range || 0) > 0
      || row?.label === "Direto",
  );
}

function formatInsightAxisDate(value) {
  if (!value) {
    return "";
  }

  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "short",
  }).format(parsed);
}

function getInsightLabelStep(total) {
  if (total <= 5) {
    return 1;
  }

  if (total <= 10) {
    return 2;
  }

  return Math.ceil(total / 5);
}

function getSmoothedClickAverage(items = []) {
  return items.map((item, index) => {
    const windowItems = items.slice(Math.max(0, index - 1), Math.min(items.length, index + 2));
    const total = windowItems.reduce((sum, windowItem) => sum + Number(windowItem?.clicks || 0), 0);

    return {
      date: item.date,
      value: windowItems.length ? total / windowItems.length : 0,
    };
  });
}

function buildInsightSmoothPath(points = []) {
  if (points.length < 2) {
    return "";
  }

  return points.reduce((path, point, index) => {
    if (index === 0) {
      return `M ${point.x} ${point.y}`;
    }

    const previous = points[index - 1];
    const middleX = (previous.x + point.x) / 2;
    const middleY = (previous.y + point.y) / 2;
    const softOffset = Math.abs(previous.y - point.y) < 2 ? (index % 2 === 0 ? 8 : -8) : 0;

    return `${path} Q ${middleX} ${middleY + softOffset} ${point.x} ${point.y}`;
  }, "");
}

function LinkInsightChart({ items = [] }) {
  if (!items.length) {
    return null;
  }

  const width = 560;
  const height = 190;
  const padding = {
    top: 16,
    right: 12,
    bottom: 34,
    left: 34,
  };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const slotWidth = plotWidth / items.length;
  const barWidth = Math.max(8, Math.min(28, slotWidth * 0.34));
  const averages = getSmoothedClickAverage(items);
  const rawMax = Math.max(
    items.reduce((max, item) => Math.max(max, Number(item?.clicks || 0)), 0),
    averages.reduce((max, item) => Math.max(max, Number(item?.value || 0)), 0),
  );
  const maxValue = rawMax <= 4 ? 4 : Math.ceil((rawMax + 1) / 4) * 4;
  const ticks = Array.from({ length: 3 }, (_, index) => Math.round((maxValue / 2) * index));
  const labelStep = getInsightLabelStep(items.length);
  const averagePoints = averages.map((item, index) => ({
    x: padding.left + slotWidth * index + slotWidth / 2,
    y: padding.top + plotHeight - (maxValue ? Number(item?.value || 0) / maxValue : 0) * plotHeight,
  }));
  const averagePath = buildInsightSmoothPath(averagePoints);

  return (
    <div className="link-card__insight-chart" aria-label="Gráfico diário deste link">
      <svg viewBox={`0 0 ${width} ${height}`} role="img">
        {ticks.map((tickValue, index) => {
          const y = padding.top + plotHeight - (maxValue ? tickValue / maxValue : 0) * plotHeight;

          return (
            <g key={tickValue}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                className={`link-card__insight-grid-line ${index === 0 ? "is-baseline" : ""}`}
              />
              <text x={padding.left - 8} y={y + 4} textAnchor="end">
                {tickValue}
              </text>
            </g>
          );
        })}

        {items.map((item, index) => {
          const value = Number(item?.clicks || 0);
          const heightRatio = maxValue ? value / maxValue : 0;
          const barHeight = Math.max(value > 0 ? 8 : 0, heightRatio * plotHeight);
          const x = padding.left + slotWidth * index + (slotWidth - barWidth) / 2;
          const y = padding.top + plotHeight - barHeight;
          const labelX = padding.left + slotWidth * index + slotWidth / 2;

          return (
            <g key={`${item.date}-${index}`}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx="7"
                className="link-card__insight-bar"
              />
              {index % labelStep === 0 || index === items.length - 1 ? (
                <text x={labelX} y={height - 10} textAnchor="middle">
                  {formatInsightAxisDate(item.date)}
                </text>
              ) : null}
            </g>
          );
        })}

        {averagePath ? (
          <>
            <path className="link-card__insight-average-glow" d={averagePath} />
            <path className="link-card__insight-average-line" d={averagePath} />
          </>
        ) : null}
      </svg>
      <div className="link-card__insight-chart-legend" aria-hidden="true">
        <span><i className="is-clicks" /> Cliques</span>
        <span><i className="is-average" /> Média</span>
      </div>
    </div>
  );
}


export default function LinkItemRowV2({
  link,
  shopProducts = [],
  clickCount = 0,
  isInsightOpen = false,
  insightData = null,
  insightLoading = false,
  insightError = "",
  insightRange = "7d",
  onInsightToggle,
  onInsightRangeChange,
  onCommit,
  onDelete,
  onToggle,
  onMenuOpenChange,
  isHighlighted = false,
  dragDescriptionId,
}) {
  const [editingField, setEditingField] = useState(null);
  const [draftValue, setDraftValue] = useState("");
  const [savingField, setSavingField] = useState(null);
  const [fieldError, setFieldError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuSaving, setMenuSaving] = useState(false);
  const [menuError, setMenuError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [autocompleteError, setAutocompleteError] = useState("");
  const [locationDraftPlaceId, setLocationDraftPlaceId] = useState(
    String(link.placeId || ""),
  );
  const requestSequenceRef = useRef(0);
  const lastSuccessfulQueryRef = useRef("");
  const inputRef = useRef(null);
  const menuRef = useRef(null);
  const rowRef = useRef(null);
  const isInteractionLocked = Boolean(editingField || savingField || menuSaving);
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: link.id,
    disabled: isInteractionLocked,
  });
  const typeMeta = getTypeMeta(link);
  const primaryValue = getPrimaryFieldValue(link);
  const Icon = typeMeta.Icon;
  const isShopPreview = link.type === "shop-preview";
  const isPixLink = link.type === "pix";
  const pixKeyType = normalizePixKeyType(link.pixKeyType);
  const primaryFieldPlaceholder = isPixLink
    ? PIX_KEY_PLACEHOLDERS[pixKeyType] || PIX_KEY_PLACEHOLDERS.random
    : typeMeta.primaryPlaceholder;
  const isEditingValue = editingField === "value";
  const isLocationValue = isEditingValue && link.type === "location";
  const insightPanelId = `link-insight-${link.id}`;
  const visibleInsightRows = useMemo(
    () => getVisibleInsightRows(insightData?.rows || []),
    [insightData],
  );
  const sortableStyle = useMemo(
    () => ({
      transform: CSS.Transform.toString(transform),
      transition,
    }),
    [transform, transition],
  );

  useEffect(() => {
    setEditingField(null);
    setDraftValue("");
    setSavingField(null);
    setFieldError("");
    setMenuOpen(false);
    setMenuError("");
    setSuggestions([]);
    setLoadingSuggestions(false);
    setAutocompleteError("");
    setLocationDraftPlaceId(String(link.placeId || ""));
    lastSuccessfulQueryRef.current = "";
    requestSequenceRef.current = 0;
  }, [link.id]);

  useEffect(() => {
    if (!editingField) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      inputRef.current?.focus?.();
      inputRef.current?.select?.();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [editingField]);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    function handleOutsideClick(event) {
      if (!menuRef.current?.contains(event.target)) {
        setMenuOpen(false);
        setMenuError("");
      }
    }

    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuOpen]);

  useEffect(() => {
    onMenuOpenChange?.(menuOpen);
  }, [menuOpen, onMenuOpenChange]);

  useEffect(() => {
    if (!isHighlighted) {
      return;
    }

    rowRef.current?.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  }, [isHighlighted]);

  function setRefs(node) {
    rowRef.current = node;
    setNodeRef(node);
  }

  useEffect(() => {
    if (!isLocationValue) {
      setSuggestions([]);
      setLoadingSuggestions(false);
      setAutocompleteError("");
      return undefined;
    }

    const query = String(draftValue || "").trim();

    if (query.length < 3) {
      setSuggestions([]);
      setLoadingSuggestions(false);
      setAutocompleteError("");
      return undefined;
    }

    if (query === lastSuccessfulQueryRef.current) {
      return undefined;
    }

    const currentRequest = requestSequenceRef.current + 1;
    requestSequenceRef.current = currentRequest;
    let isCancelled = false;

    const timeoutId = window.setTimeout(async () => {
      try {
        setLoadingSuggestions(true);
        setAutocompleteError("");
        const response = await searchLocationSuggestions(query);

        if (isCancelled || requestSequenceRef.current !== currentRequest) {
          return;
        }

        const nextSuggestions = response.suggestions || [];
        setSuggestions(nextSuggestions);
        lastSuccessfulQueryRef.current = query;

        if (!nextSuggestions.length) {
          setAutocompleteError("Nenhum endereço encontrado.");
        }
      } catch (error) {
        if (isCancelled || requestSequenceRef.current !== currentRequest) {
          return;
        }

        setSuggestions([]);
        setAutocompleteError(
          error.message || "Não foi possível buscar endereços.",
        );
      } finally {
        if (!isCancelled && requestSequenceRef.current === currentRequest) {
          setLoadingSuggestions(false);
        }
      }
    }, 450);

    return () => {
      isCancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [draftValue, isLocationValue]);

  function resetFieldState() {
    setEditingField(null);
    setDraftValue("");
    setFieldError("");
    setSuggestions([]);
    setLoadingSuggestions(false);
    setAutocompleteError("");
    setLocationDraftPlaceId(String(link.placeId || ""));
    lastSuccessfulQueryRef.current = "";
  }

  function startEditing(field) {
    if (savingField || menuSaving) {
      return;
    }

    if (field === "value" && isShopPreview) {
      return;
    }

    setMenuOpen(false);
    setMenuError("");
    setFieldError("");
    setSuggestions([]);
    setAutocompleteError("");
    setLocationDraftPlaceId(String(link.placeId || ""));
    lastSuccessfulQueryRef.current = "";
    setEditingField(field);
    setDraftValue(field === "title" ? String(link.title || "") : primaryValue);
  }

  function cancelEditing() {
    if (savingField) {
      return;
    }

    resetFieldState();
  }

  async function commitPatch(
    patch,
    { source = "field", field = editingField, closeMenu = false } = {},
  ) {
    if (!hasPatchChanges(link, patch)) {
      if (source === "field") {
        resetFieldState();
      }

      if (closeMenu) {
        setMenuOpen(false);
        setMenuError("");
      }

      return true;
    }

    try {
      if (source === "field") {
        setSavingField(field);
        setFieldError("");
      } else {
        setMenuSaving(true);
        setMenuError("");
      }

      await onCommit(patch);

      if (source === "field") {
        resetFieldState();
      }

      if (closeMenu) {
        setMenuOpen(false);
        setMenuError("");
      }

      return true;
    } catch (error) {
      const message = error.message || "Não foi possível salvar o link.";

      if (source === "field") {
        setFieldError(message);
      } else {
        setMenuError(message);
      }

      return false;
    } finally {
      if (source === "field") {
        setSavingField(null);
      } else {
        setMenuSaving(false);
      }
    }
  }

  async function commitCurrentField(explicitPatch) {
    if (!editingField) {
      return;
    }

    const patch =
      explicitPatch ||
      buildFieldPatch(link, editingField, draftValue, locationDraftPlaceId);

    await commitPatch(patch, {
      source: "field",
      field: editingField,
    });
  }

  async function handleSelectSuggestion(suggestion) {
    const description = String(suggestion?.description || "").trim();
    const placeId = String(suggestion?.placeId || "").trim();

    setDraftValue(description);
    setLocationDraftPlaceId(placeId);
    setSuggestions([]);
    setAutocompleteError("");
    lastSuccessfulQueryRef.current = description;

    await commitCurrentField({
      address: description,
      placeId,
    });
  }

  function handleFieldInputChange(event) {
    const nextValue = event.target.value;
    setDraftValue(nextValue);

    if (isLocationValue) {
      setLocationDraftPlaceId("");
      setSuggestions([]);
      setAutocompleteError("");
      lastSuccessfulQueryRef.current = "";
    }
  }

  function handleFieldKeyDown(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      cancelEditing();
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      void commitCurrentField();
    }
  }

  function handleFieldBlur() {
    if (!editingField || savingField) {
      return;
    }

    void commitCurrentField();
  }

  async function handleTypeChange(event) {
    const nextType = event.target.value;
    await commitPatch(createTypeChangePatch(link, nextType), {
      source: "menu",
      closeMenu: true,
    });
  }

  async function handlePlatformChange(event) {
    await commitPatch(createPlatformChangePatch(link, event.target.value), {
      source: "menu",
      closeMenu: true,
    });
  }

  async function handlePixKeyTypeChange(event) {
    await commitPatch(
      {
        pixKeyType: normalizePixKeyType(event.target.value),
      },
      {
        source: "menu",
      },
    );
  }

  async function handleShowMapChange(nextChecked) {
    await commitPatch(
      {
        showMap: nextChecked,
      },
      {
        source: "menu",
      },
    );
  }

  return (
    <article
      ref={setRefs}
      className={`item-row item-row--sortable link-card${isDragging ? " is-dragging" : ""}${menuOpen ? " is-menu-open" : ""}${isHighlighted ? " is-highlighted" : ""}`}
      style={sortableStyle}
    >
      <button
        type="button"
        ref={setActivatorNodeRef}
        className={`item-row__drag-handle${isInteractionLocked ? " is-disabled" : ""}`}
        aria-label={`Reordenar ${link.title || "link"}`}
        aria-describedby={dragDescriptionId}
        disabled={isInteractionLocked}
        {...attributes}
        {...listeners}
      >
        <GripVertical size={18} aria-hidden="true" />
      </button>

      <div className="item-row__content">
        <div className="link-card__top">
          <div className="link-card__copy">
            <div className="link-card__field-row">
              {editingField === "title" ? (
                <div className="link-card__field-editor">
                  <Input
                    ref={inputRef}
                    className="link-card__inline-input"
                    value={draftValue}
                    onChange={handleFieldInputChange}
                    onKeyDown={handleFieldKeyDown}
                    onBlur={handleFieldBlur}
                    placeholder="Título"
                    aria-label="Editar título do link"
                    disabled={Boolean(savingField)}
                  />
                  {fieldError ? (
                    <span className="link-card__field-error">{fieldError}</span>
                  ) : null}
                </div>
              ) : (
                <>
                  <strong
                    className={`link-card__field-value link-card__field-value--title${link.title ? "" : " is-placeholder"}`}
                  >
                    {link.title || "Título"}
                  </strong>
                  <button
                    type="button"
                    className="link-card__field-action"
                    onClick={() => startEditing("title")}
                    aria-label={`Editar título de ${link.title || "link"}`}
                    disabled={Boolean(savingField || menuSaving)}
                  >
                    <Pencil size={14} aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            <div className="link-card__field-row link-card__field-row--value">
              {isShopPreview ? (
                <ShopPreviewGrid products={shopProducts} />
              ) : isPixLink ? (
                <div className="link-card__pix-key-row">
                  <label className="link-card__pix-type-select">
                    <span>Tipo da chave</span>
                    <select
                      className="ui-select"
                      value={pixKeyType}
                      onChange={handlePixKeyTypeChange}
                      aria-label="Tipo da chave PIX"
                      disabled={Boolean(menuSaving || savingField)}
                    >
                      {PIX_KEY_TYPE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  {editingField === "value" ? (
                    <div className="link-card__field-editor">
                      <Input
                        ref={inputRef}
                        className="link-card__inline-input"
                        value={draftValue}
                        onChange={handleFieldInputChange}
                        onKeyDown={handleFieldKeyDown}
                        onBlur={handleFieldBlur}
                        placeholder={primaryFieldPlaceholder}
                        aria-label={typeMeta.primaryFieldLabel}
                        disabled={Boolean(savingField)}
                      />
                      {fieldError ? (
                        <span className="link-card__field-error">{fieldError}</span>
                      ) : null}
                    </div>
                  ) : (
                    <div className="link-card__pix-key-display">
                      <span
                        className={`link-card__field-value${primaryValue ? "" : " is-placeholder"}`}
                      >
                        {primaryValue || primaryFieldPlaceholder}
                      </span>
                      <button
                        type="button"
                        className="link-card__field-action"
                        onClick={() => startEditing("value")}
                        aria-label={`Editar ${typeMeta.primaryFieldLabel.toLowerCase()} de ${link.title || typeMeta.label || "link"}`}
                        disabled={Boolean(savingField || menuSaving)}
                      >
                        <Pencil size={14} aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </div>
              ) : editingField === "value" ? (
                <div className="link-card__field-editor">
                  <Input
                    ref={inputRef}
                    className="link-card__inline-input"
                    value={draftValue}
                    onChange={handleFieldInputChange}
                    onKeyDown={handleFieldKeyDown}
                    onBlur={handleFieldBlur}
                    placeholder={primaryFieldPlaceholder}
                    aria-label={typeMeta.primaryFieldLabel}
                    disabled={Boolean(savingField)}
                  />
                  {loadingSuggestions ? (
                    <div className="item-row__helper">Buscando sugestões...</div>
                  ) : null}
                  {autocompleteError ? (
                    <div className="item-row__helper item-row__helper--error">
                      {autocompleteError}
                    </div>
                  ) : null}
                  {suggestions.length ? (
                      <div className="item-row__suggestions" role="listbox">
                        {suggestions.map((suggestion) => (
                          <button
                            key={suggestion.placeId || suggestion.description}
                            type="button"
                            className="item-row__suggestion"
                            role="option"
                            onMouseDown={(event) => {
                              event.preventDefault();
                              void handleSelectSuggestion(suggestion);
                          }}
                          disabled={Boolean(savingField)}
                        >
                          <strong>{suggestion.mainText || suggestion.description}</strong>
                          {suggestion.secondaryText ? (
                            <span>{suggestion.secondaryText}</span>
                          ) : (
                            <span>{suggestion.description}</span>
                          )}
                        </button>
                      ))}
                    </div>
                  ) : null}
                  {fieldError ? (
                    <span className="link-card__field-error">{fieldError}</span>
                  ) : null}
                </div>
              ) : (
                <>
                  <span
                    className={`link-card__field-value${primaryValue ? "" : " is-placeholder"}`}
                  >
                    {primaryValue || typeMeta.primaryFieldLabel}
                  </span>
                  <button
                    type="button"
                    className="link-card__field-action"
                    onClick={() => startEditing("value")}
                    aria-label={`Editar ${typeMeta.primaryFieldLabel.toLowerCase()} de ${link.title || typeMeta.label || "link"}`}
                    disabled={Boolean(savingField || menuSaving)}
                  >
                    <Pencil size={14} aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            {isPixLink ? <PixKeyPreview link={link} /> : null}
          </div>

          <div className="link-card__actions">
            <Switch
              checked={Boolean(link.isActive)}
              onChange={onToggle}
              ariaLabel={`Alterar visibilidade de ${link.title || "link"}`}
              disabled={Boolean(savingField || menuSaving)}
            />
            <button
              type="button"
              className="link-card__icon-action is-danger"
              onClick={onDelete}
              aria-label={`Excluir ${link.title || "link"}`}
              disabled={Boolean(savingField || menuSaving)}
            >
              <Trash2 size={16} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="link-card__footer">
          <div className="link-card__footer-main">
            <div className="link-card__meta-menu" ref={menuRef}>
            <button
              type="button"
              className={`link-card__meta-chip link-card__meta-button${menuOpen ? " is-open" : ""}`}
              onClick={() => {
                setMenuOpen((current) => !current);
                setMenuError("");
              }}
              disabled={isInteractionLocked}
            >
              <span className="link-card__meta-label">
                <Icon size={14} aria-hidden="true" />
                {typeMeta.label}
              </span>
              <ChevronDown size={14} aria-hidden="true" />
            </button>

            {menuOpen ? (
              <div className="link-card__popover">
                <label className="field">
                  <span>Tipo do link</span>
                  <select
                    className="ui-select"
                    value={link.type || "link"}
                    onChange={handleTypeChange}
                    aria-label="Tipo do link"
                    disabled={menuSaving}
                  >
                    {typeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                {link.type === "shop-preview" ? (
                  <div className="item-row__helper">
                    A prévia da loja usa automaticamente as imagens dos produtos ativos e leva para o catálogo público.
                  </div>
                ) : null}

                {link.type === "link" ? (
                  <label className="field">
                    <span>Plataforma</span>
                    <select
                      className="ui-select"
                      value={link.platform || ""}
                      onChange={handlePlatformChange}
                      aria-label="Plataforma do link"
                      disabled={menuSaving}
                    >
                      {PRIMARY_LINK_PLATFORM_OPTIONS.map((option) => (
                        <option key={option.value || "generic"} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                ) : null}

                {link.type === "pix" ? (
                  <>
                    <label className="field">
                      <span>Tipo da chave</span>
                      <select
                        className="ui-select"
                        value={normalizePixKeyType(link.pixKeyType)}
                        onChange={handlePixKeyTypeChange}
                        aria-label="Tipo da chave PIX"
                        disabled={menuSaving}
                      >
                        {PIX_KEY_TYPE_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <div className="item-row__helper">
                      O QR Code usa a chave PIX simples informada no campo do link.
                    </div>
                  </>
                ) : null}

                {menuError ? (
                  <span className="link-card__field-error">{menuError}</span>
                ) : null}
              </div>
            ) : null}
            </div>

            <button
              type="button"
              className={`link-card__insight-pill${isInsightOpen ? " is-open" : ""}`}
              aria-expanded={isInsightOpen}
              aria-controls={insightPanelId}
              onClick={onInsightToggle}
              disabled={Boolean(savingField || menuSaving)}
            >
              <BarChart3 size={14} aria-hidden="true" />
              <span>{formatClicksLabel(clickCount)}</span>
            </button>
          </div>

          {link.type === "location" ? (
            <div className="link-card__map-toggle">
              <Switch
                checked={Boolean(link.showMap)}
                onChange={(nextChecked) => {
                  void handleShowMapChange(nextChecked);
                }}
                label="Mostrar mapa"
                className="link-card__map-toggle-switch"
                disabled={Boolean(menuSaving || savingField)}
              />
            </div>
          ) : null}
        </div>

        {isInsightOpen ? (
          <div id={insightPanelId} className="link-card__insight-panel">
            <div className="link-card__insight-header">
              <strong>Insights</strong>
              <button
                type="button"
                className="link-card__insight-close"
                onClick={onInsightToggle}
                aria-label="Fechar insights do link"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>

            <div className="link-card__insight-toolbar">
              <label className="field link-card__insight-field">
                <span>Período</span>
                <select
                  className="ui-select"
                  value={insightRange}
                  onChange={(event) => onInsightRangeChange?.(event.target.value)}
                  aria-label="Selecionar período dos insights do link"
                  disabled={insightLoading}
                >
                  {INSIGHT_RANGE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {insightLoading ? (
              <div className="loading-state link-card__insight-state">Carregando insights...</div>
            ) : insightError ? (
              <div className="link-card__field-error">{insightError}</div>
            ) : insightData ? (
              <div className="link-card__insight-body">
                <p className="link-card__insight-highlight">
                  {getInsightHeadline(insightData?.lifetimeTotal)}
                </p>

                <LinkInsightChart items={insightData?.daily || []} />

                <div className="link-card__insight-table">
                  <div className="link-card__insight-table-header">
                    <span>Origem do clique</span>
                    <span>Tempo total</span>
                    <span>{getInsightRangeLabel(insightRange)}</span>
                  </div>

                  {visibleInsightRows.map((row) => (
                    <div key={row.label} className="link-card__insight-table-row">
                      <span>{row.label}</span>
                      <strong>{row.lifetime || 0}</strong>
                      <strong>{row.range || 0}</strong>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="empty-state link-card__insight-state">
                Ainda não há dados suficientes para este link.
              </div>
            )}
          </div>
        ) : null}
      </div>
    </article>
  );
}
