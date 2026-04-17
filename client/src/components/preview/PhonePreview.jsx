import PublicPageSceneView from "../public/PublicPageSceneView.jsx";
import { getMyPageTheme } from "../public/myPageTheme.js";

export default function PhonePreview({ page }) {
  const theme = getMyPageTheme(page || {});

  return (
    <div className="phone-preview">
      <div
        className="phone-preview__frame"
        style={{
          boxShadow: `0 30px 80px -34px ${theme.design?.buttonColor || "#0f172a"}`,
        }}
      >
        <div className="phone-preview__viewport">
          <PublicPageSceneView page={page} mode="preview" interactive={false} />
        </div>
      </div>
    </div>
  );
}
