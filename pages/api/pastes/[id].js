import redis from "../../../lib/redis";
import { getNow } from "../../../lib/time";

export default async function handler(req, res) {
  const raw = await redis.get(`paste:${req.query.id}`);
  if (!raw) return res.status(404).json({ error: "Not found" });

  const paste = JSON.parse(raw);
  const now = getNow(req).getTime();

  if ((paste.expires_at && now > paste.expires_at) || 
      (paste.max_views !== null && paste.views >= paste.max_views)) {
    return res.status(404).json({ error: "Unavailable" });
  }

  paste.views += 1;
  await redis.set(`paste:${req.query.id}`, JSON.stringify(paste));

  res.status(200).json({
    content: paste.content,
    remaining_views: paste.max_views ? paste.max_views - paste.views : null,
    expires_at: paste.expires_at ? new Date(paste.expires_at).toISOString() : null
  });
}