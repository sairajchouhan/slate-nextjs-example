import React, { useCallback, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import isHotkey from "is-hotkey";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";

import {
  Button,
  Icon,
  HOTKEYS,
  TEXT_ALIGN_TYPES,
  toggleBlock,
  toggleMark,
  Element,
  Leaf,
  isBlockActive,
  isMarkActive,
} from "./RteComponents";

const RichTextEditor = () => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editorRef = useRef();
  if (!editorRef.current)
    editorRef.current = withHistory(withReact(createEditor()));
  const editor = editorRef.current;

  const initialValue = useMemo(
    () =>
      JSON.parse(localStorage.getItem("content")) || [
        {
          type: "paragraph",
          children: [{ text: "" }],
        },
      ],
    []
  );

  return (
    <Slate
      editor={editor}
      value={initialValue}
      onChange={(value) => {
        const isAstChange = editor.operations.some(
          (op) => "set_selection" !== op.type
        );
        console.log(value);
        console.log("changed");
        if (isAstChange) {
          const content = JSON.stringify(value);
          localStorage.setItem("content", content);
        }
      }}
    >
      <div className="ring-1 ring-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 relative">
        <Editable
          className="overflow-scroll h-[200px] p-2 border-b border-dashed border-gray-300 focus:border-blue-400 overflow-x-hidden"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          spellCheck={false}
          placeholder="Enter some rich text..."
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
        />
        <div
          className="flex items-center bg-gray-100 justify-end"
          style={{
            borderTopStyle: "dashed",
          }}
        >
          <div className="flex flex-row space-x-2 px-2 py-1">
            <MarkButton format="bold" icon="format_bold" />
            <MarkButton format="italic" icon="format_italic" />
            <BlockButton format="code-block" icon="code" />
            <BlockButton format="heading-one" icon="looks_one" />
            <BlockButton format="heading-two" icon="looks_two" />
            <BlockButton format="numbered-list" icon="format_list_numbered" />
            <BlockButton format="bulleted-list" icon="format_list_bulleted" />
          </div>
        </div>
      </div>
    </Slate>
  );
};

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
      )}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon icon={icon} />
    </Button>
  );
};

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon icon={icon} />
    </Button>
  );
};

const NoSsrRte = dynamic(() => Promise.resolve(RichTextEditor), {
  ssr: false,
});

export default NoSsrRte;
