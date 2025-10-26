'use server';

import { Author, Locale, Stage } from '@/generated/graphql';
import { env } from '@/utils';
import { GRAPH_SDK } from '@/utils/sdk';

export const getAuthor = async (locale: Locale) => {
  try {
    const { author } = await GRAPH_SDK.getAuthor({
      email: env.author.email,
      locales: [locale],
      stage: Stage.Published,
    });

    return author as Author;
  } catch (error) {
    console.error('ERROR: getAuthor', error);
    return undefined;
  }
};
