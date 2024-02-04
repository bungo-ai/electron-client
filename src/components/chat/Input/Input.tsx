import React, { useState, useRef } from 'react';

type Props = {
    onSendMessage: (message: string) => void; // function that takes a message string and returns void
};

export default function Input({ onSendMessage }: Props) {
    const [message, setMessage] = useState<string>('');

    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);

        // Check if we need to resize input box
        if(textAreaRef.current){
            const inputArea = textAreaRef.current;
            inputArea.style.height = "auto";

            const computedStyles = window.getComputedStyle(e.target);
            const lineHeight = parseInt(computedStyles.lineHeight);
            const maxHeight = lineHeight * 8; 
            const desiredHeight = Math.min(inputArea.scrollHeight, maxHeight);
            inputArea.style.height = `${desiredHeight}px`;
        }
    };

    const handleSendClick = () => {
        if (message.trim() !== '') {
            onSendMessage(message);
            setMessage('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevents inserting new line
            handleSendClick();
        }
    };

    return (
        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
            <div className="flex items-end"> {/* Flex container with alignment to end */}
                <textarea 
                    placeholder="Start typing here..." 
                    className="form-textarea flex-auto mr-8 mt-1 block w-full p-2.5 text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 overflow-y-auto resize-none"
                    value={message}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    ref={textAreaRef}
                />
                <button 
                    type="button" 
                    className="inline-flex flex-none items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-BungoAIGreen-500 hover:bg-BungoAIGreen-400 focus:outline-none"
                    onClick={handleSendClick}
                >
                    <span className="font-bold">Send</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                    </svg>
                </button>
            </div>
        </div>
    )
};
