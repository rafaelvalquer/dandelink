import {
  Link2,
  MapPin,
  QrCode,
  ShoppingBag,
  Store,
} from "lucide-react";
import {
  FaEnvelope,
  FaFacebookF,
  FaGlobe,
  FaInstagram,
  FaLinkedinIn,
  FaDiscord,
  FaPhone,
  FaTelegram,
  FaThreads,
  FaTiktok,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { SiCalendly } from "react-icons/si";
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

const THEME_PRESET_DEFINITIONS = [
  {
    value: "clean_light",
    label: "Clean Light",
    description: "Claro, minimalista e editorial.",
    previewVariant: "airy",
    previewArtwork: "paper",
    previewLabel: "Clean Light",
    previewTitle: "Minha Página",
    previewCtaLabel: "Ver layout",
    theme: {
      themePreset: "clean_light",
      brandLayout: "classic",
      backgroundStyle: "gradient",
      backgroundGradientDirection: "linear_up",
      backgroundPatternVariant: "grid",
      surfaceStyle: "glass",
      surfacePatternVariant: "grid",
      surfaceColor: "#ffffff",
      buttonColor: "#334155",
      buttonTextColor: "#ffffff",
      pageTextColor: "#5f6b7a",
      titleTextColor: "#101827",
      fontPreset: "sora",
      buttonStyle: "soft",
      buttonShadow: "soft",
      buttonRadius: "round",
      primaryButtonsLayout: "stack",
      secondaryLinksStyle: "icon_text",
      secondaryLinksIconLayout: "brand_badge",
      secondaryLinksSize: "medium",
      secondaryLinksAlign: "center",
      animationPreset: "subtle",
      backgroundColor: "#eef2f7",
    },
  },
  {
    value: "premium_dark",
    label: "Premium Dark",
    description: "Escuro refinado com contraste elegante.",
    previewVariant: "nocturne",
    previewArtwork: "flare",
    previewLabel: "Premium Dark",
    previewTitle: "Minha Página",
    previewCtaLabel: "Ver layout",
    theme: {
      themePreset: "premium_dark",
      brandLayout: "classic",
      backgroundStyle: "gradient",
      backgroundGradientDirection: "linear_down",
      backgroundPatternVariant: "dots",
      surfaceStyle: "glass",
      surfacePatternVariant: "grid",
      surfaceColor: "#111827",
      buttonColor: "#2dd4bf",
      buttonTextColor: "#042f2e",
      pageTextColor: "#a9b7c9",
      titleTextColor: "#f8fafc",
      fontPreset: "sora",
      buttonStyle: "soft",
      buttonShadow: "none",
      buttonRadius: "round",
      primaryButtonsLayout: "cards",
      primaryIconBadgeStyle: "neutral",
      secondaryLinksStyle: "icon_text",
      secondaryLinksIconLayout: "brand_badge",
      secondaryLinksSize: "medium",
      secondaryLinksAlign: "center",
      animationPreset: "strong",
      backgroundColor: "#08111f",
    },
  },
  {
    value: "braciera_noir",
    label: "Noir Minimal",
    description: "Monocromático, direto e premium.",
    previewVariant: "noir",
    previewArtwork: "noir",
    previewLabel: "Noir Minimal",
    previewTitle: "Minha Página",
    previewCtaLabel: "Ver layout",
    theme: {
      themePreset: "braciera_noir",
      brandLayout: "spotlight",
      backgroundStyle: "fill",
      backgroundGradientDirection: "linear_down",
      backgroundPatternVariant: "dots",
      surfaceStyle: "solid",
      surfacePatternVariant: "grid",
      surfaceColor: "#080808",
      buttonColor: "#f5f5f5",
      buttonTextColor: "#080808",
      pageTextColor: "#bdbdbd",
      titleTextColor: "#ffffff",
      fontPreset: "sora",
      buttonStyle: "outline",
      buttonShadow: "none",
      buttonRadius: "round",
      primaryButtonsLayout: "stack",
      primaryButtonContentAlign: "center",
      secondaryLinksStyle: "icon",
      secondaryLinksIconLayout: "plain",
      secondaryLinksSize: "small",
      secondaryLinksAlign: "center",
      secondaryLinksPosition: "bottom",
      animationPreset: "subtle",
      backgroundColor: "#000000",
    },
  },
  {
    value: "dental_clinic",
    label: "Dental Clinic",
    description: "Clínico, leve e confiável.",
    previewVariant: "clinic",
    previewArtwork: "mist",
    previewLabel: "Dental Clinic",
    previewTitle: "Minha Página",
    previewCtaLabel: "Ver layout",
    theme: {
      themePreset: "dental_clinic",
      brandLayout: "classic",
      backgroundStyle: "gradient",
      backgroundGradientDirection: "radial",
      backgroundPatternVariant: "grid",
      surfaceStyle: "soft",
      surfacePatternVariant: "grid",
      surfaceColor: "#ffffff",
      buttonColor: "#0e7490",
      buttonTextColor: "#ffffff",
      pageTextColor: "#536871",
      titleTextColor: "#12323d",
      fontPreset: "jakarta",
      buttonStyle: "solid",
      buttonShadow: "none",
      buttonRadius: "round",
      primaryButtonsLayout: "stack",
      secondaryLinksStyle: "icon_text",
      secondaryLinksIconLayout: "plain",
      secondaryLinksSize: "medium",
      secondaryLinksAlign: "center",
      animationPreset: "subtle",
      backgroundColor: "#e4f4f8",
    },
  },
  {
    value: "barber_gold",
    label: "Barber Gold",
    description: "Escuro classico com dourado contido.",
    previewVariant: "baroque",
    previewArtwork: "spotlight",
    previewLabel: "Barber Gold",
    previewTitle: "Minha Página",
    previewCtaLabel: "Ver layout",
    theme: {
      themePreset: "barber_gold",
      brandLayout: "classic",
      backgroundStyle: "fill",
      backgroundGradientDirection: "linear_up",
      backgroundPatternVariant: "cross",
      surfaceStyle: "solid",
      surfacePatternVariant: "lines",
      surfaceColor: "#15110c",
      buttonColor: "#d6a84f",
      buttonTextColor: "#17120a",
      pageTextColor: "#d0c3ae",
      titleTextColor: "#f7eedc",
      fontPreset: "editorial",
      buttonStyle: "metallic",
      buttonShadow: "soft",
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
    description: "Criativo, social e mais polido.",
    previewVariant: "spectrum",
    previewArtwork: "waves",
    previewLabel: "Creator Gradient",
    previewTitle: "Minha Página",
    previewCtaLabel: "Ver layout",
    theme: {
      themePreset: "creator_gradient",
      brandLayout: "hero",
      backgroundStyle: "gradient",
      backgroundGradientDirection: "radial",
      backgroundPatternVariant: "dots",
      surfaceStyle: "glass",
      surfacePatternVariant: "dots",
      surfaceColor: "#fffaff",
      buttonColor: "#6d28d9",
      buttonTextColor: "#ffffff",
      pageTextColor: "#665276",
      titleTextColor: "#241235",
      fontPreset: "jakarta",
      buttonStyle: "metallic",
      buttonShadow: "soft",
      buttonRadius: "pill",
      primaryButtonsLayout: "cards",
      secondaryLinksStyle: "icon_text",
      secondaryLinksIconLayout: "brand_badge",
      secondaryLinksSize: "medium",
      secondaryLinksAlign: "center",
      animationPreset: "impact",
      backgroundColor: "#f4d7ff",
    },
  },
  {
    value: "business_storefront",
    label: "Business Storefront",
    description: "Comercial claro, organizado e confiável.",
    previewVariant: "market",
    previewArtwork: "grid",
    previewLabel: "Business Storefront",
    previewTitle: "Minha Página",
    previewCtaLabel: "Ver layout",
    theme: {
      themePreset: "business_storefront",
      brandLayout: "classic",
      backgroundStyle: "gradient",
      backgroundGradientDirection: "linear_up",
      backgroundPatternVariant: "grid",
      surfaceStyle: "soft",
      surfacePatternVariant: "grid",
      surfaceColor: "#ffffff",
      buttonColor: "#047857",
      buttonTextColor: "#ecfdf5",
      pageTextColor: "#4b5563",
      titleTextColor: "#10251f",
      fontPreset: "sora",
      buttonStyle: "soft",
      buttonShadow: "soft",
      buttonRadius: "round",
      primaryButtonsLayout: "minimal",
      secondaryLinksStyle: "icon_text",
      secondaryLinksIconLayout: "brand_badge",
      secondaryLinksSize: "small",
      secondaryLinksAlign: "left",
      animationPreset: "subtle",
      backgroundColor: "#def4ec",
    },
  },
  {
    value: "nutri_fresh",
    label: "Nutri Fresh",
    description: "Natural, calmo e sofisticado.",
    previewVariant: "airy",
    previewArtwork: "mist",
    previewLabel: "Nutri Fresh",
    previewTitle: "Minha Página",
    previewCtaLabel: "Ver layout",
    theme: {
      themePreset: "nutri_fresh",
      brandLayout: "classic",
      backgroundStyle: "gradient",
      backgroundGradientDirection: "linear_down",
      backgroundPatternVariant: "grid",
      surfaceStyle: "soft",
      surfacePatternVariant: "grid",
      surfaceColor: "#fbfff5",
      buttonColor: "#5f7f3f",
      buttonTextColor: "#fbfff5",
      pageTextColor: "#59664c",
      titleTextColor: "#253b22",
      fontPreset: "jakarta",
      buttonStyle: "soft",
      buttonShadow: "soft",
      buttonRadius: "round",
      primaryButtonsLayout: "stack",
      secondaryLinksStyle: "icon_text",
      secondaryLinksIconLayout: "brand_badge",
      secondaryLinksSize: "medium",
      secondaryLinksAlign: "center",
      animationPreset: "subtle",
      backgroundColor: "#edf5df",
    },
  },
  {
    value: "pastry_atelier",
    label: "Pastry Atelier",
    description: "Artesanal, delicado e premium.",
    previewVariant: "airy",
    previewArtwork: "paper",
    previewLabel: "Pastry Atelier",
    previewTitle: "Minha Página",
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
      buttonColor: "#a75d68",
      buttonTextColor: "#fffdf8",
      pageTextColor: "#765d57",
      titleTextColor: "#4d302d",
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
      backgroundColor: "#fae8df",
    },
  },
  {
    value: "aesthetic_glow",
    label: "Aesthetic Glow",
    description: "Nude sofisticado com brilho suave.",
    previewVariant: "spectrum",
    previewArtwork: "mist",
    previewLabel: "Aesthetic Glow",
    previewTitle: "Minha Página",
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
      buttonColor: "#b9786e",
      buttonTextColor: "#fffdf9",
      pageTextColor: "#806861",
      titleTextColor: "#442f31",
      fontPreset: "sora",
      buttonStyle: "glass",
      buttonShadow: "soft",
      buttonRadius: "pill",
      primaryButtonsLayout: "cards",
      secondaryLinksStyle: "icon_text",
      secondaryLinksIconLayout: "brand_badge",
      secondaryLinksSize: "medium",
      secondaryLinksAlign: "center",
      animationPreset: "subtle",
      backgroundColor: "#f8ddd5",
    },
  },
  {
    value: "legal_navy",
    label: "Legal Navy",
    description: "Marinho sobrio com leitura institucional.",
    previewVariant: "nocturne",
    previewArtwork: "paper",
    previewLabel: "Legal Navy",
    previewTitle: "Minha Página",
    previewCtaLabel: "Ver layout",
    theme: {
      themePreset: "legal_navy",
      brandLayout: "classic",
      backgroundStyle: "fill",
      backgroundGradientDirection: "linear_up",
      backgroundPatternVariant: "grid",
      surfaceStyle: "solid",
      surfacePatternVariant: "lines",
      surfaceColor: "#101827",
      buttonColor: "#b8c7df",
      buttonTextColor: "#101827",
      pageTextColor: "#9caec7",
      titleTextColor: "#f8fafc",
      fontPreset: "sora",
      buttonStyle: "outline",
      buttonShadow: "none",
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
    description: "Energia esportiva com acabamento premium.",
    previewVariant: "market",
    previewArtwork: "grid",
    previewLabel: "Fitness Charge",
    previewTitle: "Minha Página",
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
      buttonStyle: "soft",
      buttonShadow: "soft",
      buttonRadius: "pill",
      primaryButtonsLayout: "cards",
      primaryIconBadgeStyle: "neutral",
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
    description: "Imobiliário elegante com luxo discreto.",
    previewVariant: "baroque",
    previewArtwork: "spotlight",
    previewLabel: "Realty Luxe",
    previewTitle: "Minha Página",
    previewCtaLabel: "Ver layout",
    theme: {
      themePreset: "realty_luxe",
      brandLayout: "classic",
      backgroundStyle: "fill",
      backgroundGradientDirection: "linear_up",
      backgroundPatternVariant: "grid",
      surfaceStyle: "solid",
      surfacePatternVariant: "grid",
      surfaceColor: "#fbf8f2",
      buttonColor: "#6f5a3d",
      buttonTextColor: "#fffdf9",
      pageTextColor: "#716353",
      titleTextColor: "#2b2118",
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
    description: "Infantil acolhedor, claro e amigável.",
    previewVariant: "clinic",
    previewArtwork: "waves",
    previewLabel: "Kids Care",
    previewTitle: "Minha Página",
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
      buttonColor: "#3b82f6",
      buttonTextColor: "#ffffff",
      pageTextColor: "#6b7280",
      titleTextColor: "#17395f",
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
    description: "Editorial refinado para marca premium.",
    previewVariant: "baroque",
    previewArtwork: "paper",
    previewLabel: "Editorial Luxury",
    previewTitle: "Minha Página",
    previewCtaLabel: "Ver layout",
    theme: {
      themePreset: "editorial_luxury",
      brandLayout: "classic",
      backgroundStyle: "fill",
      backgroundGradientDirection: "linear_up",
      backgroundPatternVariant: "dots",
      surfaceStyle: "soft",
      surfacePatternVariant: "grid",
      surfaceColor: "#fffaf5",
      buttonColor: "#7f2f18",
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
      backgroundColor: "#f3e6d7",
    },
  },
  {
    value: "twilight",
    label: "Twilight",
    description: "Roxo noturno com brilho controlado.",
    previewVariant: "nocturne",
    previewArtwork: "flare",
    previewLabel: "Twilight",
    previewTitle: "Minha Página",
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
      buttonColor: "#7c3aed",
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
      animationPreset: "subtle",
      backgroundColor: "#130d25",
    },
  },
  {
    value: "midnight_prism",
    label: "Midnight Prism",
    description: "Escuro moderno com acento elétrico.",
    previewVariant: "spectrum",
    previewArtwork: "flare",
    previewLabel: "Midnight Prism",
    previewTitle: "Minha Página",
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
      buttonColor: "#67e8f9",
      buttonTextColor: "#06202a",
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
      animationPreset: "strong",
      backgroundColor: "#020617",
    },
  },
  {
    value: "air",
    label: "Air",
    description: "Leve, respirável e moderno.",
    previewVariant: "airy",
    previewArtwork: "mist",
    previewLabel: "Air",
    previewTitle: "Minha Página",
    previewCtaLabel: "Ver layout",
    theme: {
      themePreset: "air",
      brandLayout: "classic",
      backgroundStyle: "fill",
      backgroundGradientDirection: "linear_up",
      backgroundPatternVariant: "grid",
      surfaceStyle: "soft",
      surfacePatternVariant: "grid",
      surfaceColor: "#ffffff",
      buttonColor: "#0284c7",
      buttonTextColor: "#ffffff",
      pageTextColor: "#64748b",
      titleTextColor: "#0f172a",
      fontPreset: "sora",
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
    description: "Mineral frio com estrutura editorial.",
    previewVariant: "market",
    previewArtwork: "grid",
    previewLabel: "Agate",
    previewTitle: "Minha Página",
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
      buttonColor: "#4338ca",
      buttonTextColor: "#ffffff",
      pageTextColor: "#546274",
      titleTextColor: "#1e293b",
      fontPreset: "sora",
      buttonStyle: "solid",
      buttonShadow: "soft",
      buttonRadius: "round",
      primaryButtonsLayout: "minimal",
      secondaryLinksStyle: "icon_text",
      secondaryLinksIconLayout: "plain",
      secondaryLinksSize: "small",
      secondaryLinksAlign: "left",
      animationPreset: "subtle",
      backgroundColor: "#e3eaf4",
    },
  },
  {
    value: "studio_pearl",
    label: "Studio Pearl",
    description: "Perolado premium para estúdios e marcas pessoais.",
    previewVariant: "airy",
    previewArtwork: "mist",
    previewLabel: "Studio Pearl",
    previewTitle: "Minha Página",
    previewCtaLabel: "Ver layout",
    theme: {
      themePreset: "studio_pearl",
      brandLayout: "classic",
      backgroundStyle: "gradient",
      backgroundGradientDirection: "radial",
      backgroundPatternVariant: "dots",
      surfaceStyle: "glass",
      surfacePatternVariant: "dots",
      surfaceColor: "#fffdf8",
      buttonColor: "#8b6f61",
      buttonTextColor: "#fffdf8",
      pageTextColor: "#6d625c",
      titleTextColor: "#2c2522",
      fontPreset: "sora",
      buttonStyle: "soft",
      buttonShadow: "none",
      buttonRadius: "round",
      primaryButtonsLayout: "minimal",
      primaryIconLayout: "circle_soft",
      secondaryLinksStyle: "icon_text",
      secondaryLinksIconLayout: "circle_soft",
      secondaryLinksSize: "small",
      secondaryLinksAlign: "center",
      animationPreset: "subtle",
      backgroundColor: "#f5eee7",
    },
  },
  {
    value: "graphite_mono",
    label: "Graphite Mono",
    description: "Grafite monocromático com acabamento executivo.",
    previewVariant: "noir",
    previewArtwork: "noir",
    previewLabel: "Graphite Mono",
    previewTitle: "Minha Página",
    previewCtaLabel: "Ver layout",
    theme: {
      themePreset: "graphite_mono",
      brandLayout: "spotlight",
      backgroundStyle: "gradient",
      backgroundGradientDirection: "linear_down",
      backgroundPatternVariant: "grid",
      surfaceStyle: "solid",
      surfacePatternVariant: "lines",
      surfaceColor: "#111111",
      buttonColor: "#e5e7eb",
      buttonTextColor: "#111111",
      pageTextColor: "#c7c7c7",
      titleTextColor: "#ffffff",
      fontPreset: "sora",
      buttonStyle: "solid",
      buttonShadow: "none",
      buttonRadius: "round",
      primaryButtonsLayout: "stack",
      primaryIconLayout: "circle_neutral",
      secondaryLinksStyle: "icon",
      secondaryLinksIconLayout: "plain",
      secondaryLinksSize: "small",
      secondaryLinksAlign: "center",
      secondaryLinksPosition: "bottom",
      animationPreset: "subtle",
      backgroundColor: "#050505",
    },
  },
  {
    value: "sage_editorial",
    label: "Sage Editorial",
    description: "Verde acinzentado com sensação calma e autoral.",
    previewVariant: "airy",
    previewArtwork: "paper",
    previewLabel: "Sage Editorial",
    previewTitle: "Minha Página",
    previewCtaLabel: "Ver layout",
    theme: {
      themePreset: "sage_editorial",
      brandLayout: "classic",
      backgroundStyle: "pattern",
      backgroundGradientDirection: "linear_up",
      backgroundPatternVariant: "dots",
      surfaceStyle: "soft",
      surfacePatternVariant: "grid",
      surfaceColor: "#fbfcf6",
      buttonColor: "#63715b",
      buttonTextColor: "#fbfcf6",
      pageTextColor: "#66705f",
      titleTextColor: "#253024",
      fontPreset: "editorial",
      buttonStyle: "outline",
      buttonShadow: "none",
      buttonRadius: "round",
      primaryButtonsLayout: "minimal",
      primaryIconLayout: "plain",
      secondaryLinksStyle: "text",
      secondaryLinksIconLayout: "plain",
      secondaryLinksSize: "small",
      secondaryLinksAlign: "left",
      animationPreset: "subtle",
      backgroundColor: "#e8eee0",
    },
  },
  {
    value: "copper_luxe",
    label: "Copper Luxe",
    description: "Cobre sofisticado para experiências premium.",
    previewVariant: "baroque",
    previewArtwork: "spotlight",
    previewLabel: "Copper Luxe",
    previewTitle: "Minha Página",
    previewCtaLabel: "Ver layout",
    theme: {
      themePreset: "copper_luxe",
      brandLayout: "hero",
      backgroundStyle: "blur",
      backgroundGradientDirection: "radial",
      backgroundPatternVariant: "dots",
      surfaceStyle: "glass",
      surfacePatternVariant: "dots",
      surfaceColor: "#fff7f1",
      buttonColor: "#a4573a",
      buttonTextColor: "#fffaf5",
      pageTextColor: "#765f55",
      titleTextColor: "#39231d",
      fontPreset: "sora",
      buttonStyle: "metallic",
      buttonShadow: "soft",
      buttonRadius: "pill",
      primaryButtonsLayout: "cards",
      primaryIconLayout: "circle_solid",
      secondaryLinksStyle: "icon_text",
      secondaryLinksIconLayout: "brand_badge",
      secondaryLinksSize: "medium",
      secondaryLinksAlign: "center",
      animationPreset: "subtle",
      backgroundColor: "#f4ded2",
    },
  },
];

