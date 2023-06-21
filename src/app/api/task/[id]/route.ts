import { PrismaClient } from '@prisma/client'
import { verifyJwt } from '../../../../lib/jwt';
import { headers } from 'next/dist/client/components/headers';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient()

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const accessToken = headers().get('authorization')

    try {
        if (!accessToken || !verifyJwt(accessToken)) {
            return new Response(JSON.stringify({ error: accessToken }))
        }

        const getTask = await prisma.task.findUnique({
            where: {
                id: +params.id
            }
        })
        return NextResponse.json(getTask);
    } catch (error) {
        return NextResponse.json(error);
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {

    try {
        const body = await request.json();
        const accessToken = headers().get('authorization')

        if (!accessToken || !verifyJwt(accessToken)) {
            return new Response(JSON.stringify({ error: accessToken }))
        }

        const updatedTask = await prisma.task.update({
            where: { id: +params.id },
            data: body,
        });

        return NextResponse.json(updatedTask);
    } catch (error) {
        return NextResponse.json(error);
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const accessToken = headers().get('authorization')

        if (!accessToken || !verifyJwt(accessToken)) {
            return new Response(JSON.stringify({ error: accessToken }))
        }

        const deletedTask = await prisma.task.delete({
            where: { id: +params.id },
        });
        return NextResponse.json(deletedTask);
    } catch (error) {
        return NextResponse.json(error);
    }
}