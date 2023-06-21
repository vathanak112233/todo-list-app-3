import * as bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import jwt from 'jsonwebtoken';

interface RequestBody {
    username: string;
    password: string;
}

export async function POST(req: Request) {
    const body: RequestBody = await req.json();

    const user = await prisma.user.findFirst({
        where: {
            username: body.username,
        },
    });

    if (user && (await bcrypt.compare(body.password, user.password))) {
        const secret_key = process.env.SECRET_KEY;
        const { password, ...userWithoutPass } = user;
        const result = {
            ...userWithoutPass,
            accessToken: jwt.sign(user, secret_key!, { expiresIn: '1h' })
        };
        return NextResponse.json(result)
    } else return NextResponse.json(null)
}