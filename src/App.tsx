// App.tsx
import React, { useEffect, useState } from "react";
import { Item, initializeAndFilterData } from "./dbService";

const App: React.FC = () => {
  const [filteredData, setFilteredData] = useState<Item[]>([]);

  useEffect(() => {
    initializeAndFilterData(setFilteredData);
  }, []);

  return (
    <div>
      <h1>Filtered Data</h1>
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
          {filteredData.map(item => (
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
