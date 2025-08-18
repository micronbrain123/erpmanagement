'use client'

import { useNavigation } from './contexts/NavigationContext'
import DashboardContent from '../components/dashboard/DashboardContent'
import HRPayrollContent from '../components/hrandPayroll/HRPayrollContent'
import PurchaseModuleContent from '../components/purchase/PurchaseModuleContent'
import SalesModuleContent from '../components/sales/SalesModuleContent'
import QuotationContent from '@/components/quotation/QuotationContent'
import OrdersContent from '@/components/orders/OrdersContent'
import InventoryContent from '@/components/inventory/InventoryContent'
import ServiceContent from '@/components/service/ServiceContent'


export default function Home() {
  const { activeTab } = useNavigation()

  // Component rendering function
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />
      case 'sales':
        return <SalesModuleContent />
      case 'quotation':
        return <QuotationContent />
      case 'order':
        return <OrdersContent />
      case 'service':
        return <ServiceContent />
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
        return <InventoryContent />
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