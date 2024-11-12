import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const userEmail = searchParams.get("userEmail");

  if (!userEmail) {
    return NextResponse.json(
      { message: "User email is required" },
      { status: 400 }
    );
  }

  try {
    // 1. 사용자 정보 조회
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 1. 스케줄 데이터
    const userSchedules = user.schedules || [];

    return NextResponse.json({
      schedules: userSchedules,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
