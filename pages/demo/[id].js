import React, { useState, useEffect } from "react";

import Header from "../../components/Header";
import Wrapper from "../../components/Wrapper";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "../../components/SearchBar";

export const getServerSideProps = async (context) => {
  let site = {};

  const tags = await (
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tags`)
  ).json();
  try {
    const { id } = context.params;
    site = await (
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/site?siteId=${id}`)
    ).json();
  } catch (error) {}

  return { props: { site, tags } };
};

const Demo = ({ site }) => {
  const [edit, setEdit] = useState(false);
  const [showEnv, setShowEnv] = useState(false);
  const [description, setDescription] = useState(site?.description);
  const [tags, setTags] = useState(site.tags ? site.tags : []);
  const [currentSite, setCurrentSite] = useState({ ...site });
  const [search, setSearch] = useState(site.tags);

  const preEnv = showEnv ? "visible" : "invisible";

  const handleSubmit = async () => {
    try {
      const res = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/site?siteId=${site.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...site, description, tags: search }),
          }
        )
      ).json();
      setEdit(false);
      setCurrentSite({ ...site, description, tags: search });
    } catch (error) {
      console.log(error);
    }
  };

  if (site) {
    return (
      <>
        <Header />
        <Wrapper>
          <h1 className="w-full h-full text-center p-4 text-3xl">
            {site.name}
          </h1>
          <div className="w-full h-full  flex flex-wrap">
            <div className="w-full lg:w-1/2">
              <img
                className="rounded border shadow w-full md:max-w-lg "
                src={site.screenshot_url}
                alt="No Image"
              />
            </div>

            <div className="w-1/2 px-4">
              <h2 className="text-lg pt-2">Description</h2>
              {edit ? (
                <textarea
                  className="w-full border p-1 rounded"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  defaultValue={currentSite?.description}
                ></textarea>
              ) : (
                <p className="py-2">{currentSite?.description}</p>
              )}

              <h2 className="text-lg pt-2">Tags</h2>
              <div className="flex  ">
                {edit ? (
                  <SearchBar
                    tags={tags}
                    search={search}
                    setSearch={setSearch}
                    add={true}
                    setTags={setTags}
                  />
                ) : (
                  currentSite?.tags?.map((i) => (
                    <div key={i} className="tag">
                      {i}
                    </div>
                  ))
                )}
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

              <pre
                className={`${preEnv} py-2 text-sm p-1 whitespace-pre-wrap break-words`}
              >
                {JSON.stringify(site?.build_settings?.env, null, 4)}
              </pre>
              {edit && (
                <div
                  className="netlify-button"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Submit
                </div>
              )}
              {edit && (
                <div
                  className="netlify-button"
                  onClick={() => {
                    setEdit(!edit);
                  }}
                >
                  Cancel
                </div>
              )}
              {!edit && (
                <div
                  className="netlify-button"
                  onClick={() => {
                    setEdit(!edit);
                  }}
                >
                  Edit
                </div>
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
