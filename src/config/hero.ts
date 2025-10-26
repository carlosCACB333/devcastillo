import { heroui, HeroUIPluginConfig, ThemeColors } from '@heroui/theme';

const text = {
  title: '#d4ddfb',
  body: '#7481b1',
};

const primary: Partial<ThemeColors['primary']> = {
  DEFAULT: '#7390f4',
  foreground: 'white',
  50: '#0f121a',
  100: '#232a3c',
  200: '#374156',
  300: '#4b578f',
  400: '#588aef',
  500: '#6b9aec',
  600: '#7ca6e9',
  700: '#8da2e6',
  800: '#9eaee3',
  900: '#d4ddfb',
};

const HeroUIConfig: HeroUIPluginConfig = {
  themes: {
    dark: {
      colors: {
        background: {
          DEFAULT: '#07090e',
        },
        foreground: {
          DEFAULT: text.title,
          500: text.body,
        },
        content1: {
          DEFAULT: '#0f121a',
        },
        content2: {
          DEFAULT: '#0f121a',
        },
        default: {
          DEFAULT: '#0F121A',
        },
        primary,
      },
    },
    light: {
      colors: {
        background: {
          DEFAULT: '#eef6ff',
        },
        foreground: {
          DEFAULT: '#000001',
          500: '#404152',
        },
        content1: {
          DEFAULT: '#eaf5ff',
        },
        content2: {
          DEFAULT: '#0f121a',
        },
        default: {
          DEFAULT: '#eaf5ff',
        },
        primary,
      },
    },
  },
};

export default heroui(HeroUIConfig);
