"use client";

import { useState } from "react";
import { Clock, Flame, Star, Check, X } from "lucide-react";
import toast from "react-hot-toast";
import { usePlan } from "@/context/PlanContext";
import Link from "next/link";
import Image from "next/image";

const PlanPage = () => {
  const { plan, saved, doneList, markDone, removeFromPlan, removeFromSaved } =
    usePlan();

  const [tab, setTab] = useState("plan");

  const list = tab === "plan" ? plan : saved;

  let totalMinutes = 0;
  let totalCalories = 0;
  for (let i = 0; i < plan.length; i++) {
    totalMinutes += plan[i].duration;
    totalCalories += plan[i].caloriesBurned;
  }

  const handleRemove = (id: number) => {
    if (tab === "plan") {
      removeFromPlan(id);
      toast.success("Removed from plan");
    } else {
      removeFromSaved(id);
      toast.success("Removed from saved");
    }
  };

  const handleDone = (id: number) => {
    markDone(id);
    toast.success("Marked as done");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl uppercase mb-2">
        <p className="text-muted mb-8">
          Cap of five lifts for today. Finish them, then load more.
        </p>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center bg-card border border-line rounded-xl p-5">
            <p className="font-display  text-accent text-3xl">{plan.length}</p>
            <p className="text-xs text-muted uppercase mt-1">Exercises</p>
          </div>
          <div className="bg-card border border-line rounded-xl p-5 text-center ">
            <p className="text-accent font-display text-3xl">{totalMinutes}</p>
            <p className="text-muted text-xs uppercase mt-1">Minutes</p>
          </div>
          <div className="text-center bg-card border border-line rounded-xl p-5 ">
            <p className="text-accent font-display text-3xl">{totalCalories}</p>
            <p className="text-muted text-xs uppercase mt-1">Calories</p>
          </div>
        </div>

        <div className="flex gap-2 mb-6 border-b border-line">
          <button
            onClick={() => setTab("plan")}
            className={
              tab === "plan"
                ? "text-sm font-bold uppercase text-white border-b-2 border-accent px-4 py-2"
                : "text-sm font-bold uppercase text-muted px-4 py-2"
            }
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setTab("saved")}
            className={
              tab === "saved"
                ? "text-sm font-bold uppercase text-white border-b-2 border-accent px-4 py-2"
                : "text-sm font-bold uppercase text-muted px-4 py-2"
            }
          >
            Saved
          </button>
        </div>

        {list.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="font-display text-3xl uppercase mb-3">
              Nothing here yet
            </h2>
            <p className="text-muted mb-6">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="text-black font-bold bg-accent text-sm inline-block uppercase rounded-full px-6 py3"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {list.map((w) => (
              <div
                key={w.id}
                className="flex flex-col sm:flex-row gap-4 bg-card border border-line rounded-xl p-4"
              >
                <Image
                  src={w.image}
                  alt={w.name}
                  width={200}
                  height={200}
                  className="w-full sm:w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-display uppercase mb-1">
                    {w.name}
                  </h3>
                  <p className="text-xs text-muted mb-3">{w.equipment}</p>
                  <div className="flex text-xs text-muted gap-4 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {w.duration} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame size={12} /> {w.caloriesBurned} kcal
                    </span>
                    <span className="flex flex-wrap gap-1">
                      <Star size={12} /> {w.rating}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={"/workout/" + w.id}
                      className="text-black text-xs font-bold bg-accent uppercase rounded-full py-2 px-3"
                    >
                      View Details
                    </Link>
                    {tab === "plan" && (
                      <button
                        onClick={() => handleDone(w.id)}
                        disabled={doneList.includes(w.id)}
                        className="flex items-center text-xs font-bold border border-line uppercase px-3 py-2 rounded-full disabled:opacity-40"
                      >
                        {" "}
                        <Check size={12} />
                        {doneList.includes(w.id) ? "Done" : "Mark as Done"}
                      </button>
                    )}
                    <button
                      onClick={() => handleRemove(w.id)}
                      className="flex items-center gap-1 border border-line text-xs font-bold uppercase px-3 py-2 rounded-full hover:border-red-500"
                    >
                      <X size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </h1>
    </div>
  );
};

export default PlanPage;