export const MY_PAGE_THEME_PRESET_OPTIONS = THEME_PRESET_DEFINITIONS.map(
  ({ theme, ...option }) => option,
);

export const MY_PAGE_BRAND_LAYOUT_OPTIONS = [
  {
    value: "classic",
    label: "Clássico",
    description: "Avatar em destaque no topo.",
  },
  {
    value: "hero",
    label: "Hero",
    description: "Usa o avatar como destaque de capa.",
  },
  {
    value: "banner",
    label: "Banner",
    description: "Imagem em faixa ampla com avatar sobreposto.",
  },
  {
    value: "spotlight",
    label: "Spotlight",
    description: "Logo grande e centralizado com clima premium.",
  },
  {
    value: "split",
    label: "Split",
    description: "Avatar e textos lado a lado em composição editorial.",
  },
  {
    value: "editorial",
    label: "Editorial",
    description: "Tipografia refinada com marca em composição editorial.",
  },
  {
    value: "catalog",
    label: "Catálogo",
    description: "Marca compacta com leitura de vitrine premium.",
  },
  {
    value: "campaign",
    label: "Campanha",
    description: "Marca em destaque para ação, lançamento ou oferta.",
  },
];

const VALID_BRAND_LAYOUTS = new Set(
  MY_PAGE_BRAND_LAYOUT_OPTIONS.map((option) => option.value),
);

