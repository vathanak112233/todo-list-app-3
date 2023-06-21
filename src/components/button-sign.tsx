"use client";

import { Button } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";

export default function ButtonSign() {
    const { data: session } = useSession();

    if (session && session.user) {
        return (
            <>
                <div className="user-login">{session.user?.username}</div>
                <div>
                    <Button variant="outlined" type="button" onClick={() => signOut()}>
                        Sing Out
                    </Button>
                </div>
            </>
        );
    } else {
        return (
            <Button variant="outlined" type="button" onClick={() => signIn()}>
                Sing In
            </Button>
        );
    }
}