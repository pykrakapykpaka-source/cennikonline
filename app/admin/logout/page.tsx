"use client";

import { auth } from "@/common/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();
  useEffect(() => {
    if (!auth) return;
    signOut(auth).then(() => router.push("/admin"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return;
}
