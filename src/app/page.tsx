"use client";

import { useEffect, useState } from "react";
import { getAllWorkouts, Workout } from "@/lib/api";
import Image from "next/image";
import WorkoutCard from "@/components/WorkoutCard";

const HomePage = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("duration");

  useEffect(() => {
  async function loadData() {
    try {
      const data = await getAllWorkouts();
      setWorkouts(data);
    } catch (error) {
      console.error("Failed to load workouts:", error);
    }
    setLoading(false);
  }
  loadData();
}, []);

  const sortedWorkouts = [...workouts];
  if (sortBy === "duration") {
    sortedWorkouts.sort((a, b) => a.duration - b.duration);
  } else if (sortBy === "calories") {
    sortedWorkouts.sort((a, b) => a.caloriesBurned - b.caloriesBurned);
  } else if (sortBy === "rating") {
    sortedWorkouts.sort((a, b) => b.rating - a.rating);
  }
  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 py-6 text-center sm:text-left">
        <div className="bg-card border border-line rounded-2xl p-8 md:p-12 items-center grid md:grid-cols-2 gap-8 md:gap-16">
          <div>
            <p className="text-accent text-xs font-bold uppercase tracking-widest mb-4 text-center sm:text-left">
              Workout Library
            </p>
            <h1 className="font-display text-4xl md:text-6xl uppercase leading-tight mb-6 text-center sm:text-left">
              Train with intent. Log every set.
            </h1>
            <p className="text-muted mb-8">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>
            <a
              href="#library"
              className="inline-flex items-center gap-2 bg-accent text-black font-bold uppercase text-sm px-6 py-3 rounded-full"
            >
              Browse Workouts
            </a>
          </div>

          <Image
            src="/banner.png"
            alt="gym"
            width={800}
            height={600}
            loading="eager"
            className="w-full h-64 md:h-96 object-contain"
          />
        </div>
      </section>

      <section id="library" className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 gap-4">
          <div className="text-center sm:text-left">
            <h2 className="font-display text-3xl uppercase mb-2">
              The Library
            </h2>
            <p className="text-muted text-sm">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <div className="flex items-center justify-between w-full sm:w-auto sm:gap-4">
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

        {loading ? (
          <p className="text-muted text-center py-20">Loading workouts…</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedWorkouts.map((w) => (
              <WorkoutCard key={w.id} workout={w} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
export default HomePage;
