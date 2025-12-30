import redis from "../../lib/redis";
import { getNow } from "../../lib/time";

export async function getServerSideProps({ params, req, res }) {
  const raw = await redis.get(`paste:${params.id}`);
  if (!raw) { res.statusCode = 404; return { props: {} }; }

  const paste = JSON.parse(raw);
  const now = getNow(req).getTime();

  if ((paste.expires_at && now > paste.expires_at) || 
      (paste.max_views !== null && paste.views >= paste.max_views)) {
    res.statusCode = 404;
    return { props: {} };
  }

  paste.views += 1;
  await redis.set(`paste:${params.id}`, JSON.stringify(paste));

  return { props: { content: paste.content } };
}

export default function Paste({ content }) {
  if (!content) return <h1>404 - Not Found</h1>;
  return <pre>{content}</pre>;
}