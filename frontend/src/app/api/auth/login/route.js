import { pbClient } from "@/lib/pocketbase";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    console.log("form:", { email, password });
    const result = await pbClient.authenticate(email, password);
    const { record, token } = result;
    record.token = token;
    cookies().set("pb_auth", pbClient.client.authStore.exportToCookie());

    return NextResponse.json(record);
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || err.toString() }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
