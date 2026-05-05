import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Copy, Share2, Sparkles, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import {
  getMyPageButtonIcon,
  getMyPagePrimaryIconProps,
  getMyPagePrimaryLinkLabel,
  getMyPageMotionPreset,
  getMyPageTheme,
  getPrimaryLinksLayout,
} from "./myPageTheme.js";
import {
  getPublicButtonProps,
  PublicPageHero,
  PublicPageLocationCard,
  PublicPageScreen,
  PublicPageSocialLinks,
} from "./PublicPageUi.jsx";
import {
  getShopPreviewLink,
  getShopPath,
  resolvePrimaryLinkHref,
  sortActiveProducts,
} from "./shopHelpers.js";

function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}

const PIX_KEY_TYPE_LABELS = {
  random: "Chave aleatória",
  cpf: "CPF",
  cnpj: "CNPJ",
  email: "E-mail",
  phone: "Telefone",
  other: "Outra chave",
};

function normalizePixKeyType(value = "") {
  const normalizedValue = String(value || "").trim().toLowerCase();
  return PIX_KEY_TYPE_LABELS[normalizedValue] ? normalizedValue : "random";
}

function getPixKeyTypeLabel(value = "") {
  return PIX_KEY_TYPE_LABELS[normalizePixKeyType(value)] || "Chave aleatória";
}

function getPixKey(link = {}) {
  return String(link?.pixKey || "").trim();
}

function getContentAlignClassName(theme) {
  return theme?.design?.primaryButtonContentAlign === "left" ||
    theme?.design?.primaryButtonContentAlign === "right"
    ? "is-content-left"
    : "is-content-center";
}

function sortActive(items = []) {
  return [...items]
    .filter((item) => item?.isActive)
    .sort(
      (left, right) => Number(left?.order ?? 0) - Number(right?.order ?? 0),
    );
}

function renderTitle(value, fallback) {
  return String(value || fallback || "").trim() || fallback;
}

function getPublicPagePath(page) {
  if (page?.slug) {
    return `/${page.slug}`;
  }

  return "/minha-pagina";
}

function getPublicPageUrl(page, interactive, absolute = true) {
  const path = getPublicPagePath(page);

  if (typeof window !== "undefined") {
    if (interactive && absolute) {
      return window.location.href;
    }

    if (absolute) {
      return new URL(path, window.location.origin).toString();
    }
  }

  return absolute ? `https://example.com${path}` : path;
}

