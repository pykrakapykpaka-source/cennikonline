"use client";
import { app, auth } from "@/common/firebase";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import "moment/locale/pl";
import { FaArrowRight } from "react-icons/fa";
import HackerLoading from "@/components/admin/HackerLoading";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  BarChart,
} from "recharts";
import { useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Admin() {
  moment.locale("pl");
  const [user, loading] = useAuthState(auth!);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  useEffect(() => {
    if (loading) return;
    if (!app) return;
    let cancelled = false;

    setIsLoadingLeads(true);
    setLoadError(null);

    (async () => {
      try {
        const db = getFirestore(app);
        const ref = collection(db, "leads");
        const snap = await getDocs(ref);
        const snapshotData = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (!cancelled) {
          setLeads(snapshotData);
        }
      } catch (err: any) {
        console.error("Failed to load leads:", err);
        if (!cancelled) setLoadError(err?.message || "Failed to load leads");
      } finally {
        if (!cancelled) setIsLoadingLeads(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [loading, user?.email]);

  function generateLeadsChartData(data: any[], key: string) {
    // Find unique month names from leads
    const uniqueMonths = new Set(
      data.map((lead: any) => moment(lead.createdAt).format("MM.YYYY"))
    );
    const uniqueMonthNames = Array.from(uniqueMonths).sort();

    // {'czerwiec 2024', 'maj 2024'}
    const chartData = uniqueMonthNames.map((month: any) => ({
      miesiac: month,
      [key]: data.filter(
        (lead: any) => moment(lead.createdAt).format("MM.YYYY") === month
      ).length,
    }));

    return chartData;
  }
  const { light } = useSelector((state: any) => state.light);
  const isLoadingData = isLoadingLeads;
  const newLeadsCount = leads.filter(
    (lead: any) => !lead.isFinished && !lead.isTrash
  )?.length;
  return (
    <div className={`min-h-screen -ml-4 -mt-4 p-6 font-sans`}>
      <HackerLoading
        active={isLoadingData}
        error={loadError}
        title="ADMIN // dashboard bootstrap"
        subtitle="one-time fetch"
        stats={[
          { label: "leads_total", value: leads.length },
          { label: "leads_new", value: newLeadsCount },
        ]}
      />
      <div
        className={`${
          light
            ? "text-zinc-800 bg-white"
            : "text-white bg-zinc-800 duration-300"
        } flex flex-col p-6 h-max ml-4 mt-4 rounded-md`}
      >
        <h2
          className={`text-3xl font-bold font-sans ${
            light ? "text-zinc-800" : "text-white"
          }`}
        >
          <Link href="/admin/leads/leads" className="flex items-center">
            Cenniki online <FaArrowRight className="ml-2" />
          </Link>
        </h2>
        {isLoadingData ? (
          <div className="mt-4">
            <HackerLoading
              active={true}
              title="leads://cenniki-online"
              subtitle="compiling metrics…"
              variant="card"
              stats={[
                { label: "Wszystkie", value: leads.length },
                { label: "Nowe", value: newLeadsCount },
              ]}
            />
          </div>
        ) : (
          <div
            className={`mt-4 p-4 font-bold rounded-xl ${
              light ? `text-white bg-[green]` : "text-white bg-zinc-600"
            }`}
          >
            <p className="text-xl">Wszystkie Leady: {leads.length}</p>
            <p className="text-xl">Nowe Leady: {newLeadsCount} </p>
          </div>
        )}
        <div className="mt-4 bg-green-100 p-4 rounded-xl">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={generateLeadsChartData(leads, "leady")}
              margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="miesiac" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="leady" fill="green" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
