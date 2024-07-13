import React from "react";

export default function GetData() {
  const submitHandler = () => {};
  return (
    <div className="flex flex-col  items-center mt-10 justify-center m-auto ">
      <form className="m-auto" onSubmit={submitHandler}>
        <input
          type="number"
          className="p-4 border border-gray-500-600 w-96 "
          placeholder="Enter the Password to access the Data"
          required
        />
        {/* <div> */}
        <button
          type="submit"
          className="bg-gray-500 mt-9 border-blue-400-600 border hover:opacity-50   p-4  w-44 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send
        </button>
        {/* </div> */}
      </form>

      <p className="mt-11 font-customFont">OR</p>
      <p className="mt-6 font-serif">Send Data to Your Friend!!</p>
    </div>
  );
}
