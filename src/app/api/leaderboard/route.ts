import { NextResponse } from "next/server";
import {
  getCurrentMonthLeaderboard,
  LEADERBOARD_REVALIDATE_SECONDS,
} from "@/lib/leaderboard";

export const revalidate = LEADERBOARD_REVALIDATE_SECONDS;

// GET /api/leaderboard — top contributors for the current UTC month
export async function GET() {
  const leaderboard = await getCurrentMonthLeaderboard();
  return NextResponse.json(leaderboard);
}
