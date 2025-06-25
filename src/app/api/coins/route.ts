import { sortOptions } from "@/app/lib/sortOptions";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const sortParam = searchParams.get("sort") || "market-cap_desc";

  const sortObj = sortOptions.find((opt) => opt.value === sortParam);

  const sort = sortObj?.apiValue || "market_cap_desc";

  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=${sort}&per_page=100&page=1&sparkline=false,`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    return new Response(
      JSON.stringify({ error: "Помилка при отриманні криптовалют!" }),
      {
        status: 500,
        headers: { "Content-Type": "aplication/json" },
      }
    );
  }
  try {
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "aplication/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Серверна помилка",
        message: String(error),
      }),
      { status: 500 }
    );
  }
}
