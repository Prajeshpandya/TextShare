import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Loader from "../components/Loader";
import { sendData } from "../apis/SendData";
import toast from "react-hot-toast";
export default function RichText() {
  const editRef = useRef();

  // const [textData, setTextData] = useState("");
  const [loading, setLoading] = useState(true);

  const sendDataHandler = async (e) => {
    e.preventDefault();
    const htmlData = editRef.current.getContent();
    console.log(typeof htmlData);
    const textData = htmlData;
    // setTextData(htmlData);
    try {
      const { data } = await sendData(textData);
      toast.success(data.message);
    } catch (error) {
      toast.error(data.response.data.message);
      console.log(error);
    }
  };

  // console.log(textData);

  return (
    <>
      <div className="flex flex-col items-center mt-10 ">
        <div>
          {loading && <Loader />}
          <Editor
            licenseKey="gpl"
            apiKey="v55qviqlp7lok1toiftx85zwizysvwoq5yzudtmsfyzjmbo7"
            // onChange={()=>setCurrentText(content)}
            onInit={(_evt, editor) => {
              editRef.current = editor;
              setLoading(false);
            }}
            init={{
              height: 0.5 * window.innerHeight,
              width: 0.5 * window.innerWidth,
              menubar: false,

              plugins: [
                "advlist",
                "anchor",
                "autolink",
                "link",
                // "lists",
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
        {/* <div className="w-1/2 mt-10 p-4 border rounded">
          <div dangerouslySetInnerHTML={{ __html: textData }} />
        </div> */}
        <div className=" flex flex-col mt-10">
          <button
            className="bg-gray-500 mb-36 text-white p-4 hover:opacity-50 rounded-lg w-44 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={sendDataHandler}
            disabled={editRef.current < 1 && !editRef.current}
            type="submit"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}
