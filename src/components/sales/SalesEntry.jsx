'use client'

import { useState, useEffect } from 'react'

export default function SalesEntry() {
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

  // Generate invoice number
  const generateInvoiceNo = () => {
    const prefix = 'INV'
    const timestamp = Date.now().toString().slice(-4)
    return `${prefix}${timestamp}`
  }

  const [formData, setFormData] = useState({
    // Item/Product cart information
    searchItem: '',
    selectedItem: null,
    discount: '',
    discountPercent: '',
    GST: '',
    GSTPercent: '',
    
    // Customer information
    searchCustomer: '',
    customerName: 'General Customer',
    institutionName: '',
    contactNo: '',
    customerAddress: '',
    previousDue: '0',
    
    // Invoice information
    invoiceNo: generateInvoiceNo(),
    entryDate: getTodayFormatted(),
    
    // Item details for cart
    itemName: '',
    quantity: '1',
    ratePerUnit: '',
    discountPercentItem: '',
    GSTPercentItem: '',
    
    // Narration and Challan
    narration: '',
    challanText: '',
    
    // Discount and GST Method
    discountGSTMethod: 'individual', // 'total' or 'individual'
    
    // Payment information
    chooseEmployee: '',
    transportCost: '0',
    grandTotal: '0.00',
    paidAmount: '0',
    dueAmount: '0.00',
    
    // Checkboxes
    smgToMobile: false,
    isConditionSale: false,
    isPaymentEMI: false
  })

  const [salesCart, setSalesCart] = useState([])
  const [salesEntries, setSalesEntries] = useState([
    {
      id: 1,
      invoiceNo: 'INV001',
      customerName: 'General Customer',
      entryDate: '01/08/2025',
      totalAmount: '₹ 5,000.00',
      paidAmount: '₹ 5,000.00',
      dueAmount: '₹ 0.00',
      status: 'Completed',
      employee: 'Admin',
      narration: 'Sales transaction',
      createdAt: new Date('2025-08-01').getTime()
    },
    {
      id: 2,
      invoiceNo: 'INV002',
      customerName: 'John Doe',
      entryDate: '02/08/2025',
      totalAmount: '₹ 7,500.00',
      paidAmount: '₹ 5,000.00',
      dueAmount: '₹ 2,500.00',
      status: 'Partial',
      employee: 'Admin',
      narration: 'Partial payment received',
      createdAt: new Date('2025-08-02').getTime()
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [filteredEntries, setFilteredEntries] = useState(salesEntries)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  // Sample data
  const items = [
    { id: 1, name: 'Product A', rate: 100, stock: 50 },
    { id: 2, name: 'Product B', rate: 200, stock: 30 },
    { id: 3, name: 'Product C', rate: 150, stock: 75 },
    { id: 4, name: 'Product D', rate: 300, stock: 25 }
  ]

  const customers = [
    { id: 1, name: 'General Customer', phone: '', address: '', due: 0 },
    { id: 2, name: 'John Doe', phone: '01234567890', address: '123 Main St', due: 500 },
    { id: 3, name: 'Jane Smith', phone: '01987654321', address: '456 Oak Ave', due: 1200 },
    { id: 4, name: 'Ahmed Khan', phone: '01555666777', address: '789 Elm St', due: 0 }
  ]

  const employees = [
    'Admin', 'Sales Manager', 'Cashier', 'Sales Rep 1', 'Sales Rep 2'
  ]

  // Update filtered entries when sales entries change
  useEffect(() => {
    handleSearch()
  }, [salesEntries])

  // Calculate totals when cart changes
  useEffect(() => {
    calculateTotals()
  }, [salesCart, formData.transportCost, formData.discountGSTMethod, formData.discount, formData.GST])

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

  const handleItemSearch = (searchTerm) => {
    setFormData(prev => ({
      ...prev,
      searchItem: searchTerm
    }))
    
    if (searchTerm.trim()) {
      const foundItem = items.find(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      if (foundItem) {
        setFormData(prev => ({
          ...prev,
          selectedItem: foundItem,
          itemName: foundItem.name,
          ratePerUnit: foundItem.rate.toString()
        }))
      }
    }
  }

  const handleCustomerSearch = (searchTerm) => {
    setFormData(prev => ({
      ...prev,
      searchCustomer: searchTerm
    }))
    
    if (searchTerm.trim()) {
      const foundCustomer = customers.find(customer => 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      if (foundCustomer) {
        setFormData(prev => ({
          ...prev,
          customerName: foundCustomer.name,
          contactNo: foundCustomer.phone,
          customerAddress: foundCustomer.address,
          previousDue: foundCustomer.due.toString()
        }))
      }
    }
  }

  const calculateItemTotal = () => {
    const quantity = parseFloat(formData.quantity) || 0
    const rate = parseFloat(formData.ratePerUnit) || 0
    const subtotal = quantity * rate
    
    let discount = 0
    if (formData.discountPercentItem) {
      discount = (subtotal * parseFloat(formData.discountPercentItem)) / 100
    }
    
    let GST = 0
    if (formData.GSTPercentItem) {
      GST = ((subtotal - discount) * parseFloat(formData.GSTPercentItem)) / 100
    }
    
    return subtotal - discount + GST
  }

  const handleAddToCart = () => {
    if (!formData.itemName || !formData.quantity || !formData.ratePerUnit) {
      alert('Please fill in item name, quantity, and rate')
      return
    }

    const newCartItem = {
      id: Date.now(),
      itemName: formData.itemName,
      quantity: parseFloat(formData.quantity),
      rate: parseFloat(formData.ratePerUnit),
      discountPercent: parseFloat(formData.discountPercentItem) || 0,
      GSTPercent: parseFloat(formData.GSTPercentItem) || 0,
      total: calculateItemTotal()
    }

    setSalesCart(prev => [...prev, newCartItem])
    
    // Clear item fields
    setFormData(prev => ({
      ...prev,
      searchItem: '',
      selectedItem: null,
      itemName: '',
      quantity: '1',
      ratePerUnit: '',
      discountPercentItem: '',
      GSTPercentItem: ''
    }))
  }

  const handleRemoveFromCart = (id) => {
    setSalesCart(prev => prev.filter(item => item.id !== id))
  }

  const calculateTotals = () => {
    const subtotal = salesCart.reduce((total, item) => total + item.total, 0)
    const transportCost = parseFloat(formData.transportCost) || 0
    
    let totalDiscount = 0
    let totalGST = 0
    
    if (formData.discountGSTMethod === 'total') {
      if (formData.discount) {
        totalDiscount = parseFloat(formData.discount)
      }
      if (formData.GST) {
        totalGST = parseFloat(formData.GST)
      }
    }
    
    const grandTotal = subtotal + transportCost - totalDiscount + totalGST
    const paidAmount = parseFloat(formData.paidAmount) || 0
    const dueAmount = grandTotal - paidAmount
    
    setFormData(prev => ({
      ...prev,
      grandTotal: grandTotal.toFixed(2),
      dueAmount: dueAmount.toFixed(2)
    }))
  }

  const calculateSubTotal = () => {
    return salesCart.reduce((total, item) => total + item.total, 0).toFixed(2)
  }

  const handleSaveSales = () => {
    if (salesCart.length === 0) {
      alert('Please add at least one item to the cart')
      return
    }

    const newEntry = {
      id: Date.now(),
      invoiceNo: formData.invoiceNo,
      customerName: formData.customerName,
      entryDate: formData.entryDate,
      totalAmount: `₹ ${formData.grandTotal}`,
      paidAmount: `₹ ${formData.paidAmount}`,
      dueAmount: `₹ ${formData.dueAmount}`,
      status: parseFloat(formData.dueAmount) > 0 ? 'Partial' : 'Completed',
      employee: formData.chooseEmployee || 'Admin',
      narration: formData.narration || 'Sales transaction',
      createdAt: Date.now(),
      items: [...salesCart],
      customerInfo: {
        name: formData.customerName,
        institution: formData.institutionName,
        contact: formData.contactNo,
        address: formData.customerAddress
      }
    }

    setSalesEntries(prev => [...prev, newEntry])
    
    // Reset form
    setSalesCart([])
    setFormData(prev => ({
      ...prev,
      searchItem: '',
      selectedItem: null,
      searchCustomer: '',
      customerName: 'General Customer',
      institutionName: '',
      contactNo: '',
      customerAddress: '',
      previousDue: '0',
      invoiceNo: generateInvoiceNo(),
      itemName: '',
      quantity: '1',
      ratePerUnit: '',
      discountPercentItem: '',
      GSTPercentItem: '',
      narration: '',
      challanText: '',
      chooseEmployee: '',
      transportCost: '0',
      grandTotal: '0.00',
      paidAmount: '0',
      dueAmount: '0.00',
      discount: '',
      discountPercent: '',
      GST: '',
      GSTPercent: '',
      smgToMobile: false,
      isConditionSale: false,
      isPaymentEMI: false
    }))

    alert('Sales entry saved successfully!')
  }

  const handleReset = () => {
    setSalesCart([])
    setFormData(prev => ({
      ...prev,
      searchItem: '',
      selectedItem: null,
      searchCustomer: '',
      customerName: 'General Customer',
      institutionName: '',
      contactNo: '',
      customerAddress: '',
      previousDue: '0',
      invoiceNo: generateInvoiceNo(),
      itemName: '',
      quantity: '1',
      ratePerUnit: '',
      discountPercentItem: '',
      GSTPercentItem: '',
      narration: '',
      challanText: '',
      chooseEmployee: '',
      transportCost: '0',
      grandTotal: '0.00',
      paidAmount: '0',
      dueAmount: '0.00',
      discount: '',
      discountPercent: '',
      GST: '',
      GSTPercent: '',
      smgToMobile: false,
      isConditionSale: false,
      isPaymentEMI: false
    }))
  }

  // Search functionality
  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredEntries(salesEntries)
    } else {
      const filtered = salesEntries.filter(entry =>
        entry.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.status.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredEntries(filtered)
    }
    setCurrentPage(1)
  }

  const handleClearSearch = () => {
    setSearchTerm('')
    setFilteredEntries(salesEntries)
    setShowSearch(false)
    setCurrentPage(1)
  }

  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>Sales Entry List</title>
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
            <div class="report-title">Sales Entry List</div>
            <div>Generated on: ${new Date().toLocaleString()}</div>
            <div>Total Records: ${filteredEntries.length}</div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Invoice No</th>
                <th>Customer Name</th>
                <th>Entry Date</th>
                <th>Total Amount</th>
                <th>Paid Amount</th>
                <th>Due Amount</th>
                <th>Status</th>
                <th>Employee</th>
              </tr>
            </thead>
            <tbody>
              ${filteredEntries.map(entry => `
                <tr>
                  <td>${entry.invoiceNo}</td>
                  <td>${entry.customerName}</td>
                  <td>${entry.entryDate}</td>
                  <td>${entry.totalAmount}</td>
                  <td>${entry.paidAmount}</td>
                  <td>${entry.dueAmount}</td>
                  <td>${entry.status}</td>
                  <td>${entry.employee}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="footer">
            Sales Entry Report - Fayullah Factory Management System
          </div>
        </body>
      </html>
    `
    const printWindow = window.open('', '_blank')
    printWindow.document.write(printContent)
    printWindow.document.close()
    printWindow.print()
  }

  const handleExport = () => {
    const csvContent = [
      ['Fayullah Factory - Sales Entry List'],
      [`Generated on: ${new Date().toLocaleString()}`],
      [`Total Records: ${filteredEntries.length}`],
      [],
      ['Invoice No', 'Customer Name', 'Entry Date', 'Total Amount', 'Paid Amount', 'Due Amount', 'Status', 'Employee', 'Narration'],
      ...filteredEntries.map(entry => [
        entry.invoiceNo,
        entry.customerName,
        entry.entryDate,
        entry.totalAmount,
        entry.paidAmount,
        entry.dueAmount,
        entry.status,
        entry.employee,
        entry.narration
      ])
    ].map(row => Array.isArray(row) ? row.join(',') : row).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sales_entries_${formData.entryDate.replace(/\//g, '-')}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const handleDeleteEntry = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const updatedEntries = salesEntries.filter(entry => entry.id !== id)
      setSalesEntries(updatedEntries)
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
          <h2 className="font-medium text-lg">Sales Entry</h2>
          <div className="text-right">
            <div className="text-sm font-semibold">Fayullah Factory</div>
            <div className="text-xs opacity-90">Sales Management System</div>
          </div>
        </div>
        
        <div className="p-6">
          {/* Main Form Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column - Item/Product Cart Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-700 border-b pb-2">Item cart / Product cart Information</h3>
              
              {/* Search Item */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">Search Item</label>
                <div className="relative">
                  <input 
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={formData.searchItem}
                    onChange={(e) => handleItemSearch(e.target.value)}
                    placeholder="Search for items..."
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <button className="text-teal-600">+</button>
                  </div>
                </div>
                {formData.searchItem && (
                  <div className="text-xs text-gray-500 mt-1">No options</div>
                )}
              </div>

              {/* Discount Fields */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Discount (Rs)</label>
                  <input 
                    type="number"
                    step="0.01"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={formData.discount}
                    onChange={(e) => handleInputChange('discount', e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Discount %</label>
                  <input 
                    type="number"
                    step="0.01"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={formData.discountPercent}
                    onChange={(e) => handleInputChange('discountPercent', e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>

              {/* GST Fields */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">GST (Rs)</label>
                  <input 
                    type="number"
                    step="0.01"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={formData.GST}
                    onChange={(e) => handleInputChange('GST', e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">GST %</label>
                  <input 
                    type="number"
                    step="0.01"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={formData.GSTPercent}
                    onChange={(e) => handleInputChange('GSTPercent', e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Total */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">Total</label>
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50"
                  value={calculateItemTotal().toFixed(2)}
                  readOnly
                />
                <p className="text-xs text-gray-500 mt-1">Press Enter Key to sales Cart</p>
              </div>

              {/* Add to Cart Button */}
              <button 
                onClick={handleAddToCart}
                className="w-full bg-gray-600 text-white py-2 rounded text-sm hover:bg-gray-700 transition-colors"
              >
                ADD TO CART
              </button>
            </div>

            {/* Middle Column - Customer Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-700 border-b pb-2">Customer, Item/ Product Cart & Total Amounts Information</h3>
              
              {/* Search Customer */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">Search Customer</label>
                <div className="relative">
                  <input 
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={formData.searchCustomer}
                    onChange={(e) => handleCustomerSearch(e.target.value)}
                    placeholder="Search Customer"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <button className="text-teal-600">+</button>
                  </div>
                </div>
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

              {/* Institution Name & Previous Due */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Institution Name</label>
                  <input 
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={formData.institutionName}
                    onChange={(e) => handleInputChange('institutionName', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Previous Due</label>
                  <input 
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={formData.previousDue}
                    onChange={(e) => handleInputChange('previousDue', e.target.value)}
                  />
                </div>
              </div>

              {/* Contact No & Entry Date */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Contact No</label>
                  <input 
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={formData.contactNo}
                    onChange={(e) => handleInputChange('contactNo', e.target.value)}
                  />
                </div>
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

              {/* Customer Address & Invoice No */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Customer address</label>
                  <input 
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={formData.customerAddress}
                    onChange={(e) => handleInputChange('customerAddress', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Invoice No</label>
                  <input 
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={formData.invoiceNo}
                    onChange={(e) => handleInputChange('invoiceNo', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Additional Information */}
            <div className="space-y-4">
              <div className="text-sm font-semibold text-gray-700"></div>
              
              {/* Sales Items Table */}
              <div className="border rounded">
                <div className="bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-700 grid grid-cols-6 gap-1">
                  <div>SL Item Name</div>
                  <div>QTY</div>
                  <div>Rate (Per)</div>
                  <div>Discount %</div>
                  <div>GST %</div>
                  <div>Total</div>
                  <div>Actions</div>
                </div>
                <div className="min-h-32 max-h-48 overflow-y-auto">
                  {salesCart.length > 0 ? (
                    salesCart.map((item) => (
                      <div key={item.id} className="px-3 py-2 text-xs border-b grid grid-cols-6 gap-1 items-center hover:bg-gray-50">
                        <div className="truncate" title={item.itemName}>{item.itemName}</div>
                        <div>{item.quantity}</div>
                        <div>{item.rate.toFixed(2)}</div>
                        <div>{item.discountPercent}%</div>
                        <div>{item.GSTPercent}%</div>
                        <div>{item.total.toFixed(2)}</div>
                        <div>
                          <button 
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="text-red-500 hover:text-red-700"
                            title="Remove"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-3 py-8 text-center text-gray-500 text-xs">
                      No items in cart
                    </div>
                  )}
                </div>
              </div>

              {/* Item Input Fields */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <input 
                    type="text"
                    placeholder="Item Name"
                    className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={formData.itemName}
                    onChange={(e) => handleInputChange('itemName', e.target.value)}
                  />
                </div>
                <div>
                  <input 
                    type="number"
                    placeholder="Qty"
                    className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange('quantity', e.target.value)}
                  />
                </div>
                <div>
                  <input 
                    type="number"
                    placeholder="Rate"
                    className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={formData.ratePerUnit}
                    onChange={(e) => handleInputChange('ratePerUnit', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <input 
                    type="number"
                    placeholder="Discount %"
                    className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={formData.discountPercentItem}
                    onChange={(e) => handleInputChange('discountPercentItem', e.target.value)}
                  />
                </div>
                <div>
                  <input 
                    type="number"
                    placeholder="GST %"
                    className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={formData.GSTPercentItem}
                    onChange={(e) => handleInputChange('GSTPercentItem', e.target.value)}
                  />
                </div>
              </div>

              {/* Narration */}
              <div>
                <textarea 
                  placeholder="Narration..."
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  rows="3"
                  value={formData.narration}
                  onChange={(e) => handleInputChange('narration', e.target.value)}
                />
              </div>

              {/* Challan Text */}
              <div>
                <textarea 
                  placeholder="Challan Text..."
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  rows="2"
                  value={formData.challanText}
                  onChange={(e) => handleInputChange('challanText', e.target.value)}
                />
              </div>

              {/* Discount and GST Method */}
              <div className="bg-gray-50 p-3 rounded">
                <label className="block text-xs font-semibold text-gray-700 mb-2">Discount and GST Method</label>
                <div className="space-y-1">
                  <label className="flex items-center text-xs">
                    <input 
                      type="radio" 
                      name="discountGSTMethod" 
                      value="total"
                      checked={formData.discountGSTMethod === 'total'}
                      onChange={(e) => handleInputChange('discountGSTMethod', e.target.value)}
                      className="mr-2"
                    />
                    On Total
                  </label>
                  <label className="flex items-center text-xs">
                    <input 
                      type="radio" 
                      name="discountGSTMethod" 
                      value="individual"
                      checked={formData.discountGSTMethod === 'individual'}
                      onChange={(e) => handleInputChange('discountGSTMethod', e.target.value)}
                      className="mr-2"
                    />
                    Individual Item
                  </label>
                </div>
              </div>

              {/* Payment EMI System */}
              <div>
                <label className="flex items-center text-xs">
                  <input 
                    type="checkbox" 
                    checked={formData.isPaymentEMI}
                    onChange={(e) => handleInputChange('isPaymentEMI', e.target.checked)}
                    className="mr-2"
                  />
                  Is Payment EMI System?
                </label>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left Bottom - Employee and Totals */}
            <div className="space-y-4">
              {/* Choose Employee */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">Choose Employee</label>
                <select 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.chooseEmployee}
                  onChange={(e) => handleInputChange('chooseEmployee', e.target.value)}
                >
                  <option value="">Select Employee</option>
                  {employees.map(emp => (
                    <option key={emp} value={emp}>{emp}</option>
                  ))}
                </select>
                <div className="text-xs text-gray-500 mt-1">+</div>
              </div>

              {/* Transport Cost & Grand Total */}
              <div className="grid grid-cols-2 gap-4">
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
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Grand Total (Rs)</label>
                  <input 
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50"
                    value={formData.grandTotal}
                    readOnly
                  />
                </div>
              </div>

              {/* Sub Total */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">Sub Total (Rs)</label>
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50"
                  value={calculateSubTotal()}
                  readOnly
                />
              </div>
            </div>

            {/* Right Bottom - Payment Details */}
            <div className="space-y-4">
              {/* Paid Amount & Due Amount */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Paid Amount</label>
                  <input 
                    type="number"
                    step="0.01"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={formData.paidAmount}
                    onChange={(e) => handleInputChange('paidAmount', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Due Amount</label>
                  <input 
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50"
                    value={formData.dueAmount}
                    readOnly
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-2">
                <label className="flex items-center text-xs">
                  <input 
                    type="checkbox" 
                    checked={formData.smgToMobile}
                    onChange={(e) => handleInputChange('smgToMobile', e.target.checked)}
                    className="mr-2"
                  />
                  Smg to Mobile?
                </label>
                <label className="flex items-center text-xs text-red-600">
                  <input 
                    type="checkbox" 
                    checked={formData.isConditionSale}
                    onChange={(e) => handleInputChange('isConditionSale', e.target.checked)}
                    className="mr-2"
                  />
                  Is Condition Sale?
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-6">
                <button 
                  onClick={handleSaveSales}
                  className="flex-1 bg-teal-600 text-white px-6 py-2 rounded text-sm hover:bg-teal-700 transition-colors"
                >
                  SAVE SALES
                </button>
                <button 
                  onClick={handleReset}
                  className="px-6 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors"
                >
                  RESET
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Entry List */}
      <div className="bg-white rounded-lg shadow-sm border mt-6">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Sales Entry List ({filteredEntries.length} records)</h3>
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
                placeholder="Search by invoice number, customer name, employee, or status..."
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
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Invoice No</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Customer Name</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Entry Date</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Total Amount</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Paid Amount</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Due Amount</th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Employee</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Narration</th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentEntries.length > 0 ? (
                  currentEntries.map((entry) => (
                    <tr key={entry.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2 text-xs font-medium text-teal-600">{entry.invoiceNo}</td>
                      <td className="py-3 px-2 text-xs">{entry.customerName}</td>
                      <td className="py-3 px-2 text-xs">{entry.entryDate}</td>
                      <td className="py-3 px-2 text-xs font-medium">{entry.totalAmount}</td>
                      <td className="py-3 px-2 text-xs text-green-600">{entry.paidAmount}</td>
                      <td className="py-3 px-2 text-xs text-red-600">{entry.dueAmount}</td>
                      <td className="py-3 px-2 text-center">
                        <span className={`px-2 py-1 rounded text-xs ${
                          entry.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : entry.status === 'Partial'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {entry.status}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-xs">{entry.employee}</td>
                      <td className="py-3 px-2 text-xs max-w-32 truncate" title={entry.narration}>{entry.narration}</td>
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
                    <td colSpan="10" className="text-center py-8 text-gray-500">
                      {searchTerm ? 'No matching records found' : 'No sales entries found'}
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