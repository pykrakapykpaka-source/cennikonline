"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
export default function AOSInit() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;

    const initAos = () => {
      if (cancelled) return;
      AOS.init({
        offset: 0,
      });
    };

    // Important: AOS mutates the DOM by adding classes like `aos-init`.
    // If that happens before React finishes hydrating SSR-ed Client Components,
    // React will warn about attribute mismatches. Deferring until `load` (and
    // then idle) avoids mutating markup mid-hydration.
    const scheduleInit = () => {
      if (cancelled) return;
      const w = window as unknown as {
        requestIdleCallback?: (cb: () => void, opts?: { timeout?: number }) => number;
        cancelIdleCallback?: (id: number) => void;
      };

      if (typeof w.requestIdleCallback === "function") {
        w.requestIdleCallback(initAos, { timeout: 1500 });
      } else {
        window.setTimeout(initAos, 250);
      }
    };

    if (document.readyState === "complete") {
      scheduleInit();
    } else {
      window.addEventListener("load", scheduleInit, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", scheduleInit);
    };
  }, []);

  useEffect(() => {
    // When navigating between routes, ensure newly-rendered elements get animated.
    // This runs after the route transition commits on the client.
    // Defer a tick so we refresh after the new DOM is painted.
    const id = window.setTimeout(() => AOS.refresh(), 0);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
