import { put, list } from "@vercel/blob";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Helper to get local path for fallback JSON
const getLocalFilePath = () => {
  // If running in a CommonJS env without import.meta.url, fallback safely
  const _dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));
  return path.join(_dirname, "users.local.json");
};
export interface User {
  email: string;
  name: string;
  phone: string;
  createdAt: string;
}

function getBlobCredentials() {
  const token = process.env.BLOB_READ_WRITE_TOKEN_NEW_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN;
  const storeId = process.env.BLOB_READ_WRITE_TOKEN_NEW_STORE_ID || process.env.BLOB_STORE_ID;
  return { token, storeId };
}

async function getBlobUrl(): Promise<string | null> {
  const { token, storeId } = getBlobCredentials();
  if (!token || token === "undefined" || token === "null" || token.trim() === "") {
    return null;
  }
  try {
    const { blobs } = await list({ token, storeId });
    const userBlob = blobs.find((b) => b.pathname === "users.json");
    // For public/private blobs, use downloadUrl or url
    return userBlob ? (userBlob.downloadUrl || userBlob.url) : null;
  } catch (e) {
    console.error("Vercel Blob list error:", e);
    return null;
  }
}

export async function getUsers(): Promise<User[]> {
  const { token } = getBlobCredentials();
  
  if (!token || token === "undefined" || token === "null" || token.trim() === "") {
    // Fallback to local
    try {
      const data = await fs.readFile(getLocalFilePath(), "utf-8");
      return JSON.parse(data) as User[];
    } catch (e: any) {
      if (e.code === "ENOENT") return [];
      console.error("Failed to read local users:", e);
      return [];
    }
  }

  try {
    const blobUrl = await getBlobUrl();
    if (!blobUrl) return [];

    const response = await fetch(blobUrl);
    if (!response.ok) {
      console.warn(`Fetch users from Blob failed with status ${response.status}.`);
      return [];
    }
    return (await response.json()) as User[];
  } catch (e) {
    console.error("Failed to fetch users from Vercel Blob:", e);
    return [];
  }
}

export async function saveUsers(users: User[]): Promise<void> {
  const { token, storeId } = getBlobCredentials();
  
  if (!token || token === "undefined" || token === "null" || token.trim() === "") {
    // Fallback to local
    try {
      await fs.writeFile(getLocalFilePath(), JSON.stringify(users, null, 2), "utf-8");
      console.log("[blobDb] Saved users to local fallback JSON.");
    } catch (e) {
      console.error("Failed to write to local users file:", e);
    }
    return;
  }

  try {
    await put("users.json", JSON.stringify(users, null, 2), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControl: "no-store, no-cache, must-revalidate, max-age=0",
      token,
      storeId,
    });
  } catch (e) {
    console.error("Failed to put users to Vercel Blob:", e);
  }
}
