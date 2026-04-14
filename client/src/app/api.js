const API_BASE = (
  import.meta.env.VITE_API_URL || "http://localhost:4000/api"
).replace(/\/$/, "");

export async function request(method, path, body) {
  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.error || `Falha na requisição com status ${response.status}`);
  }

  return data;
}

export function getMyPage() {
  return request("GET", "/my-page");
}

export function saveMyPageProfile(payload) {
  return request("PUT", "/my-page", payload);
}

export async function uploadMyPageAvatar(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE}/my-page/avatar`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.error || `Falha no upload com status ${response.status}`);
  }

  return data;
}

export function saveMyPageTheme(theme) {
  return request("PUT", "/my-page", { theme });
}

export function getPublicMyPage(slug) {
  return request("GET", `/my-page/public/${encodeURIComponent(slug)}`);
}

export function createLink(payload) {
  return request("POST", "/my-page/links", payload);
}

export function saveLink(id, payload) {
  return request("PUT", `/my-page/links/${id}`, payload);
}

export function removeLink(id) {
  return request("DELETE", `/my-page/links/${id}`);
}

export function toggleLink(id) {
  return request("PATCH", `/my-page/links/${id}/toggle`);
}

export function reorderLinks(ids) {
  return request("PATCH", "/my-page/links/reorder", { ids });
}

export function createCollection(payload) {
  return request("POST", "/my-page/collections", payload);
}

export function saveCollection(id, payload) {
  return request("PUT", `/my-page/collections/${id}`, payload);
}

export function removeCollection(id) {
  return request("DELETE", `/my-page/collections/${id}`);
}

export function toggleCollection(id) {
  return request("PATCH", `/my-page/collections/${id}/toggle`);
}

export function reorderCollections(ids) {
  return request("PATCH", "/my-page/collections/reorder", { ids });
}

export function createCollectionItem(collectionId, payload) {
  return request("POST", `/my-page/collections/${collectionId}/items`, payload);
}

export function saveCollectionItem(collectionId, itemId, payload) {
  return request(
    "PUT",
    `/my-page/collections/${collectionId}/items/${itemId}`,
    payload,
  );
}

export function removeCollectionItem(collectionId, itemId) {
  return request("DELETE", `/my-page/collections/${collectionId}/items/${itemId}`);
}

export function reorderCollectionItems(collectionId, ids) {
  return request("PATCH", `/my-page/collections/${collectionId}/items/reorder`, {
    ids,
  });
}

export function saveShop(payload) {
  return request("PUT", "/my-page/shop", payload);
}
