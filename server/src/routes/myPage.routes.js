import { Router } from "express";
import { uploadAvatarHandler } from "../controllers/avatar.controller.js";
import {
  createCollectionHandler,
  createCollectionItemHandler,
  deleteCollectionHandler,
  deleteCollectionItemHandler,
  reorderCollectionItemsHandler,
  reorderCollectionsHandler,
  toggleCollectionHandler,
  updateCollectionHandler,
  updateCollectionItemHandler,
} from "../controllers/collections.controller.js";
import {
  createLinkHandler,
  deleteLinkHandler,
  reorderLinksHandler,
  toggleLinkHandler,
  updateLinkHandler,
} from "../controllers/links.controller.js";
import {
  getMyPageHandler,
  getPublicMyPageHandler,
  updateMyPageHandler,
} from "../controllers/myPage.controller.js";
import { uploadAvatarSingle } from "../middleware/uploadAvatar.js";
import { updateShopHandler } from "../controllers/shop.controller.js";

const router = Router();

router.get("/my-page", getMyPageHandler);
router.put("/my-page", updateMyPageHandler);
router.get("/my-page/public/:slug", getPublicMyPageHandler);
router.post("/my-page/avatar", uploadAvatarSingle, uploadAvatarHandler);

router.post("/my-page/links", createLinkHandler);
router.patch("/my-page/links/reorder", reorderLinksHandler);
router.put("/my-page/links/:id", updateLinkHandler);
router.delete("/my-page/links/:id", deleteLinkHandler);
router.patch("/my-page/links/:id/toggle", toggleLinkHandler);

router.post("/my-page/collections", createCollectionHandler);
router.patch("/my-page/collections/reorder", reorderCollectionsHandler);
router.put("/my-page/collections/:id", updateCollectionHandler);
router.delete("/my-page/collections/:id", deleteCollectionHandler);
router.patch("/my-page/collections/:id/toggle", toggleCollectionHandler);

router.post("/my-page/collections/:id/items", createCollectionItemHandler);
router.patch(
  "/my-page/collections/:id/items/reorder",
  reorderCollectionItemsHandler,
);
router.put(
  "/my-page/collections/:id/items/:itemId",
  updateCollectionItemHandler,
);
router.delete(
  "/my-page/collections/:id/items/:itemId",
  deleteCollectionItemHandler,
);

router.put("/my-page/shop", updateShopHandler);

export default router;
