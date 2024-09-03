# Build your own GIS web component library

The intent of this repo is to help you get started with creating your own web component library for a [FOSS](https://en.wikipedia.org/wiki/Free_and_open-source_software) GIS web mapping library. Although you could use any mapping library you'd prefer, we're going to use [MapLibre GL JS](https://maplibre.org/) as an example.

## Components

We only include one component as part of this component library / package. 
That is the `<mlibre-point-map></mlibre-point-map>` component which allows you to add a series of points to a series of points to a map. There are no plans to include additional components.

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

Documenting a component's API can be time consuming. We can simplify things by using Storybook.

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

Now you can begin development and testing of your web component.

### What kind of tech is being used?

- An open-source library for mapping on the web
  - MapLibre GL JS
- Build tools 
  - Lit for building web components 
    - [Stencil](https://stenciljs.com/), and [FAST](https://fast.design/) are potential alternatives
  - Vite since Lit doesn't have its own compiler
- Testing
  - Storybook
  - Vue

### What are web components?

> Web components are a set of web platform APIs that allow you to create new custom, reusable, encapsulated HTML tags to use in web pages and web apps. Custom components and widgets build on the Web Component standards, will work across modern browsers, and can be used with any JavaScript library or framework that works with HTML. 
> Web components are based on existing web standards. Features to support web components are currently being added to the HTML and DOM specs, letting web developers easily extend HTML with new elements with encapsulated styling and custom behavior.

Source: https://www.webcomponents.org/introduction

### What is a library for mapping on the web

...

### What challenges are there with creating a web component library?

If you're looking to write some truly "enterprise-ready" web component, you will face a series of challenges for consideration:
- Whether or not to include framework wrappers
- Publishing on npm
- Typings
- Documentation
- Supporting formats other than [ECMAScript Modules](https://nodejs.org/api/esm.html) (ESM), like [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition)
  - If we only support ESM applications then that means vanilla JavaScript script-tag users who prefer writing quick apps in an `index.html` file will struggle
- How to handle styling (e.g., [adoptedStyleSheets](https://developer.mozilla.org/en-US/docs/Web/API/Document/adoptedStyleSheets), juggle light DOM / shadow DOM, etc.)
- What dependencies to externalize
- Asset management (if the component package requires assets)
- How to support lazy loading web components. Lazy loading prevents tree shaking and increases an app's bundle size.