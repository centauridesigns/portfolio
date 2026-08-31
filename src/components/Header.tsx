"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [osloTime, setOsloTime] = useState("");
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 0);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Oslo",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const updateTime = () => setOsloTime(formatter.format(new Date()));
    updateTime();
    const timer = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="nav-identity">
        {!isHome && (
          <Link className="nav-back" href="/" aria-label="Back to Home">
            <ArrowLeft aria-hidden="true" size={17} strokeWidth={1.8} />
          </Link>
        )}
        {isHome && <Link className="nav-name" href="/">Souhail Ziani</Link>}
      </div>
      <div className="nav-context" aria-label={`Current time in Oslo${osloTime ? `: ${osloTime}` : ""}`}>
        <span>Oslo, NO</span>
        {osloTime && <time>{osloTime}</time>}
      </div>
      <nav aria-label="Primary navigation">
        <a href="https://overpay.guide">OVERPAY</a>
        <Link href="/skins">Finishes</Link>
        <Link href="/about">About</Link>
      </nav>
    </header>
  );
}
