import React, { useState } from "react";

import Header from "../../components/Header";
import Wrapper from "../../components/Wrapper";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const getStaticProps = async (context) => {
  let site = null;
  try {
    const { id } = context.params;
    site = await (
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/site?siteId=${id}`)
    ).json();
  } catch (error) {}

  return { props: { site } };
};

export const getStaticPaths = async () => {
  return { paths: [], fallback: true };
};

const Demo = ({ site }) => {
  const [edit, setEdit] = useState(false);
  const [showEnv, setShowEnv] = useState(false);
  if (site) {
    return (
      <>
        <Header />
        <Wrapper>
          <div className="w-full flex flex-wrap">
            <h1 className="w-full text-center p-4 text-3xl">{site.name}</h1>
            <img
              className="rounded border shadow w-1/2"
              src={site.screenshot_url}
              alt="No Image"
            />
            <div className="w-1/2 px-4">
              <h2 className="text-lg pt-2">Description</h2>
              <p className="py-2">{site.description}</p>
              <h2 className="text-lg pt-2">Tags</h2>
              <div className="flex p-2 h-12">
                {site.tags.map((i) => (
                  <div
                    key={i}
                    className="rounded bg-blue-400 shadow mx-1 text-white p-1 px-2"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <h2 className="text-lg pt-2">URL</h2>
              <a
                target="_blank"
                rel="noreferrer"
                className="hover:underline py-2 hover:text-blue-700"
                href={site.url}
              >
                <p className="py-2">{site.url}</p>
              </a>
              <h2 className="text-lg pt-2">Repository</h2>
              <a
                className="hover:underline hover:text-blue-700"
                href={site?.build_settings?.repo_url}
              >
                <p className="py-2"> {site?.build_settings?.repo_url}</p>
              </a>
              <div className="flex items-center pt-2">
                <h2 className="text-lg">Environment Variables</h2>{" "}
                <div className="px-2 flex">
                  <FontAwesomeIcon
                    onClick={() => {
                      setShowEnv(!showEnv);
                    }}
                    icon={showEnv ? faEyeSlash : faEye}
                  />
                </div>
              </div>
              {showEnv ? (
                <pre className="py-2">
                  {JSON.stringify(site?.build_settings?.env)}
                </pre>
              ) : (
                <div className="h-24"></div>
              )}
            </div>
          </div>
        </Wrapper>
      </>
    );
  } else {
    return <></>;
  }
};

export default Demo;
