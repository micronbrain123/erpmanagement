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
import ManufacturingContent from '@/components/manufacturing/ManufacturingContent'
import AccountsContent from '@/components/accounts/AccountsContent'
import CRMContent from '@/components/crm/CRMcontent'
import ReportsContent from '@/components/reports/ReportsContent'

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
        return <PurchaseModuleContent />
      case 'manufacturing':
        return <ManufacturingContent />
      case 'inventory':
        return <InventoryContent />
      case 'accounts':
        return <AccountsContent />
      case 'hr-payroll':
        return <HRPayrollContent/>
      case 'reports':
        return <ReportsContent />
      case 'crm':
        return <CRMContent />
      default:
        return <DashboardContent />
    }
  }

  return renderContent()
}