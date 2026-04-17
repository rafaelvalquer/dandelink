import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Share2, Sparkles } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import {
  getMyPageButtonIcon,
  getMyPageButtonMeta,
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

function cls(...parts) {
  return parts.filter(Boolean).join(" ");
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
}) {
  if (interactive && href) {
    return (
      <a
        className={className}
        style={style}
        href={href}
        target="_blank"
        rel="noreferrer"
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

function PrimaryLinkCard({ link, interactive, theme, preview = false }) {
  const Icon = getMyPageButtonIcon(link);
  const title = renderTitle(link?.title, "Novo link");
  const meta = getMyPageButtonMeta(link);
  const buttonProps = getPublicButtonProps(
    theme,
    "primary",
    cls(preview && "is-preview"),
  );

  return (
    <ActionContainer
      interactive={interactive}
      href={link?.url}
      className={buttonProps.className}
      style={buttonProps.style}
      ariaLabel={title}
    >
      <div className="public-page__cta-main">
        <div
          className="public-page__cta-icon"
          style={theme.secondaryButtonStyle}
        >
          <Icon className="public-page__cta-icon-svg" />
        </div>
        <div className="public-page__cta-copy">
          <span className="public-page__cta-meta">{meta}</span>
          <strong>{title}</strong>
        </div>
      </div>
    </ActionContainer>
  );
}

function ShopCard({ shop, theme }) {
  return (
    <section className="public-page-section-card public-page__shop">
      <div className="public-page-section-card__header public-page__section-header">
        <div className="public-page-section-card__title public-page__section-title">
          <div
            className="public-page-section-card__icon public-page__section-icon"
            style={theme.primaryButtonStyle}
          >
            <Sparkles className="public-page-section-card__icon-svg public-page__section-icon-svg" />
          </div>
          <div className="public-page-section-card__copy">
            <span className="public-page-section-card__eyebrow public-page__section-eyebrow">
              Shop
            </span>
            <h2 style={theme.titleStyle}>{renderTitle(shop?.title, "Loja")}</h2>
          </div>
        </div>
        <span className="public-page-section-card__count public-page__section-counter">
          {Number(shop?.productsCount || 0)} produtos
        </span>
      </div>
      <p
        className="public-page-section-card__description public-page__shop-copy"
        style={theme.bodyStyle}
      >
        {shop?.description ||
          "Configure este bloco de loja no painel administrativo."}
      </p>
    </section>
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
  const primaryLinks = activeLinks;
  const locationMapLinks = primaryLinks.filter(
    (link) => link?.type === "location" && link?.showMap === true && link?.address,
  );
  const socialLinks = sortActive(page?.secondaryLinks || []);
  const hasVisibleContent =
    primaryLinks.length || socialLinks.length || page?.shop?.isActive;
  const publicUrl = getPublicPageUrl(page, interactive, true);
  const publicPath = getPublicPageUrl(page, interactive, false);
  const [shareFeedback, setShareFeedback] = useState("");

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
      title: renderTitle(page?.title, "Minha pagina"),
      text: page?.bio || renderTitle(page?.title, "Minha pagina"),
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
                    aria-label="Compartilhar pagina"
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
              </motion.div>

              {primaryLinks.length ? (
                <motion.div
                  className={cls(
                    "public-page__shell-block",
                    getPrimaryLinksLayout(theme),
                  )}
                  initial={motionPreset.wrapper.initial}
                  animate={motionPreset.wrapper.animate}
                  variants={motionPreset.containerVariants}
                >
                  {primaryLinks.map((link) => (
                    <motion.div
                      key={link.id}
                      variants={motionPreset.itemVariants}
                    >
                      <PrimaryLinkCard
                        link={link}
                        interactive={interactive}
                        theme={theme}
                        preview={previewMode}
                      />
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

              {socialLinks.length ? (
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

              {page?.shop?.isActive ? (
                <motion.div
                  className="public-page__shell-block public-page__shell-subsection"
                  variants={motionPreset.cardVariants}
                  initial={motionPreset.wrapper.initial}
                  animate={motionPreset.wrapper.animate}
                >
                  <ShopCard shop={page.shop} theme={theme} />
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
            Pagina publica | Compartilhavel | Responsiva
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
                bgColor="transparent"
                fgColor={theme.design.titleTextColor}
              />
            </div>
            <span className="public-page__aside-url">{publicPath}</span>
          </aside>
        ) : null}
      </div>
    </PublicPageScreen>
  );
}
