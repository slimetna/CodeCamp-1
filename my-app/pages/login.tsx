import Router from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { MdAlternateEmail } from "react-icons/md";
import { Auth } from "./api/auth";
import styles from "../styles/Login.module.css";
import { GetPromoById } from "./api/getPromoById";

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const User = {
    login: login,
    password: password,
  };

  const Login = async (e: any) => {
    e.preventDefault();
    Auth(User)
      .then((res) => {
        if (res.data.status !== 400) {
          sessionStorage.setItem("image", res.data.img);
          sessionStorage.setItem("login", res.data.login);
          GetPromoById(login)
            .then((res) => {
              sessionStorage.setItem("promo", res.data.promo.id);
            })
            .catch((err) => {
              console.log(err.response);
            });
          if (res.data.isAdmin === true) {
            sessionStorage.setItem("isAdmin", "ADMIN");
          } else {
            sessionStorage.setItem("isAdmin", "ÉLÈVE");
            Router.push("/");
          }
        } else {
          alert("Vos identifiants sont incorrects, merci de réessayer.");
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    GetPromoById(login)
      .then((res) => {
        sessionStorage.setItem("promo", res.data.promo.id);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  return (
    <div>
      <div className={styles.LoginForm}>
        <h1> RENSEIGNEZ VOS IDENTIFIANTS ETNA </h1>
        <div className={styles.Line}></div>
        <form onSubmit={Login}>
          <input
            type="text"
            placeholder="Identifiant (login)"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button> Se connecter </button>
        </form>
      </div>
    </div>
  );
}
