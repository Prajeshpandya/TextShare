import React, { useContext, useEffect } from "react";
import { Context } from "../main";
import RecentData from "./RecentData";
import { UseUserTexts } from "../apis/SendData";

export default function Pass() {
  const { fetchUserTexts } = UseUserTexts();
  const { userData, refresh } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUserTexts();
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [refresh]);

  return (
    <div className="m-auto justify-center items-center flex flex-col">
      <div className="text-center">
        <p className="text-red-600 drop-shadow-xl font-mono mb-5 text-2xl hover:animate-pulse">
          With Multiple Way You Can Access The Data
        </p>
        <p className="text-white drop-shadow-xl font-mono mb-10 text-xl hover:animate-pulse">
          Your Recent Shared Data!
        </p>
      </div>
      {userData.map((data) => (
        <RecentData key={data._id} data={data} />
      ))}
    </div>
  );
}
