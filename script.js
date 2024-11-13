require([
  "esri/views/MapView",
  "esri/WebMap"
], (MapView, WebMap) => {
  // Initialize the WebMap using its portalItem ID
  const webmap = new WebMap({
    portalItem: {
      id: "107c6ef7213c4b98b087cf7d10bf8d51" // Replace with your map ID
    }
  });

  // Set up the MapView and ensure zoom controls are included
  const view = new MapView({
    map: webmap,
    container: "viewDiv",
    ui: {
      components: ["zoom"] // Ensures zoom buttons are visible
    }
  });

  // Toggle legend visibility when the button is clicked
  document.getElementById("legendButton").addEventListener("click", () => {
    const legendContainer = document.getElementById("legend-container");
    if (legendContainer.style.display === "none" || legendContainer.style.display === "") {
      legendContainer.style.display = "block"; // Show the legend
    } else {
      legendContainer.style.display = "none"; // Hide the legend
    }
  });

  // Function to initialize the legend content dynamically based on the map's layers
  function createLegend(map) {
    const legendList = document.getElementById("legend-list");
    legendList.innerHTML = ""; // Clear any existing items
    
    // Loop through each layer in the map and add it to the legend
    map.layers.forEach(layer => {
      const legendItem = document.createElement("li");
      legendItem.textContent = layer.title; // Set the title of the layer as legend text
      legendList.appendChild(legendItem);
    });
  }

  // Call the function to populate the legend once the map and layers are loaded
  webmap.when(() => {
    createLegend(webmap);
  });
});
