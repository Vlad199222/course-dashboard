import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  const token = (await cookies()).get("token")?.value;
  if (!token)
    return NextResponse.json({ message: "Немає токена" }, { status: 401 });

  const secret = process.env.JWT_SECRET;
  if (!secret) return NextResponse.json({ message: "JWT_SECRET не задан" });
  try {
    const decoded = jwt.verify(token, secret);
    return NextResponse.json({ token, decoded });
  } catch (error) {
    return NextResponse.json({ message: "Невалідний токен" }, { status: 401 });
  }
}
