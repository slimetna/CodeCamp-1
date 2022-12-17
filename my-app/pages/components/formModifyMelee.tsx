import React, { useState, useEffect } from "react";
import { GetAllMelee } from "../api/getAllMelee";
import moment from "moment";
import styles from "../../styles/formModifyMelee.module.css";
import { ModifyMelee } from "../api/modifyMelee";
import "moment/locale/fr";
moment.locale("fr");

export default function FormModifyMelee() {
  const [melee, setMelee]: any = useState([]);
  const [currentMelee, setCurrentMelee]: any = useState("");
  const [commentory, setCommentory]: any = useState("");
  const [tags, setTags]: any = useState("");

  useEffect(() => {
    GetAllMelee()
      .then((res) => {
        setMelee(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const handleModify = () => {
    ModifyMelee(currentMelee, commentory, tags);
  };

  return (
    <div className={styles.Melee}>
      <div className={styles.Info}>
        <h1> MODIFIER UNE MÊLÉE </h1>
        <div className={styles.Border}></div>
        <form action="" onSubmit={handleModify}>
          <div className={styles.Selector}>
            <select
              className={styles.Selector}
              onChange={(e: any) => setCurrentMelee(e.target.value)}
            >
              {melee.map((melee: any) => (
                <option value={melee._id} key={melee._id}>{`Mêlée du ${moment(
                  melee.startAt
                ).format("Do MMMM YYYY, h:mm")} à ${moment(melee.endAt).format(
                  "h:mm"
                )}`}</option>
              ))}
            </select>
          </div>
          <textarea
            placeholder="AJOUTER UN COMMENTAIRE"
            className={styles.Commentary}
            value={commentory}
            onChange={(e: any) => setCommentory(e.target.value)}
          />
          <input
            type="text"
            placeholder="AJOUTER DES TAGS"
            value={tags}
            onChange={(e: any) => setTags(e.target.value)}
          />
          <button> MODIFIER </button>
        </form>
      </div>
    </div>
  );
}