export const MY_PAGE_BACKGROUND_STYLE_OPTIONS = [
  { value: "fill", label: "Fill", description: "Cor sólida na página inteira." },
  { value: "gradient", label: "Gradient", description: "Transição da cor base." },
  { value: "blur", label: "Blur", description: "Blobs e glow macio." },
  { value: "pattern", label: "Pattern", description: "Textura com desenho leve." },
];

export const MY_PAGE_BACKGROUND_GRADIENT_DIRECTION_OPTIONS = [
  { value: "linear_up", label: "Vertical", description: "Luz subindo pela página." },
  { value: "linear_down", label: "Invertido", description: "Luz descendo do topo." },
  { value: "radial", label: "Radial", description: "Foco no topo com abertura central." },
];

export const MY_PAGE_BACKGROUND_PATTERN_VARIANT_OPTIONS = [
  { value: "grid", label: "Grid", description: "Malha geométrica leve." },
  { value: "dots", label: "Dots", description: "Pontos discretos e editoriais." },
  { value: "cross", label: "Cross", description: "Linhas cruzadas com cara técnica." },
];

export const MY_PAGE_SURFACE_STYLE_OPTIONS = [
  { value: "solid", label: "Sólido", description: "Container opaco e direto." },
  { value: "soft", label: "Soft", description: "Camada suave e elegante." },
  { value: "glass", label: "Glass", description: "Translúcido com blur e brilho leve." },
  { value: "outline", label: "Outline", description: "Quase transparente com borda forte." },
  { value: "blur", label: "Blur", description: "Camada macia com blur sutil no container." },
  { value: "pattern", label: "Pattern", description: "Textura aplicada só na superfície." },
];

