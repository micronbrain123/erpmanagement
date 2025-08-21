'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { useNavigation } from '../../app/contexts/NavigationContext'

export default function Sidebar() {
  const { setActiveTab } = useNavigation()
  
  const [expandedSections, setExpandedSections] = useState({
    entries: true,
    records: false,
    reports: false,
    accounts: false,
    banking: false
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const menuItems = [
    {
      id: 'entries',
      title: 'Data Entry',
      items: [
        { name: 'Sales Entry', tab: 'sales', subPage: 'SalesEntry' },
        { name: 'POS Entry', tab: 'sales', subPage: 'POSEntry' },
        { name: 'Purchase Entry', tab: 'purchase', subPage: 'PurchaseEntry' },
        { name: 'Customer Entry', tab: 'sales', subPage: 'CustomerEntry' },
        { name: 'Supplier Payment Entry', tab: 'accounts', subPage: 'SupplierPaymentEntry' },
        { name: 'Expense Entry', tab: 'accounts', subPage: 'ExpenseEntry' },
        { name: 'Employee Entry', tab: 'hr-payroll', subPage: 'EmployeeEntry' }
      ]
    },
    {
      id: 'records',
      title: 'Records',
      items: [
        { name: 'Sales Record', tab: 'sales', subPage: 'SalesRecord' },
        { name: 'Purchase Record', tab: 'purchase', subPage: 'PurchaseRecord' }
      ]
    },
    {
      id: 'reports',
      title: 'Reports',
      items: [
        { name: 'Stock Report', tab: 'reports', subPage :'ItemStockReport' }
      ]
    },
    {
      id: 'accounts',
      title: 'Accounts',
      items: [
        { name: 'Customer Due Balance', tab: 'accounts' },
        { name: 'Supplier Due Balance', tab: 'accounts' },
        { name: 'Customer Ledger', tab: 'accounts' },
        { name: 'Supplier Ledger', tab: 'accounts' }
      ]
    },
    {
      id: 'banking',
      title: 'Banking',
      items: [
        { name: 'Cash & Bank Balance', tab: 'accounts' },
        { name: 'Cash & Bank Ledger', tab: 'accounts' }
      ]
    }
  ]

  return (
    <div className="w-60 bg-gray-50 border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Menu</h2>
        
        <nav className="space-y-2">
          {menuItems.map((section) => (
            <div key={section.id} className="space-y-1">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                <span>{section.title}</span>
                {expandedSections[section.id] ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </button>

              {/* Section Items */}
              {expandedSections[section.id] && (
                <div className="ml-4 space-y-1">
                  {section.items.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => setActiveTab(item.tab, item.subPage)}
                      className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Settings at bottom */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <button
            onClick={() => setActiveTab('settings')}
            className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          >
            ⚙️ Settings
          </button>
        </div>
      </div>
    </div>
  )
}