function ActionContainer({
  interactive,
  href,
  className,
  style,
  children,
  ariaLabel,
  openInNewTab = false,
}) {
  if (interactive && href) {
    return (
      <a
        className={className}
        style={style}
        href={href}
        target={openInNewTab ? "_blank" : undefined}
        rel={openInNewTab ? "noreferrer" : undefined}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <div className={className} style={style} aria-label={ariaLabel}>
      {children}
    </div>
  );
}

function PrimaryLinkCard({
  link,
  interactive,
  page,
  theme,
  preview = false,
  onPixOpen,
}) {
  const Icon = getMyPageButtonIcon(link);
  const title = getMyPagePrimaryLinkLabel(link);
  const locationSubtitle =
    link?.type === "location" ? String(link?.address || "").trim() : "";
  const pixKey = link?.type === "pix" ? getPixKey(link) : "";
  const pixSubtitle =
    link?.type === "pix"
      ? pixKey
        ? getPixKeyTypeLabel(link?.pixKeyType)
        : "Chave PIX"
      : "";
  const subtitle = locationSubtitle || pixSubtitle;
  const contentAlignClassName = getContentAlignClassName(theme);
  const buttonProps = getPublicButtonProps(
    theme,
    "primary",
    cls(preview && "is-preview"),
  );
  const iconProps = getMyPagePrimaryIconProps(theme, preview ? "preview" : "public");
  const content = (
    <div className="public-page__cta-main">
      <div
        className={cls("public-page__cta-icon", iconProps.className)}
        style={iconProps.style}
      >
        <Icon className={iconProps.iconClassName} size={iconProps.iconSize} />
      </div>
      <div className={cls("public-page__cta-copy", contentAlignClassName)}>
        <strong>{title}</strong>
        {subtitle ? (
          <span className="public-page__cta-subtitle">{subtitle}</span>
        ) : null}
      </div>
      <div className="public-page__cta-balance" aria-hidden="true" />
    </div>
  );

  if (link?.type === "pix") {
    const canOpenPix = interactive && !preview && Boolean(pixKey);

    if (canOpenPix) {
      return (
        <button
          type="button"
          className={buttonProps.className}
          style={buttonProps.style}
          onClick={() => onPixOpen?.(link)}
          aria-label={title}
        >
          {content}
        </button>
      );
    }

    return (
      <div className={buttonProps.className} style={buttonProps.style} aria-label={title}>
        {content}
      </div>
    );
  }

  return (
    <ActionContainer
      interactive={interactive}
      href={resolvePrimaryLinkHref(link, page)}
      openInNewTab={
        link?.type !== "shop-preview" && /^https?:\/\//i.test(String(link?.url || "").trim())
      }
      className={buttonProps.className}
      style={buttonProps.style}
      ariaLabel={title}
      >
        {content}
      </ActionContainer>
    );
  }

function PixPaymentModal({ link, theme, onClose }) {
  const pixKey = getPixKey(link);
  const [copyStatus, setCopyStatus] = useState("");
  const title = getMyPagePrimaryLinkLabel(link);
  const keyTypeLabel = getPixKeyTypeLabel(link?.pixKeyType);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose?.();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  async function handleCopyKey() {
    if (!pixKey) {
      return;
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(pixKey);
        setCopyStatus("Chave copiada");
        return;
      }
    } catch (error) {
      void error;
    }

    setCopyStatus("Copie manualmente");
  }

  if (!pixKey) {
    return null;
  }

  return (
    <div className="public-page__pix-modal" role="dialog" aria-modal="true" aria-labelledby="public-pix-title">
      <button
        type="button"
        className="public-page__pix-backdrop"
        onClick={onClose}
        aria-label="Fechar PIX"
      />
      <div className="public-page__pix-panel" style={theme.surfaceStyle}>
        <button
          type="button"
          className="public-page__pix-close"
          onClick={onClose}
          aria-label="Fechar modal PIX"
        >
          <X size={18} aria-hidden="true" />
        </button>

        <div className="public-page__pix-header">
          <span>PIX</span>
          <h2 id="public-pix-title">{title}</h2>
          <p>Escaneie o QR Code ou copie a chave para pagar.</p>
        </div>

        <div className="public-page__pix-qr" aria-label={`QR Code PIX para ${title}`}>
          <QRCodeSVG
            value={pixKey}
            size={220}
            level="M"
            includeMargin={false}
            bgColor="#ffffff"
            fgColor="#111827"
          />
        </div>

        <div className="public-page__pix-key-box">
          <span>{keyTypeLabel}</span>
          <code>{pixKey}</code>
        </div>

        <button
          type="button"
          className="public-page__pix-copy"
          onClick={handleCopyKey}
        >
          {copyStatus === "Chave copiada" ? (
            <Check size={18} aria-hidden="true" />
          ) : (
            <Copy size={18} aria-hidden="true" />
          )}
          {copyStatus || "Copiar chave"}
        </button>

        <p className="public-page__pix-note">
          QR Code gerado com chave simples, sem valor definido.
        </p>
      </div>
    </div>
  );
}

function ShopCard({ page, shop, theme, interactive }) {
  const previewProducts = sortActiveProducts(shop?.products || []).slice(0, 4);
  const mosaicCount = previewProducts.length || 4;
  const mosaicItems = previewProducts.length
    ? previewProducts
    : Array.from({ length: 4 }, (_, index) => ({ id: `empty-${index}` }));

  return (
    <section
      className="public-page-section-card public-page__shop public-page__shop--preview"
      style={theme.surfaceStyle}
    >
      <ActionContainer
        interactive={interactive}
        href={getShopPath(page)}
        openInNewTab={false}
        className="public-page__shop-mosaic"
        style={theme.surfaceStyle}
        ariaLabel="Ver loja completa"
      >
        <div className={cls("public-page__shop-mosaic-grid", `is-count-${mosaicCount}`)}>
          {mosaicItems.map((product, index) => (
            <div
              key={product.id || index}
              className={cls(
                "public-page__shop-mosaic-cell",
                mosaicCount === 3 && index === 0 && "is-featured",
              )}
            >
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.title || "Produto da loja"} />
              ) : (
                <div className="public-page__shop-mosaic-placeholder">
                  <Sparkles size={18} />
                </div>
              )}
            </div>
          ))}
        </div>
      </ActionContainer>
      <ActionContainer
        interactive={interactive}
        href={getShopPath(page)}
        openInNewTab={false}
        className="public-page__shop-preview-cta"
        style={theme.bodyStyle}
        ariaLabel="Ver loja completa"
      >
        <strong>Ver loja completa</strong>
        <span>
          {Number(shop?.productsCount || 0)}{" "}
          {Number(shop?.productsCount || 0) === 1 ? "produto" : "produtos"}
        </span>
      </ActionContainer>
    </section>
  );
}

