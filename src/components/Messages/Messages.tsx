import React from 'react';
import { Card } from 'antd';
import cls from './Messages.module.scss';

interface MessagesProps {
  messages: string[];
}

const Messages: React.FC<MessagesProps> = ({ messages }) => {

    if (messages.length === 0) {
        return <div>Сообщений нет</div>
    }
    
  return (
    <div className={cls.Messages}>
      {messages.map((message, index) => (
        <Card title={`Сообщение № ${index + 1}`} key={index} className={cls.message}>{message}</Card>
      ))}
    </div>
  );
};

export default Messages;