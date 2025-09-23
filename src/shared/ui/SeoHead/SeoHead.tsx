import { Helmet } from "react-helmet-async";

interface SeoHeadProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
}


// Дефолтные значения
const DEFAULT_IMAGE = "https://vishy.vercel.app/images/og-image.jpg";
const DEFAULT_URL = "https://vishy.vercel.app";

export const SeoHead = ({ 
  title, 
  description, 
  image = DEFAULT_IMAGE, 
  url = DEFAULT_URL 
}: SeoHeadProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      
      {/* Description */}
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};