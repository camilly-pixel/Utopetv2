import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey, X-Bi-Key",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

function safeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const x = enc.encode(a);
  const y = enc.encode(b);
  let diff = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) diff |= (x[i] ?? 0) ^ (y[i] ?? 0);
  return diff === 0;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 200, headers: corsHeaders });

  try {
    const expected = Deno.env.get("BI_READ_KEY") ?? "";
    const provided = req.headers.get("x-bi-key") ?? "";
    if (!expected || !safeEqual(provided, expected)) return json({ error: "Unauthorized" }, 401);

    if (req.method !== "GET") return json({ error: "Method not allowed" }, 405);

    const since = new URL(req.url).searchParams.get("since");
    let sinceIso: string | null = null;
    if (since) {
      const parsed = new Date(since);
      if (Number.isNaN(parsed.getTime())) return json({ error: "Invalid 'since' timestamp" }, 400);
      sinceIso = parsed.toISOString();
    }

    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    let query = supabase.from("utopet_leads").select("*").order("created_at", { ascending: false }).limit(500);
    if (sinceIso) query = query.gt("created_at", sinceIso);

    const { data, error } = await query;
    if (error) {
      console.error(error);
      return json({ error: "Query failed" }, 500);
    }
    return json({ count: data.length, leads: data });
  } catch (err) {
    console.error(err);
    return json({ error: "Internal error" }, 500);
  }
});
