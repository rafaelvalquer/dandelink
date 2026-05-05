import mongoose from "mongoose";
import { normalizeSlug } from "../utils/slug.js";

const linkSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, trim: true },
    title: { type: String, trim: true, default: "" },
    url: { type: String, trim: true, default: "" },
    platform: {
      type: String,
      enum: [
        "",
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
      ],
      trim: true,
      default: "",
    },
    handle: { type: String, trim: true, default: "" },
    phone: { type: String, trim: true, default: "" },
    message: { type: String, trim: true, default: "" },
    address: { type: String, trim: true, default: "" },
    placeId: { type: String, trim: true, default: "" },
    showMap: { type: Boolean, default: false },
    pixKey: { type: String, trim: true, default: "" },
    pixKeyType: {
      type: String,
      enum: ["random", "cpf", "cnpj", "email", "phone", "other"],
      trim: true,
      default: "random",
    },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    type: {
      type: String,
      enum: ["link", "shop-preview", "whatsapp", "location", "pix"],
      default: "link",
    },
  },
  { _id: false },
);

const secondaryLinkSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, trim: true },
    platform: {
      type: String,
      enum: [
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
      ],
      trim: true,
      default: "instagram",
    },
    title: { type: String, required: true, trim: true, default: "Instagram" },
    url: { type: String, trim: true, default: "" },
    handle: { type: String, trim: true, default: "" },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { _id: false },
);

const shopProductSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, trim: true },
    sourceUrl: { type: String, trim: true, default: "" },
    title: { type: String, trim: true, default: "" },
    price: { type: Number, default: null },
    currency: { type: String, trim: true, default: "BRL" },
    imageUrl: { type: String, trim: true, default: "" },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    importMode: {
      type: String,
      enum: ["manual", "mercadolivre-item-api", "mercadolivre-product-api", "mercadolivre", "amazon-json-ld", "amazon-open-graph", "amazon-html", "json-ld", "open-graph"],
      default: "manual",
    },
  },
  { _id: false },
);

const myPageSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, trim: true, default: "Mutantwear" },
    slug: {
      type: String,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    bio: { type: String, trim: true, default: "Viva a Mutação." },
    avatarUrl: { type: String, trim: true, default: "" },
    theme: {
      backgroundColor: { type: String, trim: true, default: "#c4b5fd" },
      cardColor: { type: String, trim: true, default: "#ffffff" },
      textColor: { type: String, trim: true, default: "#64748b" },
      themePreset: { type: String, trim: true, default: "clean_light" },
      brandLayout: { type: String, trim: true, default: "classic" },
      backgroundStyle: { type: String, trim: true, default: "fill" },
      backgroundGradientDirection: {
        type: String,
        trim: true,
        default: "linear_up",
      },
      backgroundPatternVariant: { type: String, trim: true, default: "grid" },
      surfaceStyle: { type: String, trim: true, default: "soft" },
      surfacePatternVariant: { type: String, trim: true, default: "grid" },
      surfaceColor: { type: String, trim: true, default: "#ffffff" },
      buttonColor: { type: String, trim: true, default: "#0f172a" },
      buttonTextColor: { type: String, trim: true, default: "#ffffff" },
      pageTextColor: { type: String, trim: true, default: "#64748b" },
      titleTextColor: { type: String, trim: true, default: "#0f172a" },
      fontPreset: { type: String, trim: true, default: "inter" },
      buttonStyle: { type: String, trim: true, default: "solid" },
      buttonShadow: { type: String, trim: true, default: "none" },
      buttonRadius: { type: String, trim: true, default: "round" },
      primaryButtonsLayout: { type: String, trim: true, default: "stack" },
      primaryButtonContentAlign: {
        type: String,
        trim: true,
        default: "center",
      },
      primaryIconLayout: { type: String, trim: true, default: "circle_solid" },
      primaryIconSize: { type: String, trim: true, default: "md" },
      primaryIconBadgeColor: { type: String, trim: true, default: "" },
      primaryIconColor: { type: String, trim: true, default: "" },
      secondaryLinksStyle: { type: String, trim: true, default: "icon_text" },
      secondaryLinksIconLayout: {
        type: String,
        trim: true,
        default: "brand_badge",
      },
      secondaryLinksIconSize: { type: String, trim: true, default: "md" },
      secondaryLinksIconBadgeColor: { type: String, trim: true, default: "" },
      secondaryLinksIconColor: { type: String, trim: true, default: "" },
      secondaryLinksSize: { type: String, trim: true, default: "medium" },
      secondaryLinksAlign: { type: String, trim: true, default: "center" },
      secondaryLinksPosition: { type: String, trim: true, default: "bottom" },
      animationPreset: { type: String, trim: true, default: "subtle" },
    },
    links: { type: [linkSchema], default: [] },
    secondaryLinks: { type: [secondaryLinkSchema], default: [] },
    shop: {
      isActive: { type: Boolean, default: true },
      title: { type: String, trim: true, default: "Ver loja completa" },
      description: { type: String, trim: true, default: "0 produtos" },
      productsCount: { type: Number, default: 0 },
      products: { type: [shopProductSchema], default: [] },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

myPageSchema.pre("validate", function normalizeMyPageSlug(next) {
  if (this.slug) {
    this.slug = normalizeSlug(this.slug);
  }
  next();
});

const MyPage = mongoose.models.MyPage || mongoose.model("MyPage", myPageSchema);

export default MyPage;

