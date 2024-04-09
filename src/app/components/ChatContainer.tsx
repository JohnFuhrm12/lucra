'use client';
import { useEffect } from "react";
import styles from "./Components.module.css";

import { CircularProgress } from "@mui/material";
import CodeBlock from "./Codeblock";


export default function ChatContainer( {...props} ) {

    // Gets the dimensions of the chat container and animates scrolling down to the bottom
    function scrollToBottom() {
        let chatContainer = document.getElementById("chatContainer");

        let start = 0;
        let end = 0;
        let change = end - start;
        let increment = 20;

        if (chatContainer) {
            start = chatContainer.scrollTop;
            end = chatContainer.scrollHeight;
            change = end - start;
            increment = 20;
        }

        function easeInOut(currentTime:number, start:number, change:number, duration:number) {
            currentTime /= duration / 2;
      
            if (currentTime < 1) {
              return change / 2 * currentTime * currentTime + start;
            }
      
            currentTime -= 1;
            return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
        }

        function animate(elapsedTime:number) {
            elapsedTime += increment;
            let position = easeInOut(elapsedTime, start, change, 600);
            if (chatContainer) {
                chatContainer.scrollTop = position;
            }
      
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

    return (
        <div data-testid="chatContainer" id="chatContainer" className={styles.chatResContainer}>
            {props.chatHistory?.length > 0 ? 
            props.chatHistory.map((res) => {
            if (res.isCode) {
                const codeBlock:string = res.text;

                return (
                <div key={res.id}>
                    <h2 className={styles.resTextUser}>{res.user}</h2>
                    <div data-testid="codeBlock" className={styles.codeBlock}>
                      <CodeBlock codeBlock={codeBlock}/>
                    </div>
                </div>
                )
            }
            return (
                <div key={res.id}>
                <h2 className={styles.resTextUser}>{res.user}</h2>
                <p data-testid="chatPara" className={styles.resText}>{res.text}</p>
                </div>
            )
            })
            : <></>}
            {props.loading ? <CircularProgress className={styles.loader}/> : <></>}         
      </div>    
    )
}