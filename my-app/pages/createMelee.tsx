import React from "react";
import { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import styles from "../styles/CreateMelee.module.css";
import Calendar from "./components/calendar";
import { MeleeCreation } from "./api/createMelee";
import MultipleMelee from "./components/formMultipleMelee";
import FormModifyMelee from "./components/formModifyMelee";
import DetailsMelee from "./components/detailsMelee";
import { GetAllMelee } from "./api/getAllMelee";
import moment from "moment";
import "moment/locale/fr";
moment.locale("fr");
import Router from "next/router";

export default function CreateMelee() {
  const [currentMelee, setCurrentMelee] = useState<any>("");
  const [melee, setMelee] = useState<any>([]);

  useEffect(() => {
    GetAllMelee()
      .then((res) => {
        setMelee(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const handleDetails: any = async () => {
    sessionStorage.setItem("currentMelee", currentMelee);
    Router.push("/components/detailsMelee");
  };

  return (
    <div>
      <div className={styles.AllContent}>
        <div className={styles.Navbar}>
          <Navbar />
        </div>
        <div className={styles.MultipleMelee}>
          <MultipleMelee />
          <FormModifyMelee />
        </div>
      </div>
      <div className={styles.Calendar}>
        <Calendar />
      </div>
      <div className={styles.ModifyMelee}>
        <form action="">
          <div className={styles.Selector}>
            <select
              className={styles.Selector}
              onChange={(e: any) => setCurrentMelee(e.target.value)}
            >
              {melee
                .filter((melee: any) => melee.isReserved === true)
                .map((melee: any) => (
                  <option value={melee._id} key={melee._id}>
                    {`Mêlée du ${moment(melee.startAt).format(
                      "Do MMMM YYYY, h:mm"
                    )} à ${moment(melee.endAt).format("h:mm")}`}
                  </option>
                ))}
            </select>
          </div>
          <button type="button" onClick={handleDetails}>
            {" "}
            DÉTAILS{" "}
          </button>
        </form>
      </div>
    </div>
  );
}
