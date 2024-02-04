import React from 'react';
import MessageBubble from './MessageBubble'; // Importing the updated MessageBubble
import Message from '../../../common/chat/chat.message';

type Props = {
    messages: Message[];
};

const Feed: React.FC<Props> = ({ messages }) => {
    return (
        <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto message-container">
            {messages.map((message, index) => (
                <MessageBubble key={index} message={message} />
            ))}
        </div>
    );
};

export default Feed;
