"use server";

import { cookies } from "next/headers";

export async function loginAction() {
  const cookieStore = await cookies();
  cookieStore.set("auth_token", "mock_token", {
    path: "/",
    maxAge: 86400,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
}
