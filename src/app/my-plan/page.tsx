"use client";

import { useEffect, useState } from "react";
import { Clock, Flame, Star, Check, X } from "lucide-react";
import toast from "react-hot-toast";
import { usePlan } from "@/context/PlanContext";
import Link from "next/link";
import Image from "next/image";

const PlanPage = () => {
  const { plan, saved, doneList, markDone, removeFromPlan, removeFromSaved } =
    usePlan();

  const [tab, setTab] = useState("plan");

  const [sortBy, setSortBy] = useState("duration");

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const list = tab === "plan" ? plan : saved;

  const sortedList = [...list];
  if (sortBy === "duration") {
    sortedList.sort((a, b) => a.duration - b.duration);
  } else if (sortBy === "calories") {
    sortedList.sort((a, b) => a.caloriesBurned - b.caloriesBurned);
  } else if (sortBy === "rating") {
    sortedList.sort((a, b) => b.rating - a.rating);
  }

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
      <h1 className="font-display text-4xl uppercase mb-2 text-center sm:text-left lg:text-left">
        My Plan
      </h1>
      <p className="text-muted mb-8 text-center sm:text-left lg:text-left">
        Cap of five lifts for today. Finish them, then load more.
      </p>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="text-center bg-card border border-line rounded-xl p-5">
          <p
            suppressHydrationWarning
            className="font-display  text-accent text-3xl"
          >
            {plan.length}
          </p>
          <p className="text-xs text-muted uppercase mt-1">Exercises</p>
        </div>
        <div className="bg-card border border-line rounded-xl p-5 text-center ">
          <p
            suppressHydrationWarning
            className="text-accent font-display text-3xl"
          >
            {totalMinutes}
          </p>
          <p className="text-muted text-xs uppercase mt-1">Minutes</p>
        </div>
        <div className="text-center bg-card border border-line rounded-xl p-5 ">
          <p
            suppressHydrationWarning
            className="text-accent font-display text-3xl"
          >
            {totalCalories}
          </p>
          <p className="text-muted text-xs uppercase mt-1">Calories</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setTab("plan")}
            className={
              tab === "plan"
                ? "text-sm font-bold uppercase text-white bg-card rounded-full px-4 py-2"
                : "text-sm font-bold uppercase text-muted px-4 py-2 rounded-full"
            }
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setTab("saved")}
            className={
              tab === "saved"
                ? "text-sm font-bold uppercase text-white bg-card rounded-full px-4 py-2"
                : "text-sm font-bold uppercase text-muted px-4 py-2 rounded-full"
            }
          >
            Saved
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-muted text-xs uppercase">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-card border border-line rounded-lg px-3 py-2 text-sm"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {!mounted ? null : sortedList.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="font-display text-3xl uppercase mb-3">
            Nothing here yet
          </h2>
          <p className="text-muted mb-6">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="text-black font-bold bg-accent text-sm inline-block uppercase rounded-full px-6 py-3"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedList.map((w) => (
            <div
              key={w.id}
              className="flex flex-col items-center text-center lg:flex-row lg:items-center lg:text-left gap-4 bg-card border border-line rounded-xl p-4"
            >
              <Image
                src={w.image}
                alt={w.name}
                width={200}
                height={200}
                className="w-20 h-20 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h3 className="font-display text-lg uppercase mb-1">
                  {w.name}
                </h3>
                <p className="text-xs text-muted mb-2">{w.equipment}</p>
                <div className="flex justify-center lg:justify-start text-xs text-muted gap-4">
                  <span className="flex items-center gap-1">
                    <Clock size={12} className="text-accent" /> {w.duration} min
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame size={12} className="text-accent" />{" "}
                    {w.caloriesBurned} kcal
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={12} className="text-accent" /> {w.rating}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-2">
                <Link
                  href={"/workout/" + w.id}
                  className="border border-line text-xs font-bold uppercase px-3 py-2 rounded-full"
                >
                  View Details
                </Link>

                {tab === "plan" && (
                  <button
                    onClick={() => handleDone(w.id)}
                    disabled={doneList.includes(w.id)}
                    className="flex items-center gap-1 bg-accent text-black text-xs font-bold uppercase px-3 py-2 rounded-full disabled:opacity-40"
                  >
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
          ))}
        </div>
      )}
    </div>
  );
};

export default PlanPage;
