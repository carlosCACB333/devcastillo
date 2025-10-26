'use client';
import { useChat } from '@/hooks/use-chat';
import { useLlm } from '@/store/web-llm';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { BiSend, BiUser } from 'react-icons/bi';
import { FaRobot } from 'react-icons/fa';
import { MdMessage } from 'react-icons/md';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
}

export const ChatBoot = () => {
  const [isOpenTooltip, setIsopenTooltip] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isOpen) return;
      setIsopenTooltip(true);
    }, 4000);
    return () => clearTimeout(timeout);
  }, [isOpen]);

  return (
    <aside className='fixed right-4 bottom-4 z-40'>
      <div className='relative'>
        <Button
          className='z-50 shadow-2xl'
          isIconOnly
          color='primary'
          radius='full'
          size='lg'
          onClick={() => {
            setIsopenTooltip(false);
            setIsOpen(!isOpen);
          }}
          aria-label='Abrir chatbot'
        >
          <MdMessage size={24} />
        </Button>
        {isOpenTooltip && (
          <div
            className={clsx(
              'bg-primary animate-levitate absolute top-0.5 right-full mr-3 rounded-lg p-2 whitespace-nowrap',
              "before:bg-primary before:absolute before:bottom-[0.8rem] before:left-[calc(100%-0.5rem)] before:h-3 before:w-3 before:rotate-45 before:content-['']"
            )}
          >
            ¿Qué quieres saber de mí...?
          </div>
        )}
        {isOpen && <ChatModal />}
      </div>
    </aside>
  );
};

const ChatModal = () => {
  const { messages, isLoaded, isTyping, handleSubmit, clearMessages } = useChat();
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current?.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);
  return (
    <motion.div
      initial={{ display: 'none', y: 100 }}
      animate={{ display: 'block', y: 0 }}
      exit={{ display: 'none', y: 100 }}
      transition={{ duration: 0.3 }}
      className='bg-content1 absolute right-0 bottom-full mb-2 rounded-md shadow-2xl'
    >
      <div className='bg-content1 h-8 rounded-md'></div>
      <div className='scroll h-[60vh] w-[90vw] overflow-y-auto p-4 sm:h-136 sm:w-96' ref={containerRef}>
        <MessageItem
          message={{
            content: 'Hola, soy el asistente virtual de Carlos, ¿en qué puedo ayudarte?',
            id: '1u#s',
            role: 'assistant',
          }}
        />
        {messages.map((m, i) => (
          <MessageItem key={m.id} message={m} isTyping={i === messages.length - 1 && isTyping} />
        ))}

        <div className='text-center'>
          <Button onClick={clearMessages} className='mt-4' color='danger' variant='light'>
            Limpiar chat
          </Button>
        </div>
      </div>
      <footer className='m-4'>
        <EngineStatus />
        <form onSubmit={handleSubmit}>
          <Input
            aria-label='Input de asistente virtual'
            size='lg'
            placeholder='¿Qué quieres saber...?'
            width='100%'
            variant='underlined'
            autoComplete='off'
            endContent={
              <Button
                isIconOnly
                radius='full'
                size='sm'
                type='submit'
                className={clsx({
                  'cursor-not-allowed': !isLoaded || isTyping,
                  'opacity-50': !isLoaded || isTyping,
                })}
                aria-label='Enviar mensaje'
                disabled={!isLoaded || isTyping}
              >
                <BiSend size={20} />
              </Button>
            }
          />
        </form>
      </footer>
    </motion.div>
  );
};

const EngineStatus = () => {
  const status = useLlm((s) => s.status);
  return <small className='text-divider'>{status.text}</small>;
};

const MessageItem = ({ message, isTyping = false }: { message: Message; isTyping?: boolean }) => {
  return (
    <div
      key={message.id}
      className={clsx(
        'my-2 flex items-end justify-end gap-1',
        { 'ml-6 flex-row': message.role === 'user' },
        { 'mr-6 flex-row-reverse': message.role !== 'user' }
      )}
    >
      <span
        className={clsx('inline-block rounded-xl px-4 py-3', {
          'bg-primary rounded-br-none': message.role === 'user',
          'bg-primary-900 dark:bg-primary-100 rounded-bl-none': message.role !== 'user',
        })}
        style={{
          overflowWrap: 'anywhere',
        }}
      >
        {message.content}
      </span>

      <div className='text-2xl'>
        {message.role === 'user' ? (
          <BiUser className='text-primary-500' />
        ) : (
          <FaRobot
            className={clsx('text-primary-500', {
              'animate-bounce': isTyping,
            })}
          />
        )}
      </div>
    </div>
  );
};
