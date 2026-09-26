const API_URL = "https://api.abcz.workers.dev/api/fitlog";
const PROXY = "https://api.allorigins.win/raw?url=";


export type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};


export async function getAllWorkouts() {
  const res = await fetch(PROXY + encodeURIComponent(API_URL));
  const data = await res.json();
  return data as Workout[];
}

export async function getWorkout(id: string) {
  const res = await fetch(PROXY + encodeURIComponent(API_URL + "/" + id));
  if (!res.ok) return null;
  const data = await res.json();
  return data as Workout;
}
