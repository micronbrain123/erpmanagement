'use client'

import { useState } from 'react'

export default function RejectedCustomerList() {
  const [showTable, setShowTable] = useState(false)
  const [filterType, setFilterType] = useState('All')
  
  // Sample data with different names than screenshot
  const rejectedCustomers = [
    {
      id: 1,
      sl: 1,
      customerName: 'Arjun Mehta',
      contactNo: '0821547896',
      profession: 'Trader',
      address: 'MG Road, Pune',
      area: 'Pune',
      expectationPercent: '',
      emailAddress: '',
      date: 'Invalid date',
      conversation: 'Budget constraints'
    },
    {
      id: 2,
      sl: 2,
      customerName: 'Neha Gupta',
      contactNo: '01302165173',
      profession: 'Retailer',
      address: 'Sector 15, Noida',
      area: 'Delhi NCR',
      expectationPercent: '',
      emailAddress: '',
      date: '15 Nov 2024',
      conversation: 'Not interested currently'
    },
    {
      id: 3,
      sl: 3,
      customerName: 'Vikram Singh',
      contactNo: '09876543210',
      profession: 'Distributor',
      address: 'Commercial Complex, Jaipur',
      area: 'Jaipur',
      expectationPercent: '45',
      emailAddress: 'vikram@email.com',
      date: '08 Oct 2024',
      conversation: 'Pricing issues'
    },
    {
      id: 4,
      sl: 4,
      customerName: 'Pooja Sharma',
      contactNo: '08765432109',
      profession: 'Business Owner',
      address: 'Park Avenue, Chennai',
      area: 'Chennai',
      expectationPercent: '30',
      emailAddress: 'pooja@email.com',
      date: '22 Sep 2024',
      conversation: 'Feature requirements not met'
    }
  ]

  const handleGetList = () => {
    setShowTable(true)
  }

  const handleAction = (action, customerId, customerName) => {
    alert(`${action} action clicked for customer: ${customerName}`)
  }

  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>Rejected Customer List</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 12px; }
            th { background-color: #f2f2f2; font-weight: bold; }
            h1 { text-align: center; color: #7c3aed; }
          </style>
        </head>
        <body>
          <h1>Rejected Customer List</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>SL</th>
                <th>Customer Name</th>
                <th>Contact No</th>
                <th>Profession</th>
                <th>Address</th>
                <th>Area</th>
                <th>Expectation %</th>
                <th>E-mail Address</th>
                <th>Date</th>
                <th>Conversation</th>
              </tr>
            </thead>
            <tbody>
              ${rejectedCustomers.map((customer) => `
                <tr>
                  <td>${customer.sl}</td>
                  <td>${customer.customerName}</td>
                  <td>${customer.contactNo}</td>
                  <td>${customer.profession}</td>
                  <td>${customer.address}</td>
                  <td>${customer.area}</td>
                  <td>${customer.expectationPercent ? `${customer.expectationPercent}%` : ''}</td>
                  <td>${customer.emailAddress}</td>
                  <td>${customer.date}</td>
                  <td>${customer.conversation}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `
    const printWindow = window.open('', '_blank')
    printWindow.document.write(printContent)
    printWindow.document.close()
    printWindow.print()
  }

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow-sm border">
        {/* Header */}
        <div className="bg-teal-600 text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
          <h2 className="font-medium text-lg">Rejected Customer List</h2>
          <span className="text-sm bg-teal-700 px-3 py-1 rounded">Fatullah Factory</span>
        </div>
        
        <div className="p-6">
          {/* Filter and Get List Section */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Filter Type</label>
              <select 
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 min-w-32"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Corporate">Corporate</option>
                <option value="Retailer">Retailer</option>
                <option value="WholeSaler">WholeSaler</option>
                <option value="Distributor">Distributor</option>
              </select>
            </div>
            
            <button 
              onClick={handleGetList}
              className="bg-teal-600 text-white px-6 py-2 rounded text-sm hover:bg-teal-700 transition-colors flex items-center gap-2"
            >
              🔍 GET LIST
            </button>

            <button 
              onClick={handlePrint}
              className="p-2 border rounded hover:bg-gray-50 transition-colors"
              title="Print"
            >
              🖨️
            </button>
          </div>

          {/* Table Section - Only shows when GET LIST is clicked */}
          {showTable && (
            <div className="overflow-x-auto max-w-4xl">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700">SL</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700">Customer Name</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700">Contact No</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700">Profession</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700">Address</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700">Area</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700">Expectation %</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700">E-mail Address</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700">Date</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700">Conversation Add/View</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700">Approve</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700">Reject</th>
                  </tr>
                </thead>
                <tbody>
                  {rejectedCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2 text-xs">{customer.sl}</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs font-medium">{customer.customerName}</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">{customer.contactNo}</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">{customer.profession}</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">{customer.address}</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">{customer.area}</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">
                        {customer.expectationPercent ? `${customer.expectationPercent}%` : ''}
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">{customer.emailAddress}</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">{customer.date}</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">
                        <div className="flex gap-1">
                          <button 
                            onClick={() => handleAction('Add', customer.id, customer.customerName)}
                            className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                          >
                            Add
                          </button>
                          <button 
                            onClick={() => handleAction('View', customer.id, customer.customerName)}
                            className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
                          >
                            View
                          </button>
                        </div>
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">
                        <button 
                          onClick={() => handleAction('Approve', customer.id, customer.customerName)}
                          className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors w-full"
                        >
                          Approve
                        </button>
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">
                        <button 
                          onClick={() => handleAction('Pending', customer.id, customer.customerName)}
                          className="bg-yellow-600 text-white px-3 py-1 rounded text-xs hover:bg-yellow-700 transition-colors w-full"
                        >
                          Pending
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!showTable && (
            <div className="text-center py-12 text-gray-500">
              <p>Click "GET LIST" to display rejected customers</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}