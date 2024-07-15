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
      
      {userData.map((data) => (
        <RecentData key={data._id} data={data} />
      ))}
    </div>
  );
}
