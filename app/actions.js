"use server";

import { redirect } from "next/navigation";
import { addNote, updateNote, delNote } from "@/lib/redis";
import { revalidatePath } from "next/cache";

export async function saveNote(formData) {
    const noteId = formData.get("noteId");
    const data = JSON.stringify({
        title: formData.get("title"),
        content: formData.get("body"),
        updateTime: new Date(),
    });

    if (noteId) {
        // 更新邏輯
        // 為啥這邊不用await？
        await updateNote(noteId, data);
        revalidatePath("/", "layout"); // 清除cache
        redirect(`/note/${noteId}`);
    } else {
        // 新建邏輯
        const res = await addNote(data);
        revalidatePath("/", "layout"); // 清除cache
        redirect(`/note/${res}`);
    }
}

export async function deleteNote(formData) {
    const noteId = formData.get("noteId");
    delNote(noteId);
    revalidatePath("/", "layout"); // 清除cache
    redirect("/");
}
