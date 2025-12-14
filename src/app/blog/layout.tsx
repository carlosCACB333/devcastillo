import { subtitle } from '@/components';
import { IMG } from '@/components/common/IMG';
import { Footer } from '@/components/common/footer';
import { Stage } from '@/generated/graphql';
import { LayoutProps } from '@/interfaces';
import { formatDate } from '@/utils';
import { GRAPH_SDK } from '@/utils/sdk';
import { Link } from '@heroui/link';
import { Metadata } from 'next';

const Layout = async ({ children }: LayoutProps) => {
  const { firstPosts, categories, skills } = await GRAPH_SDK.blogsLayout({
    stage: Stage.Published,
  });

  const allCategories = [
    {
      id: 'all',
      name: 'Todos',
      slug: '',
    },
    ...categories,
  ];

  const createUrl = (slug?: string) => {
    const url = '/blog';
    if (slug) {
      return `${url}?category=${slug}`;
    }
    return url;
  };

  return (
    <main className='container m-auto flex flex-col gap-8 lg:flex-row lg:gap-16'>
      <div className='flex-1'>
        {children}
        <br />
        <Footer />
      </div>
      <aside className='scroll sticky top-16 w-full p-6 pr-2 md:w-96 lg:max-h-[calc(100vh-6rem)]'>
        <h3 className={subtitle({ class: 'text-foreground' })}>Categorías</h3>
        <ol>
          {allCategories.map((category) => (
            <li
              key={category.id}
              className="before:bg-primary relative ml-[0.4rem] ps-2 font-semibold before:absolute before:top-[.7rem] before:left-[-0.4rem] before:h-[0.4rem] before:w-[0.4rem] before:rounded-full before:content-['']"
            >
              <Link color='foreground' size='sm' href={createUrl(category.slug)} aria-label={category.name}>
                {category.name}
              </Link>
            </li>
          ))}
        </ol>
        <h3 className={subtitle({ class: 'text-foreground' })}>Posts recientes</h3>
        <div className='flex flex-col gap-4'>
          {firstPosts.map((post) => (
            <div key={post.id} className='flex flex-row'>
              <div className='min-h-16 w-32'>
                <IMG src={post.banner.url} alt={post.title} sizes='100px' className='rounded-md' />
              </div>

              <div className='ml-4 flex flex-1 flex-col'>
                <Link href={`/blog/${post.slug}`} className='self-start' aria-label={post.title}>
                  {post.title}
                </Link>
                <p className='text-tiny'>{formatDate(post.updatedAt)}</p>
              </div>
            </div>
          ))}
        </div>
        <h3 className={subtitle({ class: 'text-foreground' })}>Etiquetas</h3>
        <div className='flex max-w-full flex-row flex-wrap gap-2'>
          {skills.map((skill) => (
            <div key={skill.id} className='bg-secondary rounded-lg px-3 py-1'>
              {skill.name}
            </div>
          ))}
        </div>
      </aside>
    </main>
  );
};

export default Layout;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      default: 'Blog',
      template: `%s`,
    },
  };
}
