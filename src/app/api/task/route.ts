import { verifyJwt } from "@/lib/jwt";
import { PrismaClient } from '@prisma/client'
import { NextResponse } from "next/server";
const prisma = new PrismaClient()

export async function GET(req: Request) {
    const accessToken = req.headers.get('authorization');
    try {
        if (!accessToken || !verifyJwt(accessToken)) {
            return new Response(JSON.stringify({ error: 'unauthorized' }));
        }
        const newTask = await prisma.task.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        username: true
                    }
                }
            }
        });
        return NextResponse.json(newTask);
    } catch (error) {
        return NextResponse.json(error)
    }
}


export async function POST(req: Request) {
    const accessToken = req.headers.get('authorization');
    const body = await req.json();

    try {
        if (!accessToken || !verifyJwt(accessToken)) {
            return NextResponse.json({ error: 'unauthorized' });
        }
        const newTask = await prisma.task.create({
            data: body,
        });
        return NextResponse.json(newTask);
    } catch (error) {
        return NextResponse.json(error);
    }
}