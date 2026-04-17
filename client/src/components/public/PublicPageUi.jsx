import { Link2 } from "lucide-react";
import { getButtonProps, getButtonRadiusClassName } from "./buttonTheme.js";
import {
  getMyPageButtonIcon,
  getMyPageButtonMeta,
  getMyPageSocialLabel,
  getMyPageSocialBrand,
  getMyPageTheme,
  getPrimaryLinksLayout,
  getSecondaryLinksLayout,
} from "./myPageTheme.js";

function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}

function resolveMyPageMediaUrl(value) {
  const sample = String(value || "").trim();
  return sample || "";
}

export function getPublicButtonProps(theme, variant = "primary", className = "") {
  return getButtonProps(theme, variant, className);
}

export function getPublicSurfaceProps(theme, variant = "default", className = "") {
  return {
    className: cls("public-page-section-card", variant === "soft" && "is-soft", className),
    style: variant === "soft" ? theme.softSurfaceStyle : theme.surfaceStyle,
  };
}

function ActionContainer({
  interactive = true,
  href = "",
  className,
  style,
  title,
  children,
}) {
  if (interactive && href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={className}
        style={style}
        aria-label={title}
      >
        {children}
      </a>
    );
  }

  return (
    <div className={className} style={style} aria-label={title}>
      {children}
    </div>
  );
}

export function PublicPageBackgroundOverlay({ theme, className = "" }) {
  return (
    <div className={cls("public-page-screen__background", className)} aria-hidden="true">
      <div
        className="public-page-screen__orb public-page-screen__orb--top"
        style={{
          background: `radial-gradient(circle, ${theme.design.buttonColor} 0%, transparent 68%)`,
        }}
      />
      <div
        className="public-page-screen__orb public-page-screen__orb--bottom"
        style={{
          background: `radial-gradient(circle, ${theme.design.surfaceColor} 0%, transparent 72%)`,
        }}
      />
    </div>
  );
}

export function PublicPageScreen({
  page,
  theme: providedTheme,
  mode = "public",
  children,
}) {
  const theme = providedTheme || getMyPageTheme(page || {});
  const previewMode = mode === "preview";

  return (
    <div
      className={cls("public-page", previewMode && "public-page--preview")}
      style={theme.rootStyle}
    >
      <PublicPageBackgroundOverlay theme={theme} />
      <div className="public-page-screen__content">
        {typeof children === "function" ? children(theme) : children}
      </div>
    </div>
  );
}

export function PublicPageCard({
  theme,
  variant = "default",
  className = "",
  children,
}) {
  const props = getPublicSurfaceProps(theme, variant, className);
  return (
    <section className={props.className} style={props.style}>
      {children}
    </section>
  );
}

export function PublicPageAvatar({
  page,
  theme,
  compact = false,
}) {
  const avatarSrc = resolveMyPageMediaUrl(page?.avatarUrl);

  return (
    <div
      className={cls("public-page__hero-avatar-wrap", compact && "is-compact")}
      style={theme.chromeButtonStyle}
    >
      {avatarSrc ? (
        <img
          src={avatarSrc}
          alt={page?.title || "Minha pagina"}
          className={cls("public-page__hero-avatar", compact && "is-compact")}
        />
      ) : (
        <div
          className={cls(
            "public-page__hero-avatar",
            "public-page__hero-avatar--placeholder",
            compact && "is-compact",
          )}
          style={theme.primaryButtonStyle}
        >
          <Link2 />
        </div>
      )}
    </div>
  );
}

