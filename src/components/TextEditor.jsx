import { useState, useMemo } from "react";
import ReactQuill from "react-quill";
import Quill from "quill";
import "react-quill/dist/quill.snow.css";



export default function TextEditor({ markdownText, onMarkdownChange }) {
  const handleChange = (value) => {
    onMarkdownChange(value);
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"],
          [{ script: 'super' }, { script: 'sub' }],
          [{ color: [] }, { background: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
          [{ direction: "rtl" }],
          ["link"],
          ["clean"],
        ],
      },
    }),
    []
  );

  

  return (
    <div className="w-[400px]">
      <ReactQuill
        className="w-full h-[260px]"
        theme="snow"
        bounds={'.app'}
        modules={modules}
        value={markdownText}
        onChange={handleChange}
      />
    </div>
  );
}
