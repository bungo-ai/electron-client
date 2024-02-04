import React, { useState } from 'react';
import Feed from './Feed/Feed';
import Input from './Input/Input';

type Message = {
    text: string;
    isSender: boolean;
};

export default function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);

    const handleSendMessage = (newMessageText: string) => {
        const newMessage: Message = {
            text: newMessageText,
            isSender: true,
        };
        setMessages([...messages, newMessage]);
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
