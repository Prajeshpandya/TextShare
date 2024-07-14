import React, { useEffect, useState } from "react";
import { getDataByCustomUrl } from "../apis/SendData";
import { useParams } from "react-router-dom";

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
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [param]);

  console.log(getData);

  return <div>
    {getData.data}
  </div>;
}
