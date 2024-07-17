import React, { useContext, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { sendData } from "../apis/SendData";
import toast from "react-hot-toast";
import { Context } from "../main";

export default function RichText() {
  const editRef = useRef();
  const formatDataRef = useRef();
  const [html, setHtml] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [showCustom, setShowCustom] = useState(false);

  const {
    isLoading,
    userData,
    passwordRef,
    setIsLoading,
    setData,
    setRefresh,
  } = useContext(Context);

  const sendDataHandler = async (e) => {
    e.preventDefault();
    if (!editRef.current || !editRef.current.getContent().trim()) {
      toast.error("Editor content is empty");
      return;
    }

    const _id = localStorage.getItem("userId");

    try {
      setIsLoading(true);
      const htmlData = editRef.current.getContent();

      setHtml(htmlData);

      await new Promise((resolve) => setTimeout(resolve, 0));

      const textData = formatDataRef.current.innerText;

      const baseQuery = {
        textData,
      };

      if (_id) {
        baseQuery._id = _id;
      }

      if (customUrl) {
        baseQuery.customUrl = customUrl;
      }

      if (expiresAt) {
        baseQuery.expiresAt = expiresAt;
      }

      const data = await sendData(baseQuery);

      localStorage.setItem("userId", data.data.user);

      setData(data.data);
      setRefresh((prev) => !prev);
      if (userData.length > 1) {
        passwordRef.current.scrollIntoView({ behavior: "smooth" });
      }
      toast.success(data.message || "Data sent successfully");
      console.log("formattedData : " + formatDataRef.current.innerText);
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
      console.log(error);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex mobile:w-full flex-col items-center mt-5">
      <Editor
        licenseKey="gpl"
        apiKey="03wg5i7qqzyeiw40en1l0b18mt1kyp3c0bbf399z8y5d25tm"
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
      <button
        className="bg-gray-500 text-white mt-5 mb-5  p-4 rounded-lg w-44 hover:opacity-50 "
        onClick={() => setShowCustom(!showCustom)}
      >
        {showCustom ? "Hide" : "Advance Features"}
      </button>
      {showCustom && (
        <div>
          <input
            onChange={(e) => setCustomUrl(e.target.value)}
            value={customUrl}
            type="text"
            className="font-serif text-white p-4 border border-gray-500-600  w-96 "
            placeholder="Enter the CutomUrl if you want to specify"
            required
          />
          <input
            onChange={(e) => setExpiresAt(e.target.value)}
            value={expiresAt}
            type="datetime-local"
            className="font-serif text-white p-4 border border-gray-500-600  w-96 "
            placeholder="Enter the CutomUrl if you want to specify"
            required
          />
        </div>
      )}
      <div
        ref={formatDataRef}
        dangerouslySetInnerHTML={{
          __html: html,
        }}
        className="hidden"
      />

      <div className="flex flex-col mt-4">
        <button
          className="bg-gray-500 text-white mt-5 mb-16  p-4 rounded-lg w-44 hover:opacity-50 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={sendDataHandler}
          type="button"
        >
          {isLoading ? "Sending" : "Send"}
        </button>
      </div>
    </div>
  );
}
