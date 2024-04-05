import ReactQuill, { Quill } from "react-quill";
import React, { useState, useRef, useMemo, useEffect } from "react";
import ImageUploader from "quill-image-uploader";
import "react-quill/dist/quill.snow.css";
import BlotFormatter from "quill-blot-formatter/dist/BlotFormatter";
import ImageResize from 'quill-image-resize-module-react';
import katex from "katex";
import "katex/dist/katex.min.css";
window.katex = katex;

const QuillEditor = (props) => {
  const quillRef = useRef();
  Quill.register("modules/imageUploader", ImageUploader);
  Quill.register("modules/blotFormatter", BlotFormatter);
  Quill.register('modules/imageResize', ImageResize);
  const modules = useMemo(() => {
    return {
      blotFormatter: {},
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false
      },
      toolbar: {
        container: [
          [{align: []}],
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ direction: "rtl" }],
          [{ size: ["small", false, "large", "huge"] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["link", "image", "video","formula"],
          ["clean"],
        ],
      },
      imageUploader: {
        upload: async (file) => {
          var data = new FormData();
          data.append("file", file);
          const response = await fetch(
            `${import.meta.env.VITE_DOMAIN}/upload`,
            {
              method: "POST",
              body: data,
            }
          ).then((res) => res.json());
          console.log(
            `${import.meta.env.VITE_DOMAIN}/uploads/` + response.filename
          );
          return `${import.meta.env.VITE_DOMAIN}/uploads/` + response.filename;
        },
      },
    };
  }, []);

  
  const formats = [
    "header",
    "align",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "script",
    "indent",
    "direction",
    "size",
    "link",
    "image",
    "video",
    "width",
    "height",
    "data-align"
  ];

  const handleChange = (value:String) => {
    var setParentContent = props.contentChange;
    setParentContent(value);
  };

  return (
    <>
    <div className="font-noto-sans prose-3xl bg-white">
    <ReactQuill
      theme="snow"
      value={props.defaultValue}
      onChange={handleChange}
      ref={quillRef}
      placeholder={"type here.."}
      formats={formats}
      modules={modules}
      readOnly={props.preview}
      bound={".app"}
      />
    </div>
    </>
  );
};

QuillEditor.Prop

export default QuillEditor;
