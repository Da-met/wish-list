import { Helmet } from "react-helmet-async";

interface SeoHeadProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
}

export const SeoHead = ({ title, description, image, url }: SeoHeadProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}

      {/* Open Graph (для соцсетей) */}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}
    </Helmet>
  );
};