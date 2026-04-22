import { Inngest } from "inngest";
import prisma from "./prisma";
import { ENV } from "./env";
import { deleteStreamUser, upsertStreamUser } from "./stream";

export const inngest = new Inngest({ 
    id: "intervueX",
    baseUrl: ENV.INNGEST_BASE_URL || "http://localhost:8288",
 });

const syncUser = inngest.createFunction(
    { id: "sync-user" },
    { event: "clerk/user.created" },
    async ({ event }) => {
        const { id, email_addresses, first_name, last_name, image_url } = event.data;

        const newUser = {
            clerkId: id,
            email: email_addresses[0]?.email_address,
            name: `${first_name || ""} ${last_name || ""}`,
            profileImage: image_url
        }
        await prisma.user.create({
            data: newUser,
        });

        await upsertStreamUser({
            id: newUser.clerkId.toString(),
            name: newUser.name,
            image: newUser.profileImage
        })
    }
)

const deleteUser = inngest.createFunction(
    { id: "delete-user-from-db" },
    { event: "clerk/user.deleted" },
    async ({ event }) => {
        const { id } = event.data;
        await prisma.user.delete({
            where: { clerkId: id,},
        });

        await deleteStreamUser(id.toString())
    }
)

export const functions = [syncUser, deleteUser];


