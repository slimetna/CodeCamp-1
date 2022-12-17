import { MdNorthWest } from "react-icons/md";
import styles from "../../styles/StudentBoard.module.css";
import { Student } from "./interface";
import { useEffect, useState } from "react";
import { getAllTag } from "../api/getAllTag";
import Tags from "./tags";
import { GetLastMelee } from "../api/getLastMelee";
import LastMelee from "./lastMelee";

export default function StudentBoard(
  data: { student: Student },
  promo: { promo: any }
) {
  const [isTag, setIsTag]: any = useState([]);
  const [lastMelee, setLastMelee]: any = useState("");
  let tagList: any = [];

  useEffect(() => {
    getAllTag()
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          let tag = res.data[i];
          tagList.push(tag);
        }
        setIsTag(tagList);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  return (
    <tr>
      <td> {data.student.login.toUpperCase()}</td>
      <td> {data.student.lastname.toUpperCase()} </td>
      <td> {data.student.firstname.toUpperCase()} </td>
      <td> {<LastMelee student={data.student}/>} </td>
      <td>
        {" "}
        <Tags student={data.student} />{" "}
      </td>
    </tr>
  );
}
