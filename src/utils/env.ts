export const env = {
  site: {
    url: process.env.SITE_URL || "",
  },
  cms: {
    url: process.env.GRAPHCMS_URL || "",
    token: process.env.GRAPHCMS_TOKEN || "",
    media: process.env.NEXT_PUBLIC_GRAPHCMS_MEDIA || "",
  },
  author: {
    email: process.env.AUTHOR_EMAIL || "",
    password: process.env.AUTHOR_PASSWORD || "",
  },
  revalidate: 3600,
  webLlmModel: process.env.NEXT_PUBLIC_WEB_LLM_MODEL || "",
  apiKey: process.env.API_KEY || "",
};

export const ALLOWED_LOCALES = ["es", "en"];

export const __PROD__ = process.env.NODE_ENV === "production";
