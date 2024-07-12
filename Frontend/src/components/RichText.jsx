import React, { useContext, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { sendData } from "../apis/SendData";
import toast from "react-hot-toast";
import { Context } from "../main";

export default function RichText() {
  const editRef = useRef();
  const { isLoading, setIsLoading, setData, Data } = useContext(Context);

  const sendDataHandler = async (e) => {
    e.preventDefault();
    if (!editRef.current || !editRef.current.getContent().trim()) {
      toast.error("Editor content is empty");
      return;
    }

    try {
      setIsLoading(true);
      const htmlData = editRef.current.getContent();
      const textData = htmlData;
      const data = await sendData(textData);
      
      localStorage.setItem("userId",data.data.user)

      setData(data.data);
      toast.success(data.message || "Data sent successfully");
    } catch (error) {
      toast.error("An error occurred");
      console.log(error)
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <Editor
        licenseKey="gpl"
        apiKey="v55qviqlp7lok1toiftx85zwizysvwoq5yzudtmsfyzjmbo7"
        onInit={(_evt, editor) => {
          editRef.current = editor;
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
      <div className="flex flex-col mt-4">
        <button
          className="bg-gray-500 mt-5 mb-16 text-white p-4 rounded-lg w-44 hover:opacity-50 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={sendDataHandler}
          type="button"
        >
          {isLoading ? "Sending" : "Send"}
        </button>
      </div>
    </div>
  );
}
