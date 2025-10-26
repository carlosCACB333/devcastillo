'use client';

import { sendMail } from '@/action/sendMail';
import { sectionWrapper, subtitle, title, titleWrapper } from '@/components';
import { useAuthor } from '@/hooks';
import { Contact } from '@/interfaces';
import { ContacSchema } from '@/schemas';
import { Button } from '@heroui/button';
import { Card, CardBody } from '@heroui/card';
import { Input, Textarea } from '@heroui/input';
import { Link } from '@heroui/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AiFillPhone, AiFillQuestionCircle } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { MdAlternateEmail } from 'react-icons/md';
import { toast } from 'sonner';
import { Icon } from '../common/icon';

export const ContactSection = () => {
  const { author } = useAuthor();
  const { register, handleSubmit, reset, formState } = useForm<Contact>({
    mode: 'onChange',
    resolver: zodResolver(ContacSchema),
  });
  const { errors, isValid, isSubmitting } = formState;

  const onSubmit = async (data: Contact) => {
    try {
      const { ok, message } = await sendMail(data);
      if (ok) {
        reset();
        toast.success(message);
        return;
      }
      toast.error(message);
    } catch {
      toast.error('Ocurrió un error al enviar el mensaje');
    }
  };

  const getAttrs = (name: keyof Contact) => {
    const attrs = register(name);
    return {
      ...attrs,
      variant: 'bordered',
      className: 'mb-2',
      color: errors[name]?.message ? 'danger' : 'default',
      errorMessage: errors[name]?.message,
    } as const;
  };
  return (
    <>
      <section
        className={sectionWrapper({
          class: 'z-20 mt-16 flex items-center lg:mt-44',
        })}
      >
        <div className='flex max-w-4xl flex-col gap-8'>
          <Card>
            <CardBody>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='relative overflow-hidden rounded-lg bg-linear-to-br from-blue-300 to-blue-900 p-8'>
                  <div>
                    <div className={titleWrapper()}>
                      <h1 className={title({ size: 'lg' })}>¿Trabajamos juntos?</h1>
                    </div>
                    <p
                      className={subtitle({
                        class: 'text-base md:w-full lg:text-lg',
                      })}
                    >
                      Si tienes alguna duda o quieres contactarme,envíame un mensaje
                    </p>
                  </div>

                  <div className='flex flex-col items-start'>
                    {author.facebook && (
                      <Link href={author.facebook} target='_blank' color='foreground' aria-label='Facebook'>
                        <Icon name='facebook' className='mr-2' aria-label='Facebook' />
                        Facebook
                      </Link>
                    )}
                    {author.linkedin && (
                      <Link href={author.linkedin} target='_blank' color='foreground' aria-label='Linkedin'>
                        <Icon name='linkedin' className='mr-2' aria-label='linkedin' />
                        Linkedin
                      </Link>
                    )}
                    {author.phone && (
                      <Link
                        href={`https://wa.me/${author.phone}`}
                        target='_blank'
                        color='foreground'
                        aria-label='WhatsApp'
                      >
                        <Icon name='whatsapp' className='mr-2' aria-label='Whatsapp' />
                        WhatsApp
                      </Link>
                    )}
                    {author.email && (
                      <Link href={`mailto:${author.email}`} target='_blank' color='foreground' aria-label='Email'>
                        <Icon name='email' className='mr-2' aria-label='email' />
                        Email
                      </Link>
                    )}
                    {author.github && (
                      <Link href={author.github} target='_blank' color='foreground' aria-label='GitHub'>
                        <Icon name='git' className='mr-2' aria-label='github' />
                        GitHub
                      </Link>
                    )}
                  </div>
                  <div className='absolute right-0 bottom-0 h-1/2 w-1/2 translate-x-10 translate-y-10 transform rounded-full bg-white opacity-10'></div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} method='POST'>
                  <Input
                    {...getAttrs('name')}
                    label='Nombres'
                    placeholder='Ingresa tu nombre'
                    endContent={<FaUser className='text-foreground' size={20} />}
                    aria-label='Nombres'
                  />
                  <Input
                    {...getAttrs('email')}
                    label='Email'
                    placeholder='Ingresa tu email'
                    type='email'
                    endContent={<MdAlternateEmail className='text-foreground' size={20} />}
                    aria-label='Email'
                  />
                  <Input
                    {...getAttrs('phone')}
                    label='Teléfono'
                    type='phone'
                    placeholder='Ingresa tu teléfono'
                    endContent={<AiFillPhone className='text-foreground' size={20} />}
                    aria-label='Teléfono'
                  />
                  <Input
                    {...getAttrs('affair')}
                    label='Asunto'
                    placeholder='¿Sobre qué quieres hablar?'
                    endContent={<AiFillQuestionCircle className='text-foreground' size={20} />}
                    aria-label='asunto'
                  />
                  <Textarea
                    {...getAttrs('message')}
                    label='Mensaje'
                    placeholder='Escribe tu mensaje'
                    aria-label='Mensaje'
                  />
                  <Button
                    type='submit'
                    className='w-full'
                    color='primary'
                    isDisabled={!isValid}
                    isLoading={isSubmitting}
                    aria-label='Enviar mensaje'
                  >
                    Enviar mensaje
                  </Button>
                </form>
              </div>
            </CardBody>
          </Card>
        </div>
        <br />
        <br />
        <br />
      </section>
    </>
  );
};
