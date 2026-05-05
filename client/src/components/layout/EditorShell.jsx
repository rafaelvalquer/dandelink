import { useEffect, useState } from "react";
import Sidebar from "./Sidebar.jsx";
import PhonePreview from "../preview/PhonePreview.jsx";
import PreviewSharePopover from "./PreviewSharePopover.jsx";

const SIDEBAR_COLLAPSED_STORAGE_KEY = "dandelink:admin-sidebar-collapsed";

function getInitialSidebarCollapsed() {
  if (typeof window === "undefined") return false;

  try {
    return window.localStorage.getItem(SIDEBAR_COLLAPSED_STORAGE_KEY) === "true";
  } catch (error) {
    void error;
    return false;
  }
}

export default function EditorShell({
  title,
  description,
  page,
  publishedPage = page,
  children,
  notice,
  error,
  eyebrow = "Editor DandeLink",
  headerActions = null,
  headerClassName = "",
  previewEyebrow = null,
  previewTitle = null,
}) {
  const sidebarPage = publishedPage || page;
  const resolvedPreviewEyebrow = previewEyebrow || "Preview ao vivo";
  const resolvedPreviewTitle = previewTitle || "Página pública";
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(getInitialSidebarCollapsed);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        SIDEBAR_COLLAPSED_STORAGE_KEY,
        String(isSidebarCollapsed),
      );
    } catch (error) {
      void error;
    }
  }, [isSidebarCollapsed]);

  return (
    <div className={`editor-shell ${isSidebarCollapsed ? "editor-shell--sidebar-collapsed" : ""}`.trim()}>
      <header className="editor-shell__topbar">
        <div className="editor-shell__topbar-brand">
          <span className="editor-shell__topbar-mark" aria-hidden="true">
            D
          </span>
          <div className="editor-shell__topbar-copy">
            <strong>DandeLink admin</strong>
            <span>Editor visual</span>
          </div>
        </div>

        <div className="editor-shell__topbar-center" aria-hidden="true">
          <span>Administração limpa, preview em tempo real</span>
        </div>

        <div className="editor-shell__topbar-meta">
          {sidebarPage?.slug ? (
            <span className="editor-shell__topbar-slug">/{sidebarPage.slug}</span>
          ) : null}
        </div>
      </header>

      <div className="editor-shell__layout">
        <Sidebar
          page={sidebarPage}
          collapsed={isSidebarCollapsed}
          onToggleCollapsed={() => setIsSidebarCollapsed((current) => !current)}
        />

        <main className="editor-shell__main">
          <header className={`editor-shell__header ${headerClassName}`.trim()}>
            <div className="editor-shell__heading">
              {eyebrow ? <span className="editor-shell__eyebrow">{eyebrow}</span> : null}
              <h1>{title}</h1>
              {description ? <p>{description}</p> : null}
            </div>

            <div className="editor-shell__header-side">
              {headerActions ? (
                <div className="editor-shell__header-actions">{headerActions}</div>
              ) : null}
              {notice || error ? (
                <div className="editor-shell__status">
                  {notice ? <div className="editor-shell__notice" role="status">{notice}</div> : null}
                  {error ? <div className="editor-shell__error" role="alert">{error}</div> : null}
                </div>
              ) : null}
            </div>
          </header>

          <div className="editor-shell__content">{children}</div>
        </main>

        <aside className="editor-shell__preview">
          <div className="editor-shell__preview-top">
            <div className="editor-shell__preview-header">
              <span>{resolvedPreviewEyebrow}</span>
              <strong>{resolvedPreviewTitle}</strong>
            </div>
            <PreviewSharePopover page={publishedPage} />
          </div>

          <div className="editor-shell__preview-stage">
            <div className="editor-shell__preview-frame">
              <PhonePreview page={page} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
