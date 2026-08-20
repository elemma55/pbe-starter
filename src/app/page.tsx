import Image from "next/image";
import { FeatureCapture } from "@/components/FeatureCapture";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center gap-8 bg-white p-8 dark:bg-zinc-950">
      <Image
        src="/alaimo-labs-logo.svg"
        alt="Alaimo Labs"
        width={220}
        height={31}
        priority
        className="dark:invert"
      />
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Priorizador de Features
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Capturá tus ideas con los datos necesarios para priorizarlas.
        </p>
      </div>
      <FeatureCapture />
    </main>
  );
}
