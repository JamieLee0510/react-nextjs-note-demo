import dayjs from "dayjs";
import EditButton from "@/components/EditButton";
import NotePreview from "@/components/NotePreview";

const Note = ({ noteId, note }) => {
    const { title, content, updateTime } = note;

    return (
        <div className="note">
            <div className="note-header">
                <div className="note-title">{title}</div>
                <div className="note-menu" role="menubar">
                    <small className="note-updated-at" role="status">
                        Last updated on{" "}
                        {dayjs(updateTime).format("YYYY-MM-DD hh:mm:ss")}
                    </small>
                    <EditButton noteId={noteId}>Edit</EditButton>
                </div>
            </div>
            <NotePreview>{content}</NotePreview>
        </div>
    );
};

export default Note;
