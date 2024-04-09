'use client';
import Image from "next/image";
import styles from "./page.module.css";

import ModelTextInput from "./components/ModelTextInput";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

export default function Home() {
  const [textRes, setTextRes] = useState('');
  const [chatHistory, setChatHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(false);

  document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block);
    });
  });

  const props = {
    textRes,
    setTextRes,
    chatHistory,
    setChatHistory,
    loading,
    setLoading
  }

  useEffect(() => {
    hljs.highlightAll();
  })

  return (
    <main className={styles.main}>   
      <div className={styles.chatResContainer}>
        {chatHistory.length > 0 ? 
        chatHistory.map((res) => {
          if (res.isCode) {
            hljs.highlightAll();

            return (
              <div key={res.id}>
                <h2 className={styles.resTextUser}>{res.user}</h2>
                <div>
                  <pre><code className="language-javascript">{res.text}</code></pre>
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
