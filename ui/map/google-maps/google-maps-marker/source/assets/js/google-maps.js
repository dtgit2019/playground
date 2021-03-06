class GoogleMaps {
  constructor(element, options) {
    this.element = element;

    this.init(options);

    this.onResize = this.onResize.bind(this);
    this.addEventListeners();
  }

  init(options) {
    this.map = new google.maps.Map(document.querySelector(this.element), options);
  }

  renderMap(options) {
    this.map.setCenter({
      lat: options.lat,
      lng: options.lng,
    });
  }

  renderMarkers(locations) {
    const { map } = this;
    const infoWindow = new google.maps.InfoWindow();

    this.markers = locations.map((location) => {
      const marker = new google.maps.Marker(location);

      if (location.infoWindow) {
        google.maps.event.addListener(marker, 'click', () => {
          infoWindow.setContent(location.infoWindow.content);
          infoWindow.open(map, marker);
        });
      }

      return marker;
    });
  }

  renderMarkerClusterer(options) {
    new MarkerClusterer(this.map, this.markers, options);
  }

  renderRectangle(options) {
    const rectangle = new google.maps.Rectangle(options);

    rectangle.setMap(this.map);
  }

  onResize() {
    const { map } = this;
    const center = map.getCenter();

    google.maps.event.trigger(map, 'resize');
    map.setCenter(center);
  }

  addEventListeners() {
    window.addEventListener('resize', this.onResize);
  }
}

export default GoogleMaps;