export const MY_PAGE_SURFACE_PATTERN_VARIANT_OPTIONS = [
  { value: "grid", label: "Grid", description: "Grade leve na superfície." },
  { value: "lines", label: "Lines", description: "Listras discretas no container." },
  { value: "dots", label: "Dots", description: "Pontos finos no plano frontal." },
];

export const MY_PAGE_FONT_PRESET_OPTIONS = [
  { value: "inter", label: "Inter" },
  { value: "manrope", label: "Manrope" },
  { value: "jakarta", label: "Jakarta" },
  { value: "sora", label: "Sora" },
  { value: "editorial", label: "Editorial" },
  { value: "playfair", label: "Playfair" },
  { value: "cormorant", label: "Cormorant" },
  { value: "bebas", label: "Bebas" },
  { value: "caveat", label: "Caveat" },
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
  { value: "stack", label: "Stack", description: "Pilha vertical clássica e equilibrada." },
  { value: "cards", label: "Cards", description: "CTAs mais altos e com hierarquia mais forte." },
  { value: "minimal", label: "Minimal", description: "Mais leve, editorial e objetivo." },
];

export const MY_PAGE_PRIMARY_BUTTON_CONTENT_ALIGN_OPTIONS = [
  { value: "center", label: "Centralizado", description: "Texto mais equilibrado no meio do card." },
  { value: "left", label: "À esquerda", description: "Texto alinhado ao início do card com leitura mais natural." },
];

