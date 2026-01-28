"use client";
import Links from "@/components/Links";
import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "@/common/firebase";
export default function LinksWrapper({ id }: { id: string }) {
  const [links, setLinks] = useState<any>();
  useEffect(() => {
    if (!app) return;
    let cancelled = false;
    (async () => {
      try {
        const db = getFirestore(app);
        const ref = collection(db, "links");
        const snap = await getDocs(ref);
        const snapshotData = snap.docs.map((d) => d.data());
        if (!cancelled) {
          setLinks(snapshotData?.filter((link) => link.id === id)[0]?.data);
        }
      } catch (e) {
        console.error("Failed to load links:", e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <>
      <Links links={links} />
    </>
  );
}
