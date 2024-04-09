import { render, screen, cleanup } from '@testing-library/react';
import ChatContainer from '../ChatContainer';

test('test', () => {
    expect(true).toBe(true);
})

test('should render chat container', () => {
    render(<ChatContainer/>);
    const chatContainerElement = screen.getByTestId('chatContainer');
    expect(chatContainerElement).toBeInTheDocument();
})