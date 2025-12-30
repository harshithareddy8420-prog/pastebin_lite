import redis from "../../../lib/redis";
import { getNow } from "../../../lib/time";

export default async function handler(req, res) {
  try {
    const paste = await redis.get(`paste:${req.query.id}`);

    if (!paste) {
      return res.status(404).json({ error: "Not found" });
    }

    const now = getNow(req).getTime();

    // Check TTL or view limit
    if (
      (paste.expires_at && now > paste.expires_at) ||
      (paste.max_views !== null && paste.views >= paste.max_views)
    ) {
      return res.status(404).json({ error: "Unavailable" });
    }

    // Increment views safely
    const updatedPaste = {
      ...paste,
      views: paste.views + 1
    };

    await redis.set(`paste:${req.query.id}`, updatedPaste);

    res.status(200).json({
      content: paste.content,
      remaining_views:
        paste.max_views !== null
          ? paste.max_views - updatedPaste.views
          : null,
      expires_at: paste.expires_at
        ? new Date(paste.expires_at).toISOString()
        : null
    });

  } catch (err) {
    console.error("Fetch paste error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
