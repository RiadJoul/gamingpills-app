import React from "react";
import Head from "next/head";

interface Props {
  title: string;
}

const PageHead = (props:Props) => {
  return (
    <Head>
      <link rel="shortcut icon" href="/images/logo/gamingpills.ico"/>
      <title>{props.title} | Gamingpills</title>
      {/* TODO:SEO add meta tags and better titles for SEO */}
    </Head>
  );
};

export default PageHead;