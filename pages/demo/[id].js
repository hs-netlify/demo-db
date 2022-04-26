import React from "react";

export const getStaticProps = async (context) => {
  const { id } = context.params;
  const site = await (
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/site?siteId=${id}`)
  ).json();

  return { props: { site } };
};

export const getStaticPaths = async () => {
  return { paths: [], fallback: true };
};

const Demo = ({ site }) => {
  return (
    <div className="flex items-center justify-center p-4">
      <img
        className="rounded border shadow w-1/2"
        src={site.screenshot_url}
        alt="No Image"
      />
      <div className="w-1/2">
        <h1>{site.name}</h1>
        <h2></h2>
      </div>
    </div>
  );
};

export default Demo;
