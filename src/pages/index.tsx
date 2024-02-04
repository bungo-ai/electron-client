import Image from "next/image";
import { Inter } from "next/font/google";

import Chat from "../components/chat/Chat"

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <Chat />
    </main>
  );
}
