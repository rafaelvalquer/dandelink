import { useEffect, useMemo, useState } from "react";
import {
  Image,
  Layers3,
  MousePointerClick,
  Palette,
  Share2,
  Sparkles,
  SquareStack,
  SwatchBook,
  Type,
} from "lucide-react";
import ButtonShadowEditor from "./ButtonShadowEditor.jsx";
import ButtonThemePreview from "./ButtonThemePreview.jsx";
import {
  MY_PAGE_ANIMATION_PRESET_OPTIONS,
  MY_PAGE_BACKGROUND_GRADIENT_DIRECTION_OPTIONS,
  MY_PAGE_BACKGROUND_PATTERN_VARIANT_OPTIONS,
  MY_PAGE_BACKGROUND_STYLE_OPTIONS,
  MY_PAGE_BRAND_LAYOUT_OPTIONS,
  MY_PAGE_ICON_SIZE_OPTIONS,
  MY_PAGE_PRIMARY_BUTTON_CONTENT_ALIGN_OPTIONS,
  MY_PAGE_PRIMARY_ICON_LAYOUT_OPTIONS,
  MY_PAGE_PRIMARY_BUTTON_LAYOUT_OPTIONS,
  MY_PAGE_BUTTON_RADIUS_OPTIONS,
  MY_PAGE_BUTTON_STYLE_OPTIONS,
  MY_PAGE_FONT_PRESET_OPTIONS,
  MY_PAGE_SECONDARY_LINK_ALIGN_OPTIONS,
  MY_PAGE_SECONDARY_LINK_ICON_LAYOUT_OPTIONS,
  MY_PAGE_SECONDARY_LINK_POSITION_OPTIONS,
  MY_PAGE_SECONDARY_LINK_SIZE_OPTIONS,
  MY_PAGE_SECONDARY_LINK_STYLE_OPTIONS,
  MY_PAGE_SURFACE_PATTERN_VARIANT_OPTIONS,
  MY_PAGE_SURFACE_STYLE_OPTIONS,
  MY_PAGE_THEME_PRESET_OPTIONS,
  createMyPageThemePreviewPage,
  getMyPagePreviewPrimaryLinks,
  getMyPageSecondaryIconProps,
  getMyPagePreviewSocialLinks,
  getMyPageSocialLabel,
  getMyPageThemePresetValues,
  getMyPageSocialBrand,
  getMyPageTheme,
} from "../public/myPageTheme.js";

const DESIGN_CATEGORIES = [
  {
    id: "marca",
    label: "Marca",
    title: "Avatar ou Hero",
    description: "Use a mesma imagem da página como avatar ou como fundo.",
    Icon: Image,
  },
  {
    id: "tema",
    label: "Tema",
    title: "Escolha um preset",
    description:
      "O tema aplica um ponto de partida completo para cor, fundo, fonte e botões.",
    Icon: SwatchBook,
  },
  {
    id: "fundo",
    label: "Fundo",
    title: "Escolha o estilo do fundo",
    description: "Defina o estilo, a direção e a textura do fundo.",
    Icon: Layers3,
  },
  {
    id: "superficie",
    label: "Superfície",
    title: "Container da frente",
    description: "Controle a camada onde ficam logo, títulos, botões e formulários.",
    Icon: SquareStack,
  },
  {
    id: "fonte",
    label: "Fonte",
    title: "Escolha a tipografia",
    description: "A fonte vale para página, catálogo, formulário e pagamento.",
    Icon: Type,
  },
  {
    id: "botao",
    label: "Botão",
    title: "Acabamento, forma e hierarquia",
    description: "Defina o peso visual dos CTAs sem mudar a lógica da página.",
    Icon: MousePointerClick,
  },
  {
    id: "redes",
    label: "Redes",
    title: "Links secundários",
    description: "Controle conteúdo, tamanho e alinhamento das redes na home.",
    Icon: Share2,
  },
  {
    id: "animacao",
    label: "Animação",
    title: "Movimento no público",
    description: "Escolha o ritmo visual de entrada da página pública.",
    Icon: Sparkles,
  },
  {
    id: "cor",
    label: "Cor",
    title: "Ajuste cada cor do público",
    description: "Controle fundo, botões e textos com liberdade total em cima do tema.",
    Icon: Palette,
  },
];

