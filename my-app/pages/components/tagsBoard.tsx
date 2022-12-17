import { useEffect, useState } from "react";
import { getAllTag } from "../api/getAllTag";
import Tags from "./tags";
import tableStyle from "../../styles/StudentBoard.module.css";
import styles from "../../styles/Home.module.css";
import { FetchPromo } from "../api/getAllPromo";
import Navbar from "./navbar";

export default function TagsBoard() {
  const [isTag, setIsTag]: any = useState([]);
  const [currentPromo, setCurrentPromo] = useState("194");
  const [currentData, setData]: any = useState([]);
  let tagList: any = [];
  let promo: any = [];
  let index = 0;

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
        setData(promo);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

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

  let handleCurrentPromo = (e: any) => {
    let value = e.target.value;
    setCurrentPromo(value);
  };

  const howManyTagByPromo: any = () => {
    let count = 0;
    for (let j = 0; j < isTag[index].users.length; j++) {
      if (+isTag[index]?.users[j]?.promo?.id === +currentPromo) {
        count++;
      }
    }
    index++;
    return count;
  };

  return (
    <div>
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
      <table className={tableStyle.contentTable}>
        <thead>
          <tr>
            <th> ID </th>
            <th> TAGS </th>
            <th> NOMBRE D'ETUDIANT L'AYANT </th>
          </tr>
        </thead>
        <tbody>
          {isTag?.map((tag: any, index: any) => {
            return (
              <tr key={index}>
                <td>{tag.id}</td>
                <td>{tag.name}</td>
                <td> {howManyTagByPromo()} </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
