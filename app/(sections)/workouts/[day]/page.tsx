import { WORKOUTS } from "@/lib/data/workouts";
import ClientPage from "./ClientPage";

export function generateStaticParams() {
  return Object.keys(WORKOUTS).map((day) => ({
    day,
  }));
}

export default async function WorkoutDayPage({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const { day } = await params;
  return <ClientPage day={day} />;
}
