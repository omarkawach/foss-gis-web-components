# Build your own GIS web component library

The intent of this repo is to help you get started with creating your own web component library for a [FOSS](https://en.wikipedia.org/wiki/Free_and_open-source_software) GIS web mapping library. Although you could use any mapping library you'd prefer, we're going to use [MapLibre GL JS](https://maplibre.org/) as an example.

## Components

We only include one component as part of this component library / package. That is the `<mlibre-point-map></mlibre-point-map>` component which allows you to add a series of points to a map. There are no plans to include additional components.

You can view this component live [here]() in a Storybook.

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

Documenting a component's API can be time consuming. We can simplify things by using [Storybook](https://storybook.js.org/).

```bash
npm run build-storybook
```

### Publishing a component package

You can run `npm pack` for a preview of what the npm package would look like

## Resources

[Lit - Hello world playground](https://lit.dev/playground/#sample=examples/hello-world)

[Lit - Publishing your component package](https://lit.dev/docs/tools/publishing/)

[Lit - React framework wrapper](https://lit.dev/docs/frameworks/react/)

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
- Sample code for using the component in a framework
  - [Vue](https://vuejs.org/)

### What are web components?

> Web components are a set of web platform APIs that allow you to create new custom, reusable, encapsulated HTML tags to use in web pages and web apps. Custom components and widgets build on the Web Component standards, will work across modern browsers, and can be used with any JavaScript library or framework that works with HTML. 
> Web components are based on existing web standards. Features to support web components are currently being added to the HTML and DOM specs, letting web developers easily extend HTML with new elements with encapsulated styling and custom behavior.

Source: https://www.webcomponents.org/introduction

### What is a library for mapping on the web

...

### What challenges are there with creating a web component library?

If you're looking to write some truly "enterprise-ready" web components, you will face a series of challenges for consideration:
- Whether or not to include framework wrappers
- Publishing on npm
- How well a GIS web mapping library can work with web components
- Typings
  - Including HTML typings is basically a freebie. Typings for JSX would be an additional effort
- Documentation
  - E.g., TypeDoc, JSON, MDX, etc.
- Support module formats other than [ECMAScript Modules](https://nodejs.org/api/esm.html) (ESM), like [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition)
  - If we only support ESM applications then that means vanilla JavaScript script-tag users who prefer writing quick apps in an `index.html` file will struggle
- How to handle styling (e.g., [adoptedStyleSheets](https://developer.mozilla.org/en-US/docs/Web/API/Document/adoptedStyleSheets), juggle light DOM / shadow DOM, etc.)
- Asset management (if the component package requires assets)
- Support disconnected / self-contained environment setups
- Development system for web components
  - Does it include a built-in compiler? How much can this compiler do for you?
  - Can it bundle components together if necessary?
  - Can it support lazy loading web components? Lazy loading prevents tree shaking and increases an app's bundle size
  - Can it externalize dependencies?
- Maintenance
  - Testing
  - Managing dependencies
  - Breaking changes

### Why Lit?

Lit is a lightweight, un-opinionated, and customizable development system for writing web components. Since Lit doesn't have its own compiler, we use Vite for our development server and build tool. In comparison, Stencil has its own compiler but may not be flexible enough to adapt to the requirements of GIS web mapping libraries who want to be "enterprise-ready". Another comparison is that Stencil supports JSX, but Lit does not. FAST is also lightweight and doesn't include its own built-in compiler. Technically, you could write [web components with frameworks such as Vue](https://vuejs.org/guide/extras/web-components.html#building-custom-elements-with-vue), but then your component library might be less portable and become tightly coupled to that framework.

### How to debug

The component relies on MapLibre GL JS. You can look for errors in DevTools. For example, if an invalid `style.json` is passed to the `mapStyle` property then there will be an AJAX error in the console.

## Acknowledgements

This repo was prepared for a session at [FOSS4G NA 2024](https://www.foss4gna.org/)