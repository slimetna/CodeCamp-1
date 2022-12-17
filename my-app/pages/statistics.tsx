import Navbar from "./components/navbar";
import TagsBoard from "./components/tagsBoard";
import styles from "../styles/Statistics.module.css";

export default function Statistics() {
  return (
    <div className={styles.All}>
      <div className={styles.Navbar}>
        <Navbar />
      </div>
      <div className={styles.TagsBoard}>
        <TagsBoard />
      </div>
    </div>
  );
}
