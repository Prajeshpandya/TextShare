import React, { useEffect, useState } from "react";
import { getDataByCustomUrl } from "../apis/SendData";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function CostumUrl() {
  const [getData, setGetData] = useState("");

  const paramObj = useParams();

  const param = paramObj.customUrl;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDataByCustomUrl(param);
        console.log("data: " + data);
        setGetData(data);
        toast.success(data.message || "Data Fetched Successfully!");
      } catch (error) {
        console.error("Error fetching data: ", error);
        toast.error(error.response.data.message || "Something Went Wrong !");
      }
    };

    fetchData();
  }, [param]);

  console.log(getData);

  return <div>{getData.data}</div>;
}
