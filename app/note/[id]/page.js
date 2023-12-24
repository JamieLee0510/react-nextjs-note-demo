import Note from "@/components/Note";
import { getNote } from "@/lib/redis";

const Page = async ({ params }) => {
    // 由動態路由來獲取 noteId
    const noteId = params.id;

    const note = await getNote(noteId);

    // 測試 Suspense 效果
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    await sleep(5000);

    if (note == null) {
        return (
            <div className="note--empty-state">
                <span className="note-text--empty-state">
                    Click a note on the left to view something! 🥺
                </span>
            </div>
        );
    }

    return <Note noteId={noteId} note={note} />;
};

export default Page;
