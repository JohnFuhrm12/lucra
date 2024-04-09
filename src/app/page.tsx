'use client';
import Image from "next/image";
import styles from "./page.module.css";

import ModelTextInput from "./components/ModelTextInput";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";


export default function Home() {
  const [textRes, setTextRes] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
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
        chatHistory.map((text) => {
          return (
            <p key={text}>{text}</p>
          )
        })
        : <></>}
        {loading ? <CircularProgress/> : <></>}         
      </div>    
      <ModelTextInput {...props}/>
    </main>
  );
}
