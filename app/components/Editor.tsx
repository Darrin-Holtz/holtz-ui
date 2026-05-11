"use client";

import * as React from "react";
import type { JSONContent } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";

type EditorProps = {
  name?: string;
  // Accept either an HTML string or a parsed TipTap JSONContent object.
  initialContent?: string | object;
  onChange?: (json: string) => void;
};

type ToolbarButton = {
  key: string;
  label: string;
  isActive: () => boolean;
  isDisabled?: () => boolean;
  run: () => void;
};

export default function TipTapEditor({
  name,
  initialContent = "<p></p>",
  onChange,
}: EditorProps) {
  const [jsonValue, setJsonValue] = React.useState("");

  // Normalize initialContent so TipTap always receives either a proper
  // JSONContent object or an HTML string — never a bare JSON string.
  // A bare JSON string is treated as HTML by TipTap, which wraps the entire
  // JSON text in a paragraph node (the double-serialization bug).
  const resolvedContent = React.useMemo((): JSONContent | string => {
    if (typeof initialContent === "object" && initialContent !== null) {
      return initialContent as JSONContent;
    }
    if (typeof initialContent === "string" && initialContent.trimStart().startsWith("{")) {
      try {
        return JSON.parse(initialContent) as JSONContent;
      } catch {
        // Not valid JSON — fall through and let TipTap handle as HTML.
      }
    }
    return initialContent as string;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // only resolve once on mount; prop changes do not re-init the editor

  const editor = useEditor({
    extensions: [StarterKit],
    content: resolvedContent,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base max-w-none dark:prose-invert prose-headings:font-semibold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl min-h-40 rounded-md border border-input bg-transparent px-3 py-2 outline-none",
      },
    },
    onCreate({ editor: activeEditor }) {
      const nextJson = JSON.stringify(activeEditor.getJSON() as JSONContent);
      setJsonValue(nextJson);
    },
    onUpdate({ editor: activeEditor }) {
      const nextJson = JSON.stringify(activeEditor.getJSON() as JSONContent);
      setJsonValue(nextJson);
      onChange?.(nextJson);
    },
  });

  const toolbarButtons: ToolbarButton[] = editor
    ? [
        {
          key: "bold",
          label: "Bold",
          isActive: () => editor.isActive("bold"),
          run: () => editor.chain().focus().toggleBold().run(),
        },
        {
          key: "italic",
          label: "Italic",
          isActive: () => editor.isActive("italic"),
          run: () => editor.chain().focus().toggleItalic().run(),
        },
        {
          key: "strike",
          label: "Strike",
          isActive: () => editor.isActive("strike"),
          run: () => editor.chain().focus().toggleStrike().run(),
        },
        {
          key: "h1",
          label: "H1",
          isActive: () => editor.isActive("heading", { level: 1 }),
          run: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        },
        {
          key: "h2",
          label: "H2",
          isActive: () => editor.isActive("heading", { level: 2 }),
          run: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        },
        {
          key: "h3",
          label: "H3",
          isActive: () => editor.isActive("heading", { level: 3 }),
          run: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        },
        {
          key: "bulletList",
          label: "Bullets",
          isActive: () => editor.isActive("bulletList"),
          run: () => editor.chain().focus().toggleBulletList().run(),
        },
        {
          key: "orderedList",
          label: "Numbers",
          isActive: () => editor.isActive("orderedList"),
          run: () => editor.chain().focus().toggleOrderedList().run(),
        },
        {
          key: "blockquote",
          label: "Quote",
          isActive: () => editor.isActive("blockquote"),
          run: () => editor.chain().focus().toggleBlockquote().run(),
        },
        {
          key: "undo",
          label: "Undo",
          isActive: () => false,
          isDisabled: () => !editor.can().chain().focus().undo().run(),
          run: () => editor.chain().focus().undo().run(),
        },
        {
          key: "redo",
          label: "Redo",
          isActive: () => false,
          isDisabled: () => !editor.can().chain().focus().redo().run(),
          run: () => editor.chain().focus().redo().run(),
        },
      ]
    : [];

  return React.createElement(
    React.Fragment,
    null,
    name
      ? React.createElement("input", {
          type: "hidden",
          name,
          value: jsonValue,
        })
      : null,
    React.createElement("div", { className: "w-full space-y-2" },
      React.createElement(
        "div",
        {
          className:
            "flex flex-wrap gap-2 rounded-md border border-input bg-muted/30 p-2",
        },
        ...toolbarButtons.map((button) =>
          React.createElement(
            "button",
            {
              key: button.key,
              type: "button",
              disabled: editor ? button.isDisabled?.() : true,
              className: [
                "rounded-md border px-2 py-1 text-xs font-medium transition-colors",
                button.isActive()
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-input bg-background hover:bg-muted",
                button.isDisabled?.()
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer",
              ].join(" "),
              onMouseDown: (event: React.MouseEvent<HTMLButtonElement>) => {
                event.preventDefault();
              },
              onClick: button.run,
            },
            button.label
          )
        )
      ),
      React.createElement(EditorContent, { editor })
    )
  );
}
