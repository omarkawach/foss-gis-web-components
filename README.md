# Build your own GIS web component library

The intent of this repo is to help you get started with creating your own web component library for a [FOSS](https://en.wikipedia.org/wiki/Free_and_open-source_software) GIS web mapping library. Although you could use any mapping library you'd prefer, we're going to use [MapLibre GL JS](https://maplibre.org/) as an example.

## Components

We only include one component as part of this component library / package. That is the `<mlibre-point-map></mlibre-point-map>` component which allows you to add a series of points to a map. There are no plans to include additional components.

You can view this component live [here](https://omarkawach.github.io/foss-gis-web-components/?path=/docs/point-map-component--welcome) in a Storybook.

## Get started

### Install dependencies

```bash
npm install
```

### Dev

Start local server. This will serve `index.html`

```bash
npm run dev
```

### Build

Build the project to the specified output folder (`/dist`)

```bash
npm run build
```

### Preview

Start local server to serve the specified output folder. You must run `build` before `preview`

```bash
npm run preview
```

### Testing

We run an instance of Storybook to test the component API

```bash
npm run storybook
```

### Publishing documentation

Documenting a component's API can be time consuming. We can simplify things by using [Storybook](https://storybook.js.org/). This repo has a github action that publishes the Storybook to github pages on every commit to the `main` branch.

```bash
npm run build-storybook
```

## FAQ

### How would I recreate a similar repo like this one but from scratch?

Since we're using Lit, the first thing you'd have to do is run `npm create vite@latest` in your terminal and select `lit` from the CLI options. Then you'd run `npm install` to generate a `/node_modules`. Next, running `npx storybook@latest init` will include Storybook in your project.

At this point you'll have a few unnecessary files. You can clear out stories you don't need. If you want to work with typescript you'll need to update your `tsconfig.json` and if you want to externalize any dependencies you would have to add or update your `vite.config.ts` file.

Now you can begin developing and testing your component(s).

### What kind of tech is being used?

- An open-source library for mapping on the web
  - [MapLibre GL JS](https://maplibre.org/)
- Build / development tools
  - [Lit](https://lit.dev/) for writing web components
    - [Stencil](https://stenciljs.com/), and [FAST](https://fast.design/) are potential alternatives
  - [Vite](https://vitejs.dev/) since Lit doesn't have its own compiler
  - [Typescript](https://www.typescriptlang.org/)
- Testing
  - [Storybook](https://storybook.js.org/) (@storybook/web-components-vite)
- Sample code for using the component in frameworks
  - [Vue](https://vuejs.org/)
  - [React 19 (beta)](https://react.dev/blog/2024/04/25/react-19) and [MDX](https://mdxjs.com/)

### What are web components?

> Web components are a set of web platform APIs that allow you to create new custom, reusable, encapsulated HTML tags to use in web pages and web apps. Custom components and widgets build on the Web Component standards, will work across modern browsers, and can be used with any JavaScript library or framework that works with HTML.
> Web components are based on existing web standards. Features to support web components are currently being added to the HTML and DOM specs, letting web developers easily extend HTML with new elements with encapsulated styling and custom behavior.

Source: https://www.webcomponents.org/introduction

### What is a library for mapping on the web?

To include maps in a web application, the easiest and most common way is through mapping libraries. Mapping libraries provides out-of-box support for visualizations and interactions in maps. Common choices are as follows:

- Open-source libraries: Leaflet, MapLibre, OpenLayers, turf.js (focused on spatial analysis), etc.
- Commercial libraries: ArcGIS Maps SDK for JavaScript, Google Maps JavaScript API, MapBox GL JS

We are also seeing a growing number of mapping libraries as React, Angular, web, or Vue components. Some notable component libraries are:

- Open-source: Nivo React (built on top of D3),
  Vue 3.x components for CesiumJS,
  React Leaflet,
  ngx-leaflet (Angular) from BlueHalo,
  ngx-maplibre-gl,
  @planet/maps
- Commericial libraries: ArcGIS Maps SDK for JavaScript components,
  Google Maps JavaScript API Web Components

Choosing the best web mapping libraries that suit end user and developer needs is a crucial step for all web development involving maps and/or location services.

### How do you publish a component package to npm?

You can run `npm pack` for a preview of what an npm package of your components would look like. Additionally, Lit has documentation on [publishing your component package](https://lit.dev/docs/tools/publishing/) and if necessary, a [React 18 framework wrapper](https://lit.dev/docs/frameworks/react/) too. React 19 [seems to work fine](https://custom-elements-everywhere.com/) without a framework wrapper. This is demonstrated in one of the samples in this repo.

### What's the recommendation for documenting a component's API?

The [web components community](https://www.webcomponents.org/) recommends the [community standard custom-elements-manifest JSON](https://github.com/webcomponents/custom-elements-manifest).

### What challenges are there with creating a web component library?

If you're looking to write some truly "enterprise-ready" web components, you will face a series of challenges for consideration:

- Whether or not to include framework wrappers
- Publishing on npm
- How well a GIS web mapping library can work with web component technology (e.g., slots and Shadow DOM)
- Typings
  - Including HTML typings is basically a freebie. Typings for JSX would be an additional effort
- Documentation
  - E.g., TypeDoc, JSON, MDX, etc.
- Support module formats other than [ECMAScript Modules](https://nodejs.org/api/esm.html) (ESM), like [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition)
  - If we only support ESM applications then that means vanilla JavaScript script-tag users who prefer writing quick apps in an `index.html` file will struggle. The level of complexity for implementing this support can depend on how well your mapping library plays with certain module formats.
- How to handle styling (e.g., [adoptedStyleSheets](https://developer.mozilla.org/en-US/docs/Web/API/Document/adoptedStyleSheets), light DOM / shadow DOM, etc.)
- Asset management (if the component package requires assets)
- Support disconnected / self-contained environment setups
- Support [server-side rendering](https://www.debugbear.com/blog/server-side-rendering) (SSR)
- Development system for web components
  - Does it include a built-in compiler? How much can this compiler do for you?
  - Can it bundle components together if necessary?
  - Can it support lazy loading web components? Lazy loading prevents tree shaking and increases an app's bundle size
  - Can it externalize dependencies?
- Maintenance
  - Testing
  - Managing dependencies
  - Breaking changes

These are only some of the considerations, but ultimately, if you're aiming for a bare minimum component library you could probably ignore some of or all of the considerations.

### Why Lit?

Lit is a lightweight, un-opinionated, and customizable development system for writing web components. Since Lit doesn't have its own compiler, we use Vite for our development server and build tool. In comparison, Stencil has its own compiler but may not be flexible enough to adapt to the requirements of GIS web mapping libraries who want to be "enterprise-ready". Another comparison is that Stencil supports JSX, but Lit does not. FAST is also lightweight and doesn't include its own built-in compiler. Technically, you could write [web components with frameworks such as Vue](https://vuejs.org/guide/extras/web-components.html#building-custom-elements-with-vue), but then your component library might be less portable and become tightly coupled to that framework.

### How to debug?

The component relies on MapLibre GL JS. You can look for errors in DevTools. For example, if an invalid `style.json` is passed to the `mapStyle` property then there will be an AJAX error in the console.

### What are some additional resources?

https://github.com/web-padawan/awesome-web-components

## Acknowledgements

This repo was prepared for a [session](https://whova.com/embedded/session/yES4SgdEKaaEK0AD6y4YnM1DD3NRWjkPECkzqJQHhCY%3D/4005893/?widget=primary) at [FOSS4G NA 2024](https://www.foss4gna.org/)