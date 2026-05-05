import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Copy, Download, QrCode, Share2, Sparkles, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { getMyPageTheme } from "../public/myPageTheme.js";

function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}

function buildPublicUrl(slug = "") {
  const normalizedSlug = String(slug || "").trim();
  if (!normalizedSlug) return "";

  const path = `/${normalizedSlug}`;

  if (typeof window === "undefined") {
    return path;
  }

  return new URL(path, window.location.origin).toString();
}

function formatPublicUrlForDisplay(publicUrl = "") {
  const normalizedUrl = String(publicUrl || "").trim();
  if (!normalizedUrl) return "";

  try {
    const url = new URL(normalizedUrl);
    return `${url.host}${url.pathname}`.replace(/\/$/, "");
  } catch (error) {
    void error;
    return normalizedUrl.replace(/^https?:\/\//i, "").replace(/\/$/, "");
  }
}

function escapeXml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function normalizeHexColor(value, fallback = "#111827") {
  const normalized = String(value || "").trim();
  return /^#[0-9a-f]{6}$/i.test(normalized) ? normalized : fallback;
}

function hexToRgb(hex) {
  const safeHex = normalizeHexColor(hex).replace("#", "");
  return {
    r: Number.parseInt(safeHex.slice(0, 2), 16),
    g: Number.parseInt(safeHex.slice(2, 4), 16),
    b: Number.parseInt(safeHex.slice(4, 6), 16),
  };
}

function rgbToHex({ r, g, b }) {
  return `#${[r, g, b]
    .map((part) => Math.round(Math.min(Math.max(part, 0), 255)).toString(16).padStart(2, "0"))
    .join("")}`;
}

function mixHex(baseHex, mixHexColor, weight = 0.5) {
  const base = hexToRgb(baseHex);
  const mix = hexToRgb(mixHexColor);
  return rgbToHex({
    r: base.r + (mix.r - base.r) * weight,
    g: base.g + (mix.g - base.g) * weight,
    b: base.b + (mix.b - base.b) * weight,
  });
}

function getRelativeLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

function getQrInkColor(brandColor) {
  const safeColor = normalizeHexColor(brandColor, "#111827");
  return getRelativeLuminance(safeColor) > 0.62
    ? mixHex(safeColor, "#111827", 0.58)
    : safeColor;
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function serializeQrSvg(qrSvgNode) {
  if (!qrSvgNode) return "";
  const clone = qrSvgNode.cloneNode(true);
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("width", "420");
  clone.setAttribute("height", "420");
  clone.setAttribute("viewBox", qrSvgNode.getAttribute("viewBox") || "0 0 132 132");
  return new XMLSerializer().serializeToString(clone);
}

function svgToDataUrl(svgMarkup) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgMarkup)}`;
}

function resolveMediaUrl(url = "") {
  const rawUrl = String(url || "").trim();
  if (!rawUrl || typeof window === "undefined") return rawUrl;
  try {
    return new URL(rawUrl, window.location.origin).toString();
  } catch (error) {
    void error;
    return rawUrl;
  }
}

async function imageUrlToDataUrl(imageUrl = "") {
  const resolvedUrl = resolveMediaUrl(imageUrl);
  if (!resolvedUrl) return "";

  try {
    const response = await fetch(resolvedUrl);
    if (!response.ok) return "";
    const blob = await response.blob();

    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => resolve("");
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    void error;
    return "";
  }
}

function buildLogoSvg({ logoDataUrl, logoInitial, brandColor, qrInkColor }) {
  const safeInitial = escapeXml(String(logoInitial || "D").slice(0, 1).toUpperCase());
  if (logoDataUrl) {
    return {
      defs: [
        `<defs>`,
        `<clipPath id="brandLogoClip"><circle cx="256" cy="82" r="30"/></clipPath>`,
        `<clipPath id="qrLogoClip"><circle cx="256" cy="404" r="34"/></clipPath>`,
        `</defs>`,
      ].join(""),
      top: [
        `<circle cx="256" cy="82" r="35" fill="#ffffff" stroke="${brandColor}" stroke-opacity="0.24" stroke-width="2"/>`,
        `<image href="${escapeXml(logoDataUrl)}" x="226" y="52" width="60" height="60" preserveAspectRatio="xMidYMid slice" clip-path="url(#brandLogoClip)"/>`,
      ].join(""),
      center: [
        `<circle cx="256" cy="404" r="44" fill="#ffffff" stroke="${brandColor}" stroke-opacity="0.28" stroke-width="2"/>`,
        `<image href="${escapeXml(logoDataUrl)}" x="222" y="370" width="68" height="68" preserveAspectRatio="xMidYMid slice" clip-path="url(#qrLogoClip)"/>`,
      ].join(""),
    };
  }

  return {
    defs: "",
    top: [
      `<circle cx="256" cy="82" r="35" fill="${brandColor}"/>`,
      `<text x="256" y="93" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="30" font-weight="900" fill="#ffffff">${safeInitial}</text>`,
    ].join(""),
    center: [
      `<circle cx="256" cy="404" r="44" fill="#ffffff" stroke="${brandColor}" stroke-opacity="0.28" stroke-width="2"/>`,
      `<circle cx="256" cy="404" r="31" fill="${qrInkColor}"/>`,
      `<text x="256" y="414" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="27" font-weight="900" fill="#ffffff">${safeInitial}</text>`,
    ].join(""),
  };
}

function buildQrPrintSvg({
  qrSvgNode,
  brandColor,
  qrInkColor,
  title,
  displayUrl,
  printText,
  logoDataUrl,
  logoInitial,
}) {
  const qrSvgMarkup = serializeQrSvg(qrSvgNode);
  const qrDataUrl = svgToDataUrl(qrSvgMarkup);
  const safeTitle = escapeXml(title || "Minha página");
  const safeDisplayUrl = escapeXml(displayUrl);
  const safePrintText = escapeXml(printText || "Aponte a câmera e acesse");
  const logoSvg = buildLogoSvg({ logoDataUrl, logoInitial, brandColor, qrInkColor });

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="760" viewBox="0 0 512 760">`,
    logoSvg.defs,
    `<rect width="512" height="760" rx="36" fill="#ffffff"/>`,
    `<rect x="24" y="24" width="464" height="712" rx="28" fill="#ffffff" stroke="${brandColor}" stroke-opacity="0.22" stroke-width="2"/>`,
    logoSvg.top,
    `<text x="256" y="142" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="25" font-weight="850" fill="#111827">${safeTitle}</text>`,
    `<text x="256" y="174" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="15" font-weight="650" fill="#64748b">${safePrintText}</text>`,
    `<rect x="48" y="196" width="416" height="416" rx="38" fill="#f8fafc"/>`,
    `<rect x="64" y="212" width="384" height="384" rx="24" fill="#ffffff"/>`,
    `<image href="${escapeXml(qrDataUrl)}" x="72" y="220" width="368" height="368" preserveAspectRatio="xMidYMid meet"/>`,
    logoSvg.center,
    `<text x="256" y="660" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="17" font-weight="800" fill="#111827">${safeDisplayUrl}</text>`,
    `<text x="256" y="690" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="13" font-weight="700" fill="${qrInkColor}">DandeLink</text>`,
    `</svg>`,
  ].join("");
}

