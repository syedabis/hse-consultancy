"use client";
import { useEffect } from "react";

/**
 * Renders a mirrored page's exact body markup and then replays its <script>
 * tags in original document order (external awaited, inline run inline).
 * <script> inserted via innerHTML never executes, so we recreate them here.
 * After all scripts load we re-fire load/DOMContentLoaded so libraries that
 * bind to those events (Swiper, counterup/waypoints, progressbar, Elementor)
 * still initialize even though the DOM was injected client-side.
 */
export default function RawContent({ html, scripts }) {

  useEffect(() => {
    let cancelled = false;

    const loadOne = (s) =>
      new Promise((resolve) => {
        const el = document.createElement("script");
        if (s.id) el.id = s.id;
        if (s.type) el.type = s.type;
        if (s.src) {
          el.src = s.src;
          el.async = false;
          el.onload = () => resolve();
          el.onerror = () => resolve();
          document.body.appendChild(el);
        } else {
          try {
            el.text = s.code;
            document.body.appendChild(el);
          } catch (e) {
            console.error("inline script error", e);
          }
          resolve();
        }
      });

    (async () => {
      for (const s of scripts || []) {
        if (cancelled) return;
        await loadOne(s);
      }
      if (cancelled) return;
      try {
        document.dispatchEvent(new Event("DOMContentLoaded"));
        window.dispatchEvent(new Event("load"));
        const jq = window.jQuery;
        if (jq) {
          jq(document).trigger("ready");
          jq(window).trigger("load").trigger("scroll").trigger("resize");
        }
      } catch (e) {
        /* no-op */
      }
    })();

    const handleMenuClick = (e) => {
      const menuBtn = e.target.closest('.nav_menu_bar');
      const closeBtn = e.target.closest('.nav_menu_bar-popup-close');
      const linkClick = e.target.closest('.nav_menu_bar-popup a');
      const popup = document.querySelector('.nav_menu_bar-popup');

      if (menuBtn) {
        e.preventDefault();
        e.stopPropagation();
        if (popup) {
          popup.classList.toggle('show');
        }
        return;
      }
      if (closeBtn || linkClick) {
        if (popup) popup.classList.remove('show');
        return;
      }
      if (popup && popup.classList.contains('show') && !e.target.closest('.nav_menu_bar-popup')) {
        popup.classList.remove('show');
      }
    };

    document.addEventListener('click', handleMenuClick, true);

    return () => {
      cancelled = true;
      document.removeEventListener('click', handleMenuClick, true);
    };
  }, [html, scripts]);

  // The injected theme HTML may not round-trip through the browser parser
  // (Elementor emits some non-standard nesting) and jQuery/Elementor mutate it
  // after mount, so suppress hydration diffing on this opaque subtree.
  return <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: html }} />;
}
