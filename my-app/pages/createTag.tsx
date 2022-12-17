import React, { useState, useEffect } from "react";
import axios from "axios";
import { createTag } from "./api/createTag";
import { getAllTag } from "./api/getAllTag";
import { UserTag } from "./api/userTag";
import styles from "../styles/CreateTag.module.css";
import Navbar from "./components/navbar";

export default function CreateTag() {
  const [tag, setTag] = useState("");
  const [promo, setPromo] = useState([]);
  const [currentTag, setCurrentTag] = useState("retard_e-learning");
  const [login, setLogin] = useState("");

  const Tag = {
    name: tag,
  };

  let promoList: any = [];

  useEffect(() => {
    getAllTag()
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          let promo = res.data[i].id;
          promoList.push(promo);
        }
        setPromo(promoList);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    createTag(Tag);
    console.log("tag créé");
  };

  const handleAddTagToUser = async () => {
    UserTag(currentTag, login);
    alert(currentTag + " " + login);
  };

  return (
    <div>
      <Navbar />
      <div className={styles.All}>
        <div className={styles.CreateTag}>
          <h1> CRÉER UN TAG </h1>
          <div className={styles.Line}></div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="NOM DU TAG"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
            <button> CRÉER </button>
          </form>
        </div>
        <div className={styles.CreateTag}>
          <h1> AJOUTER UN TAG À UN ÉLÈVE </h1>
          <div className={styles.Line}></div>
          <form onSubmit={handleAddTagToUser}>
            <select
              name="promo"
              className={styles.Selector}
              onChange={(e) => setCurrentTag(e.target.value)}
              id=""
            >
              {promo?.map((promo: any, index: any) => {
                return (
                  <option key={index} value={promo}>
                    {promo.toUpperCase()}
                  </option>
                );
              })}
            </select>
            <input
              type="text"
              placeholder="LOGIN DE L'ÉLÈVE"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <button> AJOUTER </button>
          </form>
        </div>
      </div>
    </div>
  );
}
