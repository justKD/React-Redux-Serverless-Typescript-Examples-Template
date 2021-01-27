/**
 * @file tests/_tests.setup.ts
 * @author Cadence Holmes
 * @copyright Cadence Holmes 2020
 * @license MIT
 * @fileoverview
 * Setup Enzyme/Mocha and run tests in the browser.
 */

(() => {
  /* Configure Enzyme for React 16+ */
  require('./_tests.enzyme');
  // const Enzyme = require("enzyme");
  // const Adapter = require("enzyme-adapter-react-16");
  // Enzyme.configure({ adapter: new Adapter() });

  /* Require tests and test options. */
  const { map } = require('./_tests.map');
  const { options } = require('./_tests.options');

  /** CDN URLs */
  const mochaCDN: {
    js: string;
    css: string;
  } = {
    js: `https://unpkg.com/mocha@${options.version}/mocha.js`,
    css: `https://unpkg.com/mocha@${options.version}/mocha.css`,
  };

  /** Load necessary resources. */
  const loadMochaResources = () => {
    /**
     * Setup HTML and CSS if reporting to HTML.
     * Ignore if reporting to console ('spec').
     */
    const loadIfHtmlReporting = () => {
      const htmlReporter = 'html';
      if (options.params.reporter === htmlReporter) {
        /** Load CSS. */
        const loadCSS = () => {
          const link = document.createElement('link');
          link.href = mochaCDN.css;
          link.type = 'text/css';
          link.rel = 'stylesheet';
          document.head.appendChild(link);
        };
        /** Add HTML to body. */
        const addHTML = () => {
          const style = {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#fff',
          };

          const getStyleString = () => {
            let str = '';
            Object.keys(style).forEach(
              (key) => (str += `${key}:${style[key]};`)
            );
            return str;
          };

          const opts = {
            style: getStyleString(),
            inner: `<div id="mocha"></div>`,
          };

          const mochaDiv = document.createElement('div');
          mochaDiv.innerHTML = `<div style="${opts.style}">${opts.inner}</div>`;
          document.body.appendChild(mochaDiv);
        };

        loadCSS();
        addHTML();
      }
    };

    /** Load the Mocha script. */
    const loadMochaScript = () => {
      const script = document.createElement('script');
      script.src = mochaCDN.js;
      script.async = true;
      document.body.appendChild(script);

      /** Handle cleanup. */
      const mochaDestroy = () => {
        if (window['mocha'] !== undefined) delete window['mocha'];
        script.removeEventListener('error', mochaOnError);
        script.removeEventListener('load', mochaOnLoad);
        script.remove();
        URL.revokeObjectURL(script.src);
        script.src = undefined;
        script.async = undefined;
      };

      /** On error loading script. */
      const mochaOnError = () => {
        console.error('Error loading Mocha.');
        mochaDestroy();
      };

      /** Run Mocha on script load. */
      const mochaOnLoad = () => {
        const m = window['mocha'];
        m.setup(options.params);

        const runTests = async () => {
          await map();
          m.run(mochaDestroy);
        };

        runTests();
      };

      /* Add script event listeners. */
      script.addEventListener('error', mochaOnError);
      script.addEventListener('load', mochaOnLoad);
    };

    loadIfHtmlReporting();
    loadMochaScript();
  };

  loadMochaResources();
})();
