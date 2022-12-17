import styles from "../../styles/Student_Card.module.css";
import { Student } from "../components/interface";

export default function StudentCard(data: { student: Student }) {
  let image = `https://auth.etna-alternance.net/api/users/${data.student.login}/photo`;

  return (
    <div>
      <div className={styles.Card}>
        <img src={image} alt="" />
        <div className={styles.Info}>
          <h1> {data.student.login} </h1>
        </div>
      </div>
    </div>
  );
}
