
import React, { createContext, useContext, useState } from 'react';

export interface Tab {
  id: string;
  title: string;
  type: 'list' | 'edit' | 'create';
  data?: any;
}

interface TabContextType {
  tabs: Tab[];
  activeTabId: string;
  addTab: (tab: Tab) => void;
  removeTab: (id: string) => void;
  setActiveTabId: (id: string) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export const TabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tabs, setTabs] = useState<Tab[]>([{ id: 'list', title: 'Listagem', type: 'list' }]);
  const [activeTabId, setActiveTabId] = useState('list');

  const addTab = (tab: Tab) => {
    setTabs((prev) => {
      const exists = prev.find((t) => t.id === tab.id);
      if (exists) return prev;
      return [...prev, tab];
    });
    setActiveTabId(tab.id);
  };

  const removeTab = (id: string) => {
    if (id === 'list') return; // Keep list alive
    setTabs((prev) => {
      const newTabs = prev.filter((t) => t.id !== id);
      if (activeTabId === id) {
        setActiveTabId(newTabs[newTabs.length - 1].id);
      }
      return newTabs;
    });
  };

  return (
    <TabContext.Provider value={{ tabs, activeTabId, addTab, removeTab, setActiveTabId }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTabs = () => {
  const context = useContext(TabContext);
  if (!context) throw new Error('useTabs must be used within a TabProvider');
  return context;
};
