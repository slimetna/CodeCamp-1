import Navbar from "./components/navbar";
import StudentCard from "./components/student_card";
import styles from "../styles/Home.module.css";
import React from "react";
import { Student } from "./components/interface";
import { useEffect, useState } from "react";
import getTrombiByID from "./api/getTrombiByID";
import { FetchPromo } from "./api/getAllPromo";
import StudentBoard from "./components/studentBoard";
import tableStyle from "../styles/StudentBoard.module.css";
import { getAllTag } from "./api/getAllTag";

export default function Home() {
  const [currentPromo, setCurrentPromo] = useState("194");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentData, setData]: any = useState([]);

  let promo: any = [];
  let value: any;

  let data = getTrombiByID(parseInt(currentPromo));
 

  useEffect(() => {
    FetchPromo()
      .then((res) => {
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

  let handleCurrentPromo = (e: any) => {
    let value = e.target.value;
    setCurrentPromo(value);
  };

  const handleSearchTerm = (e: any) => {
    value = e.target.value;
    setSearchTerm(value);
  };

  return (
    <div>
      <div className={styles.AllContent}>
        <div className={styles.Navbar}>
          <Navbar />
        </div>
        <div className={styles.Trombi}>
          <div className={styles.Selector}>
            <select
              name="promo_selector"
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
          <div className={styles.Search}>
            <input
              type="text"
              placeholder="RECHERCHE"
              onChange={handleSearchTerm}
            />
          </div>
          <div className={styles.MainContent}>
            <table className={tableStyle.contentTable}>
              <thead>
                <tr>
                  <th> LOGIN </th>
                  <th> NOM </th>
                  <th> PRÉNOM </th>
                  <th> DERNIÈRE MÊLÉE </th>
                  <th> TAGS </th>
                </tr>
              </thead>
              <tbody>
                {data?.students
                  ?.filter((student: Student) => {
                    if (
                      student.login
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return student;
                    }
                  })
                  .map((student: Student, index: any) => {
                    return <StudentBoard key={index} student={student} />;
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
