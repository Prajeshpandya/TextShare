import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function RichText() {
  const editRef = useRef();
  const [textData, setTextData] = useState("");
  const [showEditor, setShowEditor] = useState(false);

  const sendDataHandler = () => {
    console.log("first");
    setTextData(editRef.current.getContent());
  };

  return (
    <>
      <div className="flex flex-col items-center mt-10 ">
        {showEditor && (
          <div>
            <Editor
              licenseKey="gpl"
              apiKey="v55qviqlp7lok1toiftx85zwizysvwoq5yzudtmsfyzjmbo7"
              onInit={(_evt, editor) => (editRef.current = editor)}
              init={{
                height: 0.5 * window.innerHeight,
                width: 0.5 * window.innerWidth,
                menubar: false,
                plugins: [
                  "advlist",
                  "anchor",
                  "autolink",
                  "link",
                  "lists",
                  "searchreplace",
                  "table",
                  "wordcount",
                  "code",
                  "directionality",
                  "media",
                  "preview",
                  "image",

                  "emoticons",
                ],

                toolbar:
                  "undo redo | blocks |" +
                  "bold italic underline forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "code directionality media table preview image emoticons",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          </div>
        )}
        <div dangerouslySetInnerHTML={{ __html: textData }}></div>
        <div className=" flex flex-col mt-20">
          <button
            className="bg-gray-500 mb-7 text-white p-4 rounded-lg w-44 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => setShowEditor(!showEditor)}
          >
            {showEditor ? "Hide Editor" : "Add Text"}
          </button>

          { showEditor &&
          <button
            className="bg-gray-500 text-white p-4 rounded-lg w-44 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={sendDataHandler}
            disabled={!showEditor}
          >
            Send
          </button>}
        </div>
      </div>
    </>
  );
}
