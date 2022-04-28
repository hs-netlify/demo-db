import React, { useState, useEffect } from "react";
import Head from "next/head";

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

const Demo = ({ site, tags }) => {
  const [edit, setEdit] = useState(false);
  const [showEnv, setShowEnv] = useState(false);
  const [tagsState, setTagsState] = useState(tags);
  const [currentSite, setCurrentSite] = useState({ ...site });
  const [search, setSearch] = useState(currentSite.tags);
  const [description, setDescription] = useState(currentSite?.description);

  const preEnv = showEnv ? "block" : "hidden";

  const tableHeader = "text-lg pr-4";

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

  const cancelEdit = () => {
    setEdit(false);
    setSearch(currentSite.tags);
    setDescription();
  };

  if (site) {
    return (
      <>
        <Head>
          <title>{`Netlify Demo Portal - ${site.name}`}</title>
          <meta
            name="description"
            content={`Netlify Demo Portal - ${site.name}`}
          />
          <link rel="icon" href={`/favicon.png`} />
        </Head>
        <Header />
        <Wrapper>
          <h1 className="w-full h-full text-center p-4 text-3xl">
            {site.name}
          </h1>
          <div className="w-full h-full justify-center  flex flex-wrap">
            <div className="w-full flex justify-center	pt-4 lg:w-1/2">
              <div className="px-4">
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline py-2 hover:text-blue-700"
                  href={site.url}
                >
                  <img
                    className="rounded border hover:opacity-90 transition-all duration-200 cursor-pointer shadow w-full  "
                    src={site.screenshot_url}
                    alt="No Image"
                  />
                </a>
              </div>
            </div>

            <div className="w-full lg:w-1/2 mt-4 px-1">
              <div className="rounded shadow border border-gray-200">
                <div className="px-4 pt-6">
                  <div className="border-b w-full text-3xl border-gray-200">
                    <h1 className="pb-4">Site Infomation</h1>
                  </div>
                </div>
                <div className="w-full pt-4">
                  <table className=" border-collapse w-full table-auto align-top">
                    <tr>
                      <td>
                        <h2 className={tableHeader}>Description:</h2>
                      </td>
                      <td className="break-word whitespace-pre-wrap">
                        {edit ? (
                          <textarea
                            className="w-full border break-word p-1 rounded"
                            onChange={(e) => {
                              setDescription(e.target.value);
                            }}
                            defaultValue={currentSite?.description}
                          ></textarea>
                        ) : (
                          <p className="break-word whitespace-pre-wrap">
                            {currentSite?.description}
                          </p>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h2 className={tableHeader}>Tags:</h2>
                      </td>
                      <td>
                        <div className="flex w-full  flex-wrap">
                          {edit ? (
                            <SearchBar
                              tags={tagsState}
                              search={search}
                              setSearch={setSearch}
                              add={true}
                              setTags={setTagsState}
                            />
                          ) : (
                            currentSite?.tags?.map((i) => (
                              <div key={i} className="tag mt-1">
                                {i}
                              </div>
                            ))
                          )}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h2 className={tableHeader}>URL:</h2>{" "}
                      </td>
                      <td>
                        <a
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline hover:text-blue-700"
                          href={site.url}
                        >
                          <p className="break-all">{site.url}</p>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h2 className={tableHeader}>Repository:</h2>
                      </td>
                      <td>
                        <a
                          className="hover:underline hover:text-blue-700"
                          href={site?.build_settings?.repo_url}
                        >
                          <p className="break-all">
                            {site?.build_settings?.repo_url}
                          </p>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="flex items-center">
                          <h2 className={tableHeader}>Env</h2>{" "}
                          <div className="px-2 flex">
                            <FontAwesomeIcon
                              onClick={() => {
                                setShowEnv(!showEnv);
                              }}
                              icon={showEnv ? faEyeSlash : faEye}
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <pre
                          className={`${preEnv} text-xs  p-1 whitespace-pre-wrap break-all`}
                        >
                          {JSON.stringify(site?.build_settings?.env, null, 4)}
                        </pre>
                      </td>
                    </tr>
                  </table>
                  <div className="p-4">
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
                        className="ml-2 netlify-button"
                        onClick={() => {
                          cancelEdit();
                        }}
                      >
                        Cancel
                      </div>
                    )}
                    {!edit && (
                      <div
                        className="netlify-button"
                        onClick={() => {
                          setEdit(true);
                        }}
                      >
                        Edit
                      </div>
                    )}
                  </div>
                </div>
              </div>
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
