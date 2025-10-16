import { Suspense } from "react";
import HomeClient from "./HomeClient";

export default async function Home() {
  return (
    <main>
      <Suspense fallback={<div className="text-center mt-10">Загрузка...</div>}>
        <HomeClient />
      </Suspense>
    </main>
  );
}
