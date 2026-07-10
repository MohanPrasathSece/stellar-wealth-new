import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Load .env file manually for local development
try {
  const _dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));
  const envPath = path.join(_dirname, ".env");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    envContent.split("\n").forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || "";
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        else if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    });
  }
} catch (e) {
  console.warn("[API Dev Server] Failed to load .env file:", e);
}

// Import handlers
import loginHandler from "./api/login.js";
import signupHandler from "./api/signup.js";
import contactHandler from "./api/contact.js";

const app = express();
const port = 3001;

app.use(cors());
// Do NOT use express.json() globally because the Vercel handlers parse the raw body themselves using req.on("data")
// Express.json() would consume the body stream, breaking the handlers.

app.post("/api/login", async (req, res) => {
  try {
    await loginHandler(req, res);
  } catch (error) {
    console.error("Login API Error:", error);
    if (!res.headersSent) res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/signup", async (req, res) => {
  try {
    await signupHandler(req, res);
  } catch (error) {
    console.error("Signup API Error:", error);
    if (!res.headersSent) res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/contact", async (req, res) => {
  try {
    await contactHandler(req, res);
  } catch (error) {
    console.error("Contact API Error:", error);
    if (!res.headersSent) res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`[API Dev Server] Running at http://localhost:${port}`);
  console.log(`[API Dev Server] Proxy configured for /api/* endpoints`);
});
