import axios from "axios";
import { useEffect, useState } from "react";

export default async function GetImage(login: String) {
  const [data, setData]: any = useState("");

  useEffect(() => {
    axios
      .get(`https://auth.etna-alternance.net/api/users/${login}/photo`, {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  return data;
}
