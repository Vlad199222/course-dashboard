import { connectToDB } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  await connectToDB();
  try {
    const { email, password } = await req.json();

    if (!email || !password)
      NextResponse.json({ message: "Заповніть усі поля" }, { status: 400 });

    const user = await User.findOne({ email });

    if (!user)
      NextResponse.json({ message: "Не парвильно введен логін або пароль" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      NextResponse.json({ message: "Не парвильно введен логін або пароль" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    const response = NextResponse.json({
      message: "Успішний вхід",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        image: user.image || "",
        banned: user.banned,
      },
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Помилка сервера" }, { status: 500 });
  }
}
