'use client'

import { useState, useEffect } from 'react'

export default function SalesOrderEntry() {
  // Date utility functions
  const getTodayFormatted = () => {
    const today = new Date()
    const day = today.getDate().toString().padStart(2, '0')
    const month = (today.getMonth() + 1).toString().padStart(2, '0')
    const year = today.getFullYear()
    return `${day}/${month}/${year}`
  }

  const formatDateForInput = (dateStr) => {
    const [day, month, year] = dateStr.split('/')
    return `${year}-${month}-${day}`
  }

  const formatDateForDisplay = (dateStr) => {
    const [year, month, day] = dateStr.split('-')
    return `${day}/${month}/${year}`
  }

  // Generate order number
  const generateOrderNo = () => {
    const prefix = 'SO'
    const timestamp = Date.now().toString().slice(-2)
    return `${prefix}${timestamp}`
  }

  const [formData, setFormData] = useState({
    searchItem: '',
    searchCustomer: '',
    customerName: 'General Customer',
    institutionName: '',
    contactNo: '',
    customerAddress: '',
    orderNo: generateOrderNo(),
    entryDate: getTodayFormatted(),
    discountRs: '0',
    discountPercent: '0',
    GSTRs: '0',
    GSTPercent: '0',
    total: '',
    narration: '',
    discountGSTMethod: 'Individual Item',
    transportCost: '0',
    subTotal: '0.00',
    grandTotal: '0.00'
  })

  const [salesCart, setSalesCart] = useState([])
  const [salesOrderEntries, setSalesOrderEntries] = useState([
    {
      id: 1,
      orderNo: 'SO01',
      customer: 'ABC Corporation',
      date: '15/08/2025',
      items: 3,
      totalAmount: '18,000.00 Rs',
      status: 'Pending',
      createdAt: new Date('2025-08-15').getTime()
    },
    {
      id: 2,
      orderNo: 'SO02',
      customer: 'XYZ Limited',
      date: '16/08/2025',
      items: 2,
      totalAmount: '12,500.00 Rs',
      status: 'Confirmed',
      createdAt: new Date('2025-08-16').getTime()
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [filteredEntries, setFilteredEntries] = useState(salesOrderEntries)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  // Sample data
  const items = [
    { id: 1, name: 'Product A', rate: 100.00 },
    { id: 2, name: 'Product B', rate: 150.00 },
    { id: 3, name: 'Product C', rate: 200.00 },
    { id: 4, name: 'Service X', rate: 500.00 },
    { id: 5, name: 'Service Y', rate: 750.00 }
  ]

  const customers = [
    'General Customer',
    'ABC Corporation', 
    'XYZ Limited', 
    'Tech Solutions Inc',
    'Global Trading Co'
  ]

  // Update filtered entries when sales order entries change
  useEffect(() => {
    handleSearch()
  }, [salesOrderEntries])

  // Calculate totals whenever cart changes
  useEffect(() => {
    calculateTotals()
  }, [salesCart, formData.transportCost, formData.discountRs, formData.GSTRs])

  const handleInputChange = (field, value) => {
    if (field === 'entryDate' && value.includes('-')) {
      const formattedDate = formatDateForDisplay(value)
      setFormData(prev => ({
        ...prev,
        entryDate: formattedDate
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleAddToCart = () => {
    if (!formData.total || !formData.searchItem) {
      alert('Please select an item and enter total amount')
      return
    }

    const selectedItem = items.find(item => item.name === formData.searchItem)
    if (!selectedItem) {
      alert('Please select a valid item')
      return
    }

    const newCartItem = {
      id: Date.now(),
      itemName: selectedItem.name,
      qty: 1,
      rate: selectedItem.rate,
      discount: 0,
      GST: 0,
      total: parseFloat(formData.total) || 0
    }

    setSalesCart(prev => [...prev, newCartItem])
    
    // Clear item and total
    setFormData(prev => ({
      ...prev,
      searchItem: '',
      total: ''
    }))
  }

  const handleRemoveFromCart = (id) => {
    setSalesCart(prev => prev.filter(item => item.id !== id))
  }

  const calculateTotals = () => {
    const cartSubTotal = salesCart.reduce((total, item) => {
      return total + (parseFloat(item.total) || 0)
    }, 0)

    const transportCost = parseFloat(formData.transportCost) || 0
    const discount = parseFloat(formData.discountRs) || 0
    const GST = parseFloat(formData.GSTRs) || 0

    const subTotal = cartSubTotal + transportCost
    const grandTotal = subTotal - discount + GST

    setFormData(prev => ({
      ...prev,
      subTotal: subTotal.toFixed(2),
      grandTotal: grandTotal.toFixed(2)
    }))
  }

  const handleSave = () => {
    if (salesCart.length === 0) {
      alert('Please add at least one item to the sales order')
      return
    }

    if (!formData.customerName) {
      alert('Please select a customer')
      return
    }

    const newEntry = {
      id: Date.now(),
      orderNo: formData.orderNo,
      customer: formData.customerName,
      date: formData.entryDate,
      items: salesCart.length,
      totalAmount: `${formData.grandTotal} Rs`,
      status: 'Pending',
      createdAt: Date.now()
    }

    setSalesOrderEntries(prev => [...prev, newEntry])
    setSalesCart([])
    
    // Reset form
    setFormData(prev => ({
      ...prev,
      searchItem: '',
      customerName: 'General Customer',
      institutionName: '',
      contactNo: '',
      customerAddress: '',
      orderNo: generateOrderNo(),
      discountRs: '0',
      discountPercent: '0',
      GSTRs: '0',
      GSTPercent: '0',
      total: '',
      narration: '',
      transportCost: '0',
      subTotal: '0.00',
      grandTotal: '0.00'
    }))

    alert(`Sales Order ${newEntry.orderNo} saved successfully!`)
  }

  const handleReset = () => {
    setSalesCart([])
    setFormData(prev => ({
      ...prev,
      searchItem: '',
      customerName: 'General Customer',
      institutionName: '',
      contactNo: '',
      customerAddress: '',
      orderNo: generateOrderNo(),
      discountRs: '0',
      discountPercent: '0',
      GSTRs: '0',
      GSTPercent: '0',
      total: '',
      narration: '',
      transportCost: '0',
      subTotal: '0.00',
      grandTotal: '0.00'
    }))
  }

  // Search functionality
  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredEntries(salesOrderEntries)
    } else {
      const filtered = salesOrderEntries.filter(entry =>
        entry.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.status.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredEntries(filtered)
    }
    setCurrentPage(1)
  }

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm('')
    setFilteredEntries(salesOrderEntries)
    setShowSearch(false)
    setCurrentPage(1)
  }

  // Print functionality
  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>Sales Order Entry List</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .company-name { font-size: 24px; font-weight: bold; color: #0f766e; margin-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 12px; }
            th { background-color: #f2f2f2; font-weight: bold; }
            .footer { margin-top: 40px; text-align: center; font-size: 10px; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="company-name">Fayullah Factory</div>
            <div class="report-title">Sales Order Entry List</div>
            <div>Generated on: ${new Date().toLocaleString()}</div>
            <div>Total Records: ${filteredEntries.length}</div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Order No</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredEntries.map(entry => `
                <tr>
                  <td>${entry.orderNo}</td>
                  <td>${entry.customer}</td>
                  <td>${entry.date}</td>
                  <td>${entry.items}</td>
                  <td>${entry.totalAmount}</td>
                  <td>${entry.status}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="footer">
            Sales Order Report - Fayullah Factory Management System
          </div>
        </body>
      </html>
    `
    const printWindow = window.open('', '_blank')
    printWindow.document.write(printContent)
    printWindow.document.close()
    printWindow.print()
  }

  // Export functionality
  const handleExport = () => {
    const csvContent = [
      ['Fayullah Factory - Sales Order Entry List'],
      [`Generated on: ${new Date().toLocaleString()}`],
      [`Total Records: ${filteredEntries.length}`],
      [],
      ['Order No', 'Customer', 'Date', 'Items', 'Total Amount', 'Status'],
      ...filteredEntries.map(entry => [
        entry.orderNo,
        entry.customer,
        entry.date,
        entry.items,
        entry.totalAmount,
        entry.status
      ])
    ].map(row => Array.isArray(row) ? row.join(',') : row).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sales_order_entries_${formData.entryDate.replace(/\//g, '-')}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  // Delete entry
  const handleDeleteEntry = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const updatedEntries = salesOrderEntries.filter(entry => entry.id !== id)
      setSalesOrderEntries(updatedEntries)
    }
  }

  // Pagination
  const totalPages = Math.ceil(filteredEntries.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentEntries = filteredEntries.slice(startIndex, endIndex)

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="bg-teal-600 text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
          <h2 className="font-medium text-lg">Sales Order Entry</h2>
          <div className="text-right">
            <div className="text-sm font-semibold">Fayullah Factory</div>
            <div className="text-xs opacity-90">Order Management System</div>
          </div>
        </div>
        
        <div className="p-6">
          {/* Item Cart / Product Cart Information */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Item cart / Product cart Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {/* Search Item */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">Search Item</label>
                <select 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.searchItem}
                  onChange={(e) => handleInputChange('searchItem', e.target.value)}
                >
                  <option value="">No options</option>
                  {items.map(item => (
                    <option key={item.id} value={item.name}>{item.name}</option>
                  ))}
                </select>
              </div>

              {/* Discount (Rs) */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">Discount (Rs)</label>
                <input 
                  type="number"
                  step="0.01"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.discountRs}
                  onChange={(e) => handleInputChange('discountRs', e.target.value)}
                />
              </div>

              {/* Discount % */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">Discount %</label>
                <input 
                  type="number"
                  step="0.01"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.discountPercent}
                  onChange={(e) => handleInputChange('discountPercent', e.target.value)}
                />
              </div>

              {/* GST (Rs) */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">GST (Rs)</label>
                <input 
                  type="number"
                  step="0.01"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.GSTRs}
                  onChange={(e) => handleInputChange('GSTRs', e.target.value)}
                />
              </div>

              {/* GST % */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">GST %</label>
                <input 
                  type="number"
                  step="0.01"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.GSTPercent}
                  onChange={(e) => handleInputChange('GSTPercent', e.target.value)}
                />
              </div>

              {/* Total */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">Total</label>
                <input 
                  type="number"
                  step="0.01"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.total}
                  onChange={(e) => handleInputChange('total', e.target.value)}
                  placeholder="Press Enter Key to sales Cart"
                />
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="mb-4">
              <button 
                onClick={handleAddToCart}
                className="bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-gray-700 transition-colors"
              >
                ADD TO CART
              </button>
            </div>
          </div>

          {/* Debtor/Customer, Item/Product Cart & Total Amounts Information */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Debtor/ Customer, Item/ Product Cart & Total Amounts Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
              {/* Search Customer */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">Search Customer</label>
                <select 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.searchCustomer}
                  onChange={(e) => handleInputChange('searchCustomer', e.target.value)}
                >
                  <option value="">Select Customer</option>
                  {customers.map(customer => (
                    <option key={customer} value={customer}>{customer}</option>
                  ))}
                </select>
              </div>

              {/* Customer Name */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">Customer Name</label>
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange('customerName', e.target.value)}
                />
              </div>

              {/* Institution Name */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">Institution Name</label>
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.institutionName}
                  onChange={(e) => handleInputChange('institutionName', e.target.value)}
                />
              </div>

              {/* Contact No */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">contact No</label>
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.contactNo}
                  onChange={(e) => handleInputChange('contactNo', e.target.value)}
                />
              </div>

              {/* Customer address */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">Customer address</label>
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.customerAddress}
                  onChange={(e) => handleInputChange('customerAddress', e.target.value)}
                />
              </div>

              {/* Order No */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">Order No</label>
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.orderNo}
                  onChange={(e) => handleInputChange('orderNo', e.target.value)}
                />
              </div>

              {/* Entry Date */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">Entry Date</label>
                <input 
                  type="date"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formatDateForInput(formData.entryDate)}
                  onChange={(e) => handleInputChange('entryDate', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Sales Cart */}
          {salesCart.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Sales Cart</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border-b border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700">SL Item Name</th>
                      <th className="border-b border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700">QTY</th>
                      <th className="border-b border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700">Rate (Per)</th>
                      <th className="border-b border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700">Discount %</th>
                      <th className="border-b border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700">GST %</th>
                      <th className="border-b border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700">Total</th>
                      <th className="border-b border-gray-300 px-3 py-2 text-center text-xs font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesCart.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="border-b border-gray-300 px-3 py-2 text-xs">{item.itemName}</td>
                        <td className="border-b border-gray-300 px-3 py-2 text-xs">{item.qty}</td>
                        <td className="border-b border-gray-300 px-3 py-2 text-xs">{item.rate.toFixed(2)}</td>
                        <td className="border-b border-gray-300 px-3 py-2 text-xs">{item.discount}%</td>
                        <td className="border-b border-gray-300 px-3 py-2 text-xs">{item.GST}%</td>
                        <td className="border-b border-gray-300 px-3 py-2 text-xs font-medium">{item.total.toFixed(2)}</td>
                        <td className="border-b border-gray-300 px-3 py-2 text-center">
                          <button 
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="text-red-500 hover:text-red-700"
                            title="Remove from cart"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Narration */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Narration...</label>
              <textarea 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                rows="4"
                placeholder="Enter order description or notes..."
                value={formData.narration}
                onChange={(e) => handleInputChange('narration', e.target.value)}
              />
            </div>

            {/* Discount and GST Method & Totals */}
            <div>
              <div className="mb-4">
                <label className="block text-xs text-gray-600 mb-2">Discount and GST Method</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="discountGSTMethod"
                      value="On Total"
                      checked={formData.discountGSTMethod === 'On Total'}
                      onChange={(e) => handleInputChange('discountGSTMethod', e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-xs">On Total</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="discountGSTMethod"
                      value="Individual Item"
                      checked={formData.discountGSTMethod === 'Individual Item'}
                      onChange={(e) => handleInputChange('discountGSTMethod', e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-xs">Individual Item</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Transport Cost */}
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Transport Cost (Rs)</label>
                  <input 
                    type="number"
                    step="0.01"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={formData.transportCost}
                    onChange={(e) => handleInputChange('transportCost', e.target.value)}
                  />
                </div>

                {/* Sub Total */}
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Sub Total (Rs)</label>
                  <input 
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50"
                    value={formData.subTotal}
                    readOnly
                  />
                </div>

                {/* Grand Total */}
                <div className="col-span-2">
                  <label className="block text-xs text-gray-600 mb-1">Grand Total (Rs)</label>
                  <input 
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 font-medium"
                    value={formData.grandTotal}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button 
              onClick={handleReset}
              className="bg-gray-500 text-white px-6 py-2 rounded text-sm hover:bg-gray-600 transition-colors"
            >
              RESET
            </button>
            <button 
              onClick={handleSave}
              className="bg-teal-600 text-white px-6 py-2 rounded text-sm hover:bg-teal-700 transition-colors flex items-center gap-2"
            >
              🔒 SAVE SALES ORDER
            </button>
          </div>
        </div>
      </div>

      {/* Sales Order Entry List */}
      <div className="bg-white rounded-lg shadow-sm border mt-6">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Sales Order Entry List ({filteredEntries.length} records)</h3>
            <div className="flex gap-2">
              <button 
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 border rounded hover:bg-gray-50 transition-colors"
                title="Search"
              >
                🔍
              </button>
              <button 
                onClick={handleExport}
                className="p-2 border rounded hover:bg-gray-50 transition-colors"
                title="Export to CSV"
              >
                📤
              </button>
              <button 
                onClick={handlePrint}
                className="p-2 border rounded hover:bg-gray-50 transition-colors"
                title="Print"
              >
                🖨️
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {showSearch && (
            <div className="mb-4 flex gap-2">
              <input
                type="text"
                placeholder="Search by order number, customer, or status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
              <button 
                onClick={handleSearch}
                className="bg-teal-600 text-white px-4 py-2 rounded text-sm hover:bg-teal-700 transition-colors"
              >
                Search
              </button>
              <button 
                onClick={handleClearSearch}
                className="bg-gray-500 text-white px-4 py-2 rounded text-sm hover:bg-gray-600 transition-colors"
              >
                Clear
              </button>
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Order No</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Customer</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Items</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Total Amount</th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-700">Status</th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentEntries.length > 0 ? (
                  currentEntries.map((entry) => (
                    <tr key={entry.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2 text-xs font-medium text-teal-600">{entry.orderNo}</td>
                      <td className="py-3 px-2 text-xs">{entry.customer}</td>
                      <td className="py-3 px-2 text-xs">{entry.date}</td>
                      <td className="py-3 px-2 text-xs">{entry.items}</td>
                      <td className="py-3 px-2 text-xs font-medium">{entry.totalAmount}</td>
                      <td className="py-3 px-2 text-center">
                        <span className={`px-2 py-1 rounded text-xs ${
                          entry.status === 'Confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : entry.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {entry.status}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <div className="flex gap-1 justify-center">
                          <button 
                            className="text-blue-600 hover:text-blue-800 text-xs p-1"
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button 
                            onClick={() => handleDeleteEntry(entry.id)}
                            className="text-red-600 hover:text-red-800 text-xs p-1"
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-gray-500">
                      {searchTerm ? 'No matching records found' : 'No sales order entries found'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4 text-sm">
            <div className="flex items-center gap-2">
              <span>Rows per page:</span>
              <select 
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value))
                  setCurrentPage(1)
                }}
                className="border rounded px-2 py-1"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </div>
            <div className="flex items-center gap-4">
              <span>
                {filteredEntries.length === 0 
                  ? '0-0 of 0' 
                  : `${startIndex + 1}-${Math.min(endIndex, filteredEntries.length)} of ${filteredEntries.length}`
                }
              </span>
              <div className="flex gap-1">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ‹
                </button>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="p-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}