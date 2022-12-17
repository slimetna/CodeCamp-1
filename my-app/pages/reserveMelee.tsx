import React from "react";
import { useState } from "react";
import Navbar from "./components/navbar";
import styles from "../styles/CreateMelee.module.css";
import Calendar from "./components/calendar";
import { MeleeCreation } from "./api/createMelee";
import MultipleMelee from "./components/formMultipleMelee";

export default function ReserveMelee() {
  return (
    <div>
      <div className={styles.AllContent}>
        <div className={styles.Navbar}>
          <Navbar />
        </div>
      </div>
      <div className={styles.Calendar}>
        <Calendar />
      </div>
    </div>
  );
}
