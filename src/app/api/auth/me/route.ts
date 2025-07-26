import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectToDB } from "@/utils/db";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  const token = (await cookies()).get("token")?.value;
  console.log(token);
  if (!token) {
    console.log("токен отсутствует");
    return NextResponse.json({ message: "Немає токена" }, { status: 401 });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) return NextResponse.json({ message: "JWT_SECRET не задан" });
  try {
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload & {
      userId: string;
    };
    console.log("decoded", decoded);
    await connectToDB();
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return NextResponse.json(
        { message: "Користувача не знайдено" },
        { status: 404 }
      );
    }

    if (user.banned) {
      return NextResponse.json({ message: "User banned" }, { status: 403 });
    }

    console.log("Юзер найден", user.email);
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ message: "Невалідний токен" }, { status: 401 });
  }
}
