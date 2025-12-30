import redis from "../../../lib/redis";
import { nanoid } from "nanoid";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { content, ttl_seconds, max_views } = req.body;
  if (!content || !content.trim()) return res.status(400).json({ error: "Invalid content" });

  const id = nanoid(8);
  const now = Date.now();

  await redis.set(`paste:${id}`, JSON.stringify({
    content,
    created_at: now,
    expires_at: ttl_seconds ? now + ttl_seconds * 1000 : null,
    max_views: max_views ?? null,
    views: 0
  }));

  res.status(201).json({ id, url: `${process.env.BASE_URL}/p/${id}` });
}