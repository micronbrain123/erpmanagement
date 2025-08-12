'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

export default function Sidebar() {
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
        { name: 'Sales Entry', path: '/sales/entry' },
        { name: 'POS Entry', path: '/pos/entry' },
        { name: 'Purchase Entry', path: '/purchase/entry' },
        { name: 'Receipt Entry', path: '/receipt/entry' },
        { name: 'Payment Entry', path: '/payment/entry' },
        { name: 'Expense Entry', path: '/expense/entry' },
        { name: 'Product Entry', path: '/product/entry' }
      ]
    },
    {
      id: 'records',
      title: 'Records',
      items: [
        { name: 'Sales Record', path: '/sales/record' },
        { name: 'Purchase Record', path: '/purchase/record' }
      ]
    },
    {
      id: 'reports',
      title: 'Reports',
      items: [
        { name: 'Stock Report', path: '/inventory/stock-report' }
      ]
    },
    {
      id: 'accounts',
      title: 'Accounts',
      items: [
        { name: 'Customer Due Balance', path: '/accounts/customer-due' },
        { name: 'Supplier Due Balance', path: '/accounts/supplier-due' },
        { name: 'Customer Ledger', path: '/accounts/customer-ledger' },
        { name: 'Supplier Ledger', path: '/accounts/supplier-ledger' }
      ]
    },
    {
      id: 'banking',
      title: 'Banking',
      items: [
        { name: 'Cash & Bank Balance', path: '/banking/balance' },
        { name: 'Cash & Bank Ledger', path: '/banking/ledger' }
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
                    <a
                      key={item.name}
                      href={item.path}
                      className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Settings at bottom */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <a
            href="/settings"
            className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          >
            ⚙️ Settings
          </a>
        </div>
      </div>
    </div>
  )
}