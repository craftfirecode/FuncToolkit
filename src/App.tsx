// App.tsx
import React from "react";
import {
  filterItems,
  filterItemsHiddenList,
  filterProperties,
  groupBy,
  sortItems,
} from "./helper";

const App: React.FC = () => {
  const items = [
    { name: "apple", type: "fruit", color: "red" },
    { name: "banana", type: "fruit", color: "yellow" },
    { name: "cucumber", type: "vegetable", color: "green" },
    { name: "grape", type: "fruit", color: "purple" },
    { name: "carrot", type: "vegetable", color: "orange" },
  ];

  const criteria = [
    {
      type: ["vegetable", "fruit"],
      color: ["red", "yellow", "green"],
    },
    {
      type: "vegetable",
      color: ["orange", "red"],
    },
  ];

  // Obj. Eigenschaften filtern
  const filterItemsFind = filterItems(items, criteria);
  console.log("filterItemsFind", filterItemsFind);

  // Obj. Eigenschaften ausblenden
  const filteredItemHidden = filterItemsHiddenList(items, criteria);
  console.log("filteredItemHidden", filteredItemHidden);

  // Obj. nur bestimmte Eigenschaften anzeigen
  const propertiesToShow = ["color", "type"];
  const filteredItems = filterProperties(items, propertiesToShow);
  console.log("filterProperties", filteredItems);

  // Beispiel: Nach 'name' aufsteigend sortieren
  const sortedItemsByNameAsc = sortItems(items, "name", "asc");
  console.log("Sorted by name (asc):", sortedItemsByNameAsc);

  // Beispiel: Nach 'type' absteigend sortieren
  const sortedItemsByTypeDesc = sortItems(items, "type", "desc");
  console.log("Sorted by type (desc):", sortedItemsByTypeDesc);

  // Beispiel: Gruppieren nach 'type'
  const groupedByType = groupBy(items, "type");
  console.log("Grouped by type:", groupedByType);

  return (
    <div>
      <h1>All Data</h1> // Änderung: Anpassen des Titels
    </div>
  );
};

export default App;
