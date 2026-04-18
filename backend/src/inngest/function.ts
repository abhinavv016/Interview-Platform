import { inngest } from "./inngest";
import prisma from "../lib/prisma";

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, email_addresses, first_name, last_name, image_url } =
      event.data as {
        id: string;
        email_addresses: { email_address: string }[];
        first_name?: string;
        last_name?: string;
        image_url?: string;
      };

    const email = email_addresses?.[0]?.email_address;
    if (!email) throw new Error("Email missing");

    await prisma.user.upsert({
      where: { clerkId: id },
      update: {},
      create: {
        clerkId: id,
        email,
        name: `${first_name || ""} ${last_name || ""}`.trim(),
        profileImage: image_url ?? null,
      },
    });

    console.log("User synced");
  }
);

const deleteUser = inngest.createFunction(
  { id: "delete-user" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data as { id: string };

    await prisma.user.deleteMany({
      where: { clerkId: id },
    });

    console.log("User deleted");
  }
);

export const functions = [syncUser, deleteUser];