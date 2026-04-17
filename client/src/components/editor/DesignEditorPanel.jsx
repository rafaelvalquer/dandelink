import { useEffect, useMemo, useState } from "react";
import {
  Image,
  Layers3,
  Palette,
  RectangleHorizontal,
  Share2,
  Sparkles,
  SquareStack,
  SwatchBook,
  Type,
} from "lucide-react";
import ButtonShadowEditor from "./ButtonShadowEditor.jsx";
import ButtonThemePreview from "./ButtonThemePreview.jsx";
import Button from "../ui/Button.jsx";
import {
  MY_PAGE_ANIMATION_PRESET_OPTIONS,
  MY_PAGE_BACKGROUND_GRADIENT_DIRECTION_OPTIONS,
  MY_PAGE_BACKGROUND_PATTERN_VARIANT_OPTIONS,
  MY_PAGE_BACKGROUND_STYLE_OPTIONS,
  MY_PAGE_BRAND_LAYOUT_OPTIONS,
  MY_PAGE_BUTTON_RADIUS_OPTIONS,
  MY_PAGE_BUTTON_STYLE_OPTIONS,
  MY_PAGE_FONT_PRESET_OPTIONS,
  MY_PAGE_SECONDARY_LINK_ALIGN_OPTIONS,
  MY_PAGE_SECONDARY_LINK_ICON_LAYOUT_OPTIONS,
  MY_PAGE_SECONDARY_LINK_SIZE_OPTIONS,
  MY_PAGE_SECONDARY_LINK_STYLE_OPTIONS,
  MY_PAGE_SURFACE_PATTERN_VARIANT_OPTIONS,
  MY_PAGE_SURFACE_STYLE_OPTIONS,
  MY_PAGE_THEME_PRESET_OPTIONS,
  createMyPageThemePreviewPage,
  getMyPagePreviewPrimaryLinks,
  getMyPagePreviewSocialLinks,
  getMyPageSocialLabel,
  getMyPageThemePresetValues,
  getMyPageSocialBrand,
  getMyPageTheme,
} from "../public/myPageTheme.js";
import { getButtonRadiusClassName } from "../public/buttonTheme.js";

const DESIGN_CATEGORIES = [
  {
    id: "marca",
    label: "Marca",
    title: "Avatar ou Hero",
    description: "Use a mesma imagem da pagina como avatar ou como fundo.",
    Icon: Image,
  },
  {
    id: "tema",
    label: "Tema",
    title: "Escolha um preset",
    description:
      "O tema aplica um ponto de partida completo para cor, fundo, fonte e botoes.",
    Icon: SwatchBook,
  },
  {
    id: "fundo",
    label: "Fundo",
    title: "Escolha o estilo do fundo",
    description: "Defina o estilo, a direcao e a textura do fundo.",
    Icon: Layers3,
  },
  {
    id: "superficie",
    label: "Superficie",
    title: "Container da frente",
    description: "Controle a camada onde ficam logo, titulos, botoes e formularios.",
    Icon: SquareStack,
  },
  {
    id: "fonte",
    label: "Fonte",
    title: "Escolha a tipografia",
    description: "A fonte vale para pagina, catalogo, formulario e pagamento.",
    Icon: Type,
  },
  {
    id: "botao",
    label: "Botao",
    title: "Acabamento, forma e hierarquia",
    description: "Defina o peso visual dos CTAs sem mudar a logica da pagina.",
    Icon: RectangleHorizontal,
  },
  {
    id: "redes",
    label: "Redes",
    title: "Links secundarios",
    description: "Controle conteudo, tamanho e alinhamento das redes na home.",
    Icon: Share2,
  },
  {
    id: "animacao",
    label: "Animacao",
    title: "Movimento no publico",
    description: "Escolha o ritmo visual de entrada da pagina publica.",
    Icon: Sparkles,
  },
  {
    id: "cor",
    label: "Cor",
    title: "Ajuste cada cor do publico",
    description: "Controle fundo, botoes e textos com liberdade total em cima do tema.",
    Icon: Palette,
  },
];

