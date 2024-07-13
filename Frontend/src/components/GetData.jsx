import React, { useContext, useState } from "react";
import { getDataByPass } from "../apis/SendData";
import { Context } from "../main";

export default function GetData() {
  const [pass, setPass] = useState("");
  const { getData, setGetData } = useContext(Context);
  const [isCopiedData, setIsCopiedData] = useState(false);

  const copyText = async (data) => {
    await window.navigator.clipboard.writeText(data);
    setIsCopiedData(true);
    setTimeout(() => setIsCopiedData(false), 500);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await getDataByPass(pass);
      setGetData(data.textData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col  items-center mt-10 justify-center m-auto ">
      <form className="m-auto" onSubmit={submitHandler}>
        <input
          type="number"
          value={pass}
          className="font-serif text-white p-4 border border-gray-500-600 w-96 "
          placeholder="Enter the Password to access the Data"
          required
          onChange={(e) => setPass(e.target.value)}
        />

        <button
          type="submit"
          className="bg-gray-500 font-serif text-white mt-9 border-blue-400-600 border hover:opacity-50   p-4  w-44 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send
        </button>
      </form>
      {/* {getData && (
        <div className="mt-11 p-4 border border-white font-mono">{getData}</div>
      )} */}

      {getData && (
        <button
          id="btnData"
          className="border-2 mb-8 mt-10 justify-center items-center  rounded-xl w-40 text-center  p-4  text-xl"
        >
          {getData}
          <p
            className=" text-sm  hidden relative text-white "
            onClick={() => copyText(getData)}
          >
            {isCopiedData ? "Copied" : "Copy"}
          </p>
        </button>
      )}

      <p className="mt-11 font-customFont">OR</p>
      <p className="mt-6 font-serif">Send Data to Your Friend!!</p>
    </div>
  );
}
