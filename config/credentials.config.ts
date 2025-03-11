export const credentialsConfig = {
  google: {
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || '',
    redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || '',
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
  },
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    publicKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY || '',
    secretKey: process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY || '',
  },
  postgres: {
    host: process.env.DATABASE_URL || '',
  },
  nextauth: {
    secret: process.env.NEXTAUTH_SECRET || '',
  },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || '',
};
