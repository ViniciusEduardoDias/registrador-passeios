"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MdNotStarted } from "react-icons/md";
import { TbRouteSquare2 } from "react-icons/tb";
import { FaCheckSquare } from "react-icons/fa";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex flex-col gap-3 items-center justify-center min-h-screen bg-gray-950 text-white p-6">
      <footer className="flex flex-col items-center">
        <Image
          src={"/Registrador.svg"}
          alt="logo"
          width={250}
          height={250}
        ></Image>
      </footer>
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-lg text-center text-gray-300 mb-2">
          Registre seus passeios, caminhadas ou pedaladas com distância, tempo e
          trajeto!
        </p>
        <ul className="flex flex-col md:flex-row gap-2 mb-4">
          <li className="flex items-center py-2 px-4 gap-2 border rounded-lg">
            <FaCheckSquare />
            Compare sua evolução
          </li>
          <li className="flex items-center py-2 px-4 gap-2 border rounded-lg">
            <FaCheckSquare />
            Coloque metas
          </li>
          <li className="flex items-center py-2 px-4 gap-2 border rounded-lg">
            <FaCheckSquare />
            Se motive
          </li>
        </ul>
      </div>
      <div className="w-full max-w-sm flex flex-col gap-4">
        <button
          onClick={() => router.push("/velocimetro")}
          className="relative flex justify-center gap-3 items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-2xl text-lg transition"
        >
          Iniciar Passeio
          <MdNotStarted className="absolute right-3 size-6" />
        </button>

        <button
          onClick={() => router.push("/passeios")}
          className="relative flex justify-center gap-3 items-center border border-gray-400 hover:border-white text-gray-300 hover:text-white font-semibold py-3 rounded-2xl text-lg transition"
        >
          Ver Histórico
          <TbRouteSquare2 className="absolute right-3 size-6 text-white" />
        </button>
      </div>
    </main>
  );
}
