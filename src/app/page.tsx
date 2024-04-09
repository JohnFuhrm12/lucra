'use client';
import { useEffect, useState } from "react";

import Image from "next/image";
import styles from "./page.module.css";

import { CircularProgress } from "@mui/material";
import ModelTextInput from "./components/ModelTextInput";
import CodeBlock from "./components/Codeblock";

export default function Home() {
  const [textRes, setTextRes] = useState('');
  const [chatHistory, setChatHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(false);

  const props = {
    textRes,
    setTextRes,
    chatHistory,
    setChatHistory,
    loading,
    setLoading
  }

  return (
    <main className={styles.main}>   
      <div className={styles.chatResContainer}>
        {chatHistory.length > 0 ? 
        chatHistory.map((res) => {
          if (res.isCode) {
            const codeBlock:string = res.text;

            return (
              <div key={res.id}>
                <h2 className={styles.resTextUser}>{res.user}</h2>
                <div className={styles.codeBlock}>
                  <CodeBlock codeBlock={codeBlock}/>
                </div>
              </div>
            )
          }
          return (
            <div key={res.id}>
              <h2 className={styles.resTextUser}>{res.user}</h2>
              <p className={styles.resText}>{res.text}</p>
            </div>
          )
        })
        : <></>}
        {loading ? <CircularProgress className={styles.loader}/> : <></>}         
      </div>    
      <ModelTextInput {...props}/>
    </main>
  );
}
