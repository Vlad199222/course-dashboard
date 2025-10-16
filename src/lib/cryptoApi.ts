export const fetchCryptoList = async ({
  sort,
  page,
  perPage,
}: {
  sort: string;
  page: number;
  perPage?: number;
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; // <-- берём из ENV

  const res = await fetch(
    `${baseUrl}/api/coins?sort=${sort}&page=${page}&perPage=${perPage ?? 20}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error("Помилка при отриманні криптовалют!");
  }

  return res.json();
};