function ShopModeToggle({ page, isShopActive = false }) {
  const shopPath = getShopPath(page);
  const linksPath = `/${page?.slug || ""}`;

  return (
    <div className="public-page__shop-toggle" aria-label="Navegacao da pagina">
      <a
        href={linksPath}
        className={cls("public-page__shop-toggle-option", !isShopActive && "is-active")}
        aria-current={!isShopActive ? "page" : undefined}
      >
        Links
      </a>
      <a
        href={shopPath}
        className={cls("public-page__shop-toggle-option", isShopActive && "is-active")}
        aria-current={isShopActive ? "page" : undefined}
      >
        Shop
      </a>
    </div>
  );
}

export default function PublicPageSceneView({
  page,
  mode = "public",
  interactive = true,
}) {
  const previewMode = mode === "preview";
  const theme = getMyPageTheme(page || {});
  const animationSceneKey = `${mode}:${page?.slug || "preview"}:${theme?.design?.animationPreset || "subtle"}`;
  const shouldReduceMotion = useReducedMotion();
  const motionPreset = getMyPageMotionPreset(theme, shouldReduceMotion);
  const activeLinks = sortActive(page?.links || []);
  const shopPreviewLink = getShopPreviewLink(activeLinks);
  const orderedPrimaryItems = activeLinks;
  const activeShopProducts = sortActiveProducts(page?.shop?.products || []);
  const locationMapLinks = orderedPrimaryItems.filter(
    (link) => link?.type === "location" && link?.showMap === true && link?.address,
  );
  const socialLinks = sortActive(page?.secondaryLinks || []);
  const showSocialLinksOnTop = theme?.design?.secondaryLinksPosition === "top";
  const hasVisibleContent =
    orderedPrimaryItems.length ||
    socialLinks.length ||
    Boolean(shopPreviewLink) ||
    activeShopProducts.length;
  const publicUrl = getPublicPageUrl(page, interactive, true);
  const publicPath = getPublicPageUrl(page, interactive, false);
  const [shareFeedback, setShareFeedback] = useState("");
  const [activePixLink, setActivePixLink] = useState(null);

  useEffect(() => {
    if (!shareFeedback) return undefined;

    const timeoutId = window.setTimeout(() => {
      setShareFeedback("");
    }, 2200);

    return () => window.clearTimeout(timeoutId);
  }, [shareFeedback]);

  async function handleShare() {
    if (previewMode || !interactive || typeof window === "undefined") {
      return;
    }

    const shareData = {
      title: renderTitle(page?.title, "Minha página"),
      text: page?.bio || renderTitle(page?.title, "Minha página"),
      url: publicUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareFeedback("Link compartilhado.");
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(publicUrl);
        setShareFeedback("Link copiado.");
        return;
      }

      setShareFeedback("Compartilhamento indisponivel.");
    } catch (error) {
      if (error?.name === "AbortError") {
        return;
      }

      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(publicUrl);
          setShareFeedback("Link copiado.");
          return;
        }
      } catch (clipboardError) {
        void clipboardError;
      }

      setShareFeedback("Compartilhamento indisponivel.");
    }
  }

  return (
    <PublicPageScreen page={page} theme={theme} mode={mode}>
      <div className="public-page__stage">
        <div className="public-page__main-column">
          <motion.section
            key={animationSceneKey}
            className="public-page__shell"
            style={theme.shellStyle}
            variants={motionPreset.cardVariants}
            initial={motionPreset.wrapper.initial}
            animate={motionPreset.wrapper.animate}
          >
            <div className="public-page__shell-actions">
              {!previewMode ? (
                <>
                  <div
                    className="public-page__chrome-button is-passive"
                    style={theme.chromeButtonStyle}
                    aria-hidden="true"
                  >
                    <Sparkles size={18} />
                  </div>

                  <button
                    type="button"
                    className={cls(
                      "public-page__chrome-button",
                      !interactive ? "is-disabled" : "",
                    )}
                    style={theme.chromeButtonStyle}
                    onClick={handleShare}
                    disabled={!interactive}
                    aria-label="Compartilhar página"
                  >
                    <Share2 size={18} />
                  </button>
                </>
              ) : null}
            </div>

            {shareFeedback && !previewMode ? (
              <div
                className="public-page__share-feedback"
                style={theme.chromeButtonStyle}
              >
                {shareFeedback}
              </div>
            ) : null}

            <div className="public-page__shell-content">
              <motion.div
                className="public-page__shell-block"
                variants={motionPreset.cardVariants}
                initial={motionPreset.wrapper.initial}
                animate={motionPreset.wrapper.animate}
              >
                <PublicPageHero page={page} theme={theme} />
                {shopPreviewLink ? <ShopModeToggle page={page} /> : null}
                {showSocialLinksOnTop && socialLinks.length ? (
                  <PublicPageSocialLinks
                    theme={theme}
                    links={socialLinks}
                    interactive={interactive}
                    className="public-page__hero-socials"
                  />
                ) : null}
              </motion.div>

              {orderedPrimaryItems.length ? (
                <motion.div
                  className={cls(
                    "public-page__shell-block",
                    getPrimaryLinksLayout(theme),
                  )}
                  initial={motionPreset.wrapper.initial}
                  animate={motionPreset.wrapper.animate}
                  variants={motionPreset.containerVariants}
                >
                  {orderedPrimaryItems.map((link) => (
                    <motion.div
                      key={link.id}
                      variants={motionPreset.itemVariants}
                    >
                      {link?.type === "shop-preview" ? (
                        <ShopCard
                          page={page}
                          shop={page.shop}
                          theme={theme}
                          interactive={interactive}
                        />
                      ) : (
                        <PrimaryLinkCard
                          link={link}
                          interactive={interactive}
                          page={page}
                          theme={theme}
                          preview={previewMode}
                          onPixOpen={(pixLink) => setActivePixLink(pixLink)}
                        />
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              ) : null}

              {locationMapLinks.length ? (
                <motion.div
                  className="public-page__shell-block public-page__location-stack public-page__shell-block--location"
                  initial={motionPreset.wrapper.initial}
                  animate={motionPreset.wrapper.animate}
                  variants={motionPreset.containerVariants}
                >
                  {locationMapLinks.map((link) => (
                    <motion.div key={`${link.id}-map`} variants={motionPreset.itemVariants}>
                      <PublicPageLocationCard
                        link={link}
                        theme={theme}
                        interactive={interactive}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : null}

              {!showSocialLinksOnTop && socialLinks.length ? (
                <motion.div
                  className="public-page__shell-block public-page-section-card public-page__social-shell"
                  variants={motionPreset.cardVariants}
                  initial={motionPreset.wrapper.initial}
                  animate={motionPreset.wrapper.animate}
                >
                  <PublicPageSocialLinks
                    theme={theme}
                    links={socialLinks}
                    interactive={interactive}
                  />
                </motion.div>
              ) : null}

              {!hasVisibleContent ? (
                <motion.div
                  className="public-page__shell-block public-page__empty public-page__empty--standalone"
                  variants={motionPreset.cardVariants}
                  initial={motionPreset.wrapper.initial}
                  animate={motionPreset.wrapper.animate}
                >
                  Seu conteudo ativo aparecera aqui assim que voce habilitar
                  links ou o bloco de shop.
                </motion.div>
              ) : null}
            </div>
          </motion.section>

          <div className="public-page__micro-footer">
            Página pública | Compartilhável | Responsiva
          </div>
        </div>

        {!previewMode ? (
          <aside
            className="public-page__desktop-aside"
            style={theme.qrPanelStyle}
          >
            <span className="public-page__aside-label">Ver no mobile</span>
            <div className="public-page__qr-card">
              <QRCodeSVG
                value={publicUrl}
                size={132}
                level="M"
                includeMargin={false}
                bgColor="#ffffff"
                fgColor="#111827"
              />
            </div>
            <span className="public-page__aside-url">{publicPath}</span>
          </aside>
        ) : null}
      </div>

      {activePixLink && !previewMode && interactive ? (
        <PixPaymentModal
          link={activePixLink}
          theme={theme}
          onClose={() => setActivePixLink(null)}
        />
      ) : null}
    </PublicPageScreen>
  );
}

