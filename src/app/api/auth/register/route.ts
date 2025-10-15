import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { sign } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(req: Request) {
  await connectToDB();

  //Отримуемо емейл і пароль із тіла запиту(JSON)
  const { email, password } = await req.json();

  //Перевірка: два полі обовязкові!
  if (!email || !password) {
    return NextResponse.json(
      { message: "Email и пароль обовязково" },
      { status: 400 }
    );
  }
  //Перевірка: чи є користувач з таким email!
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      {
        message: "Користувач вже зареєстрований",
      },
      {
        status: 409,
      }
    );
  }
  //Хешируем пароль
  const hashedPassword = await bcrypt.hash(password, 10);

  // Створюем користувача!
  const user = await User.create({
    email,
    password: hashedPassword,
  });

  //Підписуєм JWT
  const token = sign({ userId: user._id.toString() }, JWT_SECRET, {
    expiresIn: "7d",
  });

  //Створюєм відповідь,в якій повернем повідомлення і самого юзера!
  const res = NextResponse.json(
    {
      message: "Реєстрація успішна!",
      user: { id: user._id.toString(), email: user.email },
    },
    { status: 201 }
  );

  // Ставим куку в прямо в цю відповідь
  res.cookies.set("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 днів
  });

  // Повертаємо готову відповідь!
  return res;
}
