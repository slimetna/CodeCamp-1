import moment from "moment";
import "moment/locale/fr";
import React, { useEffect, useState } from "react";
import { GetMeleeByID } from "../api/getMeleeByID";
import Navbar from "./navbar";
import styles from "../../styles/DetailsMelee.module.css";
import { UserTag } from "../api/userTag";
import GetImage from "../api/getImage";
import { ModifyMelee } from "../api/modifyMelee";

export default function DetailsMelee() {
  const [melee, setMelee]: any = useState("");
  const [meleeDetails, setMeleeDetails]: any = useState("");
  const [image, setImage]: any = useState("");
  const [commentory, setCommentory]: any = useState("");
  const [tags, setTags]: any = useState("");

  GetMeleeByID(melee.toString()).then((res) => {
    setMeleeDetails(res.data);
  });

  useEffect(() => {
    setMelee(sessionStorage.getItem("currentMelee"));
  }, []);

  const handleModify = () => {
    ModifyMelee(melee, commentory, tags);
  };

  return (
    <div className={styles.All}>
      <Navbar />
      <div className={styles.Container}>
        <h1>
          {`Mêlée du ${moment(meleeDetails?.startAt).format(
            "Do MMMM YYYY, h:mm"
          )} à ${moment(meleeDetails?.endAt).format("h:mm")} | ${
            meleeDetails?.user
          }`}{" "}
        </h1>
      </div>
      <div className={styles.Info}>
        <div className={styles.MeleeInfo}>
          <h1> MODIFIER LES INFOS DE LA MÊLÉE</h1>
          <form action="" onSubmit={handleModify}>
            <textarea
              placeholder={meleeDetails.commentory}
              value={tags}
              onChange={(e: any) => setTags(e.target.value)}
            />
            <input
              placeholder={meleeDetails.tags}
              value={commentory}
              onChange={(e: any) => setCommentory(e.target.value)}
            />
            <button> MODIFIER </button>
          </form>
        </div>
        <div className={styles.UserInfo}>
          <img
            src={`https://auth.etna-alternance.net/api/users/${meleeDetails.user}/photo`}
            alt=""
          />
          <h1> L'ÉLÈVE AYANT RÉSERVÉ LA MÊLÉE : {meleeDetails.user} </h1>
        </div>
      </div>
    </div>
  );
}
