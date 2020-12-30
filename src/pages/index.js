import Head from "next/head";
import styles from "../styles/Home.module.css";
import Sheet from "../components/sheet";
import Votes from "../components/votes";

export default function Home() {
  return (
    <div className={styles.container}>
      <Sheet />
      <Votes />
    </div>
  );
}
