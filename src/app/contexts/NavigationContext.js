'use client'

import { createContext, useContext, useState } from 'react'

const NavigationContext = createContext()

export function NavigationProvider({ children }) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [activeSubPage, setActiveSubPage] = useState(null)

  const handleSetActiveTab = (tab, subPage = null) => {
    setActiveTab(tab)
    setActiveSubPage(subPage)
  }

  return (
    <NavigationContext.Provider 
      value={{ 
        activeTab, 
        activeSubPage,
        setActiveTab: handleSetActiveTab 
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}