// dbService.ts
export interface Item {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  }
  
  const dbName = "filterExampleDB";
  const storeName = "itemsStore";
  const metaStoreName = "metaStore";
  const lastUpdatedKey = "lastUpdated";
  
  export const initializeDatabase = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, 1);
  
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains(metaStoreName)) {
          db.createObjectStore(metaStoreName);
        }
      };
  
      request.onsuccess = async (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        resolve(db);
      };
  
      request.onerror = (event) => {
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  };
  
  export const getLastUpdated = (db: IDBDatabase): Promise<number | null> => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(metaStoreName, "readonly");
      const store = transaction.objectStore(metaStoreName);
      const request = store.get(lastUpdatedKey);
  
      request.onsuccess = () => {
        resolve(request.result ? request.result : null);
      };
  
      request.onerror = () => {
        reject(request.error);
      };
    });
  };
  
  export const updateDatabase = (db: IDBDatabase, data: Item[]): Promise<void> => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName, metaStoreName], "readwrite");
      const itemStore = transaction.objectStore(storeName);
      const metaStore = transaction.objectStore(metaStoreName);
  
      const clearRequest = itemStore.clear();
  
      clearRequest.onsuccess = () => {
        data.forEach(item => itemStore.put(item));
        metaStore.put(Date.now(), lastUpdatedKey);
        resolve();
      };
  
      clearRequest.onerror = () => reject(clearRequest.error);
    });
  };
  
  export const fetchDataAndUpdateDB = async (db: IDBDatabase): Promise<void> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data: Item[] = await response.json();
    await updateDatabase(db, data);
  };
  
  export const filterData = (db: IDBDatabase, filterFunction: (item: Item) => boolean): Promise<Item[]> => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      const getAllRequest = store.getAll();
  
      getAllRequest.onsuccess = (event) => {
        const allData = (event.target as IDBRequest<Item[]>).result;
        const filteredData = allData.filter(filterFunction);
        resolve(filteredData);
      };
  
      getAllRequest.onerror = (event) => {
        reject((event.target as IDBRequest).error);
      };
    });
  };
  
  export const initializeAndFilterData = (setFilteredData: React.Dispatch<React.SetStateAction<Item[]>>): void => {
    initializeDatabase()
      .then(async (db) => {
        const lastUpdated = await getLastUpdated(db);
        const now = Date.now();
  
        if (!lastUpdated || now - lastUpdated > 15 * 60 * 1000) {
          await fetchDataAndUpdateDB(db);
          console.log("Database updated with new data from API");
        } else {
          console.log("Using cached data from IndexedDB");
        }
  
        return filterData(db, item => item.completed);
      })
      .then(filteredData => {
        setFilteredData(filteredData);
        console.log("Filtered Data:", filteredData);
      })
      .catch(error => console.error("Error:", error));
  };
  