"use client";
import { useEffect, useState } from "react";

export default function Hero() {
  const [Comp, setComp] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let mounted = true;
    import("./HeroCanvas")
      .then((mod) => {
        if (!mounted) return;
        setComp(() => mod.default);
      })
      .catch((err) => {
        // We intentionally lazy-load the 3D canvas; if it fails, keep the page usable,
        // but log the cause so it's debuggable.
        // eslint-disable-next-line no-console
        console.error("[Hero] Failed to load HeroCanvas", err);
        if (!mounted) return;
        setFailed(true);
      });
    return () => {
      mounted = false;
    };
  }, []);

  // If @react-three/fiber fails to load (version/bundler mismatch), don't crash the whole page.
  if (failed) {
    return (
      <div className="w-full h-full" />
    );  
  }

  if (!Comp) {
    return <div className="w-full h-full" />;
  }

  return <Comp />;
}
