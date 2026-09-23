"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Workout } from "@/lib/api";

type PlanContextType = {
  plan: Workout[];
  saved: Workout[];
  doneList: number[];
  addToPlan: (workout: Workout) => void;
  saveForLater: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markDone: (id: number) => void;
};

const PlanContext = createContext<PlanContextType | null>(null);

function readFromStorage(key: string) {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(key);
  if (!value) return null;
  return JSON.parse(value);
}

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>(
    () => readFromStorage("fitlog_plan") || []
  );
  const [saved, setSaved] = useState<Workout[]>(
    () => readFromStorage("fitlog_saved") || []
  );
  const [doneList, setDoneList] = useState<number[]>(
    () => readFromStorage("fitlog_done") || []
  );

  useEffect(() => {
    localStorage.setItem("fitlog_plan", JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem("fitlog_saved", JSON.stringify(saved));
  }, [saved]);

  useEffect(() => {
    localStorage.setItem("fitlog_done", JSON.stringify(doneList));
  }, [doneList]);

  function addToPlan(workout: Workout) {
    if (plan.length >= 5) return;
    if (plan.find((w) => w.id === workout.id)) return;
    setPlan([...plan, workout]);
  }

  function saveForLater(workout: Workout) {
    if (saved.find((w) => w.id === workout.id)) return;
    setSaved([...saved, workout]);
  }

  function removeFromPlan(id: number) {
    setPlan(plan.filter((w) => w.id !== id));
  }

  function removeFromSaved(id: number) {
    setSaved(saved.filter((w) => w.id !== id));
  }

  function markDone(id: number) {
    if (doneList.includes(id)) return;
    setDoneList([...doneList, id]);
  }

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        doneList,
        addToPlan,
        saveForLater,
        removeFromPlan,
        removeFromSaved,
        markDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside PlanProvider");
  return ctx;
}