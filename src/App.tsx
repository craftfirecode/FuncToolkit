// App.tsx
import React from "react";
import {
  countBy,
  filterByCriteria,
  filterItemsHiddenList,
  filterProperties,
  findBy,
  groupBy,
  pluck,
  removeBy,
  sortItems,
  updateBy,
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
  const filterByCriteriaCons = filterByCriteria(items, criteria);
  console.log("filterByCriteria", filterByCriteriaCons);

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

  // Beispiel: Zählen der Vorkommen von 'type'
  const countByType = countBy(items, "type");
  console.log("Count by type:", countByType);

  // Beispiel: Finden eines Objekts mit 'name' gleich 'banana'
  const foundItem = findBy(items, "name", "banana");
  console.log("Found item:", foundItem);

  // Beispiel: Extrahieren aller 'name' Werte
  const names = pluck(items, "name");
  console.log("Pluck Names:", names);

  // Beispiel: Aktualisieren der 'color' von 'banana' zu 'green'
  const updatedItems = updateBy(items, "name", "banana", { color: "green" });
  console.log("Updated items:", updatedItems);

  // Beispiel: Entfernen des Objekts mit 'name' gleich 'apple'
  const itemsWithoutApple = removeBy(items, "name", "apple");
  console.log("Items without apple:", itemsWithoutApple);

  return (
    <div>
      <h1>All Data</h1> // Änderung: Anpassen des Titels
    </div>
  );
};

export default App;
