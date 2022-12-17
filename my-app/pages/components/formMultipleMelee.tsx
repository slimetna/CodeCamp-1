import React, { useState } from "react";
import { MeleeCreation } from "../api/createMelee";
import styles from "../../styles/MultipleMelee.module.css";
import { useEffect } from "react";
import { FetchPromo } from "../api/getAllPromo";
import getTrombiByID from "../api/getTrombiByID";

export default function MultipleMelee() {
  const [date, setDate] = useState(new Date().toString());
  const [startHour, setStartHour] = useState(new Date().toString());
  const [endHour, setEndHour] = useState(new Date().toString());
  const [duration, setDuration] = useState(0);
  const [pause, setPause] = useState(0);
  const [frequence, setFrequence] = useState(0);
  const [currentPromo, setCurrentPromo] = useState("194");
  const [currentData, setData]: any = useState([]);
  const [author, setAuthor]: any = useState("");

  useEffect(() => {
    setAuthor(sessionStorage.getItem("login"));
  }, []);

  const Melee = {
    dateStart: new Date(date + "T" + startHour + ":00").toString(),
    dateEnd: new Date(date + "T" + endHour + ":00").toString(),
    duration: duration,
    pause: pause,
    frequence: frequence,
    currentPromo: +currentPromo,
    author: author,
  };

  let promo: any = [];
  let value: any;

  useEffect(() => {
    FetchPromo()
      .then((res: any) => {
        for (let i = 0; i < res.data.length; i++) {
          let currentPromo =
            res.data[i].id +
            " | " +
            res.data[i].target_name +
            " | " +
            res.data[i].wall_name;
          if (promo.includes(currentPromo) === false) {
            promo.push(currentPromo);
          }
        }
        console.log(promo);
        setData(promo);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const submitMelee = async (e: any) => {
    e.preventDefault();
    console.log(Melee);
    MeleeCreation(Melee)
      .then((res) => {
        console.log(res.data.data);
        if (res.data.status !== 400) {
          alert("MÊLÉE CRÉÉE AVEC SUCCÈS");
          window.location.reload();
        } else {
          alert("LA MÊLÉE N'A PAS PU ÊTRE CRÉÉE.");
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  let handleCurrentPromo = (e: any) => {
    let value = e.target.value;
    setCurrentPromo(value);
  };

  return (
    <div className={styles.Melee}>
      <div className={styles.Info}>
        <h1> CRÉER DES MÊLÉES </h1>
        <div className={styles.Border}></div>
        <form action="" onSubmit={submitMelee}>
          <div className={styles.Selector}>
            <select
              name="promo_selector"
              id="selector"
              onChange={(e: any) => handleCurrentPromo(e)}
            >
              {currentData?.map((promo: any, index: any) => {
                return (
                  <option key={index} value={currentData[index].slice(0, 3)}>
                    {currentData[index].slice(5).toUpperCase()}
                  </option>
                );
              })}
            </select>
          </div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="time"
            min="09:00"
            max="17:00"
            value={startHour}
            onChange={(e) => setStartHour(e.target.value)}
            required
          />
          <input
            type="time"
            min="9:00"
            max="17:00"
            value={endHour}
            onChange={(e) => setEndHour(e.target.value)}
            required
          />
          <input
            type="number"
            min="15"
            value={duration}
            placeholder="15"
            onChange={(e) => setDuration(parseInt(e.target.value))}
          />
          <input
            type="number"
            placeholder="PAUSE ENTRE CHAQUE MÊLÉES"
            value={pause}
            onChange={(e) => setPause(parseInt(e.target.value))}
          />
          <label htmlFor="number">
            LAISSEZ LA VALEUR SUR 0 SI VOUS VOULEZ UNE PAUSE ENTRE CHAQUE MÊLEE
          </label>
          <input
            type="number"
            placeholder="FREQUENCE DES PAUSES"
            value={frequence}
            onChange={(e) => setFrequence(parseInt(e.target.value))}
          />

          <button> AJOUTER </button>
        </form>
      </div>
    </div>
  );
}
