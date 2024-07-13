import React, { useContext, useState } from "react";
import { getDataByPass } from "../apis/SendData";
import { Context } from "../main";

export default function GetData() {
  const [pass, setPass] = useState("");
  const { getData, setGetData } = useContext(Context);

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
        {/* <div> */}

        <button
          type="submit"
          className="bg-gray-500 font-serif text-white mt-9 border-blue-400-600 border hover:opacity-50   p-4  w-44 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send
        </button>
        {/* </div> */}
      </form>
      {getData && (
        <div
          dangerouslySetInnerHTML={{
            __html: getData,
          }}
          className="mt-11 font-mono"
        ></div>
      )}

      <p className="mt-11 font-customFont">OR</p>
      <p className="mt-6 font-serif">Send Data to Your Friend!!</p>
    </div>
  );
}
