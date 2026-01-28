"use client";
import { app, updateLead } from "@/common/firebase";
import moment from "moment";
import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import "moment/locale/pl";
import Link from "next/link";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Confetti from "react-confetti";
import { ReactSketchCanvas } from "react-sketch-canvas";
import Image from "next/image";
import Lead from "@/components/Lead";

import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
export default function Leads() {
  const [isSigning, setIsSigning] = useState(false);
  const [signingLead, setSigningLead] = useState<any>({});
  const [leads, setLeads] = useState<any[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [filter, setFilter] = useState("");
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNoteOpen, setIsNoteOpen] = useState<any>();
  const [noteContent, setNoteContent] = useState<any>("");
  useEffect(() => {
    if (!app) return;
    setIsLoading(true);
    setLoadError(null);
    let cancelled = false;
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
          setLeads(
            snapshotData
              .filter((lead) => lead.owner === "nikos")
              .sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
          );
        }
      } catch (err: any) {
        console.error("Failed to load leads (nikodem):", err);
        if (!cancelled) setLoadError(err?.message || "Failed to load leads");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  moment.locale("pl");
  function setNoteOpen(lead: any) {
    setNoteContent(() => {
      let contentBlock;
      if (typeof lead?.note === "string") {
        contentBlock = htmlToDraft(lead?.note);
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        setNoteContent(EditorState.createWithContent(contentState));
      } else {
        setNoteContent("");
      }
    });
    setIsNoteOpen(lead);
  }

  return (
    <>
      {(isLoading || loadError) && (
        <div className="bg-black text-white px-6 py-3 text-sm">
          {isLoading && <span>Ładowanie leadów…</span>}
          {!isLoading && loadError && (
            <span>
              Błąd wczytywania leadów: <span className="font-mono">{loadError}</span>
            </span>
          )}
        </div>
      )}
      {isNoteOpen !== undefined && (
        <div
          onClick={() => {
            setNoteOpen(undefined);
          }}
          className="z-[120] fixed left-0 top-0 w-full h-full bg-black bg-opacity-80 flex flex-col items-center justify-center"
        >
          <div
            className="bg-slate-700 border-black border-2 p-6 sm:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            <Editor
              editorStyle={{
                backgroundColor: "rgb(148 163 184)",
                color: "black",
                height: "300px",
                padding: "3px 15px",
              }}
              editorState={noteContent}
              onEditorStateChange={setNoteContent}
            />
            <button
              onClick={() => {
                const content = draftToHtml(
                  convertToRaw(noteContent.getCurrentContent())
                );
                updateLead(isNoteOpen.id, { ...isNoteOpen, note: content });
                setNoteOpen(undefined);
              }}
              className="w-full bg-green-500 hover:bg-green-400 font-gotham p-3 text-white font-bold"
            >
              Zapisz
            </button>
          </div>
        </div>
      )}
      {isSigning && (
        <div
          onClick={() => {
            setIsSigning(false);
            setSigningLead({});
          }}
          className="z-[120] fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center"
        >
          <div onClick={(e) => e.stopPropagation()} className="w-[300px] h-max">
            <h2 className="text-xl font-bold bg-black w-full font-gotham p-3">
              Podpis (parafka)
            </h2>
            <ReactSketchCanvas
              width="300px"
              height="150px"
              canvasColor="white"
              strokeColor="black"
            />
            <button
              onClick={() => {
                setIsAnimating(true);
                setTimeout(() => {
                  updateLead(signingLead.id, {
                    ...signingLead,
                    signed: true,
                  });
                  setIsAnimating(false);
                  setSigningLead({});
                }, 7500);
                setIsSigning(false);
              }}
              className="w-full text-center bg-green-500 hover:bg-green-400 font-bold text-white py-2 text-base font-gotham"
            >
              Zatwierdź
            </button>
          </div>
        </div>
      )}
      <div className="bg-gray-600 h-max w-full font-sans">
        <Link
          href="/admin/leads"
          className="bg-black py-3 px-6 text-white font-bold text-lg flex items-center"
        >
          <FaLongArrowAltLeft className="mr-2 text-xl" />
          Powrót
        </Link>
        <div className="font-gotham font-light text-lg grid grid-cols-2 sm:grid-cols-3 gap-2 p-6 !text-white">
          <button
            onClick={() => setFilter("")}
            className={`bg-black p-1 border-2 border-transparent border-dashed ${
              filter === "" && "border-white"
            }`}
          >
            Wszystkie
          </button>
          <button
            onClick={() => setFilter("new")}
            className={`bg-black p-1 border-2 border-transparent border-dashed ${
              filter === "new" && "border-white"
            }`}
          >
            Nowe
          </button>
          <button
            onClick={() => setFilter("old")}
            className={`bg-black p-1 border-2 border-transparent border-dashed ${
              filter === "old" && "border-white"
            }`}
          >
            Sprawdzone
          </button>
          <button
            onClick={() => setFilter("signed")}
            className={`bg-black p-1 border-2 border-transparent border-dashed ${
              filter === "signed" && "border-white"
            }`}
          >
            Podpisane
          </button>
          <button
            onClick={() => setFilter("trashcan")}
            className={`bg-black p-1 border-2 border-transparent border-dashed ${
              filter === "trashcan" && "border-white"
            }`}
          >
            🚽
          </button>
        </div>
        <div
          className={`grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 px-6 py-3 font-sans gap-6 min-h-screen text-white`}
        >
          {leads.map((lead: any, i: number) => {
            const isTrash = lead?.status === "trash" || !!lead?.isTrash;

            const shouldRender =
              (filter === "trashcan" && isTrash) ||
              (filter === "new" &&
                !isTrash &&
                !lead?.isFinished &&
                !lead?.signed) ||
              (filter === "" && !isTrash) ||
              (filter === "old" &&
                !isTrash &&
                !!lead?.isFinished &&
                lead?.status !== "rejected" &&
                !lead?.signed) ||
              (filter === "signed" && !isTrash && !!lead?.signed);

            if (!shouldRender) return null;

            return (
              <Lead
                forceVisibility={true}
                signingLead={signingLead}
                key={lead.id ?? i}
                lead={lead}
                setSigningLead={setSigningLead}
                setNoteOpen={setNoteOpen}
                setIsSigning={setIsSigning}
                setIsAnimating={setIsAnimating}
                isAnimating={isAnimating}
                filter={filter}
              />
            );
          })}
        </div>
      </div>
      {isAnimating && (
        <div className="fixed w-full h-full top-0 -left-1/2 translate-x-1/2 z-[100]">
          <Confetti width={1920} height={1019} />
        </div>
      )}
      {isAnimating && (
        <div className="fixed w-full h-full top-0 -left-1/2 translate-x-1/2 z-[100]">
          <Confetti width={1920} height={1019} />
        </div>
      )}
      <Image
        src="/toilet3.gif"
        width={200}
        height={200}
        alt="cennik online dla firm strona internetowa cennikonline.pl"
        className={`opacity-0 w-1/2 fixed -left-[1000px]`}
      />
      <Image
        src="/dolar.gif"
        width={200}
        height={200}
        alt="cennik online dla firm strona internetowa cennikonline.pl"
        className={`opacity-0 w-1/2 fixed -left-[1000px]`}
      />
    </>
  );
}
