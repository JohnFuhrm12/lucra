'use client';
import { FormControl, TextField } from '@mui/material';
import styles from "./TextInput.module.css";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from 'react';

const API_KEY:string = process.env.NEXT_PUBLIC_GEMINI_API_KEY; 
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-pro"});

export default function ModelTextInput( {...props} ) {
    const [prompt, setPrompt] = useState('');

    const getModelTextResponse = async () => {
        const arr = props.chatHistory;

        const userRes = {
            text: prompt,
            user: 'You: ',
            id: Math.floor(Math.random() * 1000000000)
        }

        arr.push(userRes);
        setPrompt('');
        props.setLoading(true);
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        if (text) {
            props.setLoading(false);
        }

        const modelRes = {
            text: text,
            user: 'Gemini: ',
            id: Math.floor(Math.random() * 1000000000)
        }

        arr.push(modelRes);
        props.setChatHistory(arr);
        props.setTextRes(text);
    } 

    return (
        <form onSubmit={getModelTextResponse}>
        <TextField 
        inputProps={{ style: { color: "white" } }}
        multiline 
        fullWidth 
        className={styles.textInput} 
        id="outlined-basic" 
        label="Outlined" 
        variant="outlined"
        focused
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
             getModelTextResponse();
            }
        }}
         />          
        </form>
    )

}