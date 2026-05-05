const BUTTON_THEME_DEFAULTS = {
  buttonStyle: "solid",
  buttonShadow: "none",
  buttonRadius: "round",
  buttonColor: "#0F172A",
  buttonTextColor: "#FFFFFF",
  fontPreset: "inter",
};

export const BUTTON_STYLE_OPTIONS = [
  { value: "solid", label: "Sólido", description: "CTA forte com glow base." },
  { value: "soft", label: "Soft", description: "Gradiente suave e brilho menor." },
  { value: "outline", label: "Outline", description: "Fundo translúcido sem glow base." },
  { value: "glass", label: "Glass", description: "Estrutura pronta para vidro." },
  { value: "metallic", label: "Metálico", description: "Estrutura pronta para metal." },
];

export const BUTTON_SHADOW_OPTIONS = [
  { value: "none", label: "None", description: "Sem camadas extras." },
  { value: "soft", label: "Soft", description: "Contorno leve com offset discreto." },
  { value: "strong", label: "Strong", description: "Contorno mais presente." },
  { value: "hard", label: "Hard", description: "Visual duro de cartaz." },
];

export const BUTTON_RADIUS_OPTIONS = [
  { value: "square", label: "Reta", description: "Borda baixa." },
  { value: "round", label: "Round", description: "Curva média." },
  { value: "pill", label: "Pill", description: "Curva máxima." },
];

const FONT_FAMILIES = {
  inter: "Inter, 'Segoe UI', sans-serif",
  manrope: "Manrope, 'Segoe UI', sans-serif",
  jakarta: "'Plus Jakarta Sans', 'Segoe UI', sans-serif",
  sora: "Sora, 'Segoe UI', sans-serif",
  editorial: "Georgia, 'Times New Roman', serif",
  playfair: "'Playfair Display', Georgia, serif",
  cormorant: "'Cormorant Garamond', Georgia, serif",
  bebas: "'Bebas Neue', Impact, sans-serif",
  caveat: "Caveat, 'Segoe Print', cursive",
};

const VALID_BUTTON_STYLES = new Set(BUTTON_STYLE_OPTIONS.map((option) => option.value));
const VALID_BUTTON_SHADOWS = new Set(BUTTON_SHADOW_OPTIONS.map((option) => option.value));
const VALID_BUTTON_RADII = new Set(BUTTON_RADIUS_OPTIONS.map((option) => option.value));
const VALID_FONT_PRESETS = new Set(Object.keys(FONT_FAMILIES));

const BUTTON_SHADOW_LAYERS = {
  none: [],
  soft: [
    "0 0 0 1px rgba(17,17,17,0.72)",
    "2px 2px 0 0 rgba(17,17,17,0.58)",
  ],
  strong: [
    "0 0 0 1px rgba(17,17,17,0.86)",
    "4px 4px 0 0 rgba(17,17,17,0.80)",
  ],
  hard: [
    "0 0 0 2px #171717",
    "6px 6px 0 0 #171717",
  ],
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function normalizeHexColor(value, fallback) {
  const normalized = String(value || "").trim();
  if (/^#[0-9a-f]{6}$/i.test(normalized)) return normalized;
  return fallback;
}

function hexToRgb(hex) {
  const safeHex = normalizeHexColor(hex, "#000000").replace("#", "");
  return {
    r: Number.parseInt(safeHex.slice(0, 2), 16),
    g: Number.parseInt(safeHex.slice(2, 4), 16),
    b: Number.parseInt(safeHex.slice(4, 6), 16),
  };
}

function rgbToHex({ r, g, b }) {
  return `#${[r, g, b]
    .map((part) => clamp(Math.round(part), 0, 255).toString(16).padStart(2, "0"))
    .join("")}`;
}

function mixColors(baseHex, mixHex, weight = 0.5) {
  const base = hexToRgb(baseHex);
  const mix = hexToRgb(mixHex);
  return rgbToHex({
    r: base.r + (mix.r - base.r) * weight,
    g: base.g + (mix.g - base.g) * weight,
    b: base.b + (mix.b - base.b) * weight,
  });
}

function alphaColor(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function isDarkColor(hex) {
  const { r, g, b } = hexToRgb(hex);
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance < 0.55;
}

export function getButtonThemeDefaults() {
  return { ...BUTTON_THEME_DEFAULTS };
}

export function normalizeButtonTheme(rawTheme = {}) {
  return {
    buttonStyle: VALID_BUTTON_STYLES.has(rawTheme.buttonStyle)
      ? rawTheme.buttonStyle
      : BUTTON_THEME_DEFAULTS.buttonStyle,
    buttonShadow: VALID_BUTTON_SHADOWS.has(rawTheme.buttonShadow)
      ? rawTheme.buttonShadow
      : BUTTON_THEME_DEFAULTS.buttonShadow,
    buttonRadius: VALID_BUTTON_RADII.has(rawTheme.buttonRadius)
      ? rawTheme.buttonRadius
      : BUTTON_THEME_DEFAULTS.buttonRadius,
    buttonColor: normalizeHexColor(rawTheme.buttonColor, BUTTON_THEME_DEFAULTS.buttonColor),
    buttonTextColor: normalizeHexColor(
      rawTheme.buttonTextColor,
      BUTTON_THEME_DEFAULTS.buttonTextColor,
    ),
    fontPreset: VALID_FONT_PRESETS.has(rawTheme.fontPreset)
      ? rawTheme.fontPreset
      : BUTTON_THEME_DEFAULTS.fontPreset,
  };
}

export function getButtonShadowLayers(buttonShadow = "none") {
  return BUTTON_SHADOW_LAYERS[buttonShadow] || BUTTON_SHADOW_LAYERS.none;
}

export function composeBoxShadow(baseShadow, extraLayers = []) {
  const layers = [
    String(baseShadow || "").trim(),
    ...extraLayers.map((layer) => String(layer || "").trim()),
  ].filter((layer) => layer && layer.toLowerCase() !== "none");

  return layers.length ? layers.join(", ") : "none";
}

export function applyButtonShadowStyle(style = {}, buttonShadow = "none") {
  return {
    ...style,
    boxShadow: composeBoxShadow(style.boxShadow, getButtonShadowLayers(buttonShadow)),
  };
}

function buildBaseGlow(buttonColor, intensity = "strong") {
  if (intensity === "none") return "none";
  if (intensity === "soft") {
    return `0 16px 34px -22px ${alphaColor(buttonColor, 0.28)}`;
  }
  return `0 20px 42px -20px ${alphaColor(buttonColor, 0.34)}`;
}

function buildPrimaryBaseStyle(design) {
  const buttonColor = design.buttonColor;
  const buttonTextColor = design.buttonTextColor;

  if (design.buttonStyle === "soft") {
    return {
      background: `linear-gradient(180deg, ${alphaColor(mixColors(buttonColor, "#ffffff", 0.22), 0.78)} 0%, ${alphaColor(buttonColor, 0.92)} 100%)`,
      border: `1px solid ${alphaColor(mixColors(buttonColor, "#ffffff", 0.28), 0.34)}`,
      color: buttonTextColor,
      boxShadow: buildBaseGlow(buttonColor, "soft"),
      fontFamily: FONT_FAMILIES[design.fontPreset] || FONT_FAMILIES.inter,
    };
  }

  if (design.buttonStyle === "outline") {
    return {
      background: alphaColor(buttonColor, 0.08),
      border: `1px solid ${alphaColor(buttonColor, 0.24)}`,
      color: isDarkColor(buttonColor) ? buttonColor : mixColors(buttonColor, "#ffffff", 0.1),
      boxShadow: "none",
      fontFamily: FONT_FAMILIES[design.fontPreset] || FONT_FAMILIES.inter,
    };
  }

  if (design.buttonStyle === "glass") {
    return {
      background: `linear-gradient(180deg, ${alphaColor(mixColors(buttonColor, "#ffffff", 0.34), 0.26)} 0%, ${alphaColor(buttonColor, 0.42)} 100%)`,
      border: `1px solid ${alphaColor(mixColors(buttonColor, "#ffffff", 0.58), 0.34)}`,
      color: buttonTextColor,
      boxShadow: buildBaseGlow(buttonColor, "soft"),
      fontFamily: FONT_FAMILIES[design.fontPreset] || FONT_FAMILIES.inter,
      backdropFilter: "blur(16px) saturate(1.06)",
      WebkitBackdropFilter: "blur(16px) saturate(1.06)",
    };
  }

  if (design.buttonStyle === "metallic") {
    return {
      background: `linear-gradient(135deg, ${mixColors(buttonColor, "#ffffff", 0.4)} 0%, ${mixColors(buttonColor, "#111827", 0.18)} 100%)`,
      border: `1px solid ${alphaColor(mixColors(buttonColor, "#ffffff", 0.26), 0.36)}`,
      color: buttonTextColor,
      boxShadow: buildBaseGlow(buttonColor, "strong"),
      fontFamily: FONT_FAMILIES[design.fontPreset] || FONT_FAMILIES.inter,
    };
  }

  return {
    background: `linear-gradient(135deg, ${mixColors(buttonColor, "#ffffff", 0.08)} 0%, ${buttonColor} 100%)`,
    border: `1px solid ${alphaColor(buttonColor, 0.24)}`,
    color: buttonTextColor,
    boxShadow: buildBaseGlow(buttonColor, "strong"),
    fontFamily: FONT_FAMILIES[design.fontPreset] || FONT_FAMILIES.inter,
  };
}

function buildSecondaryBaseStyle(design) {
  const baseColor = mixColors(design.buttonColor, "#ffffff", 0.14);
  const textColor = isDarkColor(design.buttonColor) ? "#F8FAFC" : design.buttonColor;

  if (design.buttonStyle === "soft") {
    return {
      background: `linear-gradient(180deg, ${alphaColor(baseColor, 0.18)} 0%, ${alphaColor(baseColor, 0.26)} 100%)`,
      border: `1px solid ${alphaColor(baseColor, 0.22)}`,
      color: textColor,
      boxShadow: buildBaseGlow(design.buttonColor, "soft"),
      fontFamily: FONT_FAMILIES[design.fontPreset] || FONT_FAMILIES.inter,
    };
  }

  if (design.buttonStyle === "outline") {
    return {
      background: alphaColor(design.buttonColor, 0.05),
      border: `1px solid ${alphaColor(design.buttonColor, 0.18)}`,
      color: textColor,
      boxShadow: "none",
      fontFamily: FONT_FAMILIES[design.fontPreset] || FONT_FAMILIES.inter,
    };
  }

  if (design.buttonStyle === "glass") {
    return {
      background: `linear-gradient(180deg, ${alphaColor(baseColor, 0.16)} 0%, ${alphaColor(mixColors(baseColor, "#ffffff", 0.18), 0.24)} 100%)`,
      border: `1px solid ${alphaColor(mixColors(baseColor, "#ffffff", 0.32), 0.24)}`,
      color: textColor,
      boxShadow: buildBaseGlow(design.buttonColor, "soft"),
      fontFamily: FONT_FAMILIES[design.fontPreset] || FONT_FAMILIES.inter,
      backdropFilter: "blur(14px) saturate(1.04)",
      WebkitBackdropFilter: "blur(14px) saturate(1.04)",
    };
  }

  if (design.buttonStyle === "metallic") {
    return {
      background: `linear-gradient(135deg, ${mixColors(baseColor, "#ffffff", 0.34)} 0%, ${mixColors(baseColor, "#111827", 0.16)} 100%)`,
      border: `1px solid ${alphaColor(mixColors(baseColor, "#ffffff", 0.26), 0.32)}`,
      color: textColor,
      boxShadow: buildBaseGlow(design.buttonColor, "soft"),
      fontFamily: FONT_FAMILIES[design.fontPreset] || FONT_FAMILIES.inter,
    };
  }

  return {
    background: `linear-gradient(135deg, ${mixColors(baseColor, "#ffffff", 0.12)} 0%, ${baseColor} 100%)`,
    border: `1px solid ${alphaColor(baseColor, 0.22)}`,
    color: textColor,
    boxShadow: buildBaseGlow(design.buttonColor, "soft"),
    fontFamily: FONT_FAMILIES[design.fontPreset] || FONT_FAMILIES.inter,
  };
}

export function buildPrimaryButtonStyle(rawDesign = {}) {
  const design = normalizeButtonTheme(rawDesign);
  return applyButtonShadowStyle(buildPrimaryBaseStyle(design), design.buttonShadow);
}

export function buildSecondaryButtonStyle(rawDesign = {}) {
  const design = normalizeButtonTheme(rawDesign);
  return applyButtonShadowStyle(buildSecondaryBaseStyle(design), design.buttonShadow);
}

function joinClassNames(...parts) {
  return parts.filter(Boolean).join(" ");
}

function getButtonRadiusClass(buttonRadius = "round") {
  if (buttonRadius === "square") return "public-page__cta--radius-square";
  if (buttonRadius === "pill") return "public-page__cta--radius-pill";
  return "public-page__cta--radius-round";
}

export function getButtonRadiusClassName(rawTheme = {}) {
  const design = normalizeButtonTheme(rawTheme?.design || rawTheme);
  return getButtonRadiusClass(design.buttonRadius);
}

export function getButtonProps(rawTheme = {}, variant = "primary", className = "") {
  const design = normalizeButtonTheme(rawTheme?.design || rawTheme);
  const style =
    variant === "secondary"
      ? buildSecondaryButtonStyle(design)
      : buildPrimaryButtonStyle(design);

  return {
    className: joinClassNames(
      "public-page__cta",
      "public-page__cta--theme",
      getButtonRadiusClass(design.buttonRadius),
      className,
    ),
    style,
  };
}

export function getButtonPreviewProps(rawTheme = {}, variant = "primary", className = "") {
  const design = normalizeButtonTheme(rawTheme?.design || rawTheme);
  const style =
    variant === "secondary"
      ? buildSecondaryButtonStyle(design)
      : buildPrimaryButtonStyle(design);

  return {
    className: joinClassNames(
      "design-theme-button",
      getButtonRadiusClass(design.buttonRadius),
      className,
    ),
    style,
  };
}
