import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
import ChatContainer from '../ChatContainer';
import { beforeEach, describe } from 'node:test';

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
        const codeRes = `
        #include <iostream>
        using namespace std;

        void printArray(int arr[], int size) {
        for (int i = 0; i < size; i++) {
            cout << arr[i] << " ";
        }
        cout << endl;
        }

        int main() {
        int myArray[] = {1, 2, 3, 4, 5};
        int size = sizeof(myArray) / sizeof(myArray[0]);

        cout << "Array elements: ";
        printArray(myArray, size);

        return 0;
        }`;

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
        const codeBlock = screen.getByTestId('codeBlock');
        expect(codeBlock).toBeInTheDocument();
    })
})