import { SQLiteProvider } from "expo-sqlite";
import { createContext, useContext, useState } from "react";
import { initializeDatabase } from "../../database/initializeDatabase";

const DataContext = createContext({});

export function DataProvider({ children }) {
  const [data, setData] = useState(false);
  return (
    <DataContext.Provider value={{ data }}>
      <SQLiteProvider databaseName="data.db" onInit={initializeDatabase}>
        {children}
      </SQLiteProvider>
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}