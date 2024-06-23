// App.tsx
import React from "react";
import {
  countBy,
  deepClone,
  everyMatch,
  filterByCriteria,
  filterItemsHiddenList,
  filterProperties,
  findBy,
  findMax,
  findMin,
  groupBy,
  pluck,
  removeBy,
  removeDuplicates,
  removeDuplicatesInArray,
  someMatch,
  sortItems,
  transformValues,
  unzipObject,
  updateBy,
  zipObject,
} from "./helper";

const App: React.FC = () => {
  const items = [
    { name: "apple", type: "fruit", color: "red" },
    { name: "banana", type: "fruit", color: "yellow" },
    { name: "cucumber", type: "vegetable", color: "green" },
    { name: "grape", type: "fruit", color: "purple" },
    { name: "carrot", type: "vegetable", color: "orange" },
  ];

  const itemsInt = [
    { name: "apple", number: "1", color: "red" },
    { name: "banana", number: "2", color: "yellow" },
    { name: "cucumber", number: "3", color: "green" },
    { name: "grape", number: "4", color: "purple" },
    { name: "carrot", number: "5", color: "orange" },
  ];

  const itemsDoppelt = [
    { name: "apple", type: "fruit", color: "red" },
    { name: "banana", type: "fruit", color: "yellow" },
    { name: "apple", type: "fruit", color: "red" },
    { name: "cucumber", type: "vegetable", color: "green" },
    { name: "grape", type: "fruit", color: "purple" },
    { name: "carrot", type: "vegetable", color: "orange" },
    { name: "banana", type: "fruit", color: "yellow" },
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

  // Beispiel: Überprüfen, ob mindestens ein 'fruit' im Array ist
  const hasFruit = someMatch(items, "type", "fruit");
  console.log("Has fruit:", hasFruit);

  // Beispiel: Überprüfen, ob alle Objekte 'fruit' sind
  const allFruits = everyMatch(items, "type", "fruit");
  console.log("All fruits:", allFruits);

  // Beispiel: Erstellen eines Objekts aus Arrays von Schlüsseln und Werten
  const keys = ["name", "type", "color"];
  const values = ["apple", "fruit", "red"];
  const zippedObject = zipObject(keys, values);
  console.log("Zipped object:", zippedObject);

  // Beispiel: Konvertieren des Arrays in ein Objekt von Arrays
  const unzippedObject = unzipObject(items);
  console.log("Unzipped object:", unzippedObject);

  // Beispiel: Transformieren der 'name' Werte in Großbuchstaben
  const transformedItems = transformValues(items, "name", (name: any) =>
    name.toUpperCase()
  );
  console.log("Transformed items:", transformedItems);

  // Beispiel: Finden des Objekts mit dem maximalen und minimalen 'type' Wert
  const maxTypeItem = findMax(itemsInt, "number");
  const minTypeItem = findMin(itemsInt, "number");
  console.log("Max type item:", maxTypeItem);
  console.log("Min type item:", minTypeItem);

  // Beispiel: Deep Cloning des Arrays
  const clonedItems = deepClone(items);
  console.log("Cloned items:", clonedItems);

  // Beispiel: Entfernen von Duplikaten basierend auf dem 'name' Schlüssel
  const uniqueItemsByName = removeDuplicates(itemsDoppelt, "name");
  console.log("Unique items by name:", uniqueItemsByName);

  // Beispiel: Entfernen von Duplikaten aus einem Array von Strings
  const fruits = ["apple", "apple", "banana", "cucumber", "grape", "carrot"];
  const uniqueFruits = removeDuplicatesInArray(fruits);

  console.log("Unique fruits:", uniqueFruits);

  return (
    <div>
      <h1>All Data</h1> // Änderung: Anpassen des Titels
    </div>
  );
};

export default App;
