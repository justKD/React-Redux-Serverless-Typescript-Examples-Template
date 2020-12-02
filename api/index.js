/**
 * Serverless functions.
 * These won't be available until a build is deployed to Vercel.
 */
const app = require('express')();

/**
 * Set a `Cache-Control` header that describes the lifetime of our resource,
 * telling the CDN to serve from the cache and update in the background
 * (at most once per second).
 * https://vercel.com/docs/edge-network/caching#stale-while-revalidate
 */
const setCacheControlFor = (res) => {
  const header = 'Cache-Control';
  const value = 's-max-age=1, stale-while-revalidate';
  res.setHeader(header, value);
};

/**
 * Middleware intercepts all calls to `app`.
 */
app.use((req, res, next) => {
  // do things here
  setCacheControlFor(res);
  req.query['middlewareIntercepted'] = true;

  next();
});

/**
 * If this app isn't deployed on Vercel, serverless responses will not work.
 * If deployed, this response will be the boolean `true`, but it will be an
 * html string if the serverless api is not available.
 */
app.get('/api/deployed', (_, res) => {
  res.send(true);
});

/**
 * Simply passing back a static value.
 */
app.get('/api/greeting', (_, res) => {
  res.send('Hello! This response is from the serverless API.');
});

/**
 * Access environment variables.
 * Enable these in your Vercel project settings before uncommenting
 * this function.
 */
// app.get('/api/mode', (_, res) => {
//   res.send(process.env.NODE_ENV);
// });

/**
 * Add secrets to the Vercel deployment in the Vercel project settings.
 * These must all be added and valid or the entire serverless backend
 * breaks.
 * https://vercel.com/docs/build-step#environment-variables
 */
// app.get('/api/secret', (_, res) => {
//   res.send(
//     process.env.SECRET_ENV_VARIABLE ??
//       'Add secrets to the Vercel deployment in the Vercel project settings.'
//   );
// });

module.exports = app;
