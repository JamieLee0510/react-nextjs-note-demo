import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

/**
 * marked 為把markdown格式轉換為html
 * sanitizeHtml為清理html的不良字符串，如轉譯字符
 */

const allowedTags = sanitizeHtml.defaults.allowedTags.concat([
    "img",
    "h1",
    "h2",
    "h3",
]);

const allowedAttributes = Object.assign(
    {},
    sanitizeHtml.defaults.allowedAttributes,
    { img: ["alt", "src"] }
);

const NotePreview = ({ children }) => {
    return (
        <div className="note-preview">
            <div
                className="text-with-markdown"
                dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(marked(children || ""), {
                        allowedTags: allowedTags,
                        allowedAttributes: allowedAttributes,
                    }),
                }}
            ></div>
        </div>
    );
};

export default NotePreview;
