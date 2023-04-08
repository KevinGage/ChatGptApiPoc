"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function Nav() {
  const segment = useSelectedLayoutSegment();

  return (
    <nav>
      <ul className="flex px-5 py-2 gap-2 w-full items-center text-xl">
        <li className="hover:bg-slate-900 px-5 py-2 rounded-md">
          <Link href="/" className={segment === null ? " underline" : ""}>
            Chat
          </Link>
        </li>
        <li className="hover:bg-slate-900 px-5 py-2 rounded-md">
          <Link
            href="/images"
            className={segment === "images" ? "underline" : ""}
          >
            Images
          </Link>
        </li>
      </ul>
    </nav>
  );
}
