'use client';
import { useEffect, useState } from "react";
import styles from "./page.module.css";

import ChatContainer from "./components/ChatContainer";
import ModelTextInput from "./components/ModelTextInput";

export default function Home() {
  const [chatHistory, setChatHistory] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const props = {
    chatHistory,
    setChatHistory,
    loading,
    setLoading
  }

  useEffect(() => {
    console.log(chatHistory)
  })

  return (
    <main className={styles.main}>   
      <ChatContainer {...props}/>
      <ModelTextInput {...props}/>
    </main>
  );
}
