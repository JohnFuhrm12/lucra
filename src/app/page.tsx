import Image from "next/image";
import styles from "./page.module.css";
import Button from '@mui/material/Button';

import { ChatOpenAI } from "langchain/chat_models/openai";

export default function Home() {
  return (
    <main className={styles.main}>
      <h2>INIT</h2>
      <Button variant="contained">Click Me</Button>
    </main>
  );
}
