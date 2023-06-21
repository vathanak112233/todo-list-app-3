import * as bcrypt from "bcrypt";
import { PrismaClient } from '@prisma/client'
import { NextResponse } from "next/server";
const prisma = new PrismaClient()

interface RequestBody {
    username: string;
    password: string;
}

export async function POST(req: Request) {
    const body: RequestBody = await req.json();

    const user = await prisma.user.create({
        data: {
            username: body.username,
            password: await bcrypt.hash(body.password, 10)
        }
    })
    return NextResponse.json(user);
}