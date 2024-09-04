import { LitElement, html, css, WarningKind } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";

import { Map as MapLibre, Marker, Popup, LngLatBounds } from "maplibre-gl";

/**
 * A custom element that displays a point map using MapLibre GL JS.
 * LitElement extends HTMLElement.
 * @csspart mapDiv - The container for the map
 */
@customElement("mlibre-point-map")
export class MLibrePointMap extends LitElement {
  // The container in MapLibre's Map class is mandatory and tough to workaround,
  // which results in a warning about our custom element scheduling an update after the first render.
  // We can suppress this warning by setting the static property
  static enabledWarnings: WarningKind[] = ['migration'];

  /**
   * A reference to the mapDiv child element in the component's shadow DOM
   */
  @query("#mapDiv")
  private mapDiv!: HTMLDivElement;

  /**
   * The map object created from MapLibre's Map class.
   */
  @state()
  private map: MapLibre | null = null;

  @property() mapStyle: string = "https://demotiles.maplibre.org/style.json";
  @property() center: string = "0,0";
  @property() zoom: number = 1;

  /**
   * The points property isn't available as an attribute on the element
   * because complex types like objects can't be attributes in HTML
   */
  @property({ type: Array, attribute: false })
  points: Array<{ lat: number; lon: number; color: string; text?: string }> =
    [];

  // The render() method is called any time reactive properties change.
  // Returns HTML in a string template literal tagged with the `html`
  // tag function to describe the component's internal DOM.
  // Expressions can set attribute values, property values, event handlers,
  // and child nodes/text
  render() {
    // We're including the MapLibre GL CSS file from a CDN as part of the component's ShadowDOM
    return html`
      <link
        rel="stylesheet"
        href="https://unpkg.com/maplibre-gl@4.6.0/dist/maplibre-gl.css"
      />
      <div id="mapDiv" part="mapDiv"></div>
    `;
  }

  /**
   * Initialize the map when the component is first updated
   */
  firstUpdated() {
    this.map = new MapLibre({
      container: this.mapDiv,
      style: this.mapStyle,
      center: this.parseCenter(this.center),
      zoom: this.zoom,
    });
  }

  /**
   * Updating a reactive property causes the component to update.
   * @param changedProperties A Map of properties that have changed. Unrelated to MapLibre's Map class.
   */
  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has("points")) {
      if (this.points.length > 0 && this.map) {
        this.addMarkers(this.points, this.map);
      }
    }
    if (changedProperties.has("mapStyle") && this.map) {
      this.map.setStyle(this.mapStyle);
    }
    if (changedProperties.has("center") && this.map) {
      this.map.setCenter(this.parseCenter(this.center));
    }
    if (changedProperties.has("zoom") && this.map) {
      this.map.setZoom(this.zoom);
    }
  }

  /**
   * Add markers to the map without replacing exciting markers.
   * @param points - An array of points to be displayed on the map
   * @param map - The MapLibre map object
   */
  addMarkers(
    points: Array<{ lat: number; lon: number; color: string; text?: string }>,
    map: MapLibre
  ) {
    const bounds = new LngLatBounds();

    points.forEach((p) => {
      const popup = new Popup()
        .setLngLat([p.lon, p.lat])
        .setHTML(p.text || "")
        .addTo(map);

      new Marker({ color: p.color || "blue" })
        .setLngLat([p.lon, p.lat])
        .setPopup(popup)
        .addTo(map);

      bounds.extend([p.lon, p.lat]);
    });

    // TODO: Uncomment this line to fit the map to the bounds of the markers
    // map.fitBounds(bounds);
  }

  private parseCenter(center: string): [number, number] {
    return center.split(",").map(Number) as [number, number];
  }

  // Thanks to the ShadowDOM, styles are scoped to this element
  // they won't conflict with styles on the main page or in other components
  static styles = css`
    :host {
      display: block;
      height: 100%;
      width: 100%;
    }
    #mapDiv {
      height: 100%;
      width: 100%;
    }
  `;
}

/**
 * Declare the element
 */
declare global {
  interface HTMLElementTagNameMap {
    "mlibre-point-map": MLibrePointMap;
  }
}
