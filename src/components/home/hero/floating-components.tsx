import python from '@/assets/img/python.png';
import { GopherIcon, Icon } from '@/components/common/icon';
import { Card, CardBody } from '@heroui/card';
import { colors } from '@heroui/theme';
import Image from 'next/image';
import { BiLogoKubernetes } from 'react-icons/bi';
import { FaAws, FaDocker, FaGithub, FaReact } from 'react-icons/fa';
import { IconCard } from './Icon-card';
import { UserGitHubCard } from './user-github-card';

export const FloatingComponents = () => {
  return (
    <div className='relative z-20 hidden w-1/2 flex-col md:flex'>
      <>
        <FaReact
          size={50}
          className='absolute -top-[220px] -right-[40px] animate-[levitate_13s_ease_infinite_1s_reverse] text-cyan-400'
        />

        <IconCard
          className='absolute -top-[130px] -right-[120px] animate-[levitate_10s_ease_infinite]'
          color={colors.blue[500]}
          aria-label='ts'
        >
          <span className='font-extrabold'>TS</span>
        </IconCard>

        <Card
          isFooterBlurred
          className='absolute -top-[260px] right-[100px] z-0 max-w-fit animate-[levitate_12s_ease_infinite_1s]'
        >
          <CardBody>
            <Image src={python} alt='Python' />
          </CardBody>
        </Card>

        <IconCard
          className='absolute -top-[160px] left-[170px] animate-[levitate_17s_ease_infinite_1s]'
          color={colors.green[500]}
          aria-label='python'
        >
          <FaGithub size={30} />
        </IconCard>

        <UserGitHubCard className='absolute -top-[50px] left-[80px] animate-[levitate_16s_ease_infinite] border-none' />

        <div className='absolute -top-[60px] right-[110px] z-10 max-w-fit animate-[levitate_18s_ease_infinite] border-none'>
          <GopherIcon height={100} width={100} />
        </div>

        <div className='absolute -top-[40px] -right-[230px] z-10 animate-[levitate_14s_ease_infinite_1s]'>
          <FaDocker size={50} className='text-primary' />
        </div>

        <IconCard
          className='absolute top-[160px] left-[200px] max-w-fit animate-[levitate_14s_ease_infinite_0.5s]'
          color={colors.yellow[500]}
          aria-label='k8s'
        >
          <BiLogoKubernetes size={50} />
        </IconCard>

        <div className='absolute top-[30px] right-[10px] z-10 max-w-fit animate-[levitate_16s_ease_infinite] border-none'>
          <Icon name='ia' height={50} width={50} className='' />
        </div>

        <Card
          isFooterBlurred
          className='absolute top-[100px] right-[60px] z-0 max-w-fit animate-[levitate_12s_ease_infinite_1s]'
        >
          <CardBody>
            <FaAws aria-label='aws' size={100} />
          </CardBody>
        </Card>
      </>
    </div>
  );
};
