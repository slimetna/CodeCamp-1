import axios from "axios";
import { useEffect, useState } from "react";
import { Term } from "../components/interface";

export default function GetTrombiByID(id: number) {
  const [data, setData]: any = useState<Term | undefined>(undefined);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/trombi/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        if (err !== undefined) {
          console.log(err);
        }
      });
  });

  return data;
}
