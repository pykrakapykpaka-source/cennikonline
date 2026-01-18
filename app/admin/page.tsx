"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "./loading";

export default function Admin() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/admin/leads");
  }, [router]);
  return (
    <div className="flex items-center justify-center flex-col space-y-3 min-h-screen bg-[#404149] h-full font-sans">
      <Loading />
    </div>
  );
}
