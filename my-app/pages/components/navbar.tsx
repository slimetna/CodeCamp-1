import Image from "next/image";
import styles from "../../styles/Navbar.module.css";
import Link from "next/link";
import { BsHouseFill } from "react-icons/bs";
import { VscSearch } from "react-icons/vsc";
import { MdLibraryAdd } from "react-icons/md";
import { GoGraph } from "react-icons/go";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineMenu, AiFillTags } from "react-icons/ai";
import Router from "next/router";
import { useEffect, useState } from "react";

function hideNav() {
  const nav = document.getElementById("Navbar");
  if (nav !== null) {
    if (nav.style.display === "none") {
      nav.style.display = "flex";
    } else {
      nav.style.display = "none";
    }
  }
}

const deleteCookie = async () => {
  document.cookie.split(";").forEach(function (c) {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
  await 5000;
  Router.push("/login");
};

export default function Navbar() {
  const [image, setImage]: any = useState("");
  const [login, setLogin]: any = useState("");
  const [isAdmin, setIsAdmin]: any = useState("");

  useEffect(() => {
    setImage(sessionStorage.getItem("image"));
    setLogin(sessionStorage.getItem("login"));
    setIsAdmin(sessionStorage.getItem("isAdmin"));
  }, []);

  return (
    <div>
      <div className={styles.MiniNavbar}>
        <div className={styles.MenuButton}>
          <AiOutlineMenu onClick={() => hideNav()} />
        </div>
        <div className={styles.Icons}>
          <Link href="/">
            <BsHouseFill />
          </Link>
          <Link href="/">
            <MdLibraryAdd />
          </Link>
          {isAdmin === "ADMIN" && (
            <Link href="/createTag">
              <AiFillTags />
            </Link>
          )}
          <Link href="/statistics">
            <GoGraph />
          </Link>
        </div>
        <div className={styles.Logout}>
          <Link href="/">
            <BiLogOut onClick={deleteCookie} />
          </Link>
        </div>
      </div>
      <div className={styles.Navbar} id="Navbar">
        <div className={styles.Logo}>
          <h1> ETNA.IO </h1>
          <AiOutlineMenu onClick={() => hideNav()} />
        </div>
        <div className={styles.Link}>
          <Link href="/">
            <BsHouseFill />
            ACCUEIL
          </Link>
          <Link href={isAdmin === "ADMIN" ? "/createMelee" : "/reserveMelee"}>
            <MdLibraryAdd />
            {isAdmin === "ADMIN"
              ? "Créer des mêlées".toUpperCase()
              : "Réserver une mêlée".toUpperCase()}
          </Link>
          {isAdmin === "ADMIN" && (
            <Link href="/createTag">
              <AiFillTags />
              CRÉER UN TAG
            </Link>
          )}
          <Link href="/statistics">
            <GoGraph />
            STATISTIQUES
          </Link>
        </div>
        <div className={styles.User}>
          <div className={styles.UserPic}>
            <img src={image} alt="" />
            <div className={styles.UserInfo}>
              <h1> {login} </h1>
              <h1> {isAdmin} </h1>
            </div>
          </div>
          <div className={styles.Logout}>
            <Link href="/">
              <BiLogOut onClick={deleteCookie} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
