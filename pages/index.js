import React, { useState, useEffect } from "react";
import Head from "next/head";

//Components
import Grid from "../components/Grid";
import DemoCard from "../components/DemoCard";
import SearchBar from "../components/SearchBar";
import DemoDetail from "../components/DemoDetail";
import Header from "../components/Header";

export const getServerSideProps = async () => {
  const sites = await (
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sites`)
  ).json();

  const tags = await (
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tags`)
  ).json();

  return {
    props: { sites, tags },
  };
};

const checkTag = (tags, search) => {
  let res = tags.filter((tag) => search.includes(tag));
  return res.length === search.length ? true : false;
};

const Home = ({ sites, tags }) => {
  const [search, setSearch] = useState([]);
  const [siteNumber, setSiteNumber] = useState(12);
  const [filteredSites, setFilteredSites] = useState([]);

  useEffect(() => {
    console.log(search);
    let s =
      search.length > 0
        ? sites.filter((site) => site.tags && checkTag(site.tags, search))
        : sites;

    setFilteredSites(s.slice(0, siteNumber));
  }, [sites, siteNumber, search]);

  useEffect(() => {
    setSiteNumber(12);
  }, [search]);

  return (
    <div className=" ">
      <Head>
        <title>Netlify Demos</title>
        <meta name="description" content="Netlify SE Demo library" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="px-12 py-6">
        <div className="px-20">
          <SearchBar
            search={search}
            setSearch={setSearch}
            tags={tags}
          ></SearchBar>
        </div>
        <Grid>
          {filteredSites.map((site) => (
            <DemoCard key={site.id} siteId={site.id}>
              <DemoDetail demo={site} />
            </DemoCard>
          ))}
        </Grid>

        {sites.length > siteNumber && filteredSites.length === siteNumber && (
          <div className="flex justify-center w-full">
            <div
              className="netlify-button"
              onClick={() => {
                setSiteNumber(siteNumber + 12);
              }}
            >
              Load More
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
