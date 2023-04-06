import Link from "next/link";

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
          <Link href="/tokens">Tokens</Link>
        </li>
      </ul>
    </nav>
  );
}
