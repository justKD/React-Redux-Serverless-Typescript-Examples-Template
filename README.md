# React-Redux-Serverless-Typescript-Example

##### v 1.0.0 | © justKD 2020

This is an example template for React/Redux Typescript projects.

This is not a barebones template: it's ready to be deployed to Vercel with serverless functionality, and it includes some basic use examples for SCSS, Material-UI, RxJS, and React Router.

[Fork on CodeSandbox](https://codesandbox.io/s/react-redux-serverless-typescript-examples-template-jwn7y)

### Serverless

In order for the serverless backend to work, you'll need to deploy the app to Vercel.

The serverless functions are found in the `/api` directory as an Express app.

In `/src/client/App.tsx` you'll find how to use Axios to make calls to the backend.

If the calls aren't being made from a Vercel deployment, you won't receive valid responses. Also, if you create a serverless function that tries to access an invalid value according to your Vercel project settings, the entire serverless API will fail.

So don't try to access unavailable or nonexistent environment variables.

### Redux

You can find Redux example use in the `src/client/redux` directory. The Redux store is being accessed and used in `src/client/App.tsx`.

### RxJS

In `src/client/components/AppContent.tsx`, we're using RxJS just to handle clicking a couple images. This is just to show how we can set up React components to be used with RxJS. Rather than accessing DOM nodes directly, we should use React refs and create observers only if the node is available on that render cycle.

### React-Router

In `src/client/components/AppContent.tsx`, you'll also find an example of using React-Router with Material-UI components for navigation. We define a list of routes, then map them to Material-UI components wrapped in React-Router `<Link />` components. The actual route components are mapped to `<Route />` components in a `<Switch />`.

### Utility

You'll also find that `src/util/index.ts` has a few things in there already.

- I generally use random numbers a good bit when I'm prototyping, but `Math.random()` is kind of annoying to use, so I've included a simple `rand()` function that leverages the web cryptography api to generate randome numbers.

- `animate()` will add a CSS keyframe animation to a DOM element and automatically remove the class when the animation is ended. You can find an example of it being used in `src/client/components/AppContent.tsx`. A couple example animations are included in `src/client/styles/animations`.
