'use client'

import { useState, useEffect } from 'react'

export default function ItemStockReport() {
  const [filters, setFilters] = useState({
    filterType: 'All Item Stock'
  })

  const [stockData, setStockData] = useState([
    {
      id: 1,
      sl: 1,
      code: 'P00078',
      itemName: 'Rice Premium',
      group: 'Rice',
      category: 'Food',
      serials: '',
      openingStock: 100,
      purchased: 500,
      production: 0,
      sold: 200,
      consume: 0,
      purchaseReturn: 10,
      salesReturn: 5,
      transfer: 0,
      received: 0,
      damage: 2,
      replaceReturn: 0,
      replaceGiven: 0,
      unit: 'kg'
    },
    {
      id: 2,
      sl: 2,
      code: 'P00079',
      itemName: 'Bangla Rice Packet',
      group: 'Rice',
      category: 'Food',
      serials: '',
      openingStock: 50,
      purchased: 1000,
      production: 0,
      sold: 800,
      consume: 0,
      purchaseReturn: 0,
      salesReturn: 0,
      transfer: 0,
      received: 0,
      damage: 0,
      replaceReturn: 0,
      replaceGiven: 0,
      unit: 'kg'
    },
    {
      id: 3,
      sl: 3,
      code: 'P00080',
      itemName: 'Mobile Phone',
      group: 'Electronics',
      category: 'Device',
      serials: '📱',
      openingStock: 0,
      purchased: 4,
      production: 0,
      sold: 2,
      consume: 0,
      purchaseReturn: 0,
      salesReturn: 0,
      transfer: 0,
      received: 0,
      damage: 0,
      replaceReturn: 0,
      replaceGiven: 0,
      unit: 'piece'
    },
    {
      id: 4,
      sl: 4,
      code: 'P00081',
      itemName: 'Atash Rice Premium',
      group: 'Rice',
      category: 'Food',
      serials: '',
      openingStock: 0,
      purchased: 75,
      production: 0,
      sold: 60,
      consume: 0,
      purchaseReturn: 0,
      salesReturn: 1,
      transfer: 0,
      received: 0,
      damage: 0,
      replaceReturn: 0,
      replaceGiven: 0,
      unit: 'kg'
    },
    {
      id: 5,
      sl: 5,
      code: 'P00082',
      itemName: 'Miniket Rice 25kg Bag',
      group: 'Rice',
      category: 'Miniket',
      serials: '',
      openingStock: 30,
      purchased: 100,
      production: 0,
      sold: 85,
      consume: 0,
      purchaseReturn: 0,
      salesReturn: 2,
      transfer: 0,
      received: 0,
      damage: 1,
      replaceReturn: 0,
      replaceGiven: 0,
      unit: 'bag'
    }
  ])

  const [filteredData, setFilteredData] = useState(stockData)
  const [searchTerm, setSearchTerm] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  // Calculate totals
  const calculateTotals = (data) => {
    return data.reduce((totals, item) => ({
      openingStock: totals.openingStock + item.openingStock,
      purchased: totals.purchased + item.purchased,
      production: totals.production + item.production,
      sold: totals.sold + item.sold,
      consume: totals.consume + item.consume,
      purchaseReturn: totals.purchaseReturn + item.purchaseReturn,
      salesReturn: totals.salesReturn + item.salesReturn,
      transfer: totals.transfer + item.transfer,
      received: totals.received + item.received,
      damage: totals.damage + item.damage,
      replaceReturn: totals.replaceReturn + item.replaceReturn,
      replaceGiven: totals.replaceGiven + item.replaceGiven
    }), {
      openingStock: 0,
      purchased: 0,
      production: 0,
      sold: 0,
      consume: 0,
      purchaseReturn: 0,
      salesReturn: 0,
      transfer: 0,
      received: 0,
      damage: 0,
      replaceReturn: 0,
      replaceGiven: 0
    })
  }

  const totals = calculateTotals(filteredData)

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleGetReport = () => {
    // Filter data based on selected filter type
    let filtered = stockData
    
    if (filters.filterType !== 'All Item Stock') {
      filtered = stockData.filter(item => 
        item.group === filters.filterType || item.category === filters.filterType
      )
    }
    
    setFilteredData(filtered)
    setCurrentPage(1)
    
    // If there's a search term active, apply it to the filtered results
    if (searchTerm.trim() !== '') {
      const searchFiltered = filtered.filter(item =>
        item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.group.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredData(searchFiltered)
    }
  }

  // Search functionality
  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      // If no search term, show filtered data based on current filters
      let filtered = stockData
      if (filters.filterType !== 'All Item Stock') {
        filtered = stockData.filter(item => 
          item.group === filters.filterType || item.category === filters.filterType
        )
      }
      setFilteredData(filtered)
    } else {
      // Apply search to current filtered data
      let baseFiltered = stockData
      if (filters.filterType !== 'All Item Stock') {
        baseFiltered = stockData.filter(item => 
          item.group === filters.filterType || item.category === filters.filterType
        )
      }
      const searchFiltered = baseFiltered.filter(item =>
        item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.group.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredData(searchFiltered)
    }
    setCurrentPage(1)
  }

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm('')
    // Reset to current filter state
    let filtered = stockData
    if (filters.filterType !== 'All Item Stock') {
      filtered = stockData.filter(item => 
        item.group === filters.filterType || item.category === filters.filterType
      )
    }
    setFilteredData(filtered)
    setShowSearch(false)
    setCurrentPage(1)
  }

  // Print functionality
  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>Item Stock Report</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 20px;
              font-size: 12px;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .filters {
              margin-bottom: 20px;
              text-align: center;
            }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin-top: 20px; 
              font-size: 10px;
            }
            th, td { 
              border: 1px solid #333; 
              padding: 4px; 
              text-align: center; 
            }
            th { 
              background-color: #f2f2f2; 
              font-weight: bold; 
              font-size: 9px;
            }
            .total-row {
              font-weight: bold;
              background-color: #f9f9f9;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>Item Stock Report</h2>
          </div>
          <div class="filters">
            <p><strong>Filter Type:</strong> ${filters.filterType}</p>
            <p><strong>Generated on:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>SL</th>
                <th>Code</th>
                <th>Item Name</th>
                <th>Group</th>
                <th>Category</th>
                <th>Serials</th>
                <th>Opening Stock</th>
                <th>Purchased</th>
                <th>Production</th>
                <th>Sold</th>
                <th>Consume</th>
                <th>Purchase Return</th>
                <th>Sales Return</th>
                <th>Transfer</th>
                <th>Received</th>
                <th>Damage</th>
                <th>Replace Return</th>
                <th>Replace Given</th>
              </tr>
            </thead>
            <tbody>
              ${filteredData.map(item => `
                <tr>
                  <td>${item.sl}</td>
                  <td>${item.code}</td>
                  <td style="text-align: left;">${item.itemName}</td>
                  <td style="text-align: left;">${item.group}</td>
                  <td style="text-align: left;">${item.category}</td>
                  <td>${item.serials}</td>
                  <td>${item.openingStock} ${item.unit}</td>
                  <td>${item.purchased} ${item.unit}</td>
                  <td>${item.production} ${item.unit}</td>
                  <td>${item.sold} ${item.unit}</td>
                  <td>${item.consume} ${item.unit}</td>
                  <td>${item.purchaseReturn} ${item.unit}</td>
                  <td>${item.salesReturn} ${item.unit}</td>
                  <td>${item.transfer} ${item.unit}</td>
                  <td>${item.received} ${item.unit}</td>
                  <td>${item.damage} ${item.unit}</td>
                  <td>${item.replaceReturn} ${item.unit}</td>
                  <td>${item.replaceGiven} ${item.unit}</td>
                </tr>
              `).join('')}
              <tr class="total-row">
                <td colspan="6"><strong>Grand Total :</strong></td>
                <td><strong>${totals.openingStock}</strong></td>
                <td><strong>${totals.purchased}</strong></td>
                <td><strong>${totals.production}</strong></td>
                <td><strong>${totals.sold}</strong></td>
                <td><strong>${totals.consume}</strong></td>
                <td><strong>${totals.purchaseReturn}</strong></td>
                <td><strong>${totals.salesReturn}</strong></td>
                <td><strong>${totals.transfer}</strong></td>
                <td><strong>${totals.received}</strong></td>
                <td><strong>${totals.damage}</strong></td>
                <td><strong>${totals.replaceReturn}</strong></td>
                <td><strong>${totals.replaceGiven}</strong></td>
              </tr>
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

  // Export functionality
  const handleExport = () => {
    const csvContent = [
      ['SL', 'Code', 'Item Name', 'Group', 'Category', 'Serials', 'Opening Stock', 'Purchased', 'Production', 'Sold', 'Consume', 'Purchase Return', 'Sales Return', 'Transfer', 'Received', 'Damage', 'Replace Return', 'Replace Given'],
      ...filteredData.map(item => [
        item.sl,
        item.code,
        item.itemName,
        item.group,
        item.category,
        item.serials,
        `${item.openingStock} ${item.unit}`,
        `${item.purchased} ${item.unit}`,
        `${item.production} ${item.unit}`,
        `${item.sold} ${item.unit}`,
        `${item.consume} ${item.unit}`,
        `${item.purchaseReturn} ${item.unit}`,
        `${item.salesReturn} ${item.unit}`,
        `${item.transfer} ${item.unit}`,
        `${item.received} ${item.unit}`,
        `${item.damage} ${item.unit}`,
        `${item.replaceReturn} ${item.unit}`,
        `${item.replaceGiven} ${item.unit}`
      ]),
      ['Grand Total:', '', '', '', '', '', totals.openingStock, totals.purchased, totals.production, totals.sold, totals.consume, totals.purchaseReturn, totals.salesReturn, totals.transfer, totals.received, totals.damage, totals.replaceReturn, totals.replaceGiven]
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `item_stock_report_${filters.filterType}_${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentEntries = filteredData.slice(startIndex, endIndex)

  return (
    <div className="p-4">
      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-sm border mb-6">
        <div className="bg-teal-600 text-white px-4 py-3 rounded-t-lg">
          <h2 className="font-medium text-lg">Item Stock Report</h2>
        </div>
        
        <div className="p-6">
          <div className="flex items-end gap-4 mb-4">
            {/* Filter Type */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">Filter Type</label>
              <select 
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 min-w-[150px]"
                value={filters.filterType}
                onChange={(e) => handleFilterChange('filterType', e.target.value)}
              >
                <option value="All Item Stock">All Item Stock</option>
                <option value="Rice">Rice Items</option>
                <option value="Electronics">Electronics</option>
                <option value="Food">Food Items</option>
                <option value="Miniket">Miniket Items</option>
              </select>
            </div>

            {/* Get Report Button */}
            <button 
              onClick={handleGetReport}
              className="bg-cyan-500 text-white px-6 py-2 rounded text-sm hover:bg-cyan-600 transition-colors flex items-center gap-2"
            >
              🔍 GET REPORT
            </button>
          </div>
        </div>
      </div>

      {/* Report Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Item Stock Report</h3>
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
                placeholder="Search by item name, code, group, or category..."
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
            <div className="relative w-full">
            <div className=" overflow-y-auto max-h-80 border border-gray-300 rounded-lg" style={{ maxWidth: '70vw' }}>
                <table className="text-xs" style={{ minWidth: '900px' }}>
                <thead className="sticky top-0 bg-gray-50 z-10">
                    <tr>
                    <th rowSpan="2" className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 min-w-[32px]">SL</th>
                    <th rowSpan="2" className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 min-w-[64px]">Code</th>
                    <th rowSpan="2" className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 min-w-[120px]">Item Name</th>
                    <th rowSpan="2" className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 min-w-[80px]">Group</th>
                    <th rowSpan="2" className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 min-w-[80px]">Category</th>
                    <th rowSpan="2" className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 min-w-[60px]">Serials</th>
                    <th rowSpan="2" className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 min-w-[70px]">Opening</th>
                    <th rowSpan="2" className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 min-w-[80px]">Purchased</th>
                    <th rowSpan="2" className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 min-w-[80px]">Production</th>
                    <th rowSpan="2" className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 min-w-[60px]">Sold</th>
                    <th rowSpan="2" className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 min-w-[70px]">Consume</th>
                    <th colSpan="2" className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50">Return</th>
                    <th colSpan="2" className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50">Transfer</th>
                    <th rowSpan="2" className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 min-w-[60px]">Damage</th>
                    <th colSpan="2" className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50">Replace</th>
                    <th rowSpan="2" className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 min-w-[100px]">Costing Rate/AVG</th>
                    <th rowSpan="2" className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 min-w-[80px]">Current Stock</th>
                    <th rowSpan="2" className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 min-w-[80px]">Stock Value</th>
                    </tr>
                    <tr>
                    <th className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 min-w-[70px]">Purchase</th>
                    <th className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 min-w-[60px]">Sales</th>
                    <th className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 min-w-[50px]">Out</th>
                    <th className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 min-w-[40px]">In</th>
                    <th className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 min-w-[60px]">Return</th>
                    <th className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 min-w-[50px]">Given</th>
                    </tr>
                </thead>
                <tbody>
                    {currentEntries.length > 0 ? (
                    <>
                        {currentEntries.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-1 text-center text-xs">{item.sl}</td>
                            <td className="border border-gray-300 p-1 text-center text-xs">{item.code}</td>
                            <td className="border border-gray-300 p-1 text-left text-xs" title={item.itemName}>{item.itemName}</td>
                            <td className="border border-gray-300 p-1 text-left text-xs" title={item.group}>{item.group}</td>
                            <td className="border border-gray-300 p-1 text-left text-xs" title={item.category}>{item.category}</td>
                            <td className="border border-gray-300 p-1 text-center text-xs">{item.serials}</td>
                            <td className="border border-gray-300 p-1 text-right text-xs">{item.openingStock}</td>
                            <td className="border border-gray-300 p-1 text-right text-xs">{item.purchased}</td>
                            <td className="border border-gray-300 p-1 text-right text-xs">{item.production}</td>
                            <td className="border border-gray-300 p-1 text-right text-xs">{item.sold}</td>
                            <td className="border border-gray-300 p-1 text-right text-xs">{item.consume}</td>
                            <td className="border border-gray-300 p-1 text-right text-xs">{item.purchaseReturn}</td>
                            <td className="border border-gray-300 p-1 text-right text-xs">{item.salesReturn}</td>
                            <td className="border border-gray-300 p-1 text-right text-xs">{item.transfer}</td>
                            <td className="border border-gray-300 p-1 text-right text-xs">{item.received}</td>
                            <td className="border border-gray-300 p-1 text-right text-xs">{item.damage}</td>
                            <td className="border border-gray-300 p-1 text-right text-xs">{item.replaceReturn}</td>
                            <td className="border border-gray-300 p-1 text-right text-xs">{item.replaceGiven}</td>
                            <td className="border border-gray-300 p-1 text-right text-xs">{item.costingRate || '0.00'}</td>
                            <td className="border border-gray-300 p-1 text-right text-xs">{item.currentStock || '0'}</td>
                            <td className="border border-gray-300 p-1 text-right text-xs">{item.stockValue || '0.00'}</td>
                        </tr>
                        ))}
                        {/* Grand Total Row */}
                        <tr className="bg-gray-100 font-semibold sticky bottom-0">
                        <td colSpan="6" className="border border-gray-300 p-1 text-center bg-gray-100 text-xs">Grand Total :</td>
                        <td className="border border-gray-300 p-1 text-right bg-gray-100 text-xs">{totals.openingStock.toFixed(0)}</td>
                        <td className="border border-gray-300 p-1 text-right bg-gray-100 text-xs">{totals.purchased.toFixed(0)}</td>
                        <td className="border border-gray-300 p-1 text-right bg-gray-100 text-xs">{totals.production.toFixed(0)}</td>
                        <td className="border border-gray-300 p-1 text-right bg-gray-100 text-xs">{totals.sold.toFixed(0)}</td>
                        <td className="border border-gray-300 p-1 text-right bg-gray-100 text-xs">{totals.consume.toFixed(0)}</td>
                        <td className="border border-gray-300 p-1 text-right bg-gray-100 text-xs">{totals.purchaseReturn.toFixed(0)}</td>
                        <td className="border border-gray-300 p-1 text-right bg-gray-100 text-xs">{totals.salesReturn.toFixed(0)}</td>
                        <td className="border border-gray-300 p-1 text-right bg-gray-100 text-xs">{totals.transfer.toFixed(0)}</td>
                        <td className="border border-gray-300 p-1 text-right bg-gray-100 text-xs">{totals.received.toFixed(0)}</td>
                        <td className="border border-gray-300 p-1 text-right bg-gray-100 text-xs">{totals.damage.toFixed(0)}</td>
                        <td className="border border-gray-300 p-1 text-right bg-gray-100 text-xs">{totals.replaceReturn.toFixed(0)}</td>
                        <td className="border border-gray-300 p-1 text-right bg-gray-100 text-xs">{totals.replaceGiven.toFixed(0)}</td>
                        <td className="border border-gray-300 p-1 text-right bg-gray-100 text-xs">-</td>
                        <td className="border border-gray-300 p-1 text-right bg-gray-100 text-xs">-</td>
                        <td className="border border-gray-300 p-1 text-right bg-gray-100 text-xs">-</td>
                        </tr>
                    </>
                    ) : (
                    <tr>
                        <td colSpan="21" className="border border-gray-300 p-8 text-center text-gray-500">
                        {searchTerm ? 'No matching records found' : 'No stock data available for the selected filter'}
                        </td>
                    </tr>
                    )}
                </tbody>
                </table>
            </div>
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
                {filteredData.length === 0 
                  ? '0-0 of 0' 
                  : `${startIndex + 1}-${Math.min(endIndex, filteredData.length)} of ${filteredData.length}`
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