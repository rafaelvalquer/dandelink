import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Share2, Sparkles } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import {
  getMyPageButtonIcon,
  getMyPageButtonMeta,
  getMyPageSocialLabel,
  getMyPageMotionPreset,
  getMyPageSocialBrand,
  getMyPageTheme,
  getPrimaryLinksLayout,
  getSecondaryLinksLayout,
} from "./myPageTheme.js";
import { PublicPageLocationCard } from "./PublicPageUi.jsx";

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

function HeroAvatar({ page }) {
  if (page?.avatarUrl) {
    return (
      <img
        className="public-page__hero-avatar"
        src={page.avatarUrl}
        alt={page?.title || "Avatar da pagina"}
      />
    );
  }

  return (
    <div className="public-page__hero-avatar public-page__hero-avatar--placeholder">
      <span>{String(page?.title || "M").slice(0, 1)}</span>
    </div>
  );
}

function PrimaryLinkCard({ link, interactive, theme, preview = false }) {
  const Icon = getMyPageButtonIcon(link);
  const title = renderTitle(link?.title, "Novo link");
  const meta = getMyPageButtonMeta(link);

  return (
    <ActionContainer
      interactive={interactive}
      href={link?.url}
      className={cls("public-page__cta", preview ? "is-preview" : "")}
      style={theme.primaryButtonStyle}
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
      <span className="public-page__cta-arrow">
        {interactive ? "Abrir" : "Preview"}
      </span>
    </ActionContainer>
  );
}

function SecondaryLinkChip({ link, theme, interactive }) {
  const brand = getMyPageSocialBrand(link);
  const layout = getSecondaryLinksLayout(theme);
  const label = getMyPageSocialLabel(link);
  const Icon = brand.Icon;
  const iconOnly = theme?.design?.secondaryLinksStyle === "icon";
  const textOnly = theme?.design?.secondaryLinksStyle === "text";
  const showIcon = theme?.design?.secondaryLinksStyle !== "text";
  const useBadge = theme?.design?.secondaryLinksIconLayout !== "plain";

  return (
    <ActionContainer
      interactive={interactive}
      href={link?.url}
      className={cls(
        "public-page__social-chip",
        iconOnly ? "is-icon-only" : "",
        textOnly ? "is-text-only" : "",
        `is-${layout.size}`,
      )}
      style={theme.secondaryButtonStyle}
      ariaLabel={label}
    >
      {showIcon ? (
        <span
          className={cls(
            "public-page__social-badge",
            useBadge ? "is-badge" : "is-plain",
          )}
          style={
            useBadge ? brand.badgeStyle || theme.softSurfaceStyle : undefined
          }
        >
          <Icon />
        </span>
      ) : null}
      {iconOnly ? null : (
        <span className="public-page__social-label">{label}</span>
      )}
    </ActionContainer>
  );
}

function ShopCard({ shop, theme }) {
  return (
    <section className="public-page__shop" style={theme.surfaceStyle}>
      <div className="public-page__section-header">
        <div className="public-page__section-title">
          <div
            className="public-page__section-icon"
            style={theme.primaryButtonStyle}
          >
            <Sparkles className="public-page__section-icon-svg" />
          </div>
          <div>
            <span className="public-page__section-eyebrow">Shop</span>
            <h2>{renderTitle(shop?.title, "Loja")}</h2>
          </div>
        </div>
        <span className="public-page__section-counter">
          {Number(shop?.productsCount || 0)} produtos
        </span>
      </div>
      <p className="public-page__shop-copy">
        {shop?.description ||
          "Configure este bloco de loja no painel administrativo."}
      </p>
    </section>
  );
}

export default function PublicPageScene({
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
  const linksLayout = getPrimaryLinksLayout(theme);
  const secondaryLayout = getSecondaryLinksLayout(theme);
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
    <div
      className={cls("public-page", previewMode ? "public-page--preview" : "")}
      style={theme.rootStyle}
    >
      <div className="public-page__halo public-page__halo--top" />
      <div className="public-page__halo public-page__halo--bottom" />

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
                  previewMode || !interactive ? "is-disabled" : "",
                )}
                style={theme.chromeButtonStyle}
                onClick={handleShare}
                disabled={previewMode || !interactive}
                aria-label="Compartilhar pagina"
              >
                <Share2 size={18} />
              </button>
            </div>

            {shareFeedback ? (
              <div
                className="public-page__share-feedback"
                style={theme.chromeButtonStyle}
              >
                {shareFeedback}
              </div>
            ) : null}

            <div className="public-page__shell-content">
              <motion.section
                className={cls(
                  "public-page__hero-shell",
                  theme.usesHeroLayout ? "is-hero-layout" : "",
                )}
                variants={motionPreset.cardVariants}
                initial={motionPreset.wrapper.initial}
                animate={motionPreset.wrapper.animate}
              >
                {theme.usesHeroLayout ? (
                  <div
                    className="public-page__hero-media"
                    style={theme.heroMediaStyle}
                  />
                ) : null}

                <div className="public-page__hero">
                  <div
                    className="public-page__hero-avatar-wrap"
                    style={theme.chromeButtonStyle}
                  >
                    <HeroAvatar page={page} />
                  </div>

                  <div className="public-page__hero-copy">
                    <h1
                      className="public-page__hero-title"
                      style={theme.titleStyle}
                    >
                      {renderTitle(page?.title, "Minha pagina")}
                    </h1>
                    <p className="public-page__hero-bio">
                      {page?.bio ||
                        "Comece a editar sua bio na area administrativa."}
                    </p>
                  </div>
                </div>
              </motion.section>

              {primaryLinks.length ? (
                <motion.div
                  className={linksLayout}
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
                  className="public-page__location-stack public-page__shell-block--location"
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
                <motion.section
                  className="public-page__social-shell"
                  style={theme.softSurfaceStyle}
                  variants={motionPreset.cardVariants}
                  initial={motionPreset.wrapper.initial}
                  animate={motionPreset.wrapper.animate}
                >
                  <div className="public-page__social-header">
                    <span className="public-page__section-eyebrow">
                      Redes sociais
                    </span>
                    <strong style={theme.titleStyle}>
                      Continue acompanhando
                    </strong>
                  </div>
                  <div className={secondaryLayout.containerClassName}>
                    {socialLinks.map((link) => (
                      <SecondaryLinkChip
                        key={link.id}
                        link={link}
                        theme={theme}
                        interactive={interactive}
                      />
                    ))}
                  </div>
                </motion.section>
              ) : null}

              {page?.shop?.isActive ? (
                <motion.div
                  variants={motionPreset.cardVariants}
                  initial={motionPreset.wrapper.initial}
                  animate={motionPreset.wrapper.animate}
                >
                  <ShopCard shop={page.shop} theme={theme} />
                </motion.div>
              ) : null}

              {!hasVisibleContent ? (
                <motion.div
                  className="public-page__empty public-page__empty--standalone"
                  style={theme.softSurfaceStyle}
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
            Pagina publica • Compartilhavel • Responsiva
          </div>
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
  );
}
