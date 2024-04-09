'use client';
import Image from "next/image";
import styles from "./page.module.css";

import ModelTextInput from "./components/ModelTextInput";
import { useState } from "react";


export default function Home() {
  const [textRes, setTextRes] = useState('');

  const props = {
    textRes,
    setTextRes
  }

  return (
    <main className={styles.main}>   
      <div id="chatRes">
        {textRes.length > 0 ? 
        <p>{textRes}</p>
        : <></>}         
      </div>    
      <ModelTextInput {...props}/>
    </main>
  );
}