function cls(...parts) {
  return parts.filter(Boolean).join(" ");
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

function ColorRow({ label, value, fallback, onChange }) {
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
    <div className="design-color-row">
      <label className="design-color-row__label">{label}</label>
      <div className="design-color-row__control">
        <input
          className="ui-input design-color-row__input"
          type="text"
          value={draft}
          maxLength={7}
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
          onChange={(event) => commit(event.target.value)}
        />
      </div>
    </div>
  );
}

function BrandPreview({ page, theme, mode }) {
  return (
    <div className="design-mini-page" style={theme.rootStyle}>
      {mode === "hero" ? (
        <div className="design-mini-page__hero-cover" style={theme.heroMediaStyle} />
      ) : null}
      <div className="design-mini-page__surface" style={theme.surfaceStyle}>
        <div className="design-mini-page__hero">
          {mode === "hero" ? null : (
            <div className="design-mini-page__avatar-shell">
              {page?.avatarUrl ? (
                <img
                  className="design-mini-page__avatar"
                  src={page.avatarUrl}
                  alt={page?.title || "Minha Pagina"}
                />
              ) : (
                <div className="design-mini-page__avatar design-mini-page__avatar--placeholder">
                  {String(page?.title || "M").slice(0, 1)}
                </div>
              )}
            </div>
          )}
          <div className="design-mini-page__copy">
            <span style={theme.accentTextStyle}>Avatar ou Hero</span>
            <strong style={theme.titleStyle}>{page?.title || "Minha Pagina"}</strong>
            <small>{mode === "hero" ? "Imagem no fundo." : "Avatar redondo."}</small>
          </div>
        </div>
      </div>
    </div>
  );
}

function ThemePreview({ page, theme, option }) {
  const previewTitle = option?.previewTitle || page?.title || "Minha Pagina";
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
        <strong style={theme.titleStyle}>{page?.title || "Minha Pagina"}</strong>
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
  const useBadge = theme.design.secondaryLinksIconLayout === "brand_badge";
  const radiusClassName = getButtonRadiusClassName(theme);

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
            return (
              <div
                key={link.id}
                className={cls(
                  "design-social-preview__item",
                  radiusClassName,
                  iconOnly ? "is-icon-only" : "",
                  theme.design.secondaryLinksStyle === "text" ? "is-text-only" : "",
                  theme.design.secondaryLinksSize === "small" ? "is-small" : "",
                )}
                style={theme.secondaryButtonStyle}
              >
                {showIcon ? (
                  <span
                    className={cls("design-social-preview__badge", radiusClassName)}
                    style={
                      useBadge
                        ? brand.badgeStyle || theme.primaryButtonStyle
                        : theme.softSurfaceStyle
                    }
                  >
                    <Icon size={13} />
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
                <span>{category.label}</span>
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
            {category.label}
          </button>
        ))}
      </div>
    </>
  );
}

function DesignPanelShell({ category, onSave, isSaving, children }) {
  return (
    <section className="design-shell__panel">
      <header className="design-shell__panel-header">
        <div>
          <span className="design-shell__panel-eyebrow">{category.label}</span>
          <h2>{category.title}</h2>
          <p>{category.description}</p>
        </div>
        <Button onClick={onSave} disabled={isSaving}>
          {isSaving ? "Salvando..." : "Salvar tema"}
        </Button>
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
              <div className="design-editor__group-label">Direcao</div>
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
        </>
      );
    case "redes":
      return (
        <>
          <div className="design-editor__group">
            <div className="design-editor__group-label">Conteudo</div>
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
            <div className="design-editor__group-label">Layout do icone</div>
            <OptionGrid columns="2">
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
            label="Botoes"
            value={value.buttonColor}
            fallback="#0f172a"
            onChange={(nextValue) => onChange("buttonColor", nextValue)}
          />
          <ColorRow
            label="Texto do botao"
            value={value.buttonTextColor}
            fallback="#ffffff"
            onChange={(nextValue) => onChange("buttonTextColor", nextValue)}
          />
          <ColorRow
            label="Texto da pagina"
            value={value.pageTextColor}
            fallback="#64748b"
            onChange={(nextValue) => onChange("pageTextColor", nextValue)}
          />
          <ColorRow
            label="Texto dos titulos"
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
  onSave,
  isSaving = false,
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

      <DesignPanelShell category={activeCategory} onSave={onSave} isSaving={isSaving}>
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
