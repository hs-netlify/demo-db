import React, { useState } from "react";
import Head from "next/head";

//Components
import Grid from "../components/Grid";
import DemoCard from "../components/DemoCard";
import SearchBar from "../components/SearchBar";
import DemoDetail from "../components/DemoDetail";
import Header from "../components/Header";

export const getStaticProps = async () => {
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
  return tags.filter((tag) => search.includes(tag));
};

const Home = ({ sites, tags }) => {
  const [search, setSearch] = useState([]);

  return (
    <div className=" ">
      <Head>
        <title>Netlify Demos</title>
        <meta name="description" content="Netlify SE Demo library" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="px-12 py-6">
        <SearchBar
          search={search}
          setSearch={setSearch}
          tags={tags}
        ></SearchBar>
        <Grid>
          {search.length > 0
            ? sites.map((site) => {
                if (site.tags && checkTag(site.tags, search)) {
                  return (
                    <DemoCard key={site.id} siteId={site.id}>
                      <DemoDetail demo={site} />
                    </DemoCard>
                  );
                }
              })
            : sites.map((site) => {
                return (
                  <DemoCard key={site.id} siteId={site.id}>
                    <DemoDetail demo={site} />
                  </DemoCard>
                );
              })}
        </Grid>
      </div>
    </div>
  );
};

export default Home;
