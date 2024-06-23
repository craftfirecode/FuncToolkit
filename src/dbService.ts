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
const REFRESH_INTERVAL_MINUTES = 15;

export const initializeDatabase = (): Promise<IDBDatabase> => {
    let dbVersion = 200; // Set the initial database version
    // Increment dbVersion based on your versioning requirement
  
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, dbVersion);
  
        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
  
            // Check for existing object stores and delete them before creating new ones
            if (db.objectStoreNames.contains(storeName)) {
                db.deleteObjectStore(storeName);
            }
            if (db.objectStoreNames.contains(metaStoreName)) {
                db.deleteObjectStore(metaStoreName);
            }
  
            // Create new object stores
            db.createObjectStore(storeName, { keyPath: "id" });
            db.createObjectStore(metaStoreName);
        };
  
        request.onsuccess = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            resolve(db);
        };
  
        request.onerror = (event) => {
            reject(new Error("Datenbank-Initialisierung fehlgeschlagen: " + (event.target as IDBOpenDBRequest).error?.toString()));
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
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);

      const itemStore = transaction.objectStore(storeName);
      const metaStore = transaction.objectStore(metaStoreName);

      const clearRequest = itemStore.clear();
      clearRequest.onsuccess = () => {
          data.forEach(item => {
              const putRequest = itemStore.put(item);
              putRequest.onerror = () => reject(putRequest.error);
          });
          metaStore.put(Date.now(), lastUpdatedKey);
      };

      clearRequest.onerror = () => reject(clearRequest.error);
  });
};

export const fetchDataAndUpdateDB = async (db: IDBDatabase): Promise<void> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data: Item[] = await response.json();
  await updateDatabase(db, data);
};

export const getAllData = (db: IDBDatabase): Promise<Item[]> => {
  return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = (event) => {
          const allData = (event.target as IDBRequest<Item[]>).result;
          resolve(allData);
      };

      getAllRequest.onerror = (event) => {
          reject((event.target as IDBRequest).error);
      };
  });
};

export const initializeAndRetrieveData = (setData: React.Dispatch<React.SetStateAction<Item[]>>): void => {
  initializeDatabase()
      .then(async (db) => {
          const lastUpdated = await getLastUpdated(db);
          const now = Date.now();

          if (!lastUpdated || now - lastUpdated > REFRESH_INTERVAL_MINUTES * 60 * 1000) {
            await fetchDataAndUpdateDB(db);
              console.log("Database updated with new data from API");
          } else {
              console.log("Using cached data from IndexedDB");
          }

          return getAllData(db);
      })
      .then(data => {
          setData(data);
          console.log("Retrieved Data:", data);
      })
      .catch(error => console.error("Error:", error));
};
