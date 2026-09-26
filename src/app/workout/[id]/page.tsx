"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Plus, Bookmark, Clock, Flame, Star } from "lucide-react";
import toast from "react-hot-toast";
import { getWorkout, Workout } from "@/lib/api";
import { usePlan } from "@/context/PlanContext";
import Image from "next/image";

const WorkoutDetailPage = () => {
  const params = useParams();
  const id = params.id as string;
  const { plan, addToPlan, saveForLater } = usePlan();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getWorkout(id);
        if (data) setWorkout(data);
      } catch (error) {
        console.error("Failed to load workout:", error);
      }
      setLoading(false);
    }
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <div className="w-10 h-10 border-4 border-line border-t-accent rounded-full animate-spin"></div>
        <p className="text-muted text-sm">Loading workout…</p>
      </div>
    );
  }

  if (!workout) return null;

  const alreadyAdded = plan.find((w) => w.id === workout.id);

  function handleAddToPlan() {
    if (plan.length >= 5) {
      toast.error("Plan is full (max 5)");
      return;
    }
    addToPlan(workout!);
    toast.success("Added to today's plan");
  }

  function handleSave() {
    saveForLater(workout!);
    toast.success("Saved for later");
  }

  return (
    <div className="grid md:grid-cols-2 mx-auto max-w-7xl gap-10 px-4 py-10">
      <Image
        src={workout.image}
        alt={workout.name}
        width={800}
        height={600}
        className="rounded-2xl w-full h-96 object-cover"
      />
      <div>
        <h1 className="text-4xl uppercase font-display mb-3">{workout.name}</h1>
        <p className="text-muted mb-5">{workout.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {workout.muscleGroups.map((g) => (
            <span
              key={g}
              className="text-black font-bold uppercase bg-accent text-[10px] rounded-full px-3 py-1"
            >
              {g}
            </span>
          ))}
        </div>

        <div className="bg-card border border-line rounded-xl p-5 mb-6">
          <h2 className="text-sm uppercase font-display text-muted mb-4">
            Key Specs
          </h2>
          <div className="text-sm grid grid-cols-2 gap-3">
            <p className="text-muted">Equipment</p>
            <p className="border-b border-line pb-2">{workout.equipment}</p>

            <p className="text-muted">Difficulty</p>
            <p className="border-b border-line pb-2">{workout.difficulty}</p>

            <p className="text-muted">Sets</p>
            <p className="border-b border-line pb-2">{workout.sets}</p>

            <p className="text-muted">Reps</p>
            <p className="border-b border-line pb-2">{workout.reps}</p>

            <p className="text-muted">Duration</p>
            <p className="flex items-center gap-1 border-b border-line pb-2">
              <Clock size={12} /> {workout.duration} min
            </p>

            <p className="text-muted">Calories</p>
            <p className="flex items-center gap-1 border-b border-line pb-2">
              <Flame size={12} /> {workout.caloriesBurned} kcal
            </p>

            <p className="text-muted">Rating</p>
            <p className="flex items-center gap-1">
              <Star size={12} /> {workout.rating}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="font-display text-sm uppercase text-muted mb-4">
            Instructions
          </h2>
          <ol className="space-y-3">
            {workout.instructions.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex items-center justify-center bg-accent text-black text-xs font-bold w-6 h-6 rounded-full shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm text-muted">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAddToPlan}
            disabled={!!alreadyAdded || plan.length >= 5}
            className="flex items-center justify-center gap-2 bg-accent text-black font-bold uppercase text-sm px-6 py-3 rounded-full disabled:opacity-40"
          >
            <Plus size={16} />
            {alreadyAdded ? "In Plan" : "Add to today's plan"}
          </button>

          <button
            onClick={handleSave}
            className="flex items-center justify-center gap-2 border border-line font-bold uppercase text-sm px-6 py-3 rounded-full hover:border-white"
          >
            <Bookmark size={16} />
            Save for later
          </button>
        </div>
      </div>
    </div>
  );
};
export default WorkoutDetailPage;
