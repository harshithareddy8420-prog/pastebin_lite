import redis from "../../lib/redis";
import { getNow } from "../../lib/time";

export async function getServerSideProps({ params, req, res }) {
  try {
    const paste = await redis.get(`paste:${params.id}`);

    if (!paste) {
      res.statusCode = 404;
      return { props: {} };
    }

    const now = getNow(req).getTime();

    if (
      (paste.expires_at && now > paste.expires_at) ||
      (paste.max_views !== null && paste.views >= paste.max_views)
    ) {
      res.statusCode = 404;
      return { props: {} };
    }

    // increment views safely
    await redis.set(`paste:${params.id}`, {
      ...paste,
      views: paste.views + 1
    });

    return {
      props: {
        content: paste.content
      }
    };
  } catch (err) {
    console.error("HTML paste error:", err);
    res.statusCode = 500;
    return { props: {} };
  }
}

export default function Paste({ content }) {
  if (!content) return <h1>404 – Paste Not Found</h1>;

  return (
    <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
      {content}
    </pre>
  );
}
