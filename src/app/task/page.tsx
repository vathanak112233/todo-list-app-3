"use client"
import { Button, IconButton, Link, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./../page.module.css";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    priority: string;
    status: string;
    updatedAt: string;
    userId: number;
    user: {
        id: number;
        username: string;
    }
}
export default function TaskList() {
    const [rows, setRows] = useState<Task[]>([]);
    const [accessToken, setAccessToken] = useState<string>("");

    const deleteTask = async (id: any) => {
        if (!accessToken) { return }
        try {
            const response = await fetch(`/api/task/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authorization: accessToken,
                },
            });

            if (response.status === 200) {
                alert("Do you know what delete task ?");
                setRows(rows.filter((row) => row.id !== id));
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const fetchTasks = async () => {
        if (!accessToken) { return }
        try {
            const response = await fetch("/api/task", {
                headers: {
                    authorization: accessToken,
                },
            });
            const data = await response.json();
            setRows(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchSession = async () => {
        const session: any = await getSession();
        if (session) {
            setAccessToken(session.user?.accessToken);
        }
    };

    useEffect(() => {
        fetchSession();
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [accessToken]);

    return (
        <>
            <h1 className={styles.title}>Task List Management</h1>

            <div className="header-action">
                <div>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        href="/task/create"
                    >
                        Add Task
                    </Button>
                </div>
            </div>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Task ID</TableCell>
                            <TableCell align="right">Title</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Due Date</TableCell>
                            <TableCell align="right">Priority</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Create By</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.title}</TableCell>
                                <TableCell align="right">{row?.description}</TableCell>
                                <TableCell align="right">{row.dueDate}</TableCell>
                                <TableCell align="right">{row.priority}</TableCell>
                                <TableCell align="right">{row.status}</TableCell>
                                <TableCell align="right">{row?.user?.username}</TableCell>
                                <TableCell align="right">
                                    <Link href={"task/update/" + row.id}>
                                        <IconButton aria-label="edit" size="small" type="button">
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </Link>

                                    <IconButton
                                        aria-label="delete"
                                        size="small"
                                        type="button"
                                        color="error"
                                        onClick={(e) => deleteTask(row.id)}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow></TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    )
}