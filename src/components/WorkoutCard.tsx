import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import { Workout } from "@/lib/api";
import Image from "next/image";

const WorkoutCard = ({ workout }: { workout: Workout }) => {
  return (
    <Link
      href={"/workout/" + workout.id}
      prefetch={true}
      className="bg-card border border-line rounded-xl overflow-hidden hover:border-accent transition block"
    >
      <Image
        src={workout.image}
        alt={workout.name}
        width={400}
        height={300}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="bg-accent text-black text-[10px] font-bold uppercase px-2 py-1 rounded-full"
            >
              {group}
            </span>
          ))}
        </div>
        <h3 className="font-display text-lg uppercase mb-1">{workout.name}</h3>

        <p className="text-muted text-xs mb-3">{workout.equipment}</p>

        <div className="flex text-xs text-muted border-t border-line gap-4">
          <span className="flex items-center gap-1">
            <Clock size={12} /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame size={12} /> {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star size={12} /> {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
};
export default WorkoutCard;
