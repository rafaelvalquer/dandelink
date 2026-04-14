import { Navigate, createBrowserRouter } from "react-router-dom";
import AdminDesignPage from "../pages/AdminDesignPage.jsx";
import AdminLinksPage from "../pages/AdminLinksPageV2.jsx";
import AdminShopPage from "../pages/AdminShopPage.jsx";
import PublicMyPage from "../pages/PublicMyPage.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/admin/links" replace />,
  },
  {
    path: "/admin/links",
    element: <AdminLinksPage />,
  },
  {
    path: "/admin/shop",
    element: <AdminShopPage />,
  },
  {
    path: "/admin/design",
    element: <AdminDesignPage />,
  },
  {
    path: "/:slug",
    element: <PublicMyPage />,
  },
]);
