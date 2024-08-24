## BBC News Feed With User Interaction Statistic Generation

A scrollable modern news feed that creates statistics about the people who use it, using Tailwind, Vue, Dynamically scraped data via Cheerio, Request-Promise & fs (node native)

## To Use This App

Clone this repo
install dependencies using npm or yarn (`npm install` or `yarn`)
start app using `npm run dev` or `yarn dev`

## About this App

This App is created from a view point of showcasing good UX/UI principles across all browser and viewports, and creating useful data quickly with cheerio.

side note:
The data is purposefully not served via an API, but one could very easily be integrated. You could also schedule the scrape process using `node-cron` or something similar on an express server hourly. The package-json `scrape` script is what should be automated.

VITE CONFIG

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
