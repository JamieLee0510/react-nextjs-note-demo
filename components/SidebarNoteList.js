import React from "react";
import dayjs from "dayjs";

import SidebarNoteItem from "@/components/SidebarNoteItem";
import { getAllNotes } from "@/lib/redis";
import { sleep } from "@/lib/utils";

const SidebarNoteList = async () => {
    await sleep(1000);
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
