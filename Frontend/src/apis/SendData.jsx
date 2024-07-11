import axios from "axios";
import { server } from "../main";
export const sendData = async (textData) => {
  const { data } = await axios.post(
    `${server}/text/share`,
    { textData },
    {
      headers: {
        "Content-Type": "Application/json",
      },
      withCredentials: true,
    }
  );

  return data;
};
