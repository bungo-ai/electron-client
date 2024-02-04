import React, { useState, useEffect } from 'react';
import Feed from './Feed/Feed';
import Input from './Input/Input';

type Message = {
    text: string;
    isSender: boolean;
};

export default function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [sysInfo, setSysInfo] = useState({});  // State to store system information

    useEffect(() => {
        if(window.sys_info){
            // Fetch system information from Electron's main process
            setSysInfo({
                node: window.sys_info.node(),
                chrome: window.sys_info.chrome(),
                electron: window.sys_info.electron(),
                arch: window.sys_info.arch(),
                platformOS: window.sys_info.platformOS(),
                // Fetch other necessary information...
            });
            window.sys_info.osRelease((osRelease) => {
                setSysInfo(prevSysInfo => ({ ...prevSysInfo, osRelease }));
            });
        }
    }, []);

    const handleSendMessage = (newMessageText: string) => {
        if (newMessageText.trim() === '') return; // Ignore empty messages
        
        // Add user's message to the chat
        const userMessage: Message = {
            text: newMessageText,
            isSender: true,
        };
        setMessages([...messages, userMessage]);

        // Prepare payload for the API
        const payload = {
            messages: messages.map(msg => ({
                role: msg.isSender ? "user" : "system",
                content: msg.text
            })).concat({
                role: "user",
                content: newMessageText
            }),
            request_context: {
                sys_info: sysInfo  // Include the system information
            }
        };

        // Send the message to the API
        fetch(`${process.env.NEXT_PUBLIC_BUNGO_AI_SERVICE}/ask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then((response) => response.json())
        .then((data) => {
            // Extract bot's reply from the API response
            const botReply = data.choices[0].message.content;
            
            // Add bot's reply to the chat
            const botMessage: Message = {
                text: botReply,
                isSender: false,
            };
            setMessages(prevMessages => [...prevMessages, botMessage]);
        })
        .catch((error) => {
            console.error('Error:', error);
            
            // Handle errors (Optional: You can display the error message in the chat)
            const errorMessage: Message = {
                text: `ERROR -- ${error}`,
                isSender: false,
            };
            setMessages(prevMessages => [...prevMessages, errorMessage]);
        });
    }

    return (
        <div className="flex flex-col h-screen p-2 sm:p-6">
            <div className="flex-grow overflow-y-auto">
                <Feed messages={messages} />
            </div>
            <Input onSendMessage={handleSendMessage} />
        </div>
    );
}
