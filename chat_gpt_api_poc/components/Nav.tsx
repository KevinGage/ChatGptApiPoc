import Link from "next/link";

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Chat</Link>
          <Link href="/images">Images</Link>
        </li>
      </ul>
    </nav>
  );
}
