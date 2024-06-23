// App.tsx
import React, { useEffect, useState } from "react";
import { Item, initializeAndRetrieveData } from "./dbService";  // Änderung: Importiere die neue Funktion
import { filterItems } from "./helper";

const App: React.FC = () => {
  const [allData, setAllData] = useState<Item[]>([]);  // Änderung: Umbenennen der State-Variable

  useEffect(() => {
    initializeAndRetrieveData(setAllData);  // Änderung: Verwende die neue Funktion
  }, []);

  const items = [
    { name: 'apple', type: 'fruit', color: 'red' },
    { name: 'banana', type: 'fruit', color: 'yellow' },
    { name: 'cucumber', type: 'vegetable', color: 'green' },
    { name: 'grape', type: 'fruit', color: 'purple' },
    { name: 'carrot', type: 'vegetable', color: 'orange' },
    { name: 'apple', type: 'fruit', color: 'red' },
    { name: 'banana', type: 'fruit', color: 'yellow' },
    { name: 'cucumber', type: 'vegetable', color: 'green' },
    { name: 'grape', type: 'fruit', color: 'purple' },
    { name: 'carrot', type: 'vegetable', color: 'orange' }
  ];

  const criteria = { type: 'fruit' };

  const abc = filterItems(items, criteria);  // Änderung: Verwende die neue Funktion
  console.log(abc);
  return (
    <div>
      <h1>All Data</h1>  // Änderung: Anpassen des Titels
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Title</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {allData.map(item => (  // Änderung: Beziehe dich auf die neue Variable
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.userId}</td>
              <td>{item.title}</td>
              <td>{item.completed ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
