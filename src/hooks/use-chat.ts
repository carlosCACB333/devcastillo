
import { useLlm } from '@/store/web-llm';
import { useEffect, useRef, useState } from 'react';

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
  const [cv, setCv] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const retrieveCvContent = async () => {
      try {
        const res = await fetch('/cv.md');
        const data = await res.text();
        setCv(data);
      } catch (error) {
        console.error('Error fetching about me:', error);
      }
    };
    retrieveCvContent();
  }, []);

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
            content: `Eres el asistente virtual de Carlos Castillo, un desarrollador de software profesional.

TU ROL:
- Responder preguntas sobre la experiencia, habilidades y proyectos de Carlos
- Ayudar a entender su perfil profesional
- Conectar a usuarios interesados con Carlos

CONTEXTO DEL CV:
${cv}

INSTRUCCIONES:
1. Responde SOLO basándote en la información del CV proporcionado
2. Si no encuentras la información en el CV, responde: "No tengo esa información específica en el CV, pero puedes contactar directamente a Carlos para más detalles"
3. Mantén un tono profesional pero cercano
4. Sé específico: menciona tecnologías, años de experiencia, nombres de proyectos cuando sea relevante
5. Si preguntan sobre contacto, proporciona únicamente la información que esté en el CV
6. Respuestas concisas: máximo 3-4 oraciones
7. Si preguntan sobre habilidades específicas, menciona proyectos donde las aplicó

EJEMPLOS DE BUENAS RESPUESTAS:
- "Carlos tiene [X] años de experiencia con [tecnología], trabajando principalmente en [tipo de proyectos]"
- "En su CV destaca el proyecto [nombre], donde utilizó [tecnologías] para [logro específico]"

NO HAGAS:
- Inventar información no presente en el CV
- Responder preguntas no relacionadas con el perfil profesional de Carlos`,
          },
          ...user_msgs.slice(-8),
        ],
        stream: true,
        temperature: 0.3,
        max_tokens: 350,
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
    isLoaded: isLoaded && engine && cv.length > 0,
    isTyping,
    handleSubmit,
    clearMessages,
    inputRef,
  };
};
