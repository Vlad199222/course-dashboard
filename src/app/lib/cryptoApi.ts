export const fetchCryptoList = async () => {
  const res = await fetch(
    "http://localhost:3000/api/coins",
    {next:{revalidate:60}}
  );

  if (!res.ok) {
    throw new Error("Помилка при отриманні криптовалют!");
  }

  return res.json();
};
