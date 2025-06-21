export const fetchCryptoList = async () => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false",
    {next:{revalidate:60}}
  );

  if (!res.ok) {
    throw new Error("Помилка при отриманні криптовалют!");
  }

  return res.json();
};