const DESIGN_COPY_FIXES = {};

function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}

function fixCopy(value) {
  return DESIGN_COPY_FIXES[value] || value;
}

function normalizeColor(value, fallback) {
  const sample = String(value || "").trim();
  if (/^#[0-9a-f]{6}$/i.test(sample)) return sample.toLowerCase();
  if (/^[0-9a-f]{6}$/i.test(sample)) return `#${sample.toLowerCase()}`;
  return fallback;
}

function OptionGrid({ columns = "3", children }) {
  return <div className={cls("design-options-grid", `is-${columns}`)}>{children}</div>;
}

function OptionCard({ selected, title, description, preview, onClick }) {
  return (
    <button
      type="button"
      className={cls("design-option-card", selected ? "is-selected" : "")}
      onClick={onClick}
    >
      <div className="design-option-card__preview">{preview}</div>
      <div className="design-option-card__body">
        <strong>{title}</strong>
        <span>{description}</span>
      </div>
    </button>
  );
}

function ChoiceButtons({ value, options, onChange }) {
  return (
    <div className="design-choice-buttons">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={cls(
            "design-choice-buttons__item",
            value === option.value ? "is-selected" : "",
          )}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function ColorRow({ label, value, fallback, onChange, disabled = false, hint = "" }) {
  const [draft, setDraft] = useState(value || fallback);

  useEffect(() => {
    setDraft(value || fallback);
  }, [value, fallback]);

  function commit(nextValue) {
    const normalized = normalizeColor(nextValue, fallback);
    setDraft(normalized);
    onChange(normalized);
  }

  return (
    <div className={cls("design-color-row", disabled && "is-disabled")}>
      <label className="design-color-row__label">{label}</label>
      <div className="design-color-row__control">
        <input
          className="ui-input design-color-row__input"
          type="text"
          value={draft}
          maxLength={7}
          disabled={disabled}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={(event) => commit(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              commit(draft);
            }
          }}
        />
        <input
          className="design-color-row__swatch"
          type="color"
          value={normalizeColor(value, fallback)}
          disabled={disabled}
          onChange={(event) => commit(event.target.value)}
        />
      </div>
      {hint ? <p className="design-color-row__hint">{hint}</p> : null}
    </div>
  );
}

function BrandPreview({ page, theme, mode }) {
  const modeDescription = {
    hero: "Imagem no fundo.",
    banner: "Capa com avatar sobreposto.",
    spotlight: "Logo grande e centralizado.",
    split: "Avatar e textos lado a lado.",
    editorial: "Tipografia editorial com marca refinada.",
    catalog: "Marca compacta para vitrine.",
    campaign: "Destaque visual para campanha.",
  };

  return (
    <div className="design-mini-page" style={theme.rootStyle}>
      {mode === "hero" || mode === "banner" ? (
        <div className="design-mini-page__hero-cover" style={theme.heroMediaStyle} />
      ) : null}
      <div className="design-mini-page__surface" style={theme.surfaceStyle}>
        <div className={cls(
          "design-mini-page__hero",
          mode === "spotlight" && "is-spotlight",
          mode === "split" && "is-split",
          mode === "editorial" && "is-editorial",
          mode === "catalog" && "is-catalog",
          mode === "campaign" && "is-campaign",
        )}>
          {mode === "hero" ? null : (
            <div className={cls(
              "design-mini-page__avatar-shell",
              mode === "spotlight" && "is-spotlight",
              mode === "split" && "is-split",
              mode === "editorial" && "is-editorial",
              mode === "catalog" && "is-catalog",
              mode === "campaign" && "is-campaign",
            )}>
              {page?.avatarUrl ? (
                <img
                  className={cls(
                    "design-mini-page__avatar",
                    mode === "spotlight" && "is-spotlight",
                    mode === "split" && "is-split",
                    mode === "editorial" && "is-editorial",
                    mode === "catalog" && "is-catalog",
                    mode === "campaign" && "is-campaign",
                  )}
                  src={page.avatarUrl}
                  alt={fixCopy(page?.title || "Minha Página")}
                />
              ) : (
                <div
                  className={cls(
                    "design-mini-page__avatar",
                    "design-mini-page__avatar--placeholder",
                    mode === "spotlight" && "is-spotlight",
                    mode === "split" && "is-split",
                    mode === "editorial" && "is-editorial",
                    mode === "catalog" && "is-catalog",
                    mode === "campaign" && "is-campaign",
                  )}
                >
                  {String(page?.title || "M").slice(0, 1)}
                </div>
              )}
            </div>
          )}
          <div className={cls(
            "design-mini-page__copy",
            mode === "spotlight" && "is-spotlight",
            mode === "split" && "is-split",
            mode === "editorial" && "is-editorial",
            mode === "catalog" && "is-catalog",
            mode === "campaign" && "is-campaign",
          )}>
            <span style={theme.accentTextStyle}>Avatar ou Hero</span>
            <strong style={theme.titleStyle}>{fixCopy(page?.title || "Minha Página")}</strong>
            <small>
              {modeDescription[mode] || "Avatar redondo."}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

function ThemePreview({ page, theme, option }) {
  const previewTitle = fixCopy(option?.previewTitle || page?.title || "Minha Página");
  const previewLabel = option?.previewLabel || option?.label || "Tema";
  const previewCtaLabel = option?.previewCtaLabel || "Ver layout";
  const previewVariant = option?.previewVariant || "airy";
  const previewArtwork = option?.previewArtwork || "paper";

  return (
    <div
      className={cls("design-mini-page", "design-theme-preview", `is-${previewVariant}`)}
      style={theme.rootStyle}
    >
      <div
        className={cls(
          "design-theme-preview__artwork",
          `is-${previewArtwork}`,
          `is-${previewVariant}`,
        )}
      />
      <div className="design-theme-preview__shell" style={theme.surfaceStyle}>
        <div className="design-theme-preview__masthead">
          <span className="design-theme-preview__type" style={theme.titleStyle}>
            Aa
          </span>
          <span className="design-theme-preview__label" style={theme.accentTextStyle}>
            {previewLabel}
          </span>
        </div>
        <strong style={theme.titleStyle}>{previewTitle}</strong>
        <div
          className={cls(
            "design-mini-page__button",
            "design-theme-preview__button",
            `is-${previewVariant}`,
          )}
          style={theme.primaryButtonStyle}
        >
          {previewCtaLabel}
        </div>
      </div>
    </div>
  );
}

function BackgroundPreview({ theme }) {
  return (
    <div className="design-mini-page" style={theme.rootStyle}>
      <div className="design-preview-block" />
    </div>
  );
}

function SurfacePreview({ theme }) {
  return (
    <div className="design-mini-page" style={theme.rootStyle}>
      <div className="design-preview-stack">
        <div className="design-preview-surface" style={theme.surfaceStyle}>
          <div className="design-preview-line" />
          <div className="design-preview-line design-preview-line--soft" />
          <div className="design-mini-page__button" style={theme.primaryButtonStyle}>
            CTA
          </div>
        </div>
      </div>
    </div>
  );
}

function FontPreview({ page, theme }) {
  return (
    <div className="design-mini-page design-mini-page--font" style={theme.rootStyle}>
      <div className="design-mini-page__surface" style={theme.surfaceStyle}>
        <span style={theme.titleStyle}>Aa</span>
        <strong style={theme.titleStyle}>{fixCopy(page?.title || "Minha Página")}</strong>
      </div>
    </div>
  );
}

function ButtonPreview({ theme, links }) {
  return (
    <div className="design-mini-page" style={theme.rootStyle}>
      <ButtonThemePreview
        theme={theme}
        links={links}
        className={cls(`is-${theme.design.primaryButtonsLayout}`)}
      />
    </div>
  );
}

function SocialPreview({ theme, links }) {
  const iconOnly = theme.design.secondaryLinksStyle === "icon";
  const showIcon = theme.design.secondaryLinksStyle !== "text";

  return (
    <div className="design-mini-page" style={theme.rootStyle}>
      <div className="design-social-preview" style={theme.surfaceStyle}>
        <span>Redes sociais</span>
        <div
          className={cls(
            "design-social-preview__list",
            theme.design.secondaryLinksAlign === "left"
              ? "is-left"
              : theme.design.secondaryLinksAlign === "right"
                ? "is-right"
                : "is-center",
          )}
        >
          {links.slice(0, 3).map((link) => {
            const brand = getMyPageSocialBrand(link);
            const Icon = brand.Icon;
            const label = getMyPageSocialLabel(link);
            const iconProps = getMyPageSecondaryIconProps(theme, link, "preview");
            return (
              <div
                key={link.id}
                className={cls(
                  "design-social-preview__item",
                  iconOnly ? "is-icon-only" : "",
                  theme.design.secondaryLinksStyle === "text" ? "is-text-only" : "",
                  theme.design.secondaryLinksSize === "small" ? "is-small" : "",
                )}
                style={theme.secondaryButtonStyle}
              >
                {showIcon ? (
                  <span
                    className={cls("design-social-preview__badge", iconProps.className)}
                    style={iconProps.style}
                  >
                    <Icon className={iconProps.iconClassName} size={iconProps.iconSize} />
                  </span>
                ) : null}
                {iconOnly ? null : <small>{label}</small>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function AnimationPreview({ theme }) {
  return (
    <div className="design-mini-page" style={theme.rootStyle}>
      <div className={cls("design-animation-preview", `is-${theme.design.animationPreset}`)}>
        <div className="design-animation-preview__card" style={theme.surfaceStyle}>
          <div className="design-mini-page__button" style={theme.primaryButtonStyle} />
          <div className="design-preview-line" />
          <div className="design-preview-line design-preview-line--soft" />
        </div>
      </div>
    </div>
  );
}

function DesignCategoryNav({ activeId, onSelect }) {
  return (
    <>
      <aside className="design-shell__nav" aria-label="Subcategorias de design">
        <div className="design-shell__nav-header">
          <span>Design</span>
          <strong>Subcategorias</strong>
        </div>
        <div className="design-shell__nav-list">
          {DESIGN_CATEGORIES.map((category) => {
            const Icon = category.Icon;

            return (
              <button
                key={category.id}
                type="button"
                className={cls(
                  "design-shell__nav-item",
                  activeId === category.id ? "is-active" : "",
                )}
                onClick={() => onSelect(category.id)}
              >
                <Icon className="design-shell__nav-icon" size={18} />
                <span>{fixCopy(category.label)}</span>
              </button>
            );
          })}
        </div>
      </aside>

      <div className="design-shell__chips" aria-label="Subcategorias de design">
        {DESIGN_CATEGORIES.map((category) => (
          <button
            key={category.id}
            type="button"
            className={cls(
              "design-shell__chip",
              activeId === category.id ? "is-active" : "",
            )}
            onClick={() => onSelect(category.id)}
          >
            {fixCopy(category.label)}
          </button>
        ))}
      </div>
    </>
  );
}

function DesignPanelShell({ category, children }) {
  return (
    <section className="design-shell__panel">
      <header className="design-shell__panel-header">
        <div>
          <span className="design-shell__panel-eyebrow">{fixCopy(category.label)}</span>
          <h2>{fixCopy(category.title)}</h2>
          <p>{fixCopy(category.description)}</p>
        </div>
      </header>
      <div className="design-shell__panel-body">{children}</div>
    </section>
  );
}

function renderPanelContent({
  categoryId,
  value,
  onChange,
  previewPage,
  previewPrimaryLinks,
  previewSocialLinks,
  getOptionTheme,
  getPresetOptionTheme,
  applyThemePreset,
}) {
  switch (categoryId) {
    case "marca":
      return (
        <OptionGrid columns="2">
          {MY_PAGE_BRAND_LAYOUT_OPTIONS.map((option) => (
            <OptionCard
              key={option.value}
              selected={value.brandLayout === option.value}
              title={option.label}
              description={option.description}
              onClick={() => onChange("brandLayout", option.value)}
              preview={
                <BrandPreview
                  page={previewPage}
                  theme={getOptionTheme("brandLayout", option.value)}
                  mode={option.value}
                />
              }
            />
          ))}
        </OptionGrid>
      );
    case "tema":
      return (
        <OptionGrid columns="3">
          {MY_PAGE_THEME_PRESET_OPTIONS.map((option) => (
            <OptionCard
              key={option.value}
              selected={value.themePreset === option.value}
              title={option.label}
              description={option.description}
              onClick={() => applyThemePreset(option.value)}
              preview={
                <ThemePreview
                  page={previewPage}
                  option={option}
                  theme={getPresetOptionTheme(option.value)}
                />
              }
            />
          ))}
        </OptionGrid>
      );
    case "fundo":
      return (
        <>
          <OptionGrid columns="4">
            {MY_PAGE_BACKGROUND_STYLE_OPTIONS.map((option) => (
              <OptionCard
                key={option.value}
                selected={value.backgroundStyle === option.value}
                title={option.label}
                description={option.description}
                onClick={() => onChange("backgroundStyle", option.value)}
                preview={
                  <BackgroundPreview
                    theme={getOptionTheme("backgroundStyle", option.value)}
                  />
                }
              />
            ))}
          </OptionGrid>
          {value.backgroundStyle === "gradient" ? (
            <div className="design-editor__group">
              <div className="design-editor__group-label">Direção</div>
              <ChoiceButtons
                value={value.backgroundGradientDirection}
                options={MY_PAGE_BACKGROUND_GRADIENT_DIRECTION_OPTIONS}
                onChange={(nextValue) =>
                  onChange("backgroundGradientDirection", nextValue)
                }
              />
            </div>
          ) : null}
          {value.backgroundStyle === "pattern" ? (
            <div className="design-editor__group">
              <div className="design-editor__group-label">Textura</div>
              <ChoiceButtons
                value={value.backgroundPatternVariant}
                options={MY_PAGE_BACKGROUND_PATTERN_VARIANT_OPTIONS}
                onChange={(nextValue) => onChange("backgroundPatternVariant", nextValue)}
              />
            </div>
          ) : null}
          <ColorRow
            label="Cor do fundo"
            value={value.backgroundColor}
            fallback="#e2e8f0"
            onChange={(nextValue) => onChange("backgroundColor", nextValue)}
          />
        </>
      );
    case "superficie":
      return (
        <>
          <OptionGrid columns="3">
            {MY_PAGE_SURFACE_STYLE_OPTIONS.map((option) => (
              <OptionCard
                key={option.value}
                selected={value.surfaceStyle === option.value}
                title={option.label}
                description={option.description}
                onClick={() => onChange("surfaceStyle", option.value)}
                preview={
                  <SurfacePreview theme={getOptionTheme("surfaceStyle", option.value)} />
                }
              />
            ))}
          </OptionGrid>
          {value.surfaceStyle === "pattern" ? (
            <div className="design-editor__group">
              <div className="design-editor__group-label">Textura</div>
              <ChoiceButtons
                value={value.surfacePatternVariant}
                options={MY_PAGE_SURFACE_PATTERN_VARIANT_OPTIONS}
                onChange={(nextValue) => onChange("surfacePatternVariant", nextValue)}
              />
            </div>
          ) : null}
          <ColorRow
            label="Cor do container"
            value={value.surfaceColor}
            fallback="#ffffff"
            onChange={(nextValue) => onChange("surfaceColor", nextValue)}
          />
        </>
      );
    case "fonte":
      return (
        <OptionGrid columns="4">
          {MY_PAGE_FONT_PRESET_OPTIONS.map((option) => (
            <OptionCard
              key={option.value}
              selected={value.fontPreset === option.value}
              title={option.label}
              description={option.description}
              onClick={() => onChange("fontPreset", option.value)}
              preview={
                <FontPreview
                  page={previewPage}
                  theme={getOptionTheme("fontPreset", option.value)}
                />
              }
            />
          ))}
        </OptionGrid>
      );
    case "botao":
      return (
        <>
          <div className="design-editor__group">
            <div className="design-editor__group-label">Layout</div>
            <OptionGrid columns="3">
              {MY_PAGE_PRIMARY_BUTTON_LAYOUT_OPTIONS.map((option) => (
                <OptionCard
                  key={option.value}
                  selected={value.primaryButtonsLayout === option.value}
                  title={option.label}
                  description={option.description}
                  onClick={() => onChange("primaryButtonsLayout", option.value)}
                  preview={
                    <ButtonPreview
                      theme={getOptionTheme("primaryButtonsLayout", option.value)}
                      links={previewPrimaryLinks}
                    />
                  }
                />
              ))}
            </OptionGrid>
          </div>
          <div className="design-editor__group">
            <div className="design-editor__group-label">Posição do texto</div>
            <ChoiceButtons
              value={value.primaryButtonContentAlign}
              options={MY_PAGE_PRIMARY_BUTTON_CONTENT_ALIGN_OPTIONS}
              onChange={(nextValue) => onChange("primaryButtonContentAlign", nextValue)}
            />
          </div>
          <div className="design-editor__group">
            <div className="design-editor__group-label">Estilo</div>
            <OptionGrid columns="5">
              {MY_PAGE_BUTTON_STYLE_OPTIONS.map((option) => (
                <OptionCard
                  key={option.value}
                  selected={value.buttonStyle === option.value}
                  title={option.label}
                  description={option.description}
                  onClick={() => onChange("buttonStyle", option.value)}
                  preview={
                    <ButtonPreview
                      theme={getOptionTheme("buttonStyle", option.value)}
                      links={previewPrimaryLinks}
                    />
                  }
                />
              ))}
            </OptionGrid>
          </div>
          <ButtonShadowEditor
            design={value}
            previewLinks={previewPrimaryLinks}
            onChange={(nextValue) => onChange("buttonShadow", nextValue)}
            getOptionTheme={getOptionTheme}
          />
          <div className="design-editor__group">
            <div className="design-editor__group-label">Forma</div>
            <OptionGrid columns="3">
              {MY_PAGE_BUTTON_RADIUS_OPTIONS.map((option) => (
                <OptionCard
                  key={option.value}
                  selected={value.buttonRadius === option.value}
                  title={option.label}
                  description={option.description}
                  onClick={() => onChange("buttonRadius", option.value)}
                  preview={
                    <ButtonPreview
                      theme={getOptionTheme("buttonRadius", option.value)}
                      links={previewPrimaryLinks}
                    />
                  }
                />
              ))}
            </OptionGrid>
          </div>
          <div className="design-editor__group">
            <div className="design-editor__group-label">Ícone</div>
            <OptionGrid columns="5">
              {MY_PAGE_PRIMARY_ICON_LAYOUT_OPTIONS.map((option) => (
                <OptionCard
                  key={option.value}
                  selected={value.primaryIconLayout === option.value}
                  title={option.label}
                  description={option.description}
                  onClick={() => onChange("primaryIconLayout", option.value)}
                  preview={
                    <ButtonPreview
                      theme={getOptionTheme("primaryIconLayout", option.value)}
                      links={previewPrimaryLinks}
                    />
                  }
                />
              ))}
            </OptionGrid>
          </div>
          <div className="design-editor__group">
            <div className="design-editor__group-label">Tamanho do ícone</div>
            <ChoiceButtons
              value={value.primaryIconSize}
              options={MY_PAGE_ICON_SIZE_OPTIONS}
              onChange={(nextValue) => onChange("primaryIconSize", nextValue)}
            />
          </div>
          <div className="design-editor__group">
            <div className="design-editor__group-label">Cores do ícone</div>
            <div className="design-color-stack">
              <ColorRow
                label="Fundo do ícone"
                value={value.primaryIconBadgeColor}
                fallback={value.buttonColor || "#0f172a"}
                onChange={(nextValue) => onChange("primaryIconBadgeColor", nextValue)}
              />
              <ColorRow
                label="Cor do ícone"
                value={value.primaryIconColor}
                fallback={value.buttonTextColor || "#ffffff"}
                onChange={(nextValue) => onChange("primaryIconColor", nextValue)}
              />
            </div>
          </div>
        </>
      );
    case "redes":
      return (
        <>
          <div className="design-editor__group">
            <div className="design-editor__group-label">Conteúdo</div>
            <OptionGrid columns="3">
              {MY_PAGE_SECONDARY_LINK_STYLE_OPTIONS.map((option) => (
                <OptionCard
                  key={option.value}
                  selected={value.secondaryLinksStyle === option.value}
                  title={option.label}
                  description={option.description}
                  onClick={() => onChange("secondaryLinksStyle", option.value)}
                  preview={
                    <SocialPreview
                      theme={getOptionTheme("secondaryLinksStyle", option.value)}
                      links={previewSocialLinks}
                    />
                  }
                />
              ))}
            </OptionGrid>
          </div>
          <div className="design-editor__group">
            <div className="design-editor__group-label">Layout do ícone</div>
            <OptionGrid columns="5">
              {MY_PAGE_SECONDARY_LINK_ICON_LAYOUT_OPTIONS.map((option) => (
                <OptionCard
                  key={option.value}
                  selected={value.secondaryLinksIconLayout === option.value}
                  title={option.label}
                  description={option.description}
                  onClick={() => onChange("secondaryLinksIconLayout", option.value)}
                  preview={
                    <SocialPreview
                      theme={getOptionTheme("secondaryLinksIconLayout", option.value)}
                      links={previewSocialLinks}
                    />
                  }
                />
              ))}
            </OptionGrid>
          </div>
          <div className="design-editor__group">
            <div className="design-editor__group-label">Tamanho do ícone</div>
            <ChoiceButtons
              value={value.secondaryLinksIconSize}
              options={MY_PAGE_ICON_SIZE_OPTIONS}
              onChange={(nextValue) => onChange("secondaryLinksIconSize", nextValue)}
            />
          </div>
          <div className="design-editor__group">
            <div className="design-editor__group-label">Cores do ícone</div>
            <div className="design-color-stack">
              <ColorRow
                label="Fundo do ícone"
                value={value.secondaryLinksIconBadgeColor}
                fallback={value.buttonColor || "#0f172a"}
                onChange={(nextValue) =>
                  onChange("secondaryLinksIconBadgeColor", nextValue)
                }
                disabled={value.secondaryLinksIconLayout === "brand_badge"}
                hint={
                  value.secondaryLinksIconLayout === "brand_badge"
                    ? "Badge oficial usa as cores da própria rede social."
                    : ""
                }
              />
              <ColorRow
                label="Cor do ícone"
                value={value.secondaryLinksIconColor}
                fallback={value.buttonTextColor || "#ffffff"}
                onChange={(nextValue) =>
                  onChange("secondaryLinksIconColor", nextValue)
                }
                disabled={value.secondaryLinksIconLayout === "brand_badge"}
                hint={
                  value.secondaryLinksIconLayout === "brand_badge"
                    ? "Cor manual fica desativada enquanto o badge oficial estiver ativo."
                    : ""
                }
              />
            </div>
          </div>
          <div className="design-editor__group">
            <div className="design-editor__group-label">Tamanho</div>
            <ChoiceButtons
              value={value.secondaryLinksSize}
              options={MY_PAGE_SECONDARY_LINK_SIZE_OPTIONS}
              onChange={(nextValue) => onChange("secondaryLinksSize", nextValue)}
            />
          </div>
          <div className="design-editor__group">
            <div className="design-editor__group-label">Alinhamento</div>
            <ChoiceButtons
              value={value.secondaryLinksAlign}
              options={MY_PAGE_SECONDARY_LINK_ALIGN_OPTIONS}
              onChange={(nextValue) => onChange("secondaryLinksAlign", nextValue)}
            />
          </div>
          <div className="design-editor__group">
            <div className="design-editor__group-label">Posição dos ícones</div>
            <ChoiceButtons
              value={value.secondaryLinksPosition}
              options={MY_PAGE_SECONDARY_LINK_POSITION_OPTIONS}
              onChange={(nextValue) => onChange("secondaryLinksPosition", nextValue)}
            />
          </div>
        </>
      );
    case "animacao":
      return (
        <OptionGrid columns="4">
          {MY_PAGE_ANIMATION_PRESET_OPTIONS.map((option) => (
            <OptionCard
              key={option.value}
              selected={value.animationPreset === option.value}
              title={option.label}
              description={option.description}
              onClick={() => onChange("animationPreset", option.value)}
              preview={
                <AnimationPreview
                  theme={getOptionTheme("animationPreset", option.value)}
                />
              }
            />
          ))}
        </OptionGrid>
      );
    case "cor":
    default:
      return (
        <div className="design-color-stack">
          <ColorRow
            label="Fundo"
            value={value.backgroundColor}
            fallback="#e2e8f0"
            onChange={(nextValue) => onChange("backgroundColor", nextValue)}
          />
          <ColorRow
            label="Botões"
            value={value.buttonColor}
            fallback="#0f172a"
            onChange={(nextValue) => onChange("buttonColor", nextValue)}
          />
          <ColorRow
            label="Texto do botão"
            value={value.buttonTextColor}
            fallback="#ffffff"
            onChange={(nextValue) => onChange("buttonTextColor", nextValue)}
          />
          <ColorRow
            label="Texto da página"
            value={value.pageTextColor}
            fallback="#64748b"
            onChange={(nextValue) => onChange("pageTextColor", nextValue)}
          />
          <ColorRow
            label="Texto dos títulos"
            value={value.titleTextColor}
            fallback="#0f172a"
            onChange={(nextValue) => onChange("titleTextColor", nextValue)}
          />
        </div>
      );
  }
}

export default function DesignEditorPanel({
  page,
  value,
  onChange,
}) {
  const [activeDesignCategory, setActiveDesignCategory] = useState("marca");
  const previewPage = useMemo(
    () => createMyPageThemePreviewPage(page, value),
    [page, value],
  );
  const previewPrimaryLinks = useMemo(
    () => getMyPagePreviewPrimaryLinks(previewPage),
    [previewPage],
  );
  const previewSocialLinks = useMemo(
    () => getMyPagePreviewSocialLinks(previewPage),
    [previewPage],
  );

  useEffect(() => {
    if (!DESIGN_CATEGORIES.some((category) => category.id === activeDesignCategory)) {
      setActiveDesignCategory("marca");
    }
  }, [activeDesignCategory]);

  const activeCategory =
    DESIGN_CATEGORIES.find((category) => category.id === activeDesignCategory) ||
    DESIGN_CATEGORIES[0];

  function getOptionTheme(field, nextValue) {
    const patch =
      field && typeof field === "object" ? field : { [field]: nextValue };

    return getMyPageTheme(
      createMyPageThemePreviewPage(previewPage, { ...value, ...patch }),
    );
  }

  function getPresetOptionTheme(presetId) {
    return getMyPageTheme(
      createMyPageThemePreviewPage(
        previewPage,
        getMyPageThemePresetValues(presetId),
      ),
    );
  }

  function applyThemePreset(presetId) {
    onChange(getMyPageThemePresetValues(presetId));
  }

  return (
    <div className="design-shell">
      <DesignCategoryNav
        activeId={activeCategory.id}
        onSelect={setActiveDesignCategory}
      />

      <DesignPanelShell category={activeCategory}>
        {renderPanelContent({
          categoryId: activeCategory.id,
          value,
          onChange,
          previewPage,
          previewPrimaryLinks,
          previewSocialLinks,
          getOptionTheme,
          getPresetOptionTheme,
          applyThemePreset,
        })}
      </DesignPanelShell>
    </div>
  );
}
