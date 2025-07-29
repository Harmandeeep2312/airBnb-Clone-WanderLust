 
  mapboxgl.accessToken = mapToken;
  const map = new mapboxgl.Map({
    container: 'map', //container id
    style: "mapbox://styles/mapbox/streets-v12",
    center: lists.geometry.coordinates,
    zoom: 10
  });
   const marker1 = new mapboxgl.Marker({color:"red"})
        .setLngLat(lists.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({offset:25})
      .setHTML(`<h4>${lists.title}</h4><p>You'll Be Living Here</p>`))
        .addTo(map);