'use client'

import { useNavigation } from './contexts/NavigationContext'
import DashboardContent from '../components/dashboard/DashboardContent'
import HRPayrollContent from '../components/hrandPayroll/HRPayrollContent'
import PurchaseModuleContent from '../components/purchase/PurchaseModuleContent'

// Import other components as you create them
// import SalesContent from './components/sales/SalesContent'
// import POSContent from './components/pos/POSContent'
// import QuotationContent from './components/quotation/QuotationContent'
// ... etc

export default function Home() {
  const { activeTab } = useNavigation()

  // Component rendering function
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />
      case 'sales':
        return (
          <div className="bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Sales Module</h1>
            <div className="bg-white rounded-lg shadow p-6">
              <p>Sales content will go here...</p>
              {/* Replace this with your actual SalesContent component */}
            </div>
          </div>
        )
      case 'pos':
        return (
          <div className="bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">POS Module</h1>
            <div className="bg-white rounded-lg shadow p-6">
              <p>POS content will go here...</p>
              {/* Replace this with your actual POSContent component */}
            </div>
          </div>
        )
      case 'quotation':
        return (
          <div className="bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Quotation Module</h1>
            <div className="bg-white rounded-lg shadow p-6">
              <p>Quotation content will go here...</p>
            </div>
          </div>
        )
      case 'order':
        return (
          <div className="bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Module</h1>
            <div className="bg-white rounded-lg shadow p-6">
              <p>Order content will go here...</p>
            </div>
          </div>
        )
      case 'service':
        return (
          <div className="bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Service Module</h1>
            <div className="bg-white rounded-lg shadow p-6">
              <p>Service content will go here...</p>
            </div>
          </div>
        )
      case 'purchase':
        return <PurchaseModuleContent/>
      case 'manufacturing':
        return (
          <div className="bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Manufacturing Module</h1>
            <div className="bg-white rounded-lg shadow p-6">
              <p>Manufacturing content will go here...</p>
            </div>
          </div>
        )
      case 'inventory':
        return (
          <div className="bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Inventory Module</h1>
            <div className="bg-white rounded-lg shadow p-6">
              <p>Inventory content will go here...</p>
            </div>
          </div>
        )
      case 'accounts':
        return (
          <div className="bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Accounts Module</h1>
            <div className="bg-white rounded-lg shadow p-6">
              <p>Accounts content will go here...</p>
            </div>
          </div>
        )
      case 'hr-payroll':
        return <HRPayrollContent/>
      case 'reports':
        return (
          <div className="bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Reports Module</h1>
            <div className="bg-white rounded-lg shadow p-6">
              <p>Reports content will go here...</p>
            </div>
          </div>
        )
      case 'crm':
        return (
          <div className="bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">CRM Module</h1>
            <div className="bg-white rounded-lg shadow p-6">
              <p>CRM content will go here...</p>
            </div>
          </div>
        )
      default:
        return <DashboardContent />
    }
  }

  return renderContent()
}