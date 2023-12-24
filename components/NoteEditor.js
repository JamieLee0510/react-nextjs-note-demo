"use client";

import { useState } from "react";
import NotePreview from "@/components/NotePreview";
import { saveNote, deleteNote } from "../app/actions";
import { useFormStatus } from "react-dom";

const NoteEditor = ({ noteId, initialTitle, initialBody }) => {
    const { pending } = useFormStatus();
    const [title, setTitle] = useState(initialTitle);
    const [body, setBody] = useState(initialBody);
    const isDraft = !noteId;

    return (
        <div className="note-editor">
            <form className="note-editor-form" autoComplete="off">
                <label className="offscreen" htmlFor="note-title-input">
                    Enter a title for your note
                </label>
                <input
                    id="note-title-input"
                    type="text"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
                <label className="offscreen" htmlFor="note-body-input">
                    Enter the body for your note
                </label>
                <textarea
                    value={body}
                    id="note-body-input"
                    onChange={(e) => setBody(e.target.value)}
                />
            </form>
            <div className="note-editor-preview">
                <form className="note-editor-menu" role="menubar">
                    <button
                        className="note-editor-done"
                        disabled={pending}
                        formAction={() => saveNote(noteId, title, body)}
                        type="submit"
                        role="menuitem"
                    >
                        <img
                            src="/checkmark.svg"
                            width="14px"
                            height="10px"
                            alt=""
                            role="presentation"
                        />
                        Done
                    </button>
                    {!isDraft && (
                        <button
                            className="note-editor-delete"
                            disabled={pending}
                            formAction={() => deleteNote(noteId)}
                            role="menuitem"
                        >
                            <img
                                src="/cross.svg"
                                width="10px"
                                height="10px"
                                alt=""
                                role="presentation"
                            />
                            {pending ? "Saving..." : "Done"}
                        </button>
                    )}
                </form>
                <div className="label label--preview" role="status">
                    Preview
                </div>
                <h1 className="note-title">{title}</h1>
                {/* 不過，NotePreview不是服務端組件嗎？基本上，NextJS中的組件都會是「服務端組件」；
                    然而，在組件頂端宣告`use client`、或者被該客戶端組件引用，它也會變成客戶端組件
                */}
                <NotePreview>{body}</NotePreview>
            </div>
        </div>
    );
};

export default NoteEditor;
