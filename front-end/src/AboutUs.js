import { useEffect, useState } from "react";

export default function AboutUs() {
  // start with a safe default so renders never crash
  const [data, setData] = useState({ title: "About Us", paragraphs: [] });
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5002/api/about") // or "/api/about" if you added a proxy
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const ct = r.headers.get("content-type") || "";
        if (!ct.includes("application/json")) {
          const text = await r.text();
          throw new Error(`Expected JSON, got ${ct}. First chars: ${text.slice(0,60)}`);
        }
        return r.json();
      })
      .then((json) => setData(json || { title: "About Us", paragraphs: [] }))
      .catch((e) => setErr(e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: 16 }}>Loading…</div>;
  if (err) return <div style={{ padding: 16, color: "crimson" }}>Error: {String(err)}</div>;

  return (
    <main style={{ maxWidth: 860, margin: "24px auto", padding: "0 16px" }}>
      <h1>{data?.title ?? "About Us"}</h1>

      {data?.imageUrl && (
        <img
          src={data.imageUrl}
          alt={data?.authorName || "About Me"}
          style={{ width: 180, height: 180, objectFit: "cover", borderRadius: "50%", margin: "12px 0" }}
        />
      )}

      {data?.authorName && (
        <p><strong>{data.authorName}</strong>{data?.authorRole ? ` — ${data.authorRole}` : ""}</p>
      )}

      {(data?.paragraphs ?? []).map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </main>
  );
}
