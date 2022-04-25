import fetch from "node-fetch";

exports.handler = async (event, context) => {
  const { page } = event.queryStringParameters;
  const sites = await (
    await fetch(`${process.env.NETLIFY_API}/moneytronic/sites`, {
      headers: {
        Authorization: `Bearer ${process.env.NETLIFY_TOKEN}`,
      },
    })
  ).json();
  return { body: JSON.stringify(sites), statusCode: 200 };
};
