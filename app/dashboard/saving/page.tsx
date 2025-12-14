"use client";

import AddSaving from "@/components/saving/addSaving";
import Tabung from "@/components/saving/tabung";
import {
  getCompleteSaving,
  getNumberSaving,
  getTotalSaving,
  getTotalTarget,
  getUserSaving,
} from "@/lib/saving";
import {
  Plus,
  Target,
  PiggyBank,
  Wallet,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Saving() {
  const [showModal, setShowModal] = useState(false);
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const [saving, setSaving] = useState<any[]>([]);
  const [activeSavingId, setActiveSavingId] = useState<string | null>(null);
  const [totalSaved, setTotalSaved] = useState(0);
  const [totalTarget, setTotalTarget] = useState(0);
  const [numberSaving, setNumberSaving] = useState(0);
  const [complete, setComplete] = useState(0);
  const globalPercentage = Math.round((totalSaved / totalTarget) * 100);

  useEffect(() => {
    async function getSaving() {
      const save = await getUserSaving();
      setSaving(save);
    }

    async function getSaved() {
      const get = await getTotalSaving();
      setTotalSaved(get);
    }

    async function getTarget() {
      const target = await getTotalTarget();
      setTotalTarget(target);
    }

    async function getNumber() {
      const get = await getNumberSaving();
      setNumberSaving(get);
    }

    async function getComplete() {
      const get = await getCompleteSaving();
      setComplete(get);
    }

    getComplete();
    getNumber();
    getTarget();
    getSaved();
    getSaving();
  });

  return (
    <div className="flex flex-col gap-12">
      {/* Saving overview */}
      <div className="flex flex-col gap-6">
        {/* Title & Action */}
        <div className="flex flex-row items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#0D1B52]">Saving Goals</h1>
            <p className="text-gray-500 mt-1">
              Wujudkan impianmu satu per satu.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#0D1B52] text-white rounded-xl shadow-lg shadow-blue-900/20 hover:bg-[#1a2d75] hover:scale-105 transition-all active:scale-95"
          >
            <Plus size={18} />
            <span className="font-medium">Create New Goal</span>
          </button>
        </div>

        {/* 2. OVERVIEW STATS (The New Header) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Total Tabungan Terkumpul */}
          <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-200">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Wallet size={20} className="text-white" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-emerald-100 text-sm font-medium">
                Total Tabungan
              </p>
              <h3 className="text-3xl font-bold mt-1">
                {formatRupiah(totalSaved)}{" "}
              </h3>
            </div>
          </div>
          {/* Card 2: Total Target Global */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div className="w-full mr-4">
              <p className="text-sm font-medium text-gray-500 mb-1">
                Total Target (Global)
              </p>
              <h3 className="text-2xl font-bold text-gray-900">
                {formatRupiah(totalTarget)}
              </h3>

              {/* Mini Progress Bar Global */}
              <div className="mt-3 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: globalPercentage }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-1 text-right">
                {globalPercentage}% Terkumpul
              </p>
            </div>
            <div className="h-12 w-12 min-w-[3rem] bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
              <Target size={24} />
            </div>
          </div>

          {/* Card 3: Goals Count */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Goals Aktif
              </p>
              <h3 className="text-2xl font-bold text-gray-900">
                {numberSaving - complete}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                {complete} tercapai tahun ini
              </p>
            </div>
            <div className="h-12 w-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
              <Wallet size={24} />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-12">
        {saving.map((sv) => (
          <div
            key={sv.id}
            className="w-full border-l-[5px] border-blue-600 bg-white rounded-md shadow-lg p-6 flex flex-col gap-4"
          >
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                {/* Ganti hardcode jadi dynamic data */}
                <p className="text-lg font-semibold">{sv.title}</p>
                <p className="text-sm text-gray-500">Saving Goal</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-right text-gray-500">Target</p>
                <p className="text-lg font-semibold">
                  {formatRupiah(sv.target)}
                </p>
              </div>
            </div>

            {/* Progress Bar Section */}
            <div className="flex flex-row items-center gap-8">
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500"
                  style={{ width: `${Math.round((sv.saved / sv.target) * 100)}` }}
                ></div>
              </div>
              <p className="font-medium text-gray-700 min-w-[3rem] text-right">
                {Math.round((sv.saved / sv.target) * 100)} %
              </p>
            </div>

            <div className="h-px bg-gray-200"></div>

            {/* Footer Section (Saved & Remaining) */}
            <div className="flex flex-row justify-between">
              <div className="flex flex-col gap-2">
                <div className="justify-between text-sm text-gray-700 flex flex-col">
                  <p>Saved: </p>
                  <span className="font-semibold text-lg">
                    {formatRupiah(sv.saved)}
                  </span>
                </div>
              </div>
              <div className="justify-between text-sm text-gray-700 flex flex-col">
                <p className="text-right">Remaining: </p>
                <span className="font-semibold text-lg text-emerald-600 text-right">
                  {formatRupiah(sv.target - sv.saved)}
                </span>
              </div>
            </div>
            <button
              disabled={sv.target === sv.saved}
              onClick={() => setActiveSavingId(sv.id)}
              className={`${sv.target === sv.saved ? "bg-sky-800" : "bg-blue-600"} text-white px-2 py-1 rounded-lg w-fit`}
            >
              {sv.target === sv.saved ? "Complete" : "Tabung"}
            </button>
          </div>
        ))}
      </div>
      <AddSaving isOpen={showModal} onClose={() => setShowModal(false)} />

      {activeSavingId && (
        <Tabung
          savingId={activeSavingId}
          onClose={() => setActiveSavingId(null)}
        />
      )}
    </div>
  );
}
