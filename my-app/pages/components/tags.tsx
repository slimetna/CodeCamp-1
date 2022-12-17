import React, { useEffect, useState } from "react";
import { resolveTripleslashReference } from "typescript";
import { getAllTag } from "../api/getAllTag";
import { Student } from "./interface";
import styles from "../../styles/Tags.module.css";

export default function Tags(data: { student: Student }) {
  const [isTag, setIsTag]: any = useState([]);
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

  const handleTag: any = () => {
    return isTag.map((tag: any) => {
      for (let i = 0; i < tag.users.length; i++) {
        if (tag.users[i]?.login === data.student.login) {
          return tag.name + "\n";
        }
      }
    });
  };

  return <td className={styles.tag}> {handleTag()} </td>;
}