export const MY_PAGE_PRIMARY_ICON_LAYOUT_OPTIONS = [
  { value: "plain", label: "Só ícone", description: "Mostra apenas o ícone, sem envoltório." },
  { value: "circle_soft", label: "Círculo suave", description: "Círculo leve com leitura mais sutil." },
  { value: "circle_solid", label: "Círculo sólido", description: "Círculo com mais contraste e presença." },
  { value: "circle_neutral", label: "Círculo neutro", description: "Badge neutro para temas premium ou escuros." },
  { value: "square_soft", label: "Quadrado suave", description: "Bloco arredondado com visual mais moderno." },
];

export const MY_PAGE_SECONDARY_LINK_STYLE_OPTIONS = [
  { value: "text", label: "Texto" },
  { value: "icon", label: "Ícone" },
  { value: "icon_text", label: "Ícone + texto" },
];

export const MY_PAGE_SECONDARY_LINK_ICON_LAYOUT_OPTIONS = [
  { value: "plain", label: "Só ícone", description: "Ícone simples, sem badge." },
  { value: "brand_badge", label: "Badge oficial", description: "Usa o badge colorido da rede." },
  { value: "circle_soft", label: "Círculo suave", description: "Círculo leve com foco no ícone." },
  { value: "circle_solid", label: "Círculo sólido", description: "Mais contraste e presença visual." },
  { value: "square_soft", label: "Quadrado suave", description: "Badge arredondado com visual moderno." },
];

export const MY_PAGE_ICON_SIZE_OPTIONS = [
  { value: "sm", label: "Pequeno", description: "Mais compacto e discreto." },
  { value: "md", label: "Médio", description: "Tamanho padrão e equilibrado." },
  { value: "lg", label: "Grande", description: "Mais destaque para o ícone." },
];

export const MY_PAGE_SECONDARY_LINK_SIZE_OPTIONS = [
  { value: "small", label: "Pequeno", description: "Chip mais compacto." },
  { value: "medium", label: "Médio", description: "Tamanho padrão." },
];

export const MY_PAGE_SECONDARY_LINK_ALIGN_OPTIONS = [
  { value: "left", label: "Esquerda", description: "Agrupa as redes à esquerda." },
  { value: "center", label: "Centro", description: "Mantém a composição centralizada." },
  { value: "right", label: "Direita", description: "Empurra os chips para a direita." },
];

export const MY_PAGE_SECONDARY_LINK_POSITION_OPTIONS = [
  { value: "top", label: "Top", description: "Mostra as redes logo abaixo da bio." },
  { value: "bottom", label: "Bottom", description: "Mantém as redes no rodapé da página, como hoje." },
];

export const MY_PAGE_ANIMATION_PRESET_OPTIONS = [
  { value: "subtle", label: "Suave", description: "Entrada leve e refinada." },
  { value: "strong", label: "Marcante", description: "Camadas com mais deslocamento visual." },
  { value: "impact", label: "Impacto", description: "CTAs entram da direita com mais presença." },
  { value: "off", label: "Desligada", description: "Composição estática e direta." },
];

const PRESET_TOKENS = Object.fromEntries(
  THEME_PRESET_DEFINITIONS.map((preset) => [preset.value, preset.theme]),
);

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

const LEGACY_RADIUS_MAP = {
  "rounded-soft": "round",
  "rounded-full": "pill",
  "square-soft": "square",
};

const BUTTON_ICON_RADIUS_CLASSNAMES = {
  square: "public-page__icon-radius-square",
  round: "public-page__icon-radius-round",
  pill: "public-page__icon-radius-pill",
};

const VALID_PRIMARY_ICON_LAYOUTS = new Set(
  MY_PAGE_PRIMARY_ICON_LAYOUT_OPTIONS.map((option) => option.value),
);
const VALID_SECONDARY_ICON_LAYOUTS = new Set(
  MY_PAGE_SECONDARY_LINK_ICON_LAYOUT_OPTIONS.map((option) => option.value),
);
const VALID_ICON_SIZES = new Set(MY_PAGE_ICON_SIZE_OPTIONS.map((option) => option.value));

const PRIMARY_ICON_SIZE_TOKENS = {
  public: {
    sm: { badge: 44, glyph: 18 },
    md: { badge: 54, glyph: 20 },
    lg: { badge: 64, glyph: 24 },
  },
  preview: {
    sm: { badge: 24, glyph: 13 },
    md: { badge: 32, glyph: 16 },
    lg: { badge: 40, glyph: 19 },
  },
};

