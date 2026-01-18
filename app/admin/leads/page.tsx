"use client";
import { app, auth } from "@/common/firebase";
import { useWindowDimensions } from "@/lib/useWindowDimensions";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import "moment/locale/pl";
import { FaArrowRight } from "react-icons/fa";
import HackerLoading from "@/components/admin/HackerLoading";
import {
  LineChart,
  Line,
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
interface AdminPageProps {
  courses: any[];
  leads: any[];
  applications: any[];
  nikosLeads: any[];
}

export default function Admin() {
  moment.locale("pl");
  const [user, loading] = useAuthState(auth!);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const [isLoadingApplications, setIsLoadingApplications] = useState(false);
  const [data, setData] = useState<AdminPageProps>({
    courses: [],
    leads: [],
    applications: [],
    nikosLeads: [],
  });
  useEffect(() => {
    if (loading) return;
    if (!app) return;
    const db = getFirestore(app);
    const ref1 = collection(db, "leads");
    const ref2 = collection(db, "employees");

    setIsLoadingLeads(true);
    setIsLoadingApplications(true);
    setLoadError(null);

    const unsubLeads = onSnapshot(
      ref1,
      (querySnapshot: any) => {
        const snapshotData: any[] = querySnapshot.docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData((prevData) => ({
          ...prevData,
          leads: snapshotData,
          nikosLeads: snapshotData.filter((lead: any) => lead.owner === "nikos"),
        }));
        setIsLoadingLeads(false);
      },
      (err: any) => {
        console.error("Failed to load leads:", err);
        setLoadError(err?.message || "Failed to load leads");
        setIsLoadingLeads(false);
      }
    );

    const unsubApplications = onSnapshot(
      ref2,
      (querySnapshot: any) => {
        const snapshotData: any[] = querySnapshot.docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData((prevData) => ({ ...prevData, applications: snapshotData }));
        setIsLoadingApplications(false);
      },
      (err: any) => {
        console.error("Failed to load applications:", err);
        setLoadError(err?.message || "Failed to load applications");
        setIsLoadingApplications(false);
      }
    );
    return () => {
      unsubLeads();
      unsubApplications();
    };
  }, [loading, user?.email]);

  function generateLeadsChartData(data: any, key: string) {
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
  const isLoadingData = isLoadingLeads || isLoadingApplications;
  const newLeadsCount = data.leads.filter(
    (lead: any) => !lead.isFinished && !lead.isTrash
  )?.length;
  const newNikosLeadsCount = data.nikosLeads.filter(
    (lead: any) => !lead.isFinished && !lead.isTrash
  )?.length;
  return (
    <div className={`min-h-screen grid lg:grid-cols-2 -ml-4 -mt-4 p-6 font-sans`}>
      <HackerLoading
        active={isLoadingData}
        error={loadError}
        title="ADMIN // dashboard bootstrap"
        subtitle="realtime snapshot"
        stats={[
          { label: "leads_total", value: data.leads.length },
          { label: "leads_new", value: newLeadsCount },
          { label: "apps_total", value: data.applications.length },
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
                { label: "Wszystkie", value: data.leads.length },
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
            <p className="text-xl">Wszystkie Leady: {data.leads.length}</p>
            <p className="text-xl">Nowe Leady: {newLeadsCount} </p>
          </div>
        )}
        <div className="mt-4 bg-green-100 p-4 rounded-xl">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={generateLeadsChartData(data.leads, "leady")}
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
      <div className="flex flex-col">
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
              <Link
                href="/admin/leads/applications"
                className="flex items-center"
              >
                <FaArrowRight className="mr-2" />
                Aplikacje
              </Link>
            </h2>
            <div
              className={`mt-4 p-4 font-bold rounded-xl ${
                light ? "text-white bg-[green]" : "text-white bg-zinc-600"
              }`}
            >
              <p className="text-xl">
                Wszystkie aplikacje: {data.applications.length}
              </p>
              <p className="text-xl">
                Nowe aplikacje:{" "}
                {
                  data.applications.filter((lead: any) => !lead.isFinished)
                    ?.length
                }{" "}
              </p>
            </div>
            <div className="mt-4 bg-green-100 p-4 rounded-xl">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart
                  data={generateLeadsChartData(data.applications, "aplikacje")}
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
                  <Line type="monotone" dataKey="aplikacje" stroke="green" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

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
              <Link
                href="/admin/leads/leads-nikodem"
                className="flex items-center"
              >
                Cenniki online <FaArrowRight className="ml-2" />
              </Link>
            </h2>
            <span className="text-sm">(Nikodem)</span>
            <div
              className={`mt-4 p-4 font-bold rounded-xl ${
                light ? `text-white bg-[blue]` : "text-white bg-zinc-600"
              }`}
            >
              <p className="text-xl">
                Wszystkie Leady: {data.nikosLeads.length}
              </p>
              <p className="text-xl">
                Nowe Leady: {newNikosLeadsCount}{" "}
              </p>
            </div>

            <div className="mt-4 bg-blue-100 p-4 rounded-xl">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart
                  data={generateLeadsChartData(data.nikosLeads, "leady")}
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
                  <Line type="monotone" dataKey="leady" stroke="blue" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
    </div>
  );
}
