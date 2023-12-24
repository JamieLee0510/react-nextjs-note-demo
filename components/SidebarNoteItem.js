import dayjs from "dayjs";
import SidebarNoteItemContent from "@/components/SidebarNoteItemContent";

const SidebarNoteItem = ({ noteId, note }) => {
    const { title, content = "", updateTime } = note;
    return (
        <SidebarNoteItemContent
            id={noteId}
            title={note.title}
            // 從服務端組件傳props到客戶端渲染組件，不可以是函數，但
            expandedChildren={
                <p className="sidebar-note-excerpt">
                    {content.substring(0, 20) || <i>(No content)</i>}
                </p>
            }
        >
            <header className="sidebar-note-header">
                <strong>{title}</strong>
                <small>{dayjs(updateTime).format("YYYY-MM-DD hh:mm:ss")}</small>
            </header>
        </SidebarNoteItemContent>
    );
};

export default SidebarNoteItem;
