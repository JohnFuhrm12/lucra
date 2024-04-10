import { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/stackoverflow-dark.css';

export default function CodeBlock( {codeBlock} ) {

    // Auto syntax highlight code blocks
    useEffect(() => {
        const nodes:any = document.querySelectorAll('pre code');
        nodes.forEach(node => hljs.highlightElement(node));
    }, []);

    return (
        <pre>
            <code data-testid="codeBlock">{codeBlock}</code>
        </pre>
    )
}