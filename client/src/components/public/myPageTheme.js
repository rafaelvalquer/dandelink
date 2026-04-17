import {
  Link2,
  MapPin,
  ShoppingBag,
  Store,
} from "lucide-react";
import {
  FaFacebookF,
  FaGlobe,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa6";
import {
  buildPrimaryButtonStyle,
  buildSecondaryButtonStyle,
  BUTTON_RADIUS_OPTIONS,
  BUTTON_SHADOW_OPTIONS,
  BUTTON_STYLE_OPTIONS,
  getButtonThemeDefaults,
  normalizeButtonTheme,
} from "./buttonTheme.js";

export const MY_PAGE_THEME_DEFAULTS = {
  themePreset: "clean_light",
  brandLayout: "classic",
  backgroundStyle: "fill",
  backgroundGradientDirection: "linear_up",
  backgroundPatternVariant: "grid",
  surfaceStyle: "soft",
  surfacePatternVariant: "grid",
  surfaceColor: "#ffffff",
  ...getButtonThemeDefaults(),
  pageTextColor: "#64748b",
  titleTextColor: "#0f172a",
  primaryButtonsLayout: "stack",
  secondaryLinksStyle: "icon_text",
  secondaryLinksIconLayout: "brand_badge",
  secondaryLinksSize: "medium",
  secondaryLinksAlign: "center",
  animationPreset: "subtle",
  backgroundColor: "#e2e8f0",
  cardColor: "#ffffff",
  textColor: "#64748b",
};

const THEME_PRESET_DEFINITIONS = [
  {
    value: "clean_light",
    label: "Clean Light",
    description: "Claro, equilibrado e elegante.",
    previewVariant: "airy",
    previewArtwork: "paper",
    previewLabel: "Clean Light",
    previewTitle: "Minha Pagina",
    previewCtaLabel: "Ver layout",
    theme: {
      themePreset: "clean_light",
      brandLayout: "classic",
      backgroundStyle: "fill",
      backgroundGradientDirection: "linear_up",
      backgroundPatternVariant: "grid",
      surfaceStyle: "soft",
      surfacePatternVariant: "grid",
      surfaceColor: "#ffffff",
      buttonColor: "#475569",
      buttonTextColor: "#ffffff",
      pageTextColor: "#64748b",
      titleTextColor: "#0f172a",
      fontPreset: "inter",
      buttonStyle: "solid",
      buttonShadow: "soft",
      buttonRadius: "round",
      primaryButtonsLayout: "stack",
      secondaryLinksStyle: "icon_text",
      secondaryLinksIconLayout: "brand_badge",
      secondaryLinksSize: "medium",
      secondaryLinksAlign: "center",
      animationPreset: "subtle",
      backgroundColor: "#e2e8f0",
    },
  },
  {
    value: "premium_dark",
    label: "Premium Dark",
    description: "Escuro premium com brilho sutil.",
    previewVariant: "nocturne",
    previewArtwork: "flare",
    previewLabel: "Premium Dark",
    previewTitle: "Minha Pagina",
    previewCtaLabel: "Ver layout",
    theme: {
      themePreset: "premium_dark",
      brandLayout: "classic",
      backgroundStyle: "gradient",
      backgroundGradientDirection: "linear_down",
      backgroundPatternVariant: "grid",
      surfaceStyle: "glass",
      surfacePatternVariant: "grid",
      surfaceColor: "#0f172a",
      buttonColor: "#14b8a6",
      buttonTextColor: "#ecfeff",
      pageTextColor: "#9fb0c8",
      titleTextColor: "#f8fafc",
      fontPreset: "manrope",
      buttonStyle: "solid",
      buttonShadow: "strong",
      buttonRadius: "round",
      primaryButtonsLayout: "cards",
      secondaryLinksStyle: "icon_text",
      secondaryLinksIconLayout: "brand_badge",
      secondaryLinksSize: "medium",
      secondaryLinksAlign: "center",
      animationPreset: "strong",
      backgroundColor: "#09111f",
    },
  },
  {
    value: "dental_clinic",
    label: "Dental Clinic",
    description: "Visual limpo e preciso para servicos.",
    previewVariant: "clinic",
    previewArtwork: "mist",
    previewLabel: "Dental Clinic",
    previewTitle: "Minha Pagina",
    previewCtaLabel: "Ver layout",
    theme: {
      themePreset: "dental_clinic",
      brandLayout: "classic",
      backgroundStyle: "gradient",
      backgroundGradientDirection: "radial",
      backgroundPatternVariant: "grid",
      surfaceStyle: "solid",
      surfacePatternVariant: "grid",
      surfaceColor: "#ffffff",
      buttonColor: "#3e8fb6",
      buttonTextColor: "#ffffff",
      pageTextColor: "#566671",
      titleTextColor: "#173446",
      fontPreset: "jakarta",
      buttonStyle: "solid",
      buttonShadow: "soft",
      buttonRadius: "round",
      primaryButtonsLayout: "stack",
      secondaryLinksStyle: "icon_text",
      secondaryLinksIconLayout: "plain",
      secondaryLinksSize: "medium",
      secondaryLinksAlign: "center",
      animationPreset: "subtle",
      backgroundColor: "#dfeff7",
    },
  },
  {
    value: "barber_gold",
    label: "Barber Gold",
    description: "Escuro classico com assinatura dourada.",
    previewVariant: "baroque",
    previewArtwork: "spotlight",
    previewLabel: "Barber Gold",
    previewTitle: "Minha Pagina",
    previewCtaLabel: "Ver layout",
    theme: {
      themePreset: "barber_gold",
      brandLayout: "classic",
      backgroundStyle: "fill",
      backgroundGradientDirection: "linear_up",
      backgroundPatternVariant: "cross",
      surfaceStyle: "solid",
      surfacePatternVariant: "lines",
      surfaceColor: "#17120a",
      buttonColor: "#c89b3c",
      buttonTextColor: "#17120a",
      pageTextColor: "#c9bfaf",
      titleTextColor: "#f7eedc",
      fontPreset: "editorial",
      buttonStyle: "metallic",
      buttonShadow: "strong",
      buttonRadius: "round",
      primaryButtonsLayout: "stack",
      secondaryLinksStyle: "icon_text",
      secondaryLinksIconLayout: "plain",
      secondaryLinksSize: "small",
      secondaryLinksAlign: "center",
      animationPreset: "impact",
      backgroundColor: "#0c0a09",
    },
  },
  {
    value: "creator_gradient",
    label: "Creator Gradient",
    description: "Pagina vibrante com energia social.",
    previewVariant: "spectrum",
    previewArtwork: "waves",
    previewLabel: "Creator Gradient",
    previewTitle: "Minha Pagina",
    previewCtaLabel: "Ver layout",
    theme: {
      themePreset: "creator_gradient",
      brandLayout: "hero",
      backgroundStyle: "gradient",
      backgroundGradientDirection: "radial",
      backgroundPatternVariant: "dots",
      surfaceStyle: "glass",
      surfacePatternVariant: "dots",
      surfaceColor: "#ffffff",
      buttonColor: "#7c3aed",
      buttonTextColor: "#ffffff",
      pageTextColor: "#6e5b7d",
      titleTextColor: "#2a1638",
      fontPreset: "jakarta",
      buttonStyle: "metallic",
      buttonShadow: "strong",
      buttonRadius: "pill",
      primaryButtonsLayout: "cards",
      secondaryLinksStyle: "icon_text",
      secondaryLinksIconLayout: "brand_badge",
      secondaryLinksSize: "medium",
      secondaryLinksAlign: "center",
      animationPreset: "impact",
      backgroundColor: "#f6d6ff",
    },
  },
  {
    value: "business_storefront",
    label: "Business Storefront",
    description: "Vitrine comercial leve e direta.",
    previewVariant: "market",
    previewArtwork: "grid",
    previewLabel: "Business Storefront",
    previewTitle: "Minha Pagina",
    previewCtaLabel: "Ver layout",
    theme: {
      themePreset: "business_storefront",
      brandLayout: "classic",
      backgroundStyle: "blur",
      backgroundGradientDirection: "linear_up",
      backgroundPatternVariant: "grid",
      surfaceStyle: "soft",
      surfacePatternVariant: "grid",
      surfaceColor: "#ffffff",
      buttonColor: "#059669",
      buttonTextColor: "#f0fdfa",
      pageTextColor: "#4b5563",
      titleTextColor: "#0f172a",
      fontPreset: "manrope",
      buttonStyle: "soft",
      buttonShadow: "soft",
      buttonRadius: "round",
      primaryButtonsLayout: "minimal",
      secondaryLinksStyle: "icon_text",
      secondaryLinksIconLayout: "brand_badge",
      secondaryLinksSize: "small",
      secondaryLinksAlign: "left",
      animationPreset: "subtle",
      backgroundColor: "#d7f5ee",
    },
  },
  {
    value: "nutri_fresh",
    label: "Nutri Fresh",
    description: "Saude natural com verde suave e leitura clean.",
    previewVariant: "airy",
    previewArtwork: "mist",
    previewLabel: "Nutri Fresh",
    previewTitle: "Minha Pagina",
    previewCtaLabel: "Ver layout",
    theme: {
      themePreset: "nutri_fresh",
      brandLayout: "classic",
      backgroundStyle: "gradient",
      backgroundGradientDirection: "linear_down",
      backgroundPatternVariant: "grid",
      surfaceStyle: "soft",
      surfacePatternVariant: "grid",
      surfaceColor: "#fff9ef",
      buttonColor: "#7e9453",
      buttonTextColor: "#f8f5ee",
      pageTextColor: "#5c6649",
      titleTextColor: "#2f4529",
      fontPreset: "jakarta",
      buttonStyle: "soft",
      buttonShadow: "soft",
      buttonRadius: "round",
      primaryButtonsLayout: "stack",
      secondaryLinksStyle: "text",
      secondaryLinksIconLayout: "brand_badge",
      secondaryLinksSize: "medium",
      secondaryLinksAlign: "center",
      animationPreset: "subtle",
      backgroundColor: "#edf3e1",
    },
  },
  {
    value: "pastry_atelier",
    label: "Pastry Atelier",
    description: "Confeitaria delicada com clima artesanal e premium.",
    previewVariant: "airy",
    previewArtwork: "paper",
    previewLabel: "Pastry Atelier",
    previewTitle: "Minha Pagina",
    previewCtaLabel: "Ver layout",
    theme: {
      themePreset: "pastry_atelier",
      brandLayout: "classic",
      backgroundStyle: "fill",
      backgroundGradientDirection: "linear_up",
      backgroundPatternVariant: "dots",
      surfaceStyle: "soft",
      surfacePatternVariant: "dots",
      surfaceColor: "#fff7f1",
      buttonColor: "#b76e79",
      buttonTextColor: "#fffdf8",
      pageTextColor: "#7b5e57",
      titleTextColor: "#5a342f",
      fontPreset: "editorial",
      buttonStyle: "soft",
      buttonShadow: "none",
      buttonRadius: "pill",
      primaryButtonsLayout: "stack",
      secondaryLinksStyle: "icon_text",
      secondaryLinksIconLayout: "brand_badge",
      secondaryLinksSize: "small",
      secondaryLinksAlign: "center",
      animationPreset: "subtle",
      backgroundColor: "#fde7dd",
    },
  },
  {
    value: "aesthetic_glow",
    label: "Aesthetic Glow",
    description: "Estetica sofisticada com nude quente e brilho leve.",
    previewVariant: "spectrum",
    previewArtwork: "mist",
    previewLabel: "Aesthetic Glow",
    previewTitle: "Minha Pagina",
    previewCtaLabel: "Ver layout",
    theme: {
      themePreset: "aesthetic_glow",
      brandLayout: "hero",
      backgroundStyle: "gradient",
      backgroundGradientDirection: "radial",
      backgroundPatternVariant: "dots",
      surfaceStyle: "glass",
      surfacePatternVariant: "dots",
      surfaceColor: "#fff7f3",
      buttonColor: "#d48c7f",
      buttonTextColor: "#fffdf9",
      pageTextColor: "#8b6a64",
      titleTextColor: "#4b2f31",
      fontPreset: "jakarta",
      buttonStyle: "glass",
      buttonShadow: "soft",
      buttonRadius: "pill",
      primaryButtonsLayout: "cards",
      secondaryLinksStyle: "icon_text",
      secondaryLinksIconLayout: "brand_badge",
      secondaryLinksSize: "medium",
      secondaryLinksAlign: "center",
      animationPreset: "strong",
      backgroundColor: "#f8ddd5",
    },
  },
  {
    value: "legal_navy",
    label: "Legal Navy",
    description: "Advocacia sobria com marinho premium e assinatura classica.",
    previewVariant: "nocturne",
    previewArtwork: "paper",
    previewLabel: "Legal Navy",
    previewTitle: "Minha Pagina",
    previewCtaLabel: "Ver layout",
    theme: {
      themePreset: "legal_navy",
      brandLayout: "classic",
      backgroundStyle: "fill",
      backgroundGradientDirection: "linear_up",
      backgroundPatternVariant: "grid",
      surfaceStyle: "solid",
      surfacePatternVariant: "lines",
      surfaceColor: "#111827",
      buttonColor: "#1d4ed8",
      buttonTextColor: "#eff6ff",
      pageTextColor: "#9caec7",
      titleTextColor: "#f8fafc",
      fontPreset: "editorial",
      buttonStyle: "outline",
      buttonShadow: "strong",
      buttonRadius: "round",
      primaryButtonsLayout: "stack",
      secondaryLinksStyle: "text",
      secondaryLinksIconLayout: "plain",
      secondaryLinksSize: "small",
      secondaryLinksAlign: "center",
      animationPreset: "subtle",
      backgroundColor: "#0f172a",
    },
  },
  {
    value: "fitness_charge",
    label: "Fitness Charge",
    description: "Academia intensa com energia lime e foco em acao.",
    previewVariant: "market",
    previewArtwork: "grid",
    previewLabel: "Fitness Charge",
    previewTitle: "Minha Pagina",
    previewCtaLabel: "Ver layout",
    theme: {
      themePreset: "fitness_charge",
      brandLayout: "hero",
      backgroundStyle: "blur",
      backgroundGradientDirection: "linear_up",
      backgroundPatternVariant: "cross",
      surfaceStyle: "solid",
      surfacePatternVariant: "lines",
      surfaceColor: "#111111",
      buttonColor: "#a3e635",
      buttonTextColor: "#111111",
      pageTextColor: "#d4d4d8",
      titleTextColor: "#fafafa",
      fontPreset: "manrope",
      buttonStyle: "solid",
      buttonShadow: "hard",
      buttonRadius: "pill",
      primaryButtonsLayout: "cards",
      secondaryLinksStyle: "icon",
      secondaryLinksIconLayout: "plain",
      secondaryLinksSize: "small",
      secondaryLinksAlign: "center",
      animationPreset: "impact",
      backgroundColor: "#050505",
    },
  },
  {
    value: "realty_luxe",
    label: "Realty Luxe",
    description: "Imobiliario elegante com areia, grafite e luxo discreto.",
    previewVariant: "baroque",
    previewArtwork: "spotlight",
    previewLabel: "Realty Luxe",
    previewTitle: "Minha Pagina",
    previewCtaLabel: "Ver layout",
    theme: {
      themePreset: "realty_luxe",
      brandLayout: "classic",
      backgroundStyle: "fill",
      backgroundGradientDirection: "linear_up",
      backgroundPatternVariant: "grid",
      surfaceStyle: "solid",
      surfacePatternVariant: "grid",
      surfaceColor: "#faf7f2",
      buttonColor: "#8b6f47",
      buttonTextColor: "#fffdf9",
      pageTextColor: "#786454",
      titleTextColor: "#2f2117",
      fontPreset: "editorial",
      buttonStyle: "metallic",
      buttonShadow: "soft",
      buttonRadius: "round",
      primaryButtonsLayout: "stack",
      secondaryLinksStyle: "text",
      secondaryLinksIconLayout: "plain",
      secondaryLinksSize: "small",
      secondaryLinksAlign: "left",
      animationPreset: "subtle",
      backgroundColor: "#efe5d6",
    },
  },
  {
    value: "kids_care",
    label: "Kids Care",
    description: "Infantil acolhedor com tons leves e leitura amigavel.",
    previewVariant: "clinic",
    previewArtwork: "waves",
    previewLabel: "Kids Care",
    previewTitle: "Minha Pagina",
    previewCtaLabel: "Ver layout",
    theme: {
      themePreset: "kids_care",
      brandLayout: "classic",
      backgroundStyle: "gradient",
      backgroundGradientDirection: "radial",
      backgroundPatternVariant: "dots",
      surfaceStyle: "soft",
      surfacePatternVariant: "dots",
      surfaceColor: "#fffdfc",
      buttonColor: "#60a5fa",
      buttonTextColor: "#ffffff",
      pageTextColor: "#6b7280",
      titleTextColor: "#1f3b63",
      fontPreset: "jakarta",
      buttonStyle: "soft",
      buttonShadow: "none",
      buttonRadius: "pill",
      primaryButtonsLayout: "stack",
      secondaryLinksStyle: "icon_text",
      secondaryLinksIconLayout: "brand_badge",
      secondaryLinksSize: "medium",
      secondaryLinksAlign: "center",
      animationPreset: "subtle",
      backgroundColor: "#dff1ff",
    },
  },
  {
    value: "editorial_luxury",
    label: "Editorial Luxury",
    description: "Marca premium e refinada.",
    previewVariant: "baroque",
    previewArtwork: "paper",
    previewLabel: "Editorial Luxury",
    previewTitle: "Minha Pagina",
    previewCtaLabel: "Ver layout",
    theme: {
      themePreset: "editorial_luxury",
      brandLayout: "classic",
      backgroundStyle: "fill",
      backgroundGradientDirection: "linear_up",
      backgroundPatternVariant: "dots",
      surfaceStyle: "outline",
      surfacePatternVariant: "grid",
      surfaceColor: "#fffaf5",
      buttonColor: "#7c2d12",
      buttonTextColor: "#fffdf7",
      pageTextColor: "#786454",
      titleTextColor: "#2f2117",
      fontPreset: "editorial",
      buttonStyle: "outline",
      buttonShadow: "soft",
      buttonRadius: "pill",
      primaryButtonsLayout: "minimal",
      secondaryLinksStyle: "text",
      secondaryLinksIconLayout: "plain",
      secondaryLinksSize: "small",
      secondaryLinksAlign: "center",
      animationPreset: "subtle",
      backgroundColor: "#f4e7d8",
    },
  },
  {
    value: "twilight",
    label: "Twilight",
    description: "Roxo noturno sofisticado.",
    previewVariant: "nocturne",
    previewArtwork: "flare",
    previewLabel: "Twilight",
    previewTitle: "Minha Pagina",
    previewCtaLabel: "Ver layout",
    theme: {
      themePreset: "twilight",
      brandLayout: "hero",
      backgroundStyle: "gradient",
      backgroundGradientDirection: "linear_down",
      backgroundPatternVariant: "cross",
      surfaceStyle: "glass",
      surfacePatternVariant: "dots",
      surfaceColor: "#1f1634",
      buttonColor: "#8b5cf6",
      buttonTextColor: "#f5f3ff",
      pageTextColor: "#c4b5fd",
      titleTextColor: "#faf5ff",
      fontPreset: "jakarta",
      buttonStyle: "glass",
      buttonShadow: "strong",
      buttonRadius: "round",
      primaryButtonsLayout: "cards",
      secondaryLinksStyle: "icon_text",
      secondaryLinksIconLayout: "brand_badge",
      secondaryLinksSize: "medium",
      secondaryLinksAlign: "center",
      animationPreset: "strong",
      backgroundColor: "#130d25",
    },
  },
  {
    value: "midnight_prism",
    label: "Midnight Prism",
    description: "Escuro premium com brilho neon.",
    previewVariant: "spectrum",
    previewArtwork: "flare",
    previewLabel: "Midnight Prism",
    previewTitle: "Minha Pagina",
    previewCtaLabel: "Ver layout",
    theme: {
      themePreset: "midnight_prism",
      brandLayout: "hero",
      backgroundStyle: "blur",
      backgroundGradientDirection: "radial",
      backgroundPatternVariant: "dots",
      surfaceStyle: "glass",
      surfacePatternVariant: "dots",
      surfaceColor: "#0f172a",
      buttonColor: "#22d3ee",
      buttonTextColor: "#ecfeff",
      pageTextColor: "#a5f3fc",
      titleTextColor: "#f8fafc",
      fontPreset: "manrope",
      buttonStyle: "solid",
      buttonShadow: "strong",
      buttonRadius: "pill",
      primaryButtonsLayout: "cards",
      secondaryLinksStyle: "icon",
      secondaryLinksIconLayout: "brand_badge",
      secondaryLinksSize: "small",
      secondaryLinksAlign: "center",
      animationPreset: "impact",
      backgroundColor: "#020617",
    },
  },
  {
    value: "air",
    label: "Air",
    description: "Claro, leve e arejado.",
    previewVariant: "airy",
    previewArtwork: "mist",
    previewLabel: "Air",
    previewTitle: "Minha Pagina",
    previewCtaLabel: "Ver layout",
    theme: {
      themePreset: "air",
      brandLayout: "classic",
      backgroundStyle: "fill",
      backgroundGradientDirection: "linear_up",
      backgroundPatternVariant: "grid",
      surfaceStyle: "glass",
      surfacePatternVariant: "grid",
      surfaceColor: "#ffffff",
      buttonColor: "#38bdf8",
      buttonTextColor: "#ffffff",
      pageTextColor: "#64748b",
      titleTextColor: "#0f172a",
      fontPreset: "inter",
      buttonStyle: "soft",
      buttonShadow: "none",
      buttonRadius: "pill",
      primaryButtonsLayout: "minimal",
      secondaryLinksStyle: "text",
      secondaryLinksIconLayout: "plain",
      secondaryLinksSize: "small",
      secondaryLinksAlign: "center",
      animationPreset: "subtle",
      backgroundColor: "#eef8ff",
    },
  },
  {
    value: "agate",
    label: "Agate",
    description: "Mineral moderno e elegante.",
    previewVariant: "market",
    previewArtwork: "grid",
    previewLabel: "Agate",
    previewTitle: "Minha Pagina",
    previewCtaLabel: "Ver layout",
    theme: {
      themePreset: "agate",
      brandLayout: "classic",
      backgroundStyle: "pattern",
      backgroundGradientDirection: "linear_up",
      backgroundPatternVariant: "cross",
      surfaceStyle: "pattern",
      surfacePatternVariant: "lines",
      surfaceColor: "#f6f8fb",
      buttonColor: "#4f46e5",
      buttonTextColor: "#ffffff",
      pageTextColor: "#546274",
      titleTextColor: "#1e293b",
      fontPreset: "manrope",
      buttonStyle: "solid",
      buttonShadow: "soft",
      buttonRadius: "round",
      primaryButtonsLayout: "minimal",
      secondaryLinksStyle: "icon_text",
      secondaryLinksIconLayout: "plain",
      secondaryLinksSize: "small",
      secondaryLinksAlign: "left",
      animationPreset: "subtle",
      backgroundColor: "#dfe7f4",
    },
  },
];

export const MY_PAGE_THEME_PRESET_OPTIONS = THEME_PRESET_DEFINITIONS.map(
  ({ theme, ...option }) => option,
);

export const MY_PAGE_BRAND_LAYOUT_OPTIONS = [
  {
    value: "classic",
    label: "Classico",
    description: "Avatar em destaque no topo.",
  },
  {
    value: "hero",
    label: "Hero",
    description: "Usa o avatar como destaque de capa.",
  },
];

export const MY_PAGE_BACKGROUND_STYLE_OPTIONS = [
  { value: "fill", label: "Fill", description: "Cor solida na pagina inteira." },
  { value: "gradient", label: "Gradient", description: "Transicao da cor base." },
  { value: "blur", label: "Blur", description: "Blobs e glow macio." },
  { value: "pattern", label: "Pattern", description: "Textura com desenho leve." },
];

export const MY_PAGE_BACKGROUND_GRADIENT_DIRECTION_OPTIONS = [
  { value: "linear_up", label: "Vertical", description: "Luz subindo pela pagina." },
  { value: "linear_down", label: "Invertido", description: "Luz descendo do topo." },
  { value: "radial", label: "Radial", description: "Foco no topo com abertura central." },
];

export const MY_PAGE_BACKGROUND_PATTERN_VARIANT_OPTIONS = [
  { value: "grid", label: "Grid", description: "Malha geometrica leve." },
  { value: "dots", label: "Dots", description: "Pontos discretos e editoriais." },
  { value: "cross", label: "Cross", description: "Linhas cruzadas com cara tecnica." },
];

export const MY_PAGE_SURFACE_STYLE_OPTIONS = [
  { value: "solid", label: "Solido", description: "Container opaco e direto." },
  { value: "soft", label: "Soft", description: "Camada suave e elegante." },
  { value: "glass", label: "Glass", description: "Translucido com blur e brilho leve." },
  { value: "outline", label: "Outline", description: "Quase transparente com borda forte." },
  { value: "blur", label: "Blur", description: "Camada macia com blur sutil no container." },
  { value: "pattern", label: "Pattern", description: "Textura aplicada so na superficie." },
];

export const MY_PAGE_SURFACE_PATTERN_VARIANT_OPTIONS = [
  { value: "grid", label: "Grid", description: "Grade leve na superficie." },
  { value: "lines", label: "Lines", description: "Listras discretas no container." },
  { value: "dots", label: "Dots", description: "Pontos finos no plano frontal." },
];

export const MY_PAGE_FONT_PRESET_OPTIONS = [
  { value: "inter", label: "Inter" },
  { value: "manrope", label: "Manrope" },
  { value: "jakarta", label: "Jakarta" },
  { value: "editorial", label: "Editorial" },
];

export const MY_PAGE_BUTTON_STYLE_OPTIONS = [
  ...BUTTON_STYLE_OPTIONS,
];

export const MY_PAGE_BUTTON_SHADOW_OPTIONS = [
  ...BUTTON_SHADOW_OPTIONS,
];

export const MY_PAGE_BUTTON_RADIUS_OPTIONS = [
  ...BUTTON_RADIUS_OPTIONS,
];

export const MY_PAGE_PRIMARY_BUTTON_LAYOUT_OPTIONS = [
  { value: "stack", label: "Stack", description: "Pilha vertical classica e equilibrada." },
  { value: "cards", label: "Cards", description: "CTAs mais altos e com hierarquia mais forte." },
  { value: "minimal", label: "Minimal", description: "Mais leve, editorial e objetivo." },
];

export const MY_PAGE_SECONDARY_LINK_STYLE_OPTIONS = [
  { value: "text", label: "Texto" },
  { value: "icon", label: "Icone" },
  { value: "icon_text", label: "Icone + texto" },
];

export const MY_PAGE_SECONDARY_LINK_ICON_LAYOUT_OPTIONS = [
  { value: "plain", label: "React Icons", description: "Icone simples no estilo anterior." },
  { value: "brand_badge", label: "Badge oficial", description: "Usa o badge colorido da rede." },
];

export const MY_PAGE_SECONDARY_LINK_SIZE_OPTIONS = [
  { value: "small", label: "Pequeno", description: "Chip mais compacto." },
  { value: "medium", label: "Medio", description: "Tamanho padrao." },
];

export const MY_PAGE_SECONDARY_LINK_ALIGN_OPTIONS = [
  { value: "left", label: "Esquerda", description: "Agrupa as redes a esquerda." },
  { value: "center", label: "Centro", description: "Mantem a composicao centralizada." },
  { value: "right", label: "Direita", description: "Empurra os chips para a direita." },
];

export const MY_PAGE_ANIMATION_PRESET_OPTIONS = [
  { value: "subtle", label: "Suave", description: "Entrada leve e refinada." },
  { value: "strong", label: "Marcante", description: "Camadas com mais deslocamento visual." },
  { value: "impact", label: "Impacto", description: "CTAs entram da direita com mais presenca." },
  { value: "off", label: "Desligada", description: "Composicao estatica e direta." },
];

const PRESET_TOKENS = Object.fromEntries(
  THEME_PRESET_DEFINITIONS.map((preset) => [preset.value, preset.theme]),
);

const FONT_FAMILIES = {
  inter: "Inter, 'Segoe UI', sans-serif",
  manrope: "Manrope, 'Segoe UI', sans-serif",
  jakarta: "'Plus Jakarta Sans', 'Segoe UI', sans-serif",
  editorial: "Georgia, 'Times New Roman', serif",
};

const LEGACY_RADIUS_MAP = {
  "rounded-soft": "round",
  "rounded-full": "pill",
  "square-soft": "square",
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

function resolveLegacyRadius(buttonStyle) {
  return LEGACY_RADIUS_MAP[buttonStyle] || null;
}

export function getMyPageThemePresetOption(themePreset) {
  return (
    THEME_PRESET_DEFINITIONS.find((preset) => preset.value === themePreset) ||
    THEME_PRESET_DEFINITIONS[0]
  );
}

export function getMyPageThemePresetValues(themePreset) {
  return { ...getMyPageThemePresetOption(themePreset).theme };
}

function getPresetTokens(themePreset) {
  return getMyPageThemePresetValues(themePreset);
}

function resolveBackgroundPattern(design, colors) {
  const dark = isDarkColor(colors.backgroundColor);
  const lineColor = alphaColor(colors.buttonColor, dark ? 0.2 : 0.1);
  const dotColor = alphaColor(colors.titleTextColor, dark ? 0.18 : 0.08);

  if (design.backgroundPatternVariant === "dots") {
    return {
      layer: `radial-gradient(circle at 1px 1px, ${dotColor} 1.1px, transparent 1.2px)`,
      size: "18px 18px",
    };
  }

  if (design.backgroundPatternVariant === "cross") {
    return {
      layer: [
        `linear-gradient(${lineColor} 1px, transparent 1px)`,
        `linear-gradient(90deg, ${lineColor} 1px, transparent 1px)`,
      ].join(", "),
      size: "28px 28px",
    };
  }

  return {
    layer: [
      `linear-gradient(${lineColor} 1px, transparent 1px)`,
      `linear-gradient(90deg, ${lineColor} 1px, transparent 1px)`,
      `radial-gradient(circle at 1px 1px, ${dotColor} 1px, transparent 1.1px)`,
    ].join(", "),
    size: "24px 24px",
  };
}

function buildBackground(design, colors) {
  if (design.backgroundStyle === "gradient") {
    if (design.backgroundGradientDirection === "linear_down") {
      return {
        background: `linear-gradient(180deg, ${mixColors(colors.backgroundColor, "#ffffff", 0.56)} 0%, ${colors.backgroundColor} 100%)`,
        backgroundSize: "auto",
      };
    }

    if (design.backgroundGradientDirection === "radial") {
      return {
        background: `radial-gradient(circle at top, ${mixColors(colors.backgroundColor, "#ffffff", 0.62)} 0%, ${colors.backgroundColor} 72%)`,
        backgroundSize: "auto",
      };
    }

    return {
      background: `linear-gradient(180deg, ${colors.backgroundColor} 0%, ${mixColors(colors.backgroundColor, "#ffffff", 0.52)} 100%)`,
      backgroundSize: "auto",
    };
  }

  if (design.backgroundStyle === "blur") {
    return {
      background: [
        `radial-gradient(circle at 12% 14%, ${alphaColor(colors.buttonColor, 0.22)} 0%, transparent 28%)`,
        `radial-gradient(circle at 86% 18%, ${alphaColor(mixColors(colors.buttonColor, "#ffffff", 0.36), 0.18)} 0%, transparent 24%)`,
        `radial-gradient(circle at 84% 84%, ${alphaColor(colors.titleTextColor, 0.12)} 0%, transparent 26%)`,
        `linear-gradient(180deg, ${mixColors(colors.backgroundColor, "#ffffff", 0.1)} 0%, ${colors.backgroundColor} 100%)`,
      ].join(", "),
      backgroundSize: "auto",
    };
  }

  if (design.backgroundStyle === "pattern") {
    const pattern = resolveBackgroundPattern(design, colors);
    return {
      background: [
        pattern.layer,
        `linear-gradient(180deg, ${mixColors(colors.backgroundColor, "#ffffff", 0.18)} 0%, ${colors.backgroundColor} 100%)`,
      ].join(", "),
      backgroundSize: `${pattern.size}, auto`,
    };
  }

  return {
    background: colors.backgroundColor,
    backgroundSize: "auto",
  };
}

function resolveSurfacePattern(design, colors) {
  const dark = isDarkColor(colors.surfaceColor);
  const lineColor = alphaColor(colors.buttonColor, dark ? 0.2 : 0.08);
  const dotColor = alphaColor(colors.titleTextColor, dark ? 0.16 : 0.06);

  if (design.surfacePatternVariant === "lines") {
    return {
      layer: `linear-gradient(135deg, ${lineColor} 0, ${lineColor} 1px, transparent 1px, transparent 12px)`,
      size: "16px 16px",
    };
  }

  if (design.surfacePatternVariant === "dots") {
    return {
      layer: `radial-gradient(circle at 1px 1px, ${dotColor} 1px, transparent 1.1px)`,
      size: "14px 14px",
    };
  }

  return {
    layer: [
      `linear-gradient(${lineColor} 1px, transparent 1px)`,
      `linear-gradient(90deg, ${lineColor} 1px, transparent 1px)`,
    ].join(", "),
    size: "18px 18px",
  };
}

function buildSurfaceStyle(design, colors, tone = "main") {
  const isDark = isDarkColor(colors.surfaceColor);
  const borderColor = alphaColor(
    isDark ? mixColors(colors.surfaceColor, "#ffffff", 0.56) : mixColors(colors.surfaceColor, "#0f172a", 0.48),
    tone === "soft" ? 0.16 : 0.2,
  );
  const softBackground = mixColors(colors.surfaceColor, isDark ? "#ffffff" : "#f8fafc", tone === "soft" ? 0.08 : 0.04);

  if (design.surfaceStyle === "solid") {
    return {
      background: `linear-gradient(180deg, ${mixColors(colors.surfaceColor, "#ffffff", 0.08)} 0%, ${colors.surfaceColor} 100%)`,
      border: `1px solid ${borderColor}`,
      boxShadow: `0 28px 70px -42px ${alphaColor(colors.titleTextColor, isDark ? 0.42 : 0.16)}`,
    };
  }

  if (design.surfaceStyle === "glass") {
    return {
      background: `linear-gradient(180deg, ${alphaColor(colors.surfaceColor, 0.8)} 0%, ${alphaColor(softBackground, 0.66)} 100%)`,
      border: `1px solid ${alphaColor(mixColors(colors.surfaceColor, "#ffffff", 0.72), 0.42)}`,
      boxShadow: `0 26px 68px -46px ${alphaColor(colors.titleTextColor, isDark ? 0.48 : 0.14)}`,
      backdropFilter: "blur(20px) saturate(1.08)",
      WebkitBackdropFilter: "blur(20px) saturate(1.08)",
    };
  }

  if (design.surfaceStyle === "outline") {
    return {
      background: alphaColor(colors.surfaceColor, isDark ? 0.12 : 0.36),
      border: `1px solid ${alphaColor(colors.buttonColor, 0.18)}`,
      boxShadow: "none",
    };
  }

  if (design.surfaceStyle === "blur") {
    return {
      background: [
        `radial-gradient(circle at top left, ${alphaColor(colors.buttonColor, 0.16)} 0%, transparent 34%)`,
        `linear-gradient(180deg, ${alphaColor(colors.surfaceColor, 0.82)} 0%, ${alphaColor(softBackground, 0.68)} 100%)`,
      ].join(", "),
      border: `1px solid ${alphaColor(colors.buttonColor, 0.16)}`,
      boxShadow: `0 26px 72px -46px ${alphaColor(colors.titleTextColor, isDark ? 0.48 : 0.14)}`,
      backdropFilter: "blur(24px) saturate(1.04)",
      WebkitBackdropFilter: "blur(24px) saturate(1.04)",
    };
  }

  if (design.surfaceStyle === "pattern") {
    const pattern = resolveSurfacePattern(design, colors);
    return {
      background: [
        pattern.layer,
        `linear-gradient(180deg, ${alphaColor(mixColors(colors.surfaceColor, "#ffffff", 0.06), 0.96)} 0%, ${alphaColor(colors.surfaceColor, 0.92)} 100%)`,
      ].join(", "),
      backgroundSize: `${pattern.size}, auto`,
      border: `1px solid ${borderColor}`,
      boxShadow: `0 22px 58px -42px ${alphaColor(colors.titleTextColor, isDark ? 0.4 : 0.12)}`,
    };
  }

  return {
    background: `linear-gradient(180deg, ${alphaColor(mixColors(colors.surfaceColor, "#ffffff", 0.12), 0.96)} 0%, ${alphaColor(softBackground, 0.88)} 100%)`,
    border: `1px solid ${borderColor}`,
    boxShadow: tone === "soft"
      ? `0 18px 46px -40px ${alphaColor(colors.titleTextColor, isDark ? 0.34 : 0.08)}`
      : `0 28px 72px -42px ${alphaColor(colors.titleTextColor, isDark ? 0.44 : 0.14)}`,
  };
}

function getRadiusValue(buttonRadius) {
  if (buttonRadius === "square") return "22px";
  if (buttonRadius === "pill") return "999px";
  return "28px";
}

function getPreviewRadiusValue(buttonRadius) {
  if (buttonRadius === "square") return "26px";
  if (buttonRadius === "pill") return "34px";
  return "30px";
}

function sortActive(items = []) {
  return [...items]
    .filter((item) => item?.isActive !== false)
    .sort((left, right) => Number(left?.order ?? 0) - Number(right?.order ?? 0));
}

const FALLBACK_PRIMARY_LINKS = [
  {
    id: "preview-whatsapp",
    title: "Falar no WhatsApp",
    type: "whatsapp",
    url: "https://wa.me/5511999999999?text=Ola%21",
    phone: "5511999999999",
    message: "Ola!",
    isActive: true,
    order: 0,
  },
  {
    id: "preview-location",
    title: "Nossa localizacao",
    type: "location",
    url: "https://www.google.com/maps/search/?api=1&query=Sao%20Paulo",
    address: "Sao Paulo, SP",
    isActive: true,
    order: 1,
  },
];

const FALLBACK_SOCIAL_LINKS = [
  {
    id: "social-instagram",
    title: "Instagram",
    platform: "instagram",
    url: "https://instagram.com",
    isActive: true,
    order: 0,
  },
  {
    id: "social-youtube",
    title: "YouTube",
    platform: "youtube",
    url: "https://youtube.com",
    isActive: true,
    order: 1,
  },
  {
    id: "social-site",
    title: "Site",
    platform: "site",
    url: "https://example.com",
    isActive: true,
    order: 2,
  },
];

export function normalizeMyPageTheme(rawTheme = {}) {
  const presetTheme = getPresetTokens(
    rawTheme.themePreset || MY_PAGE_THEME_DEFAULTS.themePreset,
  );
  const legacyRadius = resolveLegacyRadius(rawTheme.buttonStyle);
  const legacySurfaceColor = rawTheme.surfaceColor || rawTheme.cardColor;
  const legacyPageTextColor = rawTheme.pageTextColor || rawTheme.textColor;
  const legacyTitleTextColor = rawTheme.titleTextColor || rawTheme.textColor;

  const next = {
    ...MY_PAGE_THEME_DEFAULTS,
    ...presetTheme,
    ...rawTheme,
    backgroundColor: normalizeHexColor(
      rawTheme.backgroundColor,
      presetTheme.backgroundColor,
    ),
    surfaceColor: normalizeHexColor(legacySurfaceColor, presetTheme.surfaceColor),
    buttonColor: normalizeHexColor(rawTheme.buttonColor, presetTheme.buttonColor),
    buttonTextColor: normalizeHexColor(
      rawTheme.buttonTextColor,
      presetTheme.buttonTextColor,
    ),
    pageTextColor: normalizeHexColor(legacyPageTextColor, presetTheme.pageTextColor),
    titleTextColor: normalizeHexColor(
      legacyTitleTextColor,
      presetTheme.titleTextColor,
    ),
    ...normalizeButtonTheme({
      ...MY_PAGE_THEME_DEFAULTS,
      ...presetTheme,
      ...rawTheme,
      buttonStyle: legacyRadius
        ? presetTheme.buttonStyle
        : rawTheme.buttonStyle || presetTheme.buttonStyle,
      buttonRadius: rawTheme.buttonRadius || legacyRadius || presetTheme.buttonRadius,
    }),
  };

  return {
    ...next,
    cardColor: next.surfaceColor,
    textColor: next.pageTextColor,
  };
}

export function getMyPagePreviewPrimaryLinks(page = {}, limit = 2) {
  const activeLinks = sortActive(page?.links || []);
  const primaryLinks = activeLinks;
  return primaryLinks.length ? primaryLinks.slice(0, limit) : FALLBACK_PRIMARY_LINKS;
}

export function getMyPagePreviewSocialLinks(page = {}, limit = 3) {
  const socialLinks = sortActive(page?.secondaryLinks || []);
  return socialLinks.length ? socialLinks.slice(0, limit) : FALLBACK_SOCIAL_LINKS;
}

export function createMyPageThemePreviewPage(page = {}, themeOverrides = {}) {
  return {
    ...page,
    title: page?.title || "Minha Pagina",
    bio:
      page?.bio || "Uma bio curta para apresentar links e canais principais.",
    links: page?.links?.length
      ? page.links
      : FALLBACK_PRIMARY_LINKS,
    secondaryLinks: page?.secondaryLinks?.length
      ? page.secondaryLinks
      : FALLBACK_SOCIAL_LINKS,
    shop: page?.shop || { isActive: false, title: "Loja", productsCount: 0 },
    theme: normalizeMyPageTheme(themeOverrides),
  };
}

export function getMyPageTheme(page = {}) {
  const design = normalizeMyPageTheme(page?.theme || page);
  const fontFamily = FONT_FAMILIES[design.fontPreset] || FONT_FAMILIES.inter;
  const headingFontFamily =
    design.fontPreset === "editorial" ? FONT_FAMILIES.editorial : fontFamily;
  const background = buildBackground(design, design);
  const surfaceStyle = buildSurfaceStyle(design, design, "main");
  const shellSurfaceStyle = buildSurfaceStyle(design, design, "main");
  const softSurfaceStyle = buildSurfaceStyle(design, design, "soft");
  const primaryButtonStyle = buildPrimaryButtonStyle(design);
  const secondaryButtonStyle = buildSecondaryButtonStyle(design);
  const usesHeroLayout = design.brandLayout === "hero" && Boolean(page?.avatarUrl);
  const darkSurface = isDarkColor(design.surfaceColor);
  const chromeColor = mixColors(
    design.surfaceColor,
    "#ffffff",
    darkSurface ? 0.22 : 0.72,
  );

  return {
    design,
    fontFamily,
    headingFontFamily,
    usesHeroLayout,
    rootStyle: {
      "--page-title": design.titleTextColor,
      "--page-copy": design.pageTextColor,
      "--page-accent": design.buttonColor,
      "--page-surface-border": alphaColor(design.buttonColor, 0.16),
      "--page-heading-font": headingFontFamily,
      "--page-body-font": fontFamily,
      "--page-card-radius": getPreviewRadiusValue(design.buttonRadius),
      "--page-button-radius": getRadiusValue(design.buttonRadius),
      background: background.background,
      backgroundSize: background.backgroundSize,
      color: design.pageTextColor,
      fontFamily,
    },
    heroMediaStyle: {
      backgroundImage: page?.avatarUrl
        ? `linear-gradient(180deg, ${alphaColor(design.titleTextColor, 0.12)} 0%, ${alphaColor(design.titleTextColor, 0.48)} 100%), url(${page.avatarUrl})`
        : undefined,
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    titleStyle: {
      color: design.titleTextColor,
      fontFamily: headingFontFamily,
    },
    bodyStyle: {
      color: design.pageTextColor,
      fontFamily,
    },
    mutedTextStyle: {
      color: alphaColor(design.pageTextColor, 0.92),
      fontFamily,
    },
    accentTextStyle: {
      color: design.buttonColor,
      fontFamily: headingFontFamily,
    },
    shellStyle: {
      ...shellSurfaceStyle,
      borderRadius: getPreviewRadiusValue(design.buttonRadius),
      color: design.pageTextColor,
      fontFamily,
    },
    chromeButtonStyle: {
      background: alphaColor(chromeColor, darkSurface ? 0.16 : 0.88),
      border: `1px solid ${alphaColor(mixColors(design.buttonColor, "#ffffff", 0.3), 0.18)}`,
      color: design.titleTextColor,
      boxShadow: `0 18px 36px -28px ${alphaColor(design.titleTextColor, darkSurface ? 0.46 : 0.18)}`,
      backdropFilter: "blur(18px)",
      WebkitBackdropFilter: "blur(18px)",
    },
    qrPanelStyle: {
      ...softSurfaceStyle,
      borderRadius: "32px",
      color: design.pageTextColor,
      fontFamily,
      backdropFilter: "blur(20px) saturate(1.03)",
      WebkitBackdropFilter: "blur(20px) saturate(1.03)",
    },
    surfaceStyle: {
      ...surfaceStyle,
      borderRadius: getPreviewRadiusValue(design.buttonRadius),
      color: design.pageTextColor,
      fontFamily,
    },
    softSurfaceStyle: {
      ...softSurfaceStyle,
      borderRadius: getRadiusValue(design.buttonRadius),
      color: design.pageTextColor,
      fontFamily,
    },
    primaryButtonStyle: {
      ...primaryButtonStyle,
      fontFamily,
    },
    secondaryButtonStyle: {
      ...secondaryButtonStyle,
      fontFamily,
    },
    activeCardStyle: {
      background: `linear-gradient(180deg, ${alphaColor(design.buttonColor, 0.12)} 0%, ${alphaColor(design.buttonColor, 0.2)} 100%)`,
      border: `1px solid ${alphaColor(design.buttonColor, 0.22)}`,
      borderRadius: getRadiusValue(design.buttonRadius),
      color: design.titleTextColor,
      fontFamily,
    },
  };
}

function getSocialPlatform(link = {}) {
  if (
    ["instagram", "facebook", "tiktok", "youtube", "site"].includes(
      String(link.platform || "").toLowerCase(),
    )
  ) {
    return String(link.platform).toLowerCase();
  }

  const sample = `${link.title || ""} ${link.url || ""}`.toLowerCase();
  if (sample.includes("instagram")) return "instagram";
  if (sample.includes("facebook")) return "facebook";
  if (sample.includes("tiktok")) return "tiktok";
  if (sample.includes("youtube") || sample.includes("youtu.be")) return "youtube";
  return "site";
}

const SOCIAL_PLATFORM_LABELS = {
  instagram: "Instagram",
  facebook: "Facebook",
  tiktok: "TikTok",
  youtube: "YouTube",
  site: "Site",
};

export function getMyPageSocialLabel(link = {}) {
  const title = String(link?.title || "").trim();
  if (title) return title;

  const platform = getSocialPlatform(link);
  return SOCIAL_PLATFORM_LABELS[platform] || "Link";
}

export function getMyPageSocialBrand(link = {}) {
  const platform = getSocialPlatform(link);
  if (platform === "instagram") {
    return {
      platform,
      Icon: FaInstagram,
      badgeStyle: {
        background:
          "linear-gradient(135deg, #f58529 0%, #feda77 28%, #dd2a7b 62%, #8134af 82%, #515bd4 100%)",
        color: "#ffffff",
      },
    };
  }

  if (platform === "facebook") {
    return {
      platform,
      Icon: FaFacebookF,
      badgeStyle: {
        background: "linear-gradient(135deg, #7aa7ff 0%, #1877f2 100%)",
        color: "#ffffff",
      },
    };
  }

  if (platform === "tiktok") {
    return {
      platform,
      Icon: FaTiktok,
      badgeStyle: {
        background: "linear-gradient(135deg, #1f2937 0%, #020617 100%)",
        color: "#ffffff",
      },
    };
  }

  if (platform === "youtube") {
    return {
      platform,
      Icon: FaYoutube,
      badgeStyle: {
        background: "linear-gradient(135deg, #ff4d4f 0%, #ff0033 100%)",
        color: "#ffffff",
      },
    };
  }

  return {
    platform,
    Icon: FaGlobe,
    badgeStyle: null,
  };
}

export function getMyPageButtonIcon(link = {}) {
  if (link?.type === "whatsapp") return FaWhatsapp;
  if (link?.type === "location") return MapPin;
  if (link?.type === "shop-preview") return ShoppingBag;
  if (String(link?.title || "").toLowerCase().includes("loja")) return Store;
  return Link2;
}

export function getMyPageButtonMeta(link = {}) {
  if (link?.type === "whatsapp") return "WhatsApp";
  if (link?.type === "location") return "Localizacao";
  if (link?.type === "shop-preview") return "Shop";
  return "Link";
}

export function getPrimaryLinksLayout(theme) {
  if (theme?.design?.primaryButtonsLayout === "minimal") {
    return "public-page__buttons public-page__buttons--minimal";
  }
  if (theme?.design?.primaryButtonsLayout === "cards") {
    return "public-page__buttons public-page__buttons--cards";
  }
  return "public-page__buttons public-page__buttons--stack";
}

export function getSecondaryLinksLayout(theme) {
  const size = theme?.design?.secondaryLinksSize === "small" ? "small" : "medium";
  const align = ["left", "center", "right"].includes(theme?.design?.secondaryLinksAlign)
    ? theme.design.secondaryLinksAlign
    : "center";
  return {
    size,
    align,
    containerClassName: [
      "public-page__social-list",
      `is-${size}`,
      `is-${align}`,
    ].join(" "),
  };
}

export function getMyPageMotionPreset(theme, shouldReduceMotion = false) {
  const key = theme?.design?.animationPreset || "subtle";
  if (shouldReduceMotion || key === "off") {
    return {
      enabled: false,
      wrapper: { initial: false, animate: false },
      containerVariants: {},
      itemVariants: {},
      cardVariants: {},
    };
  }

  if (key === "impact") {
    return {
      enabled: true,
      wrapper: { initial: "hidden", animate: "visible" },
      containerVariants: {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
            delayChildren: 0.02,
          },
        },
      },
      itemVariants: {
        hidden: { opacity: 0, y: 16, x: 22, scale: 0.98 },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
        },
      },
      cardVariants: {
        hidden: { opacity: 0, y: 18 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        },
      },
    };
  }

  if (key === "strong") {
    return {
      enabled: true,
      wrapper: { initial: "hidden", animate: "visible" },
      containerVariants: {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.06,
            delayChildren: 0.02,
          },
        },
      },
      itemVariants: {
        hidden: { opacity: 0, y: 16, scale: 0.985 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] },
        },
      },
      cardVariants: {
        hidden: { opacity: 0, y: 12 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.34, ease: "easeOut" },
        },
      },
    };
  }

  return {
    enabled: true,
    wrapper: { initial: "hidden", animate: "visible" },
    containerVariants: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.05,
          delayChildren: 0.01,
        },
      },
    },
    itemVariants: {
      hidden: { opacity: 0, y: 10 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.28, ease: "easeOut" },
      },
    },
    cardVariants: {
      hidden: { opacity: 0, y: 8 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.24, ease: "easeOut" },
      },
    },
  };
}
