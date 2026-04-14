import { useEffect, useRef, useState } from "react";
import { ImagePlus, Link2, Trash2, X } from "lucide-react";
import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";
import Textarea from "../ui/Textarea.jsx";
import SectionCard from "./SectionCard.jsx";

function AvatarModal({
  open,
  currentAvatarUrl,
  onClose,
  onApplyUrl,
  onRemove,
  onUpload,
  isUploading = false,
}) {
  const [mode, setMode] = useState("menu");
  const [urlDraft, setUrlDraft] = useState(currentAvatarUrl || "");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    setMode("menu");
    setUrlDraft(currentAvatarUrl || "");

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, currentAvatarUrl, onClose]);

  if (!open) return null;

  async function handleFileSelected(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    await onUpload(file);
    event.target.value = "";
  }

  function handleApplyUrl() {
    onApplyUrl(urlDraft.trim());
  }

  return (
    <div className="avatar-modal" role="dialog" aria-modal="true" aria-labelledby="avatar-modal-title">
      <div className="avatar-modal__backdrop" onClick={onClose} />
      <div className="avatar-modal__panel">
        <div className="avatar-modal__header">
          <h3 id="avatar-modal-title">Imagem de perfil</h3>
          <button
            type="button"
            className="avatar-modal__close"
            onClick={onClose}
            aria-label="Fechar modal"
          >
            <X size={18} />
          </button>
        </div>

        {mode === "menu" ? (
          <div className="avatar-modal__actions">
            <input
              ref={fileInputRef}
              className="avatar-modal__file-input"
              type="file"
              accept="image/*"
              onChange={handleFileSelected}
            />

            <button
              type="button"
              className="avatar-modal__action avatar-modal__action--primary"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              <span className="avatar-modal__action-icon">
                <ImagePlus size={20} />
              </span>
              <span className="avatar-modal__action-copy">
                <strong>{isUploading ? "Enviando imagem..." : "Selecionar imagem"}</strong>
                <small>Escolha uma imagem do seu computador.</small>
              </span>
            </button>

            <button
              type="button"
              className="avatar-modal__action"
              onClick={() => setMode("url")}
            >
              <span className="avatar-modal__action-icon">
                <Link2 size={20} />
              </span>
              <span className="avatar-modal__action-copy">
                <strong>Usar URL</strong>
                <small>Informe um link direto para a imagem.</small>
              </span>
            </button>

            <button
              type="button"
              className="avatar-modal__action"
              onClick={onRemove}
            >
              <span className="avatar-modal__action-icon is-danger">
                <Trash2 size={20} />
              </span>
              <span className="avatar-modal__action-copy">
                <strong>Remover avatar atual</strong>
                <small>Limpa a imagem do perfil imediatamente.</small>
              </span>
            </button>
          </div>
        ) : (
          <div className="avatar-modal__url-form">
            <label className="field field--full">
              <span>URL da imagem</span>
              <Input
                value={urlDraft}
                onChange={(event) => setUrlDraft(event.target.value)}
                placeholder="https://..."
              />
            </label>

            <div className="avatar-modal__footer">
              <Button variant="ghost" onClick={() => setMode("menu")}>
                Voltar
              </Button>
              <Button onClick={handleApplyUrl}>Usar URL</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProfileEditorCardV2({
  value,
  onChange,
  onSave,
  onUploadAvatar,
  isSaving = false,
  isUploadingAvatar = false,
}) {
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const avatarInitial =
    String(value.title || "M").trim().slice(0, 1).toUpperCase() || "M";

  function handleApplyAvatarUrl(nextUrl) {
    onChange("avatarUrl", nextUrl);
    setIsAvatarModalOpen(false);
  }

  function handleRemoveAvatar() {
    onChange("avatarUrl", "");
    setIsAvatarModalOpen(false);
  }

  async function handleUploadAvatar(file) {
    await onUploadAvatar(file);
    setIsAvatarModalOpen(false);
  }

  return (
    <>
      <SectionCard
        title="Perfil"
        actions={
          <Button onClick={onSave} disabled={isSaving}>
            {isSaving ? "Salvando..." : "Salvar perfil"}
          </Button>
        }
      >
        <div className="profile-card__layout">
          <button
            type="button"
            className="profile-avatar-trigger"
            onClick={() => setIsAvatarModalOpen(true)}
          >
            {value.avatarUrl ? (
              <img
                className="profile-avatar-trigger__image"
                src={value.avatarUrl}
                alt={value.title || "Avatar do perfil"}
              />
            ) : (
              <span className="profile-avatar-trigger__placeholder">{avatarInitial}</span>
            )}
            <span className="profile-avatar-trigger__label">Alterar avatar</span>
          </button>

          <div className="form-grid">
            <label className="field">
              <span>Titulo</span>
              <Input
                value={value.title || ""}
                onChange={(event) => onChange("title", event.target.value)}
                placeholder="Mutantwear"
              />
            </label>

            <label className="field">
              <span>Slug</span>
              <Input
                value={value.slug || ""}
                onChange={(event) => onChange("slug", event.target.value)}
                placeholder="mutantwear"
              />
            </label>

            <label className="field field--full">
              <span>Bio</span>
              <Textarea
                value={value.bio || ""}
                onChange={(event) => onChange("bio", event.target.value)}
                placeholder="Conte para as pessoas do que se trata a sua pagina."
              />
            </label>
          </div>
        </div>
      </SectionCard>

      <AvatarModal
        open={isAvatarModalOpen}
        currentAvatarUrl={value.avatarUrl}
        onClose={() => setIsAvatarModalOpen(false)}
        onApplyUrl={handleApplyAvatarUrl}
        onRemove={handleRemoveAvatar}
        onUpload={handleUploadAvatar}
        isUploading={isUploadingAvatar}
      />
    </>
  );
}
