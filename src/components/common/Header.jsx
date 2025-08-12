'use client'

import {
  LayoutDashboard,
  ShoppingCart,
  Monitor,
  FileText,
  Package,
  Wrench,
  ShoppingBag,
  Building,
  Archive,
  Calculator,
  Users,
  BarChart3,
  UserCog
} from 'lucide-react'
import { useNavigation } from '../../app/contexts/NavigationContext'

export default function Header() {
  const { activeTab, setActiveTab } = useNavigation()

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { id: 'sales', label: 'Sales', icon: ShoppingCart, path: '/sales' },
    { id: 'pos', label: 'POS', icon: Monitor, path: '/pos' },
    { id: 'quotation', label: 'Quotation', icon: FileText, path: '/quotation' },
    { id: 'order', label: 'Order', icon: Package, path: '/order' },
    { id: 'service', label: 'Service', icon: Wrench, path: '/service' },
    { id: 'purchase', label: 'Purchase', icon: ShoppingBag, path: '/purchase' },
    { id: 'manufacturing', label: 'Manufacturing', icon: Building, path: '/manufacturing' },
    { id: 'inventory', label: 'Inventory', icon: Archive, path: '/inventory' },
    { id: 'accounts', label: 'Accounts', icon: Calculator, path: '/accounts' },
    { id: 'hr-payroll', label: 'HR&Payroll', icon: Users, path: '/hr-payroll' },
    { id: 'reports', label: 'Reports', icon: BarChart3, path: '/reports' },
    { id: 'crm', label: 'CRM', icon: UserCog, path: '/crm' }
  ]

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex">
        {/* Logo Section */}
        <div className="flex items-center px-6 py-3 border-r border-gray-200 bg-gray-50">
          <img
            src="/logo.png"
            alt="Company Logo"
            className="h-8 w-auto"
          />
        </div>

        {/* Navigation Tabs */}
        <nav className="flex overflow-x-auto flex-1">
          {navigationItems.map((item) => {
            const IconComponent = item.icon
            const isActive = activeTab === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`
                  flex flex-col items-center justify-center min-w-[90px] px-4 py-3 border-b-2 transition-all duration-200
                  ${isActive
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-transparent hover:border-gray-300 hover:bg-gray-50 text-gray-600 hover:text-gray-800'
                  }
                `}
              >
                <IconComponent size={20} className="mb-1" />
                <span className="text-xs font-medium whitespace-nowrap">{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}