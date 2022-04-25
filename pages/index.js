import Head from "next/head";
import React, { useState } from "react";

import Grid from "../components/Grid";
import DemoCard from "../components/DemoCard";

import SearchBar from "../components/SearchBar";
import { DemoDetail } from "../components/DemoDetail";

export const getStaticProps = async () => {
  const sites = await (
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sites?page=1`)
  ).json();

  return {
    props: { sites },
  };
};

const Home = ({ sites }) => {
  const [search, setSearch] = useState("");

  return (
    <div className="px-12 py-6">
      <Head>
        <title>Netlify Demos</title>
        <meta name="description" content="Netlify SE Demo library" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchBar setSearch={setSearch}></SearchBar>
      <Grid>
        {sites.map((site) => {
          if (site.name.includes(search)) {
            return (
              <DemoCard key={site.id}>
                <DemoDetail demo={site} />
              </DemoCard>
            );
          }
        })}
      </Grid>
    </div>
  );
};

export default Home;