import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
import { describe } from 'node:test';

import ChatContainer from '../ChatContainer';
import CodeBlock from '../Codeblock';
import ModelTextInput from '../ModelTextInput';

// ChatContainer tests
describe('ChatContainer', () => {
    it('should render chat container', () => {
        render(<ChatContainer/>);
        const chatContainerElement = screen.getByTestId('chatContainer');
        expect(chatContainerElement).toBeInTheDocument();
    })

    it('should display user text', () => {
        const chatHistory = [{
            id: 239484250,
            text: "Hello!",
            user: "You"
        }];

        const props = {
            chatHistory
        }

        render(<ChatContainer {...props} />);
        const chatParaUser = screen.getByTestId('chatPara');
        expect(chatParaUser).toBeInTheDocument();
    })

    it('should display model text', () => {
        const chatHistory = [{
            id: 293704285,
            text: "Hi there! How can I help you today?",
            user: "Gemini"
        }];

        const props = {
            chatHistory
        }

        render(<ChatContainer {...props} />);
        const chatParaUser = screen.getByTestId('chatPara');
        expect(chatParaUser).toBeInTheDocument();
    })

    it('should display code blocks', () => {
        const codeRes = "console.log('Hello world!')";

        const chatHistory = [{
            id: 102718554,
            isCode: true,
            text: codeRes,
            user: "Gemini"
        }];

        const props = {
            chatHistory
        }

        render(<ChatContainer {...props} />);
        const codeBlock = screen.getByTestId('containerCodeBlock');
        expect(codeBlock).toBeInTheDocument();
    })

    it('should display loader when loading', () => {
        const loading = true;

        const props = {
            loading
        }

        render(<ChatContainer {...props} />);
        const loader = screen.getByTestId('loader');
        expect(loader).toBeInTheDocument();
    })

    it('should display the same text as is generated', () => {
        const chatHistory = [{
            id: 293704285,
            text: "Hi there! How can I help you today?",
            user: "Gemini"
        }];

        const props = {
            chatHistory
        }

        render(<ChatContainer {...props} />);
        const chatParaUser = screen.getByTestId('chatPara');
        expect(chatParaUser).toHaveTextContent("Hi there! How can I help you today?");
    })
})

// Codeblock tests
describe('Codeblock', () => {
    it('should render the codeblock', () => {
        const codeRes = "console.log('Hello world!')";

        render(<CodeBlock codeBlock={codeRes} />);
        const codeBlockElement = screen.getByTestId('codeBlock');
        expect(codeBlockElement).toBeInTheDocument();
    })

    it('should render the passed code', () => {
        const codeRes = "console.log('Hello world!')";

        render(<CodeBlock codeBlock={codeRes} />);
        const codeBlockElement = screen.getByTestId('codeBlock');
        expect(codeBlockElement).toHaveTextContent("console.log('Hello world!')");
    })
})

// ModelTextInput tests
describe('ModelTextInput', () => {
    it('should render the input', () => {
        render(<ModelTextInput/>);
        const modelInputElement = screen.getByTestId('modelTextInput');
        expect(modelInputElement).toBeInTheDocument();
    })
})