export const fetchCryptoList = async (sort:any) => {
  const res = await fetch(
    `http://localhost:3000/api/coins?sort=${sort}`,
    {next:{revalidate:60}}
  );

  if (!res.ok) {
    throw new Error("Помилка при отриманні криптовалют!");
  }

  return res.json();
};
