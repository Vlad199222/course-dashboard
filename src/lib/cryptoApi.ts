export const fetchCryptoList = async ({sort ,page,perPage,}:{sort:string,page:number,perPage?:number}) => {
  const res = await fetch(
    `http://localhost:3000/api/coins?sort=${sort}&page=${page}&perPage=${perPage}`,
    {next:{revalidate:60}}
  );

  if (!res.ok) {
    throw new Error("Помилка при отриманні криптовалют!");
  }

  return res.json();
};
