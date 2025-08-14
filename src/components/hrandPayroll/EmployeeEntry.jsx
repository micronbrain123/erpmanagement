'use client'

import { useState } from 'react'

export default function EmployeeEntry() {
  const [formData, setFormData] = useState({
    employeeCode: 'EM10',
    employeeName: '',
    salary: '',
    salaryUpdateYear: '2025',
    salaryUpdateMonth: 'August',
    updatedSalary: '',
    bankAccNumber: '',
    bankAccName: '',
    bankBranch: '',
    ifscCode: '',
    zipCode: '',
    presentAddress: '',
    permanentAddress: '',
    contactNo: '',
    emailAddress: '',
    nationalIdNo: '',
    fatherName: '',
    motherName: '',
    joiningDate: '13/08/2025',
    selectDepartment: '',
    selectDesignation: '',
    leaveDays: '0',
    targetAmount: '',
    commissionPercent: '',
    genderType: '',
    maritalType: ''
  })

  const [employeeList, setEmployeeList] = useState([
    {
      id: 1,
      sl: 1,
      code: 'EM9',
      employeeName: 'Tahir',
      salary: '50000',
      updatedSalary: '0',
      contactNo: '9876543210',
      joiningDate: '01/01/2024',
      targetAmount: '0',
      commissionPercent: '0',
      department: 'Sales',
      designation: 'Executive'
    },
    {
      id: 2,
      sl: 2,
      code: 'EM8',
      employeeName: 'John Doe',
      salary: '25000',
      updatedSalary: '0',
      contactNo: '9876543211',
      joiningDate: '15/02/2024',
      targetAmount: '0',
      commissionPercent: '0',
      department: 'HR',
      designation: 'Manager'
    },
    {
      id: 3,
      sl: 3,
      code: 'EM7',
      employeeName: 'Alice Smith',
      salary: '24000',
      updatedSalary: '0',
      contactNo: '9876543212',
      joiningDate: '20/03/2024',
      targetAmount: '52000',
      commissionPercent: '2',
      department: 'Account',
      designation: 'Cashier'
    }
  ])

  const [showSearch, setShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredEmployees, setFilteredEmployees] = useState(employeeList)
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [viewingEmployee, setViewingEmployee] = useState(null)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const generateEmployeeCode = () => {
    const codes = employeeList.map(emp => parseInt(emp.code.replace('EM', '')))
    const maxCode = Math.max(...codes, 9)
    return `EM${maxCode + 1}`
  }

  const handleSave = () => {
    if (!formData.employeeName.trim()) {
      alert('Please enter employee name')
      return
    }

    const newEmployee = {
      id: Date.now(),
      sl: employeeList.length + 1,
      code: formData.employeeCode,
      employeeName: formData.employeeName,
      salary: formData.salary,
      updatedSalary: formData.updatedSalary || '0',
      contactNo: formData.contactNo,
      joiningDate: formData.joiningDate,
      targetAmount: formData.targetAmount || '0',
      commissionPercent: formData.commissionPercent || '0',
      department: formData.selectDepartment,
      designation: formData.selectDesignation,
      bankAccNumber: formData.bankAccNumber,
      bankAccName: formData.bankAccName,
      bankBranch: formData.bankBranch,
      ifscCode: formData.ifscCode,
      zipCode: formData.zipCode,
      presentAddress: formData.presentAddress,
      permanentAddress: formData.permanentAddress,
      emailAddress: formData.emailAddress,
      nationalIdNo: formData.nationalIdNo,
      fatherName: formData.fatherName,
      motherName: formData.motherName,
      leaveDays: formData.leaveDays,
      genderType: formData.genderType,
      maritalType: formData.maritalType,
      salaryUpdateYear: formData.salaryUpdateYear,
      salaryUpdateMonth: formData.salaryUpdateMonth
    }

    const updatedList = [...employeeList, newEmployee]
    setEmployeeList(updatedList)
    setFilteredEmployees(updatedList)

    // Reset form
    setFormData({
      ...formData,
      employeeCode: generateEmployeeCode(),
      employeeName: '',
      salary: '',
      updatedSalary: '',
      bankAccNumber: '',
      bankAccName: '',
      bankBranch: '',
      ifscCode: '',
      zipCode: '',
      presentAddress: '',
      permanentAddress: '',
      contactNo: '',
      emailAddress: '',
      nationalIdNo: '',
      fatherName: '',
      motherName: '',
      selectDepartment: '',
      selectDesignation: '',
      targetAmount: '',
      commissionPercent: '',
      genderType: '',
      maritalType: ''
    })

    alert('Employee saved successfully!')
  }

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredEmployees(employeeList)
    } else {
      const filtered = employeeList.filter(employee =>
        employee.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.code.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredEmployees(filtered)
    }
  }

  const handleClearSearch = () => {
    setSearchTerm('')
    setFilteredEmployees(employeeList)
    setShowSearch(false)
  }

  const handleDeleteEmployee = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      const updatedList = employeeList.filter(emp => emp.id !== id)
      setEmployeeList(updatedList)
      setFilteredEmployees(updatedList.filter(emp =>
        searchTerm === '' ||
        emp.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.code.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    }
  }

  const handleEditEmployee = (employee) => {
    setEditingEmployee({...employee})
    setShowEditModal(true)
  }

  const handleUpdateEmployee = () => {
    if (!editingEmployee.employeeName.trim()) {
      alert('Please enter employee name')
      return
    }

    const updatedList = employeeList.map(emp => 
      emp.id === editingEmployee.id ? editingEmployee : emp
    )
    setEmployeeList(updatedList)
    setFilteredEmployees(updatedList)
    setShowEditModal(false)
    setEditingEmployee(null)
    alert('Employee updated successfully!')
  }

  const handleViewEmployee = (employee) => {
    setViewingEmployee(employee)
    setShowViewModal(true)
  }

  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>Employee List Report</title>
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
            <div class="report-title">Employee List Report</div>
            <div>Generated on: ${new Date().toLocaleString()}</div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>SL</th>
                <th>Code</th>
                <th>Employee Name</th>
                <th>Salary</th>
                <th>Updated Salary</th>
                <th>Contact No</th>
                <th>Joining Date</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Target Amount</th>
                <th>Commission %</th>
              </tr>
            </thead>
            <tbody>
              ${filteredEmployees.map(emp => `
                <tr>
                  <td>${emp.sl}</td>
                  <td>${emp.code}</td>
                  <td>${emp.employeeName}</td>
                  <td>${emp.salary}</td>
                  <td>${emp.updatedSalary}</td>
                  <td>${emp.contactNo}</td>
                  <td>${emp.joiningDate}</td>
                  <td>${emp.department || ''}</td>
                  <td>${emp.designation || ''}</td>
                  <td>${emp.targetAmount}</td>
                  <td>${emp.commissionPercent}</td>
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
      ['SL', 'Code', 'Employee Name', 'Salary', 'Updated Salary', 'Contact No', 'Joining Date', 'Department', 'Designation', 'Target Amount', 'Commission %'],
      ...filteredEmployees.map(emp => [
        emp.sl,
        emp.code,
        emp.employeeName,
        emp.salary,
        emp.updatedSalary,
        emp.contactNo,
        emp.joiningDate,
        emp.department || '',
        emp.designation || '',
        emp.targetAmount,
        emp.commissionPercent
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'employee_list.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Employee Entry Form */}
      <div className="bg-white rounded-lg shadow-sm border mb-6">
        <div className="bg-teal-600 text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
          <h2 className="font-medium text-lg">Employee Entry</h2>
          <div className="text-right">
            <div className="text-sm font-semibold">Fayullah Factory</div>
          </div>
        </div>
        
        <div className="p-6">
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Employee Code</label>
              <input 
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.employeeCode}
                onChange={(e) => handleInputChange('employeeCode', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Employee Name *</label>
              <input 
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.employeeName}
                onChange={(e) => handleInputChange('employeeName', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Salary</label>
              <input 
                type="number"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.salary}
                onChange={(e) => handleInputChange('salary', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Salary Update Year</label>
              <select 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.salaryUpdateYear}
                onChange={(e) => handleInputChange('salaryUpdateYear', e.target.value)}
              >
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Salary Update Month</label>
              <select 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.salaryUpdateMonth}
                onChange={(e) => handleInputChange('salaryUpdateMonth', e.target.value)}
              >
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Updated Salary</label>
              <input 
                type="number"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.updatedSalary}
                onChange={(e) => handleInputChange('updatedSalary', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Bank Account Number</label>
              <input 
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.bankAccNumber}
                onChange={(e) => handleInputChange('bankAccNumber', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Bank Account Name</label>
              <input 
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.bankAccName}
                onChange={(e) => handleInputChange('bankAccName', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Bank Branch</label>
              <input 
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.bankBranch}
                onChange={(e) => handleInputChange('bankBranch', e.target.value)}
              />
            </div>
          </div>

          {/* Third Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">IFSC Code</label>
              <input 
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.ifscCode}
                onChange={(e) => handleInputChange('ifscCode', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Zip Code</label>
              <input 
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Present Address</label>
              <input 
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.presentAddress}
                onChange={(e) => handleInputChange('presentAddress', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Permanent Address</label>
              <input 
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.permanentAddress}
                onChange={(e) => handleInputChange('permanentAddress', e.target.value)}
              />
            </div>
          </div>

          {/* Fourth Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Contact Number</label>
              <input 
                type="tel"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.contactNo}
                onChange={(e) => handleInputChange('contactNo', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Email Address</label>
              <input 
                type="email"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.emailAddress}
                onChange={(e) => handleInputChange('emailAddress', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">National ID Number</label>
              <input 
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.nationalIdNo}
                onChange={(e) => handleInputChange('nationalIdNo', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Father's Name</label>
              <input 
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.fatherName}
                onChange={(e) => handleInputChange('fatherName', e.target.value)}
              />
            </div>
          </div>

          {/* Fifth Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Mother's Name</label>
              <input 
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.motherName}
                onChange={(e) => handleInputChange('motherName', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Joining Date</label>
              <div className="relative">
                <input 
                  type="date"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.joiningDate}
                  onChange={(e) => handleInputChange('joiningDate', e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Select Department</label>
              <select 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.selectDepartment}
                onChange={(e) => handleInputChange('selectDepartment', e.target.value)}
              >
                <option value="">Select Department</option>
                <option value="Account">Account</option>
                <option value="Logistics">Logistics</option>
                <option value="HR">HR</option>
                <option value="Sales">Sales</option>
                <option value="Production">Production</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Select Designation</label>
              <select 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.selectDesignation}
                onChange={(e) => handleInputChange('selectDesignation', e.target.value)}
              >
                <option value="">Select Designation</option>
                <option value="Cashier">Cashier</option>
                <option value="Junior Accountant">Junior Accountant</option>
                <option value="Senior Accountant">Senior Accountant</option>
                <option value="Manager">Manager</option>
                <option value="Executive">Executive</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Assistant">Assistant</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="block text-xs text-gray-600 mb-1">Gender Type</label>
              <div className="flex flex-wrap gap-2 mt-1">
                <label className="flex items-center text-sm">
                  <input
                    type="radio"
                    name="genderType"
                    value="Male"
                    checked={formData.genderType === 'Male'}
                    onChange={(e) => handleInputChange('genderType', e.target.value)}
                    className="mr-2"
                  />
                  Male
                </label>
                <label className="flex items-center text-sm">
                  <input
                    type="radio"
                    name="genderType"
                    value="Female"
                    checked={formData.genderType === 'Female'}
                    onChange={(e) => handleInputChange('genderType', e.target.value)}
                    className="mr-2"
                  />
                  Female
                </label>
                <label className="flex items-center text-sm">
                  <input
                    type="radio"
                    name="genderType"
                    value="Others"
                    checked={formData.genderType === 'Others'}
                    onChange={(e) => handleInputChange('genderType', e.target.value)}
                    className="mr-2"
                  />
                  Others
                </label>
              </div>
            </div>
          </div>

          {/* Sixth Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Leave Days</label>
              <input 
                type="number"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.leaveDays}
                onChange={(e) => handleInputChange('leaveDays', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Target Amount</label>
              <input 
                type="number"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.targetAmount}
                onChange={(e) => handleInputChange('targetAmount', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Commission %</label>
              <input 
                type="number"
                step="0.01"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.commissionPercent}
                onChange={(e) => handleInputChange('commissionPercent', e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-xs text-gray-600 mb-1">Marital Status</label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center text-sm">
                  <input
                    type="radio"
                    name="maritalType"
                    value="Single"
                    checked={formData.maritalType === 'Single'}
                    onChange={(e) => handleInputChange('maritalType', e.target.value)}
                    className="mr-2"
                  />
                  Single
                </label>
                <label className="flex items-center text-sm">
                  <input
                    type="radio"
                    name="maritalType"
                    value="Married"
                    checked={formData.maritalType === 'Married'}
                    onChange={(e) => handleInputChange('maritalType', e.target.value)}
                    className="mr-2"
                  />
                  Married
                </label>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button 
              onClick={handleSave}
              className="bg-cyan-500 text-white px-6 py-2 rounded text-sm hover:bg-cyan-600 transition-colors flex items-center gap-2"
            >
              💾 SAVE
            </button>
          </div>
        </div>
      </div>

      {/* Employee List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Employee List</h3>
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
                placeholder="Search by employee name or code..."
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
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Code</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Employee Name</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Salary</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Updated Salary</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Contact No</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Joining Date</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Department</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Designation</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Target Amount</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Commission %</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 text-sm">{employee.sl}</td>
                    <td className="py-3 px-2 text-sm font-medium text-teal-600">{employee.code}</td>
                    <td className="py-3 px-2 text-sm">{employee.employeeName}</td>
                    <td className="py-3 px-2 text-sm">₹{employee.salary}</td>
                    <td className="py-3 px-2 text-sm">{employee.updatedSalary === '0' ? '-' : `₹${employee.updatedSalary}`}</td>
                    <td className="py-3 px-2 text-sm">{employee.contactNo || '-'}</td>
                    <td className="py-3 px-2 text-sm">{employee.joiningDate}</td>
                    <td className="py-3 px-2 text-sm">{employee.department || '-'}</td>
                    <td className="py-3 px-2 text-sm">{employee.designation || '-'}</td>
                    <td className="py-3 px-2 text-sm">{employee.targetAmount === '0' ? '-' : `₹${employee.targetAmount}`}</td>
                    <td className="py-3 px-2 text-sm">{employee.commissionPercent === '0' ? '-' : `${employee.commissionPercent}%`}</td>
                    <td className="py-3 px-2 text-sm">
                      <div className="flex gap-1">
                        <button 
                          onClick={() => handleViewEmployee(employee)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="View Details"
                        >
                          👁️
                        </button>
                        <button 
                          onClick={() => handleEditEmployee(employee)}
                          className="text-green-600 hover:text-green-800 p-1"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button 
                          onClick={() => handleDeleteEmployee(employee.id)}
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
        </div>
      </div>

      {/* Edit Employee Modal */}
      {showEditModal && editingEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
            <div className="bg-teal-600 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
              <h3 className="text-lg font-medium">Edit Employee</h3>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-white hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Employee Code</label>
                  <input 
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={editingEmployee.code}
                    onChange={(e) => setEditingEmployee({...editingEmployee, code: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Employee Name *</label>
                  <input 
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={editingEmployee.employeeName}
                    onChange={(e) => setEditingEmployee({...editingEmployee, employeeName: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Salary</label>
                  <input 
                    type="number"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={editingEmployee.salary}
                    onChange={(e) => setEditingEmployee({...editingEmployee, salary: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Contact Number</label>
                  <input 
                    type="tel"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={editingEmployee.contactNo}
                    onChange={(e) => setEditingEmployee({...editingEmployee, contactNo: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Joining Date</label>
                  <input 
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={editingEmployee.joiningDate}
                    onChange={(e) => setEditingEmployee({...editingEmployee, joiningDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Department</label>
                  <select 
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={editingEmployee.department || ''}
                    onChange={(e) => setEditingEmployee({...editingEmployee, department: e.target.value})}
                  >
                    <option value="">Select Department</option>
                    <option value="Account">Account</option>
                    <option value="Logistics">Logistics</option>
                    <option value="HR">HR</option>
                    <option value="Sales">Sales</option>
                    <option value="Production">Production</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Designation</label>
                  <select 
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={editingEmployee.designation || ''}
                    onChange={(e) => setEditingEmployee({...editingEmployee, designation: e.target.value})}
                  >
                    <option value="">Select Designation</option>
                    <option value="Cashier">Cashier</option>
                    <option value="Junior Accountant">Junior Accountant</option>
                    <option value="Senior Accountant">Senior Accountant</option>
                    <option value="Manager">Manager</option>
                    <option value="Executive">Executive</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Assistant">Assistant</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Target Amount</label>
                  <input 
                    type="number"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={editingEmployee.targetAmount}
                    onChange={(e) => setEditingEmployee({...editingEmployee, targetAmount: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Commission %</label>
                  <input 
                    type="number"
                    step="0.01"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={editingEmployee.commissionPercent}
                    onChange={(e) => setEditingEmployee({...editingEmployee, commissionPercent: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded text-sm hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleUpdateEmployee}
                  className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600 transition-colors"
                >
                  Update Employee
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Employee Modal */}
      {showViewModal && viewingEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto m-4">
            <div className="bg-teal-600 text-white px-6 py-4 rounded-t-lg flex justify-between items-center">
              <h3 className="text-lg font-medium">Employee Details</h3>
              <button 
                onClick={() => setShowViewModal(false)}
                className="text-white hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">Basic Information</h4>
                  <div className="space-y-2">
                    <div><span className="font-medium text-gray-600">Employee Code:</span> <span className="text-teal-600 font-medium">{viewingEmployee.code}</span></div>
                    <div><span className="font-medium text-gray-600">Name:</span> {viewingEmployee.employeeName}</div>
                    <div><span className="font-medium text-gray-600">Contact:</span> {viewingEmployee.contactNo || 'N/A'}</div>
                    <div><span className="font-medium text-gray-600">Email:</span> {viewingEmployee.emailAddress || 'N/A'}</div>
                    <div><span className="font-medium text-gray-600">Joining Date:</span> {viewingEmployee.joiningDate}</div>
                    <div><span className="font-medium text-gray-600">Gender:</span> {viewingEmployee.genderType || 'N/A'}</div>
                    <div><span className="font-medium text-gray-600">Marital Status:</span> {viewingEmployee.maritalType || 'N/A'}</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">Work Information</h4>
                  <div className="space-y-2">
                    <div><span className="font-medium text-gray-600">Department:</span> {viewingEmployee.department || 'N/A'}</div>
                    <div><span className="font-medium text-gray-600">Designation:</span> {viewingEmployee.designation || 'N/A'}</div>
                    <div><span className="font-medium text-gray-600">Salary:</span> ₹{viewingEmployee.salary}</div>
                    <div><span className="font-medium text-gray-600">Updated Salary:</span> {viewingEmployee.updatedSalary === '0' ? 'N/A' : `₹${viewingEmployee.updatedSalary}`}</div>
                    <div><span className="font-medium text-gray-600">Target Amount:</span> {viewingEmployee.targetAmount === '0' ? 'N/A' : `₹${viewingEmployee.targetAmount}`}</div>
                    <div><span className="font-medium text-gray-600">Commission:</span> {viewingEmployee.commissionPercent === '0' ? 'N/A' : `${viewingEmployee.commissionPercent}%`}</div>
                    <div><span className="font-medium text-gray-600">Leave Days:</span> {viewingEmployee.leaveDays || '0'}</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">Personal Information</h4>
                  <div className="space-y-2">
                    <div><span className="font-medium text-gray-600">Father's Name:</span> {viewingEmployee.fatherName || 'N/A'}</div>
                    <div><span className="font-medium text-gray-600">Mother's Name:</span> {viewingEmployee.motherName || 'N/A'}</div>
                    <div><span className="font-medium text-gray-600">National ID:</span> {viewingEmployee.nationalIdNo || 'N/A'}</div>
                    <div><span className="font-medium text-gray-600">Present Address:</span> {viewingEmployee.presentAddress || 'N/A'}</div>
                    <div><span className="font-medium text-gray-600">Permanent Address:</span> {viewingEmployee.permanentAddress || 'N/A'}</div>
                    <div><span className="font-medium text-gray-600">Zip Code:</span> {viewingEmployee.zipCode || 'N/A'}</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">Bank Information</h4>
                  <div className="space-y-2">
                    <div><span className="font-medium text-gray-600">Account Number:</span> {viewingEmployee.bankAccNumber || 'N/A'}</div>
                    <div><span className="font-medium text-gray-600">Account Name:</span> {viewingEmployee.bankAccName || 'N/A'}</div>
                    <div><span className="font-medium text-gray-600">Bank Branch:</span> {viewingEmployee.bankBranch || 'N/A'}</div>
                    <div><span className="font-medium text-gray-600">IFSC Code:</span> {viewingEmployee.ifscCode || 'N/A'}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <button 
                  onClick={() => setShowViewModal(false)}
                  className="bg-teal-600 text-white px-6 py-2 rounded text-sm hover:bg-teal-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}