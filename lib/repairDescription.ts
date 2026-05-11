type TipTapDoc = {
  type?: string;
  content?: TipTapNode[];
};
type TipTapNode = {
  type?: string;
  text?: string;
  content?: TipTapNode[];
  attrs?: Record<string, unknown>;
  marks?: unknown[];
};

const EMPTY_DOC = { type: "doc", content: [{ type: "paragraph" }] };

/**
 * Detects and repairs the double-serialization corruption pattern where a
 * TipTap doc ends up wrapped as: doc > paragraph > text(JSON string of a doc).
 *
 * This happens when JSON.stringify is accidentally called on an already-parsed
 * JSONContent object before it is passed to TipTap's `content` prop, causing
 * TipTap to treat the JSON string as plain text and wrap it in a paragraph.
 *
 * The function unwraps recursively so multiple layers (from repeated bad saves)
 * are also recovered.
 */
export function repairDescription(raw: unknown): TipTapDoc {
  let doc: TipTapDoc;

  if (typeof raw === "string") {
    if (!raw.trimStart().startsWith("{")) return EMPTY_DOC;
    try {
      doc = JSON.parse(raw) as TipTapDoc;
    } catch {
      return EMPTY_DOC;
    }
  } else if (typeof raw === "object" && raw !== null) {
    doc = raw as TipTapDoc;
  } else {
    return EMPTY_DOC;
  }

  // Detect the corruption: a doc with exactly one paragraph whose only child
  // is a text node containing a JSON-encoded TipTap doc string.
  if (
    doc?.type === "doc" &&
    Array.isArray(doc.content) &&
    doc.content.length === 1 &&
    doc.content[0]?.type === "paragraph" &&
    Array.isArray(doc.content[0].content) &&
    doc.content[0].content.length === 1 &&
    doc.content[0].content[0]?.type === "text"
  ) {
    const text = doc.content[0].content[0].text ?? "";
    if (text.trimStart().startsWith('{"type":"doc"')) {
      try {
        const inner = JSON.parse(text) as TipTapDoc;
        if (inner?.type === "doc") {
          // Recurse — there may be multiple layers from repeated bad saves.
          return repairDescription(inner);
        }
      } catch {
        // Not valid JSON — return current level as-is.
      }
    }
  }

  return doc;
}
