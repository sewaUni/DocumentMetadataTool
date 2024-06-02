"use server";

import { createUser } from "@/lib/data";

export async function addUserAction(formData) {
  const json = Object.fromEntries(formData);

  return await createUser(json);
}