const SECONDARY_ICON_SIZE_TOKENS = {
  public: {
    sm: { badge: 28, glyph: 14 },
    md: { badge: 34, glyph: 16 },
    lg: { badge: 42, glyph: 20 },
  },
  preview: {
    sm: { badge: 20, glyph: 12 },
    md: { badge: 26, glyph: 14 },
    lg: { badge: 34, glyph: 18 },
  },
};

const LOCATION_ICON_RADIUS_CLASSNAME = "public-page__icon-radius-round";
const LOCATION_ROUTE_CHIP_RADIUS_CLASSNAME = "public-page__chip-radius-pill";

function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function normalizeHexColor(value, fallback) {
  const normalized = String(value || "").trim();
  if (/^#[0-9a-f]{6}$/i.test(normalized)) return normalized;
  return fallback;
}

function normalizeOptionalHexColor(value) {
  const normalized = String(value || "").trim();
  return /^#[0-9a-f]{6}$/i.test(normalized) ? normalized : "";
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

function getReadableColor(backgroundHex, darkColor = "#111827", lightColor = "#ffffff") {
  return isDarkColor(backgroundHex) ? lightColor : darkColor;
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
        backgroundColor: colors.backgroundColor,
        backgroundImage: `linear-gradient(180deg, ${mixColors(colors.backgroundColor, "#ffffff", 0.56)} 0%, ${colors.backgroundColor} 100%)`,
        backgroundSize: "auto",
      };
    }

    if (design.backgroundGradientDirection === "radial") {
      return {
        backgroundColor: colors.backgroundColor,
        backgroundImage: `radial-gradient(circle at top, ${mixColors(colors.backgroundColor, "#ffffff", 0.62)} 0%, ${colors.backgroundColor} 72%)`,
        backgroundSize: "auto",
      };
    }

    return {
      backgroundColor: colors.backgroundColor,
      backgroundImage: `linear-gradient(180deg, ${colors.backgroundColor} 0%, ${mixColors(colors.backgroundColor, "#ffffff", 0.52)} 100%)`,
      backgroundSize: "auto",
    };
  }

  if (design.backgroundStyle === "blur") {
    return {
      backgroundColor: colors.backgroundColor,
      backgroundImage: [
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
      backgroundColor: colors.backgroundColor,
      backgroundImage: [
        pattern.layer,
        `linear-gradient(180deg, ${mixColors(colors.backgroundColor, "#ffffff", 0.18)} 0%, ${colors.backgroundColor} 100%)`,
      ].join(", "),
      backgroundSize: `${pattern.size}, auto`,
    };
  }

  return {
    backgroundColor: colors.backgroundColor,
    backgroundImage: "none",
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
    url: "https://wa.me/5511999999999?text=Olá%21",
    phone: "5511999999999",
    message: "Olá!",
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
  const legacyPrimaryIconLayout =
    rawTheme.primaryIconBadgeStyle === "neutral" ? "circle_neutral" : "circle_solid";

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
    secondaryLinksPosition:
      rawTheme.secondaryLinksPosition === "top" ||
      rawTheme.secondaryLinksPosition === "bottom"
        ? rawTheme.secondaryLinksPosition
        : presetTheme.secondaryLinksPosition || MY_PAGE_THEME_DEFAULTS.secondaryLinksPosition,
    primaryButtonContentAlign:
      rawTheme.primaryButtonContentAlign === "left" ||
      rawTheme.primaryButtonContentAlign === "right"
        ? "left"
        : MY_PAGE_THEME_DEFAULTS.primaryButtonContentAlign,
    primaryIconLayout: VALID_PRIMARY_ICON_LAYOUTS.has(rawTheme.primaryIconLayout)
      ? rawTheme.primaryIconLayout
      : VALID_PRIMARY_ICON_LAYOUTS.has(presetTheme.primaryIconLayout)
        ? presetTheme.primaryIconLayout
        : legacyPrimaryIconLayout,
    primaryIconSize: VALID_ICON_SIZES.has(rawTheme.primaryIconSize)
      ? rawTheme.primaryIconSize
      : VALID_ICON_SIZES.has(presetTheme.primaryIconSize)
        ? presetTheme.primaryIconSize
        : MY_PAGE_THEME_DEFAULTS.primaryIconSize,
    primaryIconBadgeColor: normalizeOptionalHexColor(rawTheme.primaryIconBadgeColor),
    primaryIconColor: normalizeOptionalHexColor(rawTheme.primaryIconColor),
    secondaryLinksIconLayout: VALID_SECONDARY_ICON_LAYOUTS.has(rawTheme.secondaryLinksIconLayout)
      ? rawTheme.secondaryLinksIconLayout
      : VALID_SECONDARY_ICON_LAYOUTS.has(presetTheme.secondaryLinksIconLayout)
        ? presetTheme.secondaryLinksIconLayout
        : MY_PAGE_THEME_DEFAULTS.secondaryLinksIconLayout,
    secondaryLinksIconSize: VALID_ICON_SIZES.has(rawTheme.secondaryLinksIconSize)
      ? rawTheme.secondaryLinksIconSize
      : VALID_ICON_SIZES.has(presetTheme.secondaryLinksIconSize)
        ? presetTheme.secondaryLinksIconSize
        : MY_PAGE_THEME_DEFAULTS.secondaryLinksIconSize,
    secondaryLinksIconBadgeColor: normalizeOptionalHexColor(rawTheme.secondaryLinksIconBadgeColor),
    secondaryLinksIconColor: normalizeOptionalHexColor(rawTheme.secondaryLinksIconColor),
  };
  const normalizedBrandLayout = VALID_BRAND_LAYOUTS.has(rawTheme.brandLayout)
    ? rawTheme.brandLayout
    : VALID_BRAND_LAYOUTS.has(presetTheme.brandLayout)
      ? presetTheme.brandLayout
      : MY_PAGE_THEME_DEFAULTS.brandLayout;

  return {
    ...next,
    brandLayout: normalizedBrandLayout,
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
    title: page?.title || "Minha Página",
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

function getIconSizeTokens(kind = "primary", size = "md", context = "public") {
  const source = kind === "secondary" ? SECONDARY_ICON_SIZE_TOKENS : PRIMARY_ICON_SIZE_TOKENS;
  return source[context]?.[size] || source.public.md;
}

function buildSoftIconTokenStyle(badgeColor, iconColor) {
  return {
    background: alphaColor(badgeColor, isDarkColor(badgeColor) ? 0.26 : 0.16),
    border: `1px solid ${alphaColor(badgeColor, 0.24)}`,
    color: iconColor,
    boxShadow: `0 14px 28px -22px ${alphaColor(badgeColor, 0.38)}`,
  };
}

function buildSolidIconTokenStyle(badgeColor, iconColor) {
  return {
    background: `linear-gradient(180deg, ${mixColors(badgeColor, "#ffffff", 0.18)} 0%, ${badgeColor} 100%)`,
    border: `1px solid ${alphaColor(mixColors(badgeColor, "#ffffff", 0.18), 0.3)}`,
    color: iconColor,
    boxShadow: `0 16px 34px -24px ${alphaColor(badgeColor, 0.48)}`,
  };
}

function buildNeutralIconTokenStyle(design, neutralBase) {
  return {
    background: `linear-gradient(180deg, ${alphaColor(mixColors(neutralBase, "#ffffff", 0.06), 0.94)} 0%, ${alphaColor(neutralBase, 0.98)} 100%)`,
    border: `1px solid ${alphaColor(mixColors(design.titleTextColor, "#ffffff", 0.12), 0.18)}`,
    color: design.titleTextColor,
    boxShadow: `0 16px 32px -24px ${alphaColor("#000000", 0.62)}`,
  };
}

function buildPlainIconTokenStyle(iconColor) {
  return {
    background: "transparent",
    border: "none",
    boxShadow: "none",
    color: iconColor,
  };
}

function resolvePrimaryIconToken(theme, context = "public") {
  const design = theme?.design || normalizeMyPageTheme(theme || {});
  const radiusClassName =
    theme?.buttonIconRadiusClassName ||
    BUTTON_ICON_RADIUS_CLASSNAMES[design.buttonRadius] ||
    BUTTON_ICON_RADIUS_CLASSNAMES.round;
  const { badge, glyph } = getIconSizeTokens("primary", design.primaryIconSize, context);
  const layout = design.primaryIconLayout;
  const neutralBase = mixColors(
    design.surfaceColor,
    "#000000",
    isDarkColor(design.surfaceColor) ? 0.42 : 0.72,
  );
  const badgeColorOverride = normalizeOptionalHexColor(design.primaryIconBadgeColor);
  const iconColorOverride = normalizeOptionalHexColor(design.primaryIconColor);
  const defaultBadgeColor =
    layout === "circle_neutral" ? neutralBase : design.buttonColor;

  let style;

  if (layout === "plain") {
    style = buildPlainIconTokenStyle(iconColorOverride || design.buttonTextColor);
  } else if (layout === "circle_neutral") {
    style = buildNeutralIconTokenStyle(design, badgeColorOverride || neutralBase);
    if (iconColorOverride) {
      style = { ...style, color: iconColorOverride };
    }
  } else if (layout === "circle_soft" || layout === "square_soft") {
    const badgeColor = badgeColorOverride || defaultBadgeColor;
    const iconColor = iconColorOverride || design.buttonColor;
    style = buildSoftIconTokenStyle(badgeColor, iconColor);
  } else {
    const badgeColor = badgeColorOverride || defaultBadgeColor;
    const iconColor =
      iconColorOverride || getReadableColor(badgeColor, "#111827", "#ffffff");
    style = buildSolidIconTokenStyle(badgeColor, iconColor);
  }

  return {
    className: cls(
      "public-page__icon-token",
      `is-${layout}`,
      `is-size-${design.primaryIconSize}`,
      layout === "square_soft" && radiusClassName,
    ),
    style: {
      "--page-icon-badge-size": `${badge}px`,
      "--page-icon-glyph-size": `${glyph}px`,
      ...style,
    },
    iconClassName: "public-page__icon-glyph",
    iconSize: glyph,
    layout,
  };
}

function resolveSecondaryIconToken(theme, link = {}, context = "public") {
  const design = theme?.design || normalizeMyPageTheme(theme || {});
  const radiusClassName =
    theme?.buttonIconRadiusClassName ||
    BUTTON_ICON_RADIUS_CLASSNAMES[design.buttonRadius] ||
    BUTTON_ICON_RADIUS_CLASSNAMES.round;
  const { badge, glyph } = getIconSizeTokens("secondary", design.secondaryLinksIconSize, context);
  const layout = design.secondaryLinksIconLayout;
  const brand = getMyPageSocialBrand(link);
  const badgeColorOverride = normalizeOptionalHexColor(design.secondaryLinksIconBadgeColor);
  const iconColorOverride = normalizeOptionalHexColor(design.secondaryLinksIconColor);
  let style;

  if (layout === "plain") {
    style = buildPlainIconTokenStyle(iconColorOverride || "currentColor");
  } else if (layout === "brand_badge") {
    style = {
      ...((brand.badgeStyle && typeof brand.badgeStyle === "object")
        ? brand.badgeStyle
        : buildSoftIconTokenStyle(design.buttonColor, "currentColor")),
    };
  } else if (layout === "circle_soft" || layout === "square_soft") {
    const badgeColor = badgeColorOverride || design.buttonColor;
    const iconColor = iconColorOverride || "currentColor";
    style = buildSoftIconTokenStyle(badgeColor, iconColor);
  } else {
    const badgeColor = badgeColorOverride || design.buttonColor;
    const iconColor =
      iconColorOverride || getReadableColor(badgeColor, "#111827", "#ffffff");
    style = buildSolidIconTokenStyle(badgeColor, iconColor);
  }

  return {
    className: cls(
      "public-page__icon-token",
      `is-${layout}`,
      `is-size-${design.secondaryLinksIconSize}`,
      layout === "square_soft" && radiusClassName,
    ),
    style: {
      "--page-icon-badge-size": `${badge}px`,
      "--page-icon-glyph-size": `${glyph}px`,
      ...style,
    },
    iconClassName: "public-page__icon-glyph",
    iconSize: glyph,
    layout,
    usesBrandBadge: layout === "brand_badge",
  };
}

export function getMyPagePrimaryIconProps(theme, context = "public") {
  return resolvePrimaryIconToken(theme, context);
}

export function getMyPageSecondaryIconProps(theme, link = {}, context = "public") {
  return resolveSecondaryIconToken(theme, link, context);
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
  const usesBannerLayout = design.brandLayout === "banner" && Boolean(page?.avatarUrl);
  const usesSpotlightLayout = design.brandLayout === "spotlight";
  const usesSplitLayout = design.brandLayout === "split";
  const usesEditorialLayout = design.brandLayout === "editorial";
  const usesCatalogLayout = design.brandLayout === "catalog";
  const usesCampaignLayout = design.brandLayout === "campaign";
  const darkSurface = isDarkColor(design.surfaceColor);
  const chromeColor = mixColors(
    design.surfaceColor,
    "#ffffff",
    darkSurface ? 0.22 : 0.72,
  );
  const buttonIconRadiusClassName =
    BUTTON_ICON_RADIUS_CLASSNAMES[design.buttonRadius] ||
    BUTTON_ICON_RADIUS_CLASSNAMES.round;
  const primaryIconBadgeStyle = {
    ...resolvePrimaryIconToken(
      { design, buttonIconRadiusClassName },
      "public",
    ).style,
    fontFamily,
  };

  return {
    design,
    fontFamily,
    headingFontFamily,
    usesHeroLayout,
    usesBannerLayout,
    usesSpotlightLayout,
    usesSplitLayout,
    usesEditorialLayout,
    usesCatalogLayout,
    usesCampaignLayout,
    buttonIconRadiusClassName,
    locationIconRadiusClassName: LOCATION_ICON_RADIUS_CLASSNAME,
    locationRouteChipRadiusClassName: LOCATION_ROUTE_CHIP_RADIUS_CLASSNAME,
    rootStyle: {
      "--page-title": design.titleTextColor,
      "--page-copy": design.pageTextColor,
      "--page-accent": design.buttonColor,
      "--page-surface-border": alphaColor(design.buttonColor, 0.16),
      "--page-heading-font": headingFontFamily,
      "--page-body-font": fontFamily,
      "--page-card-radius": getPreviewRadiusValue(design.buttonRadius),
      "--page-button-radius": getRadiusValue(design.buttonRadius),
      backgroundColor: background.backgroundColor,
      backgroundImage: background.backgroundImage,
      backgroundRepeat: "no-repeat",
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
    locationCardStyle: {
      ...softSurfaceStyle,
      borderRadius: "24px",
      color: design.pageTextColor,
      fontFamily,
    },
    primaryButtonStyle: {
      ...primaryButtonStyle,
      fontFamily,
    },
    primaryIconBadgeStyle,
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
    [
      "instagram",
      "facebook",
      "linkedin",
      "x",
      "threads",
      "tiktok",
      "youtube",
      "telegram",
      "discord",
      "email",
      "phone",
      "site",
      "calendly",
    ].includes(
      String(link.platform || "").toLowerCase(),
    )
  ) {
    return String(link.platform).toLowerCase();
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

const SOCIAL_PLATFORM_LABELS = {
  instagram: "Instagram",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  x: "X / Twitter",
  threads: "Threads",
  tiktok: "TikTok",
  youtube: "YouTube",
  telegram: "Telegram",
  discord: "Discord",
  email: "E-mail",
  phone: "Telefone",
  site: "Site",
  calendly: "Calendly",
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

  if (platform === "linkedin") {
    return {
      platform,
      Icon: FaLinkedinIn,
      badgeStyle: {
        background: "linear-gradient(135deg, #60a5fa 0%, #0a66c2 100%)",
        color: "#ffffff",
      },
    };
  }

  if (platform === "x") {
    return {
      platform,
      Icon: FaXTwitter,
      badgeStyle: {
        background: "linear-gradient(135deg, #111827 0%, #000000 100%)",
        color: "#ffffff",
      },
    };
  }

  if (platform === "threads") {
    return {
      platform,
      Icon: FaThreads,
      badgeStyle: {
        background: "linear-gradient(135deg, #27272a 0%, #09090b 100%)",
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

  if (platform === "telegram") {
    return {
      platform,
      Icon: FaTelegram,
      badgeStyle: {
        background: "linear-gradient(135deg, #67e8f9 0%, #229ed9 100%)",
        color: "#ffffff",
      },
    };
  }

  if (platform === "discord") {
    return {
      platform,
      Icon: FaDiscord,
      badgeStyle: {
        background: "linear-gradient(135deg, #a5b4fc 0%, #5865f2 100%)",
        color: "#ffffff",
      },
    };
  }

  if (platform === "email") {
    return {
      platform,
      Icon: FaEnvelope,
      badgeStyle: null,
    };
  }

  if (platform === "phone") {
    return {
      platform,
      Icon: FaPhone,
      badgeStyle: {
        background: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
        color: "#15803d",
      },
    };
  }

  if (platform === "calendly") {
    return {
      platform,
      Icon: SiCalendly,
      badgeStyle: {
        background: "linear-gradient(135deg, #bae6fd 0%, #006bff 100%)",
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
  if (link?.type === "pix") return QrCode;
  if (link?.type === "link" && String(link?.platform || "").trim()) {
    return getMyPageSocialBrand(link).Icon;
  }
  if (String(link?.title || "").toLowerCase().includes("loja")) return Store;
  return Link2;
}

export function getMyPageButtonMeta(link = {}) {
  if (link?.type === "whatsapp") return "WhatsApp";
  if (link?.type === "location") return "Localizacao";
  if (link?.type === "shop-preview") return "Shop";
  if (link?.type === "pix") return "PIX";
  if (link?.type === "link" && String(link?.platform || "").trim()) {
    return getMyPageSocialLabel(link);
  }
  return "Link";
}

export function getMyPagePrimaryLinkLabel(link = {}) {
  const title = String(link?.title || "").trim();
  if (title) return title;

  if (link?.type === "whatsapp") return "WhatsApp";
  if (link?.type === "location") return "Localizacao";
  if (link?.type === "shop-preview") return "Previa da loja";
  if (link?.type === "pix") return "PIX";
  if (link?.type === "link" && String(link?.platform || "").trim()) {
    return getMyPageSocialLabel(link);
  }
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

