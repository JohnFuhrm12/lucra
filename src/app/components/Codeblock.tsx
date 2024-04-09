import { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css'; // Import the default Highlight.js style

export default function CodeBlock( {codeBlock} ) {
    useEffect(() => {
        const nodes = document.querySelectorAll('pre code');
        nodes.forEach(node => hljs.highlightBlock(node));
    }, []);

    return (
        <pre>
            <code>{codeBlock}</code>
        </pre>
    )
}