'use client'

import { useState, useEffect } from 'react'

export default function POSEntry() {
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

  // Generate voucher number
  const generateVoucherNumber = () => {
    const prefix = 'INV'
    const timestamp = Date.now().toString().slice(-3)
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `${prefix}-${timestamp}${random}`
  }

  const [formData, setFormData] = useState({
    customerName: 'General Customer',
    institutionName: '',
    contactNo: '',
    customerAddress: '',
    voucherNo: generateVoucherNumber(),
    previousDue: '0',
    entryDate: getTodayFormatted(),
    transportCost: '0',
    paidAmount: '0',
    dueAmount: '0',
    grandTotal: '0.00',
    isEMIPayment: false,
    smsToMobile: true,
    narration: '',
    discountMethod: 'Individual Item'
  })

  const [cartItems, setCartItems] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [productDetails, setProductDetails] = useState({
    qty: '1',
    rate: '',
    discount: '0',
    discountPercent: '0',
    GST: '0',
    GSTPercent: '0'
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [showProductSearch, setShowProductSearch] = useState(false)
  const [salesEntries, setSalesEntries] = useState([
    {
      id: 1,
      voucherNo: 'INV-001',
      customer: 'John Doe',
      saleDate: '01/08/2025',
      grandTotal: '₹ 15,500.00 ',
      paidAmount: '₹ 10,000.00 ',
      dueAmount: '₹ 5,500.00 ',
      status: 'Completed',
      createdAt: new Date('2025-08-01').getTime()
    },
    {
      id: 2,
      voucherNo: 'INV-002',
      customer: 'Jane Smith',
      saleDate: '02/08/2025',
      grandTotal: '₹ 8,750.00 ',
      paidAmount: '₹ 8,750.00 ',
      dueAmount: '₹ 0.00 ',
      status: 'Paid',
      createdAt: new Date('2025-08-02').getTime()
    }
  ])
  
  const [filteredSalesEntries, setFilteredSalesEntries] = useState(salesEntries)
  const [salesSearchTerm, setSalesSearchTerm] = useState('')
  const [showSalesSearch, setShowSalesSearch] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  // Sample products data
  const products = [
    { id: 1, name: 'Mouse', price: '500', image: '', category: 'Electronics' },
    { id: 2, name: 'SHAHI ST-10 CHARGER', price: '1200', image: '', category: 'Electronics' },
    { id: 3, name: 'Prohlad', price: '800', image: '', category: 'Electronics' },
    { id: 4, name: 'Nep led', price: '2500', image: '', category: 'Electronics' },
    { id: 5, name: '123123', price: '150', image: '', category: 'Accessories' },
    { id: 6, name: 'sdcs', price: '300', image: '', category: 'Accessories' },
    { id: 7, name: 'Shirt', price: '1500', image: '', category: 'Clothing' },
    { id: 8, name: 'Button', price: '50', image: '', category: 'Accessories' },
    { id: 9, name: 'Fabric', price: '200', image: '', category: 'Materials' },
    { id: 10, name: 'Hand Watch', price: '3500', image: '', category: 'Accessories' },
    { id: 11, name: 'test', price: '100', image: '', category: 'Test' },
    { id: 12, name: 'Test products', price: '750', image: '', category: 'Test' },
    { id: 13, name: 'cc camera', price: '15000', image: '', category: 'Electronics' },
    { id: 14, name: 'Camera cc', price: '12000', image: '', category: 'Electronics' },
    { id: 15, name: 'A', price: '25', image: '', category: 'General' },
    { id: 16, name: 'Anil Semiya', price: '180', image: '', category: 'Food' },
    { id: 17, name: 'PRINTER 4103', price: '25000', image: '', category: 'Electronics' },
    { id: 18, name: 'boAt', price: '2500', image: '', category: 'Electronics' },
    { id: 19, name: 'yamato oxygen', price: '450', image: '', category: 'Medical' },
    { id: 20, name: 'Dollo', price: '120', image: '', category: 'Medicine' },
    { id: 21, name: 'Paracettamol', price: '15', image: '', category: 'Medicine' },
    { id: 22, name: 'AAA', price: '75', image: '', category: 'General' },
    { id: 23, name: 'basin', price: '850', image: '', category: 'Home' },
    { id: 24, name: 'Samsung j2', price: '18000', image: '', category: 'Mobile' },
    { id: 25, name: 'S23 Ultra', price: '125000', image: 'phone.jpg', category: 'Mobile' },
    { id: 26, name: 'তেরা', price: '95', image: '', category: 'General' },
    { id: 27, name: 'm2 cream', price: '220', image: '', category: 'Beauty' },
    { id: 28, name: 'Maida-Teer', price: '65', image: '', category: 'Food' },
    { id: 29, name: 'Atta-Nabil 50 KG+10KG', price: '2800', image: '', category: 'Food' }
  ]

  const customers = [
    'General Customer', 'John Doe', 'Jane Smith', 'Ahmed Khan', 'Maria Rodriguez'
  ]

  const filteredProducts = searchTerm 
    ? products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products

  // Update filtered sales entries when search term changes
  useEffect(() => {
    handleSalesSearch()
  }, [salesEntries])

  const handleInputChange = (field, value) => {
    if (field === 'entryDate' && value.includes('-')) {
      const formattedDate = formatDateForDisplay(value)
      setFormData(prev => ({ ...prev, entryDate: formattedDate }))
    } else {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
  }

  const handleProductDetailChange = (field, value) => {
    setProductDetails(prev => {
      const updated = { ...prev, [field]: value }
      
      if (field === 'discountPercent' && selectedProduct) {
        const rate = parseFloat(updated.rate) || 0
        const discountPercent = parseFloat(value) || 0
        updated.discount = ((rate * discountPercent) / 100).toFixed(2)
      }
      
      if (field === 'discount' && selectedProduct) {
        const rate = parseFloat(updated.rate) || 0
        const discount = parseFloat(value) || 0
        updated.discountPercent = rate > 0 ? ((discount / rate) * 100).toFixed(2) : '0'
      }
      
      if (field === 'GSTPercent' && selectedProduct) {
        const rate = parseFloat(updated.rate) || 0
        const discount = parseFloat(updated.discount) || 0
        const GSTPercent = parseFloat(value) || 0
        const discountedAmount = rate - discount
        updated.GST = ((discountedAmount * GSTPercent) / 100).toFixed(2)
      }
      
      if (field === 'GST' && selectedProduct) {
        const rate = parseFloat(updated.rate) || 0
        const discount = parseFloat(updated.discount) || 0
        const GST = parseFloat(value) || 0
        const discountedAmount = rate - discount
        updated.GSTPercent = discountedAmount > 0 ? ((GST / discountedAmount) * 100).toFixed(2) : '0'
      }
      
      return updated
    })
  }

  const selectProduct = (product) => {
    setSelectedProduct(product)
    setProductDetails({
      qty: '1',
      rate: product.price,
      discount: '0',
      discountPercent: '0',
      GST: '0',
      GSTPercent: '0'
    })
  }

  const calculateItemTotal = () => {
    if (!selectedProduct) return '0.00'
    
    const qty = parseFloat(productDetails.qty) || 0
    const rate = parseFloat(productDetails.rate) || 0
    const discount = parseFloat(productDetails.discount) || 0
    const GST = parseFloat(productDetails.GST) || 0
    
    const subtotal = (qty * rate) - (qty * discount) + (qty * GST)
    return subtotal.toFixed(2)
  }

  const addToCart = () => {
    if (!selectedProduct) {
      alert('Please select a product')
      return
    }

    const newItem = {
      id: Date.now(),
      productId: selectedProduct.id,
      name: selectedProduct.name,
      qty: parseFloat(productDetails.qty) || 0,
      rate: parseFloat(productDetails.rate) || 0,
      discount: parseFloat(productDetails.discount) || 0,
      discountPercent: parseFloat(productDetails.discountPercent) || 0,
      GST: parseFloat(productDetails.GST) || 0,
      GSTPercent: parseFloat(productDetails.GSTPercent) || 0,
      total: parseFloat(calculateItemTotal())
    }

    setCartItems(prev => [...prev, newItem])
    
    // Reset product selection
    setSelectedProduct(null)
    setProductDetails({
      qty: '1',
      rate: '',
      discount: '0',
      discountPercent: '0',
      GST: '0',
      GSTPercent: '0'
    })
  }

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const calculateSubTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.total, 0).toFixed(2)
  }

  const calculateGrandTotal = () => {
    const subTotal = parseFloat(calculateSubTotal())
    const transport = parseFloat(formData.transportCost) || 0
    const previousDue = parseFloat(formData.previousDue) || 0
    return (subTotal + transport + previousDue).toFixed(2)
  }

  const calculateDueAmount = () => {
    const grandTotal = parseFloat(calculateGrandTotal())
    const paidAmount = parseFloat(formData.paidAmount) || 0
    return (grandTotal - paidAmount).toFixed(2)
  }

  // Update totals when cart or form changes
  useEffect(() => {
    const grandTotal = calculateGrandTotal()
    const dueAmount = calculateDueAmount()
    
    setFormData(prev => ({
      ...prev,
      grandTotal,
      dueAmount
    }))
  }, [cartItems, formData.transportCost, formData.previousDue, formData.paidAmount])

  const handleSave = () => {
    if (cartItems.length === 0) {
      alert('Please add at least one item to the cart')
      return
    }

    const newSaleEntry = {
      id: Date.now(),
      voucherNo: formData.voucherNo,
      customer: formData.customerName,
      saleDate: formData.entryDate,
      grandTotal: `₹ ${parseFloat(calculateGrandTotal()).toFixed(2)}`,
      paidAmount: `₹ ${parseFloat(formData.paidAmount).toFixed(2)}`,
      dueAmount: `₹ ${parseFloat(calculateDueAmount()).toFixed(2)}`,
      status: parseFloat(calculateDueAmount()) > 0 ? 'Partial' : 'Paid',
      items: cartItems,
      institutionName: formData.institutionName,
      contactNo: formData.contactNo,
      customerAddress: formData.customerAddress,
      transportCost: formData.transportCost,
      narration: formData.narration,
      isEMIPayment: formData.isEMIPayment,
      smsToMobile: formData.smsToMobile,
      discountMethod: formData.discountMethod,
      createdAt: Date.now()
    }

    setSalesEntries(prev => [...prev, newSaleEntry])
    alert(`Sale saved successfully! Voucher No: ${formData.voucherNo}`)
    
    // Reset form
    setCartItems([])
    setSelectedProduct(null)
    setProductDetails({
      qty: '1',
      rate: '',
      discount: '0',
      discountPercent: '0',
      GST: '0',
      GSTPercent: '0'
    })
    setFormData({
      customerName: 'General Customer',
      institutionName: '',
      contactNo: '',
      customerAddress: '',
      voucherNo: generateVoucherNumber(),
      previousDue: '0',
      entryDate: getTodayFormatted(),
      transportCost: '0',
      paidAmount: '0',
      dueAmount: '0',
      grandTotal: '0.00',
      isEMIPayment: false,
      smsToMobile: true,
      narration: '',
      discountMethod: 'Individual Item'
    })
  }

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the form?')) {
      setCartItems([])
      setSelectedProduct(null)
      setProductDetails({
        qty: '1',
        rate: '',
        discount: '0',
        discountPercent: '0',
        GST: '0',
        GSTPercent: '0'
      })
      setFormData({
        customerName: 'General Customer',
        institutionName: '',
        contactNo: '',
        customerAddress: '',
        voucherNo: generateVoucherNumber(),
        previousDue: '0',
        entryDate: getTodayFormatted(),
        transportCost: '0',
        paidAmount: '0',
        dueAmount: '0',
        grandTotal: '0.00',
        isEMIPayment: false,
        smsToMobile: true,
        narration: '',
        discountMethod: 'Individual Item'
      })
    }
  }

  // Sales search functionality
  const handleSalesSearch = () => {
    if (salesSearchTerm.trim() === '') {
      setFilteredSalesEntries(salesEntries)
    } else {
      const filtered = salesEntries.filter(entry =>
        entry.customer.toLowerCase().includes(salesSearchTerm.toLowerCase()) ||
        entry.voucherNo.toLowerCase().includes(salesSearchTerm.toLowerCase()) ||
        entry.status.toLowerCase().includes(salesSearchTerm.toLowerCase())
      )
      setFilteredSalesEntries(filtered)
    }
    setCurrentPage(1)
  }

  const handleClearSalesSearch = () => {
    setSalesSearchTerm('')
    setFilteredSalesEntries(salesEntries)
    setShowSalesSearch(false)
    setCurrentPage(1)
  }

  const handleDeleteSalesEntry = (id) => {
    if (window.confirm('Are you sure you want to delete this sales entry?')) {
      const updatedEntries = salesEntries.filter(entry => entry.id !== id)
      setSalesEntries(updatedEntries)
    }
  }

  // Export functionality
  const handleExportSales = () => {
    const csvContent = [
      ['Fayullah Factory - POS Sales Entry List'],
      [`Generated on: ${new Date().toLocaleString()}`],
      [`Total Records: ${filteredSalesEntries.length}`],
      [],
      ['Voucher No', 'Customer', 'Sale Date', 'Grand Total', 'Paid Amount', 'Due Amount', 'Status'],
      ...filteredSalesEntries.map(entry => [
        entry.voucherNo,
        entry.customer,
        entry.saleDate,
        entry.grandTotal,
        entry.paidAmount,
        entry.dueAmount,
        entry.status
      ])
    ].map(row => Array.isArray(row) ? row.join(',') : row).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `pos_sales_entries_${formData.entryDate.replace(/\//g, '-')}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  // Print functionality
  const handlePrintSales = () => {
    const printContent = `
      <html>
        <head>
          <title>POS Sales Entry List</title>
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
            <div class="report-title">POS Sales Entry List</div>
            <div>Generated on: ${new Date().toLocaleString()}</div>
            <div>Total Records: ${filteredSalesEntries.length}</div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Voucher No</th>
                <th>Customer</th>
                <th>Sale Date</th>
                <th>Grand Total</th>
                <th>Paid Amount</th>
                <th>Due Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredSalesEntries.map(entry => `
                <tr>
                  <td>${entry.voucherNo}</td>
                  <td>${entry.customer}</td>
                  <td>${entry.saleDate}</td>
                  <td>${entry.grandTotal}</td>
                  <td>${entry.paidAmount}</td>
                  <td>${entry.dueAmount}</td>
                  <td>${entry.status}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="footer">
            POS Sales Report - Fayullah Factory Management System
          </div>
        </body>
      </html>
    `
    const printWindow = window.open('', '_blank')
    printWindow.document.write(printContent)
    printWindow.document.close()
    printWindow.print()
  }

  // Pagination for sales entries
  const totalPages = Math.ceil(filteredSalesEntries.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentSalesEntries = filteredSalesEntries.slice(startIndex, endIndex)

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="bg-teal-600 text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
          <h2 className="font-medium text-lg">POS Entry</h2>
          <div className="text-right">
            <div className="text-sm font-semibold">Fayullah Factory</div>
            <div className="text-xs opacity-90">Sales Management System</div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="text-sm text-red-600 font-medium mb-4">
            Customer & Product cart Information &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; SET MANUAL CART
          </div>

          {/* Customer Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
            {/* Customer Name */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">Customer Name</label>
              <select 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.customerName}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
              >
                {customers.map(customer => (
                  <option key={customer} value={customer}>{customer}</option>
                ))}
              </select>
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
              <label className="block text-xs text-gray-600 mb-1">Contact No</label>
              <input 
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.contactNo}
                onChange={(e) => handleInputChange('contactNo', e.target.value)}
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

            {/* Customer Address */}
            <div className="md:col-span-2">
              <label className="block text-xs text-gray-600 mb-1">Customer Address</label>
              <input 
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.customerAddress}
                onChange={(e) => handleInputChange('customerAddress', e.target.value)}
              />
            </div>

            {/* Voucher No */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">Voucher No</label>
              <div className="flex gap-2">
                <input 
                  type="text"
                  className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.voucherNo}
                  onChange={(e) => handleInputChange('voucherNo', e.target.value)}
                />
                <button 
                  onClick={() => handleInputChange('voucherNo', generateVoucherNumber())}
                  className="bg-gray-200 text-gray-700 px-2 py-2 rounded text-xs hover:bg-gray-300 transition-colors"
                  title="Generate New Voucher"
                >
                  🔄
                </button>
              </div>
            </div>

            {/* Previous Due */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">Previous Due</label>
              <input 
                type="number"
                step="0.01"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.previousDue}
                onChange={(e) => handleInputChange('previousDue', e.target.value)}
              />
            </div>
          </div>

          {/* Product Selection and Cart Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Left Side - Product Selection */}
            <div>
              <div className="mb-4">
                <label className="block text-xs text-gray-600 mb-1">Product or Code/ Scan Barcode</label>
                <div className="flex gap-2">
                  <input 
                    type="text"
                    className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Product Details Form */}
              {selectedProduct && (
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="text-sm font-semibold mb-3">Selected: {selectedProduct.name}</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">QTY</label>
                      <input 
                        type="number"
                        step="1"
                        min="1"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                        value={productDetails.qty}
                        onChange={(e) => handleProductDetailChange('qty', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Rate</label>
                      <input 
                        type="number"
                        step="0.01"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                        value={productDetails.rate}
                        onChange={(e) => handleProductDetailChange('rate', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Discount (Rs)</label>
                      <input 
                        type="number"
                        step="0.01"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                        value={productDetails.discount}
                        onChange={(e) => handleProductDetailChange('discount', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Discount %</label>
                      <input 
                        type="number"
                        step="0.01"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                        value={productDetails.discountPercent}
                        onChange={(e) => handleProductDetailChange('discountPercent', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-600 mb-1">GST (Rs)</label>
                      <input 
                        type="number"
                        step="0.01"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                        value={productDetails.GST}
                        onChange={(e) => handleProductDetailChange('GST', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-600 mb-1">GST %</label>
                      <input 
                        type="number"
                        step="0.01"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                        value={productDetails.GSTPercent}
                        onChange={(e) => handleProductDetailChange('GSTPercent', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium">Total:</span>
                      <span className="text-lg font-semibold text-green-600">₹ {calculateItemTotal()}</span>
                    </div>
                    
                    <button 
                      onClick={addToCart}
                      className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition-colors"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Product Grid */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold mb-3">Customer, Item/ Product Cart & Total Amounts Information</h4>
              
              <div className="grid grid-cols-3 gap-2 max-h-96 overflow-y-auto">
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id}
                    onClick={() => selectProduct(product)}
                    className={`border rounded-lg p-2 cursor-pointer hover:bg-white transition-colors ${
                      selectedProduct?.id === product.id ? 'bg-teal-100 border-teal-500' : 'bg-white'
                    }`}
                  >
                    <div className="aspect-square bg-gray-200 rounded mb-2 flex items-center justify-center">
                      {product.image && product.name === 'S23 Ultra' ? (
                        <div className="w-full h-full bg-gradient-to-br from-blue-900 to-black rounded flex items-center justify-center">
                          <div className="text-white text-xs">📱</div>
                        </div>
                      ) : (
                        <div className="text-gray-400 text-xs text-center">
                          <div>📷</div>
                          <div>No image Uploaded</div>
                        </div>
                      )}
                    </div>
                    <div className="text-xs font-medium text-center truncate" title={product.name}>
                      {product.name}
                    </div>
                    <div className="text-xs text-gray-600 text-center">
                      ₹ {product.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Shopping Cart */}
          {cartItems.length > 0 && (
            <div className="mb-6 bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Shopping Cart ({cartItems.length} items)</h4>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">SL</th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">Item Name</th>
                      <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">QTY</th>
                      <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">Rate (Per)</th>
                      <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">Discount %</th>
                      <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">GST %</th>
                      <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">Total</th>
                      <th className="text-center py-2 px-3 text-xs font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3 text-xs">{index + 1}</td>
                        <td className="py-2 px-3 text-xs">{item.name}</td>
                        <td className="py-2 px-3 text-xs text-center">{item.qty}</td>
                        <td className="py-2 px-3 text-xs text-center">{item.rate.toFixed(2)}</td>
                        <td className="py-2 px-3 text-xs text-center">{item.discountPercent.toFixed(2)}%</td>
                        <td className="py-2 px-3 text-xs text-center">{item.GSTPercent.toFixed(2)}%</td>
                        <td className="py-2 px-3 text-xs text-center font-medium">₹ {item.total.toFixed(2)}</td>
                        <td className="py-2 px-3 text-center">
                          <button 
                            onClick={() => removeFromCart(item.id)}
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
              
              <div className="mt-4 text-right">
                <div className="text-sm font-semibold">Sub Total: ₹ {calculateSubTotal()}</div>
              </div>
            </div>
          )}

          {/* Payment and Totals Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Left Side - Payment Details */}
            <div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Narration...</label>
                  <textarea 
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    rows="4"
                    placeholder="Enter additional notes..."
                    value={formData.narration}
                    onChange={(e) => handleInputChange('narration', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-2">Discount and GST Method</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="discountMethod"
                        value="On Total"
                        checked={formData.discountMethod === 'On Total'}
                        onChange={(e) => handleInputChange('discountMethod', e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm">On Total</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="discountMethod"
                        value="Individual Item"
                        checked={formData.discountMethod === 'Individual Item'}
                        onChange={(e) => handleInputChange('discountMethod', e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm">Individual Item</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="flex items-center">
                    <input 
                      type="checkbox"
                      checked={formData.isEMIPayment}
                      onChange={(e) => handleInputChange('isEMIPayment', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm">Is Payment EMI System?</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Side - Payment Totals */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Transport</label>
                  <input 
                    type="number"
                    step="0.01"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={formData.transportCost}
                    onChange={(e) => handleInputChange('transportCost', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">Grand Total</label>
                  <input 
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-100"
                    value={calculateGrandTotal()}
                    readOnly
                  />
                </div>

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
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-100"
                    value={calculateDueAmount()}
                    readOnly
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center">
                  <input 
                    type="checkbox"
                    checked={formData.smsToMobile}
                    onChange={(e) => handleInputChange('smsToMobile', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm">✓ Smg to Mobile?</span>
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <button 
              onClick={handleSave}
              className="bg-teal-700 text-white px-8 py-3 rounded text-sm hover:bg-teal-800 transition-colors flex items-center gap-2"
              disabled={cartItems.length === 0}
            >
              💾 SAVE SALES
            </button>
            <button 
              onClick={handleReset}
              className="bg-teal-600 text-white px-8 py-3 rounded text-sm hover:bg-teal-700 transition-colors"
            >
              RESET
            </button>
          </div>
        </div>
      </div>

      {/* POS Sales Entry List */}
      <div className="bg-white rounded-lg shadow-sm border mt-6">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">POS Sales Entry List ({filteredSalesEntries.length} records)</h3>
            <div className="flex gap-2">
              <button 
                onClick={() => setShowSalesSearch(!showSalesSearch)}
                className="p-2 border rounded hover:bg-gray-50 transition-colors"
                title="Search"
              >
                🔍
              </button>
              <button 
                onClick={handleExportSales}
                className="p-2 border rounded hover:bg-gray-50 transition-colors"
                title="Export to CSV"
              >
                📤
              </button>
              <button 
                onClick={handlePrintSales}
                className="p-2 border rounded hover:bg-gray-50 transition-colors"
                title="Print"
              >
                🖨️
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {showSalesSearch && (
            <div className="mb-4 flex gap-2">
              <input
                type="text"
                placeholder="Search by customer name, voucher number, or status..."
                value={salesSearchTerm}
                onChange={(e) => setSalesSearchTerm(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
              <button 
                onClick={handleSalesSearch}
                className="bg-teal-600 text-white px-4 py-2 rounded text-sm hover:bg-teal-700 transition-colors"
              >
                Search
              </button>
              <button 
                onClick={handleClearSalesSearch}
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
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Voucher No</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Customer</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Sale Date</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Grand Total</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Paid Amount</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Due Amount</th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-700">Status</th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentSalesEntries.length > 0 ? (
                  currentSalesEntries.map((entry) => (
                    <tr key={entry.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2 text-xs font-medium text-teal-600">{entry.voucherNo}</td>
                      <td className="py-3 px-2 text-xs">{entry.customer}</td>
                      <td className="py-3 px-2 text-xs">{entry.saleDate}</td>
                      <td className="py-3 px-2 text-xs font-medium">{entry.grandTotal}</td>
                      <td className="py-3 px-2 text-xs">{entry.paidAmount}</td>
                      <td className="py-3 px-2 text-xs">{entry.dueAmount}</td>
                      <td className="py-3 px-2 text-center">
                        <span className={`px-2 py-1 rounded text-xs ${
                          entry.status === 'Paid' 
                            ? 'bg-green-100 text-green-800' 
                            : entry.status === 'Partial'
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
                            title="View Details"
                          >
                            👁️
                          </button>
                          <button 
                            className="text-green-600 hover:text-green-800 text-xs p-1"
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button 
                            onClick={() => handleDeleteSalesEntry(entry.id)}
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
                    <td colSpan="8" className="text-center py-8 text-gray-500">
                      {salesSearchTerm ? 'No matching records found' : 'No sales entries found'}
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
                {filteredSalesEntries.length === 0 
                  ? '0-0 of 0' 
                  : `${startIndex + 1}-${Math.min(endIndex, filteredSalesEntries.length)} of ${filteredSalesEntries.length}`
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