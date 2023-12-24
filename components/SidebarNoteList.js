import React from "react";
import dayjs from "dayjs";

import SidebarNoteItem from "@/components/SidebarNoteItem";
import { getAllNotes } from "@/lib/redis";

const SidebarNoteList = async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    await sleep(10000);
    const notes = await getAllNotes();
    const arr = Object.entries(notes);

    if (!arr.length) {
        return <div className="notes-empty">{"No notes created yet!"}</div>;
    }

    return (
        <ul className="notes-list">
            {arr.map(([noteId, note]) => {
                return (
                    <li key={noteId}>
                        <SidebarNoteItem
                            noteId={noteId}
                            note={JSON.parse(note)}
                        />
                    </li>
                );
            })}
        </ul>
    );
};

export default SidebarNoteList;