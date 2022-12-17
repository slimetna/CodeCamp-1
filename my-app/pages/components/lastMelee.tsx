import React, { useEffect, useState } from "react";
import { resolveTripleslashReference } from "typescript";
import { getAllTag } from "../api/getAllTag";
import { Student } from "./interface";
import styles from "../../styles/Tags.module.css";
import { GetLastMelee } from "../api/getLastMelee";
import moment from "moment";
import "moment/locale/fr";

export default function LastMelee(data: { student: Student }) {
  const [lastMelee, setLastMelee]: any = useState("");

  useEffect(() => {
    GetLastMelee(data.student.login)
      .then((res) => {
        setLastMelee(res.data.startAt);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const GetLast: any = () => {
    if (lastMelee === "" || lastMelee === undefined) return "Pas de Mêlée";
    const res = moment(lastMelee).add(-1, "hours").format("Do MMMM YYYY, h:mm");
    return res;
  };

  return <td> {GetLast()} </td>;
}
