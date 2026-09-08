"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import "./theme-loader.css";

export default function ThemeLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      className={`theme-loader ${loading ? "active" : "loaded"}`}
      aria-hidden={!loading}
    >
      <div className="spinner">
        <div className="spinner-bounce one" />
        <div className="spinner-bounce two" />
        <div className="spinner-bounce three" />
      </div>
    </div>
  );
}
