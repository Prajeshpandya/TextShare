import axios from "axios";
import { Context, server } from "../main";
import { useContext } from "react";

export const sendData = async (textData) => {
  console.log("API CALLED ");
  const { data } = await axios.post(`${server}/text/share`, textData, {
    headers: {
      "Content-Type": "Application/json",
    },
    withCredentials: true,
  });

  return data;
};

export const UseUserTexts = () => {
  const { setUserData } = useContext(Context);

  const fetchUserTexts = async () => {
    try {
      const _id = localStorage.getItem("userId");
      // console.log(_id);
      if (_id) {
        const { data } = await axios.get(`${server}/text/getusertext`, {
          params: { _id },
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        // console.log(data);
        setUserData(data.data);
      } else {
        throw new Error("error in _id");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { fetchUserTexts };
};

export const getDataByPass = async (pass) => {
  const { data } = await axios.get(`${server}/text/getText`, {
    params: { pass },
    headers: {
      "Content-Type": "Application/json",
    },
    withCredentials: true,
  });

  return data;
};
