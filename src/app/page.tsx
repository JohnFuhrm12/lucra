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

  function scrollToBottom() {
    let chatContainer = document.getElementById("chatContainer");

    let start = chatContainer.scrollTop;
    let end = chatContainer.scrollHeight;
    let change = end - start;
    let increment = 20;

    function easeInOut(currentTime, start, change, duration) {
      currentTime /= duration / 2;

      if (currentTime < 1) {
        return change / 2 * currentTime * currentTime + start;
      }

      currentTime -= 1;
      return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
    }

    function animate(elapsedTime) {
      elapsedTime += increment;
      let position = easeInOut(elapsedTime, start, change, 600);
      chatContainer.scrollTop = position;

      if (elapsedTime < 300) {
        setTimeout(function() {
          animate(elapsedTime);
        }, increment)
      }

    }
        
    animate(0);
  }

  useEffect(() => {
    scrollToBottom();
  })

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
      <div id="chatContainer" className={styles.chatResContainer}>
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
