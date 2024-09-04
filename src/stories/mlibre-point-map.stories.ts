import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../components/mlibre-point-map/mlibre-point-map";

const meta: Meta = {
  title: "Point map component",
  component: "mlibre-point-map",
  args: {
    center: "0,0",
    mapStyle: "https://demotiles.maplibre.org/style.json",
    zoom: 1,
  },
  argTypes: {
    center: {
      control: {
        type: "text",
      },
      table: {
        defaultValue: {
          summary: "0,0",
          detail: "The center of the map",
        },
      }
    },
    mapStyle: {
      control: {
        type: "text",
      },
      table: {
        defaultValue: {
          summary: "https://demotiles.maplibre.org/style.json",
          detail: "The style of the map",
        },
      }
    },
    zoom: {
      control: {
        type: "number",
      },
      table: {
        defaultValue: {
          summary: "1",
          detail: "The zoom level of the map",
        },
      }
    },
  },
  decorators: [
    (story: () => unknown) => {
      // We need some sort of container for the component
      return html`
        <style>
          .story-content {
            height: 95vh;
          }
        </style>
        <div class="story-content">${story()}</div>
      `;
    },
  ],
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
      },
    },
  },
};
export default meta;

export const Simple: StoryObj = {
  name: "Simple",
  render: (args) => {
    return html`<mlibre-point-map
      zoom=${args.zoom}
      center=${args.center}
      mapStyle=${args.mapStyle}
    ></mlibre-point-map>`;
  },
};

export const AddMarkers: StoryObj = {
  name: "Add markers",
  args: {
    points: [
      {
        lat: 48.8,
        lon: 2.4,
        color: "#15B0AB",
        text: "Paris 2024",
      },
    ],
  },
  argTypes: {
    points: {
      control: {
        type: "object",
      },
    },
  },
  render: (args) => {
    return html`<mlibre-point-map
      zoom=${args.zoom}
      center=${args.center}
      mapStyle=${args.mapStyle}
      .points=${args.points}
    ></mlibre-point-map>`;
  },
};