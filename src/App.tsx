// App.tsx
import React from "react";
import { filterItems } from "./helper";

const App: React.FC = () => {

  const items = [
    { name: 'apple', type: 'fruit', color: 'red' },
    { name: 'banana', type: 'fruit', color: 'yellow' },
    { name: 'cucumber', type: 'vegetable', color: 'green' },
    { name: 'grape', type: 'fruit', color: 'purple' },
    { name: 'carrot', type: 'vegetable', color: 'orange' }
  ];

  const criteria = [
    {
    type: ['vegetable', 'fruit'], 
    color: ['red', 'yellow', 'green']
   },
   {
    type: 'vegetable', 
    color: ['orange', 'red']
   }
  ];

  const abc = filterItems(items, criteria);  // Änderung: Verwende die neue Funktion
  console.log(abc);
  return (
    <div>
      <h1>All Data</h1>  // Änderung: Anpassen des Titels
    </div>
  );
};

export default App;
