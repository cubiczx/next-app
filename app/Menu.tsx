import React from "react";
import Link from "next/link";

import "./Menu.scss";

export default function Menu() {
  return (
    <nav className="menu">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/movies">Movies</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}
