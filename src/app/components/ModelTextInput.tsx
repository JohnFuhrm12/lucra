'use client';
import { FormControl, TextField } from '@mui/material';
import styles from "./TextInput.module.css";

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { useState } from 'react';

const API_KEY:string = process.env.NEXT_PUBLIC_GEMINI_API_KEY; 
const genAI = new GoogleGenerativeAI(API_KEY);

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

const model = genAI.getGenerativeModel({ model: "gemini-pro", safetySettings});

export default function ModelTextInput( {...props} ) {
    const [prompt, setPrompt] = useState('');

    const getModelTextResponse = async () => {
        const arr = props.chatHistory;

        const userRes = {
            text: prompt,
            user: 'You',
            id: Math.floor(Math.random() * 1000000000)
        }

        arr.push(userRes);
        setPrompt('');
        props.setLoading(true);
        const result = await model.generateContentStream(prompt);
        const response = await result.response;
        const text = response.text();

        if (text) {
            props.setLoading(false);
        }

        let filteredText = text;

        // Filter out double asterisks, replace single asterisks with •
        filteredText= text.replace(/\*\*/g, '');
        filteredText = filteredText.replace(/\*/g, '•');

        let foundCode = filteredText.search('`') !== -1;

        if (foundCode) {
            filteredText = filteredText.replace(/\`/g, '');
        }

        const modelRes = {
            text: filteredText,
            user: 'Gemini',
            isCode: foundCode,
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
        placeholder='Message Gemini...'
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