import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";


const MessageSchema = z.object({

    userId: z.number(),
    content: z.string()

});


export async function POST(req: NextRequest) {
    try {

        const data = MessageSchema.parse(await req.json());
        await prisma.message.create({
            data: {

                userId: data.userId,
                content: data.content,

            }

        })
    } catch (e) {
        return NextResponse.json({
            message: "Error while adding a message"
        }, {
            status: 411
        })

    }

}