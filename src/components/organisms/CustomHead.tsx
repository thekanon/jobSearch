// Organisms/CustomHead.tsx
import Head from "next/head";

type CustomHeadProps = {
  title: string;
  description?: string;
  keywords?: string;
};

const CustomHead: React.FC<CustomHeadProps> = ({
  title,
  description,
  keywords,
}) => {
  return (
    <Head>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index,follow" />
      <meta name="googlebot" content="index,follow" />
      <meta name="google" content="notranslate" />
      <meta name="og:title" content={title} />
      {description && <meta name="og:description" content={description} />}
    </Head>
  );
};

export default CustomHead;
