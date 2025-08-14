'use client'

import { useState } from 'react'

export default function DepartmentEntry() {
  const [formData, setFormData] = useState({
    departmentName: ''
  })

  const [departmentList, setDepartmentList] = useState([
    {
      id: 1,
      sl: 1,
      departmentName: 'Sales Dept'
    },
    {
      id: 2,
      sl: 2,
      departmentName: 'Recovery'
    },
    {
      id: 3,
      sl: 3,
      departmentName: 'Commercial'
    }
  ])

  const [showSearch, setShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredDepartments, setFilteredDepartments] = useState(departmentList)
  const [editingDepartment, setEditingDepartment] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    if (!formData.departmentName.trim()) {
      alert('Please enter department name')
      return
    }

    const newDepartment = {
      id: Date.now(),
      sl: departmentList.length + 1,
      departmentName: formData.departmentName
    }

    const updatedList = [...departmentList, newDepartment]
    setDepartmentList(updatedList)
    setFilteredDepartments(updatedList)

    // Reset form
    setFormData({
      departmentName: ''
    })

    alert('Department saved successfully!')
  }

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredDepartments(departmentList)
    } else {
      const filtered = departmentList.filter(department =>
        department.departmentName.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredDepartments(filtered)
    }
    setCurrentPage(1) // Reset to first page after search
  }

  const handleClearSearch = () => {
    setSearchTerm('')
    setFilteredDepartments(departmentList)
    setShowSearch(false)
    setCurrentPage(1)
  }

  const handleDeleteDepartment = (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      const updatedList = departmentList.filter(dept => dept.id !== id)
      setDepartmentList(updatedList)
      setFilteredDepartments(updatedList.filter(dept =>
        searchTerm === '' ||
        dept.departmentName.toLowerCase().includes(searchTerm.toLowerCase())
      ))
      setCurrentPage(1)
    }
  }

  const handleEditDepartment = (department) => {
    setEditingDepartment({...department})
    setShowEditModal(true)
  }

  const handleUpdateDepartment = () => {
    if (!editingDepartment.departmentName.trim()) {
      alert('Please enter department name')
      return
    }

    const updatedList = departmentList.map(dept => 
      dept.id === editingDepartment.id ? editingDepartment : dept
    )
    setDepartmentList(updatedList)
    setFilteredDepartments(updatedList)
    setShowEditModal(false)
    setEditingDepartment(null)
    alert('Department updated successfully!')
  }

  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>Department List Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .company-name { font-size: 24px; font-weight: bold; color: #0f766e; margin-bottom: 10px; }
            .report-title { font-size: 18px; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 12px; }
            th { background-color: #f2f2f2; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="company-name">Fayullah Factory</div>
            <div class="report-title">Department List Report</div>
            <div>Generated on: ${new Date().toLocaleString()}</div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>SL</th>
                <th>Department Name</th>
              </tr>
            </thead>
            <tbody>
              ${filteredDepartments.map(dept => `
                <tr>
                  <td>${dept.sl}</td>
                  <td>${dept.departmentName}</td>
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

  const handleExport = () => {
    const csvContent = [
      ['SL', 'Department Name'],
      ...filteredDepartments.map(dept => [
        dept.sl,
        dept.departmentName
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'department_list.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  // Pagination logic
  const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentDepartments = filteredDepartments.slice(startIndex, endIndex)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const generatePageNumbers = () => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
    return pages
  }

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Department Entry Form */}
      <div className="bg-white rounded-lg shadow-sm border mb-6">
        <div className="bg-teal-600 text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
          <h2 className="font-medium text-lg">Department Entry</h2>
          <div className="text-right">
            <div className="text-sm font-semibold">Fayullah Factory</div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Department Name *</label>
              <input 
                type="text"
                placeholder="Department Name"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.departmentName}
                onChange={(e) => handleInputChange('departmentName', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-start">
            <button 
              onClick={handleSave}
              className="bg-cyan-500 text-white px-6 py-2 rounded text-sm hover:bg-cyan-600 transition-colors flex items-center gap-2"
            >
              💾 SAVE
            </button>
          </div>
        </div>
      </div>

      {/* Department List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Department List</h3>
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
                placeholder="Search by department name..."
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
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">SL</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Department Name</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">actions</th>
                </tr>
              </thead>
              <tbody>
                {currentDepartments.map((department) => (
                  <tr key={department.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 text-sm">{department.sl}</td>
                    <td className="py-3 px-2 text-sm font-medium">{department.departmentName}</td>
                    <td className="py-3 px-2 text-sm">
                      <div className="flex gap-1">
                        <button 
                          onClick={() => handleEditDepartment(department)}
                          className="text-green-600 hover:text-green-800 p-1"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button 
                          onClick={() => handleDeleteDepartment(department.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredDepartments.length)} of {filteredDepartments.length} entries
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded text-sm disabled:bg-gray-100 disabled:text-gray-400 hover:bg-gray-50"
                >
                  Previous
                </button>
                {generatePageNumbers().map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 border rounded text-sm ${
                      currentPage === page 
                        ? 'bg-teal-600 text-white border-teal-600' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded text-sm disabled:bg-gray-100 disabled:text-gray-400 hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Department Modal */}
      {showEditModal && editingDepartment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md m-4">
            <div className="bg-teal-600 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
              <h3 className="text-lg font-medium">Edit Department</h3>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-white hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-xs text-gray-600 mb-1">Department Name *</label>
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={editingDepartment.departmentName}
                  onChange={(e) => setEditingDepartment({...editingDepartment, departmentName: e.target.value})}
                  required
                />
              </div>
              
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded text-sm hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleUpdateDepartment}
                  className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600 transition-colors"
                >
                  Update Department
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}