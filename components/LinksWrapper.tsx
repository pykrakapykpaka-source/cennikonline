"use client";
import Links from "@/components/Links";
import { useEffect, useState } from "react";
import { collection, onSnapshot, getFirestore } from "firebase/firestore";
import { app } from "@/common/firebase";
export default function LinksWrapper({ id }: { id: string }) {
  const [links, setLinks] = useState<any>();
  useEffect(() => {
    if (!app) return;
    const db = getFirestore(app);
    const ref = collection(db, "links");
    const unsub = onSnapshot(ref, (querySnapshot: any) => {
      const snapshotData: any[] = [];
      querySnapshot.forEach((doc: any) => {
        snapshotData.push(doc.data());
      });
      setLinks(snapshotData?.filter((link) => link.id === id)[0]?.data);
    });
    return () => unsub();
  }, [id]);

  return (
    <>
      <Links links={links} />
    </>
  );
}
