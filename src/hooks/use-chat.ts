import { aboutme } from '@/assets/aboutme';
import { useLlm } from '@/store/web-llm';
import { useRef, useState } from 'react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
}

export const useChat = () => {
  const engine = useLlm((s) => s.engine);
  const isLoaded = useLlm((s) => s.isLoaded);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!isLoaded || !engine) return;
      const form = e.currentTarget;
      const input = form.querySelector('input');
      if (!input) return;
      const content = input.value;
      if (!content) return;
      const user_msgs: Message[] = [...messages, { id: 'user_' + Date.now().toString(), content, role: 'user' }];
      setMessages(user_msgs);
      setIsTyping(true);
      form.reset();
      const id = 'assistant_' + Date.now().toString();
      const chunks = await engine.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `Eres el asistente virtual de Carlos. Usando la siguiente información, responde a las preguntas de los usuarios. 
            --- CONTEXTO ---
            ${aboutme}
            --- FIN DEL CONTEXTO ---
            Responde de forma concisa y clara. Si no sabes la respuesta, di que no lo sabes.

            `,
          },
          ...user_msgs.slice(-8),
        ],
        stream: true,
        temperature: 0.2,
        max_tokens: 200,
      });
      let completion = '';
      for await (const chunk of chunks) {
        completion += chunk.choices[0].delta.content || '';
        const assistant_msgs: Message[] = [...user_msgs, { id, content: completion, role: 'assistant' }];
        setMessages(assistant_msgs);
      }
      setIsTyping(false);
    } catch (error) {
      console.error(error);
      setIsTyping(false);
    }
  };

  const clearMessages = () => setMessages([]);

  return {
    messages,
    isLoaded,
    isTyping,
    handleSubmit,
    clearMessages,
    inputRef,
  };
};
