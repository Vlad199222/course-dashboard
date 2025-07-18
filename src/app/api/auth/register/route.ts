import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";

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
  await User.create({
    email,
    password: hashedPassword,
  });

  // Відправляємо успішний запит!
  return NextResponse.json(
    {
      message: "Реєстрація успішна!",
    },
    { status: 201 }
  );
}
