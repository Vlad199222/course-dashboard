import { sortOptions } from "@/lib/sortOptions";
import { NextRequest } from "next/server";
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const sortParam = searchParams.get("sort") || "market-cap_desc";

  const sortObj = sortOptions.find((opt) => opt.value === sortParam);

  const sort = sortObj?.apiValue || "market_cap_desc";

  const pageParam = searchParams.get("page");
  const perPageParam = searchParams.get("perPage");

  const page = parseInt(pageParam ?? "") || 1;
  const perPage = parseInt(perPageParam ?? "") || 20;
    const total = 250;

  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=${sort}&per_page=${perPage}&page=${page}&sparkline=false`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    return new Response(
      JSON.stringify({ error: "Помилка при отриманні криптовалют!" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  try {
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      return new Response(
        JSON.stringify({ coins: [], message: "Більше монет немає" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

  
    return new Response(JSON.stringify({ coins: data, total: total }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
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
