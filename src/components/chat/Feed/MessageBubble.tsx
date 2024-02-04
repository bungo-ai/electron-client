import React from 'react';
import ReactMarkdown from 'react-markdown';
import Message from '../../../common/chat/chat.message';

type Props = {
    message: Message;
};

const MessageBubble: React.FC<Props> = ({ message }) => {
    const bungoAIChatIconPath = '/logo/BungoAILogo.png';
    const humanChatIconPath = '/Human.png';

    return (
        <div className={`message-bubble ${message.isSender ? 'sent-message' : 'received-message'}`}>
            <div className="flex items-center mb-1">
                <img
                    src={message.isSender ? humanChatIconPath : bungoAIChatIconPath}
                    alt={message.isSender ? 'You' : 'BungoAI'}
                    className="w-7 h-7 rounded-full object-cover mr-2"
                />
                <div className="message-author">
                    {message.isSender ? 'You' : 'BungoAI'}
                </div>
            </div>
            <div className="message-text">
                <ReactMarkdown>
                    {message.text}
                </ReactMarkdown>
            </div>
        </div>
    );
};

export default MessageBubble;