export default function PreviewSharePopover({ page }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [printText, setPrintText] = useState("Aponte a câmera e acesse");
  const wrapperRef = useRef(null);
  const qrSvgRef = useRef(null);
  const slug = String(page?.slug || "").trim();
  const publicUrl = useMemo(() => buildPublicUrl(slug), [slug]);
  const theme = useMemo(() => getMyPageTheme(page || {}), [page]);
  const brandColor = normalizeHexColor(theme?.design?.buttonColor, "#7c3aed");
  const qrInkColor = getQrInkColor(brandColor);
  const pageTitle = String(page?.title || page?.name || "Minha página").trim();
  const displayUrl = useMemo(
    () => formatPublicUrlForDisplay(publicUrl || `/${slug}`),
    [publicUrl, slug],
  );
  const isDisabled = !slug || !publicUrl;
  const filenameBase = String(slug || pageTitle || "dandelink")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9-]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase() || "dandelink";

  useEffect(() => {
    if (!open) return undefined;

    function handlePointerDown(event) {
      if (!wrapperRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!copied) return undefined;

    const timeoutId = window.setTimeout(() => {
      setCopied(false);
    }, 1800);

    return () => window.clearTimeout(timeoutId);
  }, [copied]);

  async function handleCopy() {
    if (!publicUrl || !navigator.clipboard?.writeText) {
      return;
    }

    await navigator.clipboard.writeText(publicUrl);
    setCopied(true);
  }

  async function getPrintableSvg() {
    const logoDataUrl = await imageUrlToDataUrl(page?.avatarUrl);
    return buildQrPrintSvg({
      qrSvgNode: qrSvgRef.current,
      brandColor,
      qrInkColor,
      title: pageTitle,
      displayUrl,
      printText,
      logoDataUrl,
      logoInitial: pageTitle,
    });
  }

  async function handleDownloadSvg() {
    if (!qrSvgRef.current) return;
    const svg = await getPrintableSvg();
    downloadBlob(
      new Blob([svg], { type: "image/svg+xml;charset=utf-8" }),
      `${filenameBase}-qr-code.svg`,
    );
  }

  async function handleDownloadPng() {
    if (!qrSvgRef.current) return;
    const svg = await getPrintableSvg();
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 1520;
      const context = canvas.getContext("2d");
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);

      canvas.toBlob((pngBlob) => {
        if (!pngBlob) return;
        downloadBlob(pngBlob, `${filenameBase}-qr-code.png`);
      }, "image/png");
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
    };

    image.src = url;
  }

  return (
    <div className="editor-preview-share" ref={wrapperRef}>
      <button
        type="button"
        className={cls(
          "editor-preview-share__trigger",
          isDisabled && "is-disabled",
          open && "is-open",
        )}
        aria-label={isDisabled ? "Salve a página para publicar" : "Compartilhar página"}
        onClick={() => {
          if (!isDisabled) {
            setOpen((current) => !current);
          }
        }}
        disabled={isDisabled}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <span className="editor-preview-share__trigger-label">
          {isDisabled ? "Salve a página para publicar" : displayUrl}
        </span>
        <span className="editor-preview-share__trigger-icon" aria-hidden="true">
          <Share2 size={18} />
        </span>
      </button>

      {open ? (
        <div className="editor-preview-share__popover" role="dialog" aria-label="Compartilhar página">
          <div className="editor-preview-share__popover-header">
            <strong>Compartilhar</strong>
            <button
              type="button"
              className="editor-preview-share__icon-button"
              onClick={() => setOpen(false)}
              aria-label="Fechar compartilhamento"
            >
              <X size={16} />
            </button>
          </div>

          <div className="editor-preview-share__url-card">
            <span className="editor-preview-share__url-icon" aria-hidden="true">
              <Sparkles size={18} />
            </span>
            <span className="editor-preview-share__url-value" title={publicUrl}>
              {displayUrl}
            </span>
            <button
              type="button"
              className={cls(
                "editor-preview-share__copy-button",
                copied && "is-success",
              )}
              onClick={() => void handleCopy()}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? "Copiado" : "Copiar"}</span>
            </button>
          </div>

          <div className="editor-preview-share__qr-card">
            <button
              type="button"
              className="editor-preview-share__icon-button editor-preview-share__icon-button--corner"
              onClick={() => setOpen(false)}
              aria-label="Fechar QR code"
            >
              <X size={16} />
            </button>

            <div className="editor-preview-share__qr-shell">
              <div className="editor-preview-share__qr-frame">
                <QRCodeSVG
                  ref={qrSvgRef}
                  value={publicUrl}
                  size={132}
                  level="H"
                  includeMargin={false}
                  bgColor="#ffffff"
                  fgColor={qrInkColor}
                />
              </div>
            </div>

            <strong className="editor-preview-share__qr-title">
              Compartilhe sua página
            </strong>
            <span className="editor-preview-share__qr-copy">
              QR com a cor da sua marca
            </span>
            <label className="editor-preview-share__print-field">
              <span>Texto para impressão</span>
              <input
                type="text"
                value={printText}
                maxLength={44}
                onChange={(event) => setPrintText(event.target.value)}
                placeholder="Aponte a câmera e acesse"
              />
            </label>
            <div className="editor-preview-share__print-preview">
              <span className="editor-preview-share__print-dot" style={{ background: brandColor }} />
              <strong>{pageTitle}</strong>
              <small>{printText || "Aponte a câmera e acesse"}</small>
              <span>{displayUrl}</span>
            </div>
            <div className="editor-preview-share__download-actions">
              <button type="button" onClick={() => void handleDownloadPng()}>
                <Download size={14} />
                PNG
              </button>
              <button type="button" onClick={() => void handleDownloadSvg()}>
                <Download size={14} />
                SVG
              </button>
            </div>
            <span className="editor-preview-share__qr-hint">
              <QrCode size={14} />
              QR code da URL publicada
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