export function PublicPageHero({
  page,
  theme,
  eyebrow = "",
  title,
  description,
  compact = false,
}) {
  const titleValue = String(title || page?.title || "Minha pagina").trim();
  const descriptionValue =
    description ?? page?.bio ?? "Comece a editar sua bio na area administrativa.";
  const shouldShowEyebrow = Boolean(eyebrow);

  return (
    <div
      className={cls(
        "public-page__hero-shell",
        theme?.usesHeroLayout && "is-hero-layout",
        compact && "is-compact",
      )}
    >
      {theme?.usesHeroLayout ? (
        <div className="public-page__hero-media" style={theme.heroMediaStyle} />
      ) : null}

      <div className={cls("public-page__hero", compact && "is-compact")}>
        <PublicPageAvatar page={page} theme={theme} compact={compact} />

        <div className={cls("public-page__hero-copy", compact && "is-compact")}>
          {shouldShowEyebrow ? (
            <span className="public-page__hero-eyebrow" style={theme.accentTextStyle}>
              {eyebrow}
            </span>
          ) : null}
          <h1 className="public-page__hero-title" style={theme.titleStyle}>
            {titleValue}
          </h1>
          {descriptionValue ? (
            <p className="public-page__hero-bio" style={theme.bodyStyle}>
              {descriptionValue}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function PublicPageSocialLinks({
  theme,
  links = [],
  interactive = true,
  compact = false,
  className = "",
  forceIconOnly = false,
}) {
  const items = Array.isArray(links)
    ? links.filter((link) => link?.url)
    : [];

  if (!items.length) return null;

  const layout = getSecondaryLinksLayout(theme);
  const iconOnly = forceIconOnly || theme?.design?.secondaryLinksStyle === "icon";
  const textOnly = theme?.design?.secondaryLinksStyle === "text";
  const useBadge = theme?.design?.secondaryLinksIconLayout !== "plain";
  const radiusClassName = getButtonRadiusClassName(theme);

  return (
    <div
      className={cls(
        layout.containerClassName,
        compact && "is-compact",
        className,
      )}
    >
      {items.map((link, index) => {
        const brand = getMyPageSocialBrand(link);
        const Icon = brand.Icon;
        const label = getMyPageSocialLabel(link);

        return (
          <ActionContainer
            key={link.id || `${brand.platform}:${index}`}
            interactive={interactive}
            href={link.url}
            className={cls(
              "public-page__social-chip",
              radiusClassName,
              layout.size === "small" && "is-small",
              iconOnly && "is-icon-only",
              textOnly && "is-text-only",
              compact && "is-compact",
            )}
            style={theme.secondaryButtonStyle}
            title={label}
          >
            {textOnly ? null : (
              <span
                className={cls(
                  "public-page__social-badge",
                  radiusClassName,
                  compact && "is-compact",
                )}
                style={
                  useBadge
                    ? brand.badgeStyle || theme.softSurfaceStyle
                    : theme.softSurfaceStyle
                }
              >
                <Icon />
              </span>
            )}
            {iconOnly ? null : (
              <span className="public-page__social-label">{label}</span>
            )}
          </ActionContainer>
        );
      })}
    </div>
  );
}

function buildGoogleMapsEmbedUrl(link = {}) {
  const query = String(link?.address || link?.placeId || "").trim();
  if (!query) return "";
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`;
}

export function PublicPageLocationCard({
  link,
  theme,
  interactive = true,
  className = "",
}) {
  if (!link?.address || link?.showMap !== true) {
    return null;
  }

  const Icon = getMyPageButtonIcon(link);
  const title = String(link?.title || "Localizacao").trim();
  const embedUrl = buildGoogleMapsEmbedUrl(link);
  const buttonProps = getPublicButtonProps(
    theme,
    "secondary",
    "public-page__location-cta public-page__location-route-chip",
  );

  return (
    <section
      className={cls("public-page-section-card", "public-page__location-card", className)}
      style={theme.softSurfaceStyle}
    >
      <div className="public-page__location-header">
        <div className="public-page__location-copy">
          <span className="public-page__section-eyebrow">Localizacao</span>
          <h2 style={theme.titleStyle}>{title}</h2>
          <p className="public-page__location-address" style={theme.bodyStyle}>
            {link.address}
          </p>
        </div>

        <div className="public-page__location-badge" style={theme.secondaryButtonStyle}>
          <Icon className="public-page__cta-icon-svg" />
        </div>
      </div>

      {embedUrl ? (
        <div className="public-page__location-map-shell">
          <iframe
            title={`Mapa de ${title}`}
            src={embedUrl}
            className="public-page__location-map"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      ) : (
        <div className="public-page__location-map-fallback" style={theme.surfaceStyle}>
          Mapa indisponivel para este endereco.
        </div>
      )}

      <div className="public-page__location-footer">
        <span className="public-page__location-footer-copy">Abrir no Google Maps</span>
        <ActionContainer
          interactive={interactive}
          href={link?.url}
          className={buttonProps.className}
          style={buttonProps.style}
          title={`Abrir rota para ${title}`}
        >
          <span className="public-page__location-footer-button">Ver rota</span>
        </ActionContainer>
      </div>
    </section>
  );
}

function PreviewActionButton({ link, theme, compact = false }) {
  const props = getPublicButtonProps(
    theme,
    "primary",
    cls(compact && "is-preview"),
  );
  const Icon = getMyPageButtonIcon(link);
  const title = String(link?.title || "Novo link").trim();

  return (
    <div className={props.className} style={props.style}>
      <div className="public-page__cta-main">
        <div
          className={cls(
            "public-page__cta-icon",
          )}
          style={theme.secondaryButtonStyle}
        >
          <Icon className="public-page__cta-icon-svg" />
        </div>
        <div className="public-page__cta-copy">
          <span className="public-page__cta-meta">{getMyPageButtonMeta(link)}</span>
          <strong>{title}</strong>
        </div>
      </div>
    </div>
  );
}

export function PublicPageMiniPreview({
  page,
  theme,
  primaryLinks = [],
  socialLinks = [],
  className = "",
  eyebrow = "Minha pagina",
  description,
  showButtons = true,
  showSocial = false,
  buttonCount = 2,
  socialCount = 3,
}) {
  const primary = Array.isArray(primaryLinks) ? primaryLinks.slice(0, buttonCount) : [];
  const social = Array.isArray(socialLinks) ? socialLinks.slice(0, socialCount) : [];
  const buttonLayoutClassName = getPrimaryLinksLayout(theme);

  return (
    <div className={cls("public-page-mini", className)} style={theme.rootStyle}>
      <PublicPageBackgroundOverlay theme={theme} className="public-page-mini__background" />
      <div className="public-page-mini__frame">
        <PublicPageCard theme={theme} className="public-page-mini__card">
          <PublicPageHero
            page={page}
            theme={theme}
            eyebrow={eyebrow}
            description={description}
            compact
          />

          {showButtons && primary.length ? (
            <div className={cls("public-page-mini__buttons", buttonLayoutClassName)}>
              {primary.map((link) => (
                <PreviewActionButton
                  key={link.id || link.title}
                  link={link}
                  theme={theme}
                  compact
                />
              ))}
            </div>
          ) : null}

          {showSocial && social.length ? (
            <PublicPageSocialLinks
              theme={theme}
              links={social}
              interactive={false}
              compact
              className="public-page-mini__socials"
            />
          ) : null}
        </PublicPageCard>
      </div>
    </div>
  );
}
