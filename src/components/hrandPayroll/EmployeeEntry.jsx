'use client'

import { useState } from 'react'

export default function EmployeeEntry() {
  const [formData, setFormData] = useState({
    employeeType: '',
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
    alternateMobile: '',
    emailAddress: '',
    adhaarNumber: '',
    bloodGroup: '',
    fatherName: '',
    motherName: '',
    joiningDate: '2025-08-13',
    selectDepartment: '',
    selectDesignation: '',
    leaveDays: '0',
    targetAmount: '',
    commissionPercent: '',
    genderType: '',
    maritalType: '',
    pf: '',
    esi: '',
    wc: '',
    paymentType: '',
    employeePicture: null,
    bankDocument: null,
    adhaarCardImage: null
  })

  const [employeeList, setEmployeeList] = useState([
    {
      id: 1,
      sl: 1,
      employeeType: 'Permanent Employee',
      employeeName: 'Tahir',
      salary: '50000',
      updatedSalary: '0',
      contactNo: '9876543210',
      joiningDate: '01/01/2024',
      targetAmount: '0',
      commissionPercent: '0',
      department: 'Sales',
      designation: 'Executive',
      adhaarNumber: '1234-5678-9012',
      bloodGroup: 'O+',
      alternateMobile: '9876543213',
      pf: '5000',
      esi: '750',
      wc: '500',
      paymentType: 'Monthly'
    },
    {
      id: 2,
      sl: 2,
      employeeType: 'Sub Contract',
      employeeName: 'John Doe',
      salary: '25000',
      updatedSalary: '0',
      contactNo: '9876543211',
      joiningDate: '15/02/2024',
      targetAmount: '0',
      commissionPercent: '0',
      department: 'HR',
      designation: 'Manager',
      adhaarNumber: '2345-6789-0123',
      bloodGroup: 'A+',
      alternateMobile: '9876543214',
      pf: '2500',
      esi: '375',
      wc: '250',
      paymentType: 'Weekly'
    },
    {
      id: 3,
      sl: 3,
      employeeType: 'Permanent Employee',
      employeeName: 'Alice Smith',
      salary: '24000',
      updatedSalary: '0',
      contactNo: '9876543212',
      joiningDate: '20/03/2024',
      targetAmount: '52000',
      commissionPercent: '2',
      department: 'Account',
      designation: 'Cashier',
      adhaarNumber: '3456-7890-1234',
      bloodGroup: 'B+',
      alternateMobile: '9876543215',
      pf: '2400',
      esi: '360',
      wc: '240',
      paymentType: 'Daily'
    }
  ])

  const [showSearch, setShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredEmployees, setFilteredEmployees] = useState(employeeList)
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [viewingEmployee, setViewingEmployee] = useState(null)

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFileUpload = (field, file) => {
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          [field]: e.target.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const generateEmployeeId = () => {
    return employeeList.length + 1
  }

  const handleSave = () => {
    if (!formData.employeeName.trim()) {
      alert('Please enter employee name')
      return
    }

    const newEmployee = {
      id: Date.now(),
      sl: employeeList.length + 1,
      employeeType: formData.employeeType,
      employeeName: formData.employeeName,
      salary: formData.salary,
      updatedSalary: formData.updatedSalary || '0',
      contactNo: formData.contactNo,
      alternateMobile: formData.alternateMobile,
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
      adhaarNumber: formData.adhaarNumber,
      bloodGroup: formData.bloodGroup,
      fatherName: formData.fatherName,
      motherName: formData.motherName,
      leaveDays: formData.leaveDays,
      genderType: formData.genderType,
      maritalType: formData.maritalType,
      salaryUpdateYear: formData.salaryUpdateYear,
      salaryUpdateMonth: formData.salaryUpdateMonth,
      pf: formData.pf,
      esi: formData.esi,
      wc: formData.wc,
      paymentType: formData.paymentType,
      employeePicture: formData.employeePicture,
      bankDocument: formData.bankDocument,
      adhaarCardImage: formData.adhaarCardImage
    }

    const updatedList = [...employeeList, newEmployee]
    setEmployeeList(updatedList)
    setFilteredEmployees(updatedList)

    // Reset form
    setFormData({
      employeeType: '',
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
      alternateMobile: '',
      emailAddress: '',
      adhaarNumber: '',
      bloodGroup: '',
      fatherName: '',
      motherName: '',
      joiningDate: '2025-08-13',
      selectDepartment: '',
      selectDesignation: '',
      leaveDays: '0',
      targetAmount: '',
      commissionPercent: '',
      genderType: '',
      maritalType: '',
      pf: '',
      esi: '',
      wc: '',
      paymentType: '',
      employeePicture: null,
      bankDocument: null,
      adhaarCardImage: null
    })

    alert('Employee saved successfully!')
  }

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredEmployees(employeeList)
    } else {
      const filtered = employeeList.filter(employee =>
        employee.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.employeeType.toLowerCase().includes(searchTerm.toLowerCase())
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
        emp.employeeType.toLowerCase().includes(searchTerm.toLowerCase())
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
                <th>Type</th>
                <th>Employee Name</th>
                <th>Salary</th>
                <th>Contact No</th>
                <th>Joining Date</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Blood Group</th>
                <th>Adhaar Number</th>
              </tr>
            </thead>
            <tbody>
              ${filteredEmployees.map(emp => `
                <tr>
                  <td>${emp.sl}</td>
                  <td>${emp.employeeType || ''}</td>
                  <td>${emp.employeeName}</td>
                  <td>${emp.salary}</td>
                  <td>${emp.contactNo}</td>
                  <td>${emp.joiningDate}</td>
                  <td>${emp.department || ''}</td>
                  <td>${emp.designation || ''}</td>
                  <td>${emp.bloodGroup || ''}</td>
                  <td>${emp.adhaarNumber || ''}</td>
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
      ['SL', 'Type', 'Employee Name', 'Salary', 'Contact No', 'Alternate Mobile', 'Joining Date', 'Department', 'Designation', 'Blood Group', 'Adhaar Number'],
      ...filteredEmployees.map(emp => [
        emp.sl,
        emp.employeeType || '',
        emp.employeeName,
        emp.salary,
        emp.contactNo,
        emp.alternateMobile || '',
        emp.joiningDate,
        emp.department || '',
        emp.designation || '',
        emp.bloodGroup || '',
        emp.adhaarNumber || ''
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

  const handlePrintEmployee = () => {
    if (!viewingEmployee) return
    
    const printContent = `
      <html>
        <head>
          <title>Employee Details - ${viewingEmployee.employeeName}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #0f766e; padding-bottom: 20px; }
            .company-name { font-size: 28px; font-weight: bold; color: #0f766e; margin-bottom: 10px; }
            .employee-name { font-size: 20px; margin-bottom: 10px; }
            .section { margin-bottom: 25px; }
            .section-title { font-size: 18px; font-weight: bold; color: #0f766e; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 15px; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
            .info-item { margin-bottom: 8px; }
            .label { font-weight: bold; color: #555; }
            .value { margin-left: 10px; }
            .employee-photo { text-align: center; margin-bottom: 20px; }
            .employee-photo img { max-width: 150px; max-height: 200px; border: 2px solid #ddd; border-radius: 8px; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="company-name">Fayullah Factory</div>
            <div class="employee-name">Employee Details Report</div>
            <div>Generated on: ${new Date().toLocaleString()}</div>
          </div>
          
          ${viewingEmployee.employeePicture ? `
            <div class="employee-photo">
              <img src="${viewingEmployee.employeePicture}" alt="Employee Photo" />
            </div>
          ` : ''}
          
          <div class="section">
            <div class="section-title">Basic Information</div>
            <div class="info-grid">
              <div class="info-item"><span class="label">Employee Type:</span><span class="value">${viewingEmployee.employeeType || 'N/A'}</span></div>
              <div class="info-item"><span class="label">Name:</span><span class="value">${viewingEmployee.employeeName}</span></div>
              <div class="info-item"><span class="label">Primary Contact:</span><span class="value">${viewingEmployee.contactNo || 'N/A'}</span></div>
              <div class="info-item"><span class="label">Alternate Mobile:</span><span class="value">${viewingEmployee.alternateMobile || 'N/A'}</span></div>
              <div class="info-item"><span class="label">Email:</span><span class="value">${viewingEmployee.emailAddress || 'N/A'}</span></div>
              <div class="info-item"><span class="label">Joining Date:</span><span class="value">${viewingEmployee.joiningDate}</span></div>
              <div class="info-item"><span class="label">Gender:</span><span class="value">${viewingEmployee.genderType || 'N/A'}</span></div>
              <div class="info-item"><span class="label">Blood Group:</span><span class="value">${viewingEmployee.bloodGroup || 'N/A'}</span></div>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Work Information</div>
            <div class="info-grid">
              <div class="info-item"><span class="label">Department:</span><span class="value">${viewingEmployee.department || 'N/A'}</span></div>
              <div class="info-item"><span class="label">Designation:</span><span class="value">${viewingEmployee.designation || 'N/A'}</span></div>
              <div class="info-item"><span class="label">Salary:</span><span class="value">₹${viewingEmployee.salary}</span></div>
              <div class="info-item"><span class="label">PF:</span><span class="value">₹${viewingEmployee.pf || '0'}</span></div>
              <div class="info-item"><span class="label">ESI:</span><span class="value">₹${viewingEmployee.esi || '0'}</span></div>
              <div class="info-item"><span class="label">WC:</span><span class="value">₹${viewingEmployee.wc || '0'}</span></div>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Personal Information</div>
            <div class="info-grid">
              <div class="info-item"><span class="label">Father's Name:</span><span class="value">${viewingEmployee.fatherName || 'N/A'}</span></div>
              <div class="info-item"><span class="label">Mother's Name:</span><span class="value">${viewingEmployee.motherName || 'N/A'}</span></div>
              <div class="info-item"><span class="label">Adhaar Number:</span><span class="value">${viewingEmployee.adhaarNumber || 'N/A'}</span></div>
              <div class="info-item"><span class="label">Marital Status:</span><span class="value">${viewingEmployee.maritalType || 'N/A'}</span></div>
              <div class="info-item"><span class="label">Present Address:</span><span class="value">${viewingEmployee.presentAddress || 'N/A'}</span></div>
              <div class="info-item"><span class="label">Permanent Address:</span><span class="value">${viewingEmployee.permanentAddress || 'N/A'}</span></div>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Bank Information</div>
            <div class="info-grid">
              <div class="info-item"><span class="label">Account Number:</span><span class="value">${viewingEmployee.bankAccNumber || 'N/A'}</span></div>
              <div class="info-item"><span class="label">Account Name:</span><span class="value">${viewingEmployee.bankAccName || 'N/A'}</span></div>
              <div class="info-item"><span class="label">Bank Branch:</span><span class="value">${viewingEmployee.bankBranch || 'N/A'}</span></div>
              <div class="info-item"><span class="label">IFSC Code:</span><span class="value">${viewingEmployee.ifscCode || 'N/A'}</span></div>
            </div>
          </div>
        </body>
      </html>
    `
    const printWindow = window.open('', '_blank')
    printWindow.document.write(printContent)
    printWindow.document.close()
    printWindow.print()
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
          {/* Personal Details Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 border-b-2 border-teal-200 pb-2 mb-4">Personal Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Employee Type *</label>
                <select 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.employeeType}
                  onChange={(e) => handleInputChange('employeeType', e.target.value)}
                >
                  <option value="">Select Employee Type</option>
                  <option value="Permanent Employee">Permanent Employee</option>
                  <option value="Sub Contract">Sub Contract</option>
                </select>
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
                <label className="block text-xs text-gray-600 mb-1">Contact Number</label>
                <input 
                  type="tel"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.contactNo}
                  onChange={(e) => handleInputChange('contactNo', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Alternate Mobile Number</label>
                <input 
                  type="tel"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.alternateMobile}
                  onChange={(e) => handleInputChange('alternateMobile', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
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
                <label className="block text-xs text-gray-600 mb-1">Adhaar Number</label>
                <input 
                  type="text"
                  placeholder="XXXX-XXXX-XXXX"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.adhaarNumber}
                  onChange={(e) => handleInputChange('adhaarNumber', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Blood Group</label>
                <select 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.bloodGroup}
                  onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Payment Type</label>
                <select 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.paymentType}
                  onChange={(e) => handleInputChange('paymentType', e.target.value)}
                >
                  <option value="">Select Payment Type</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
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
                <input 
                  type="date"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.joiningDate}
                  onChange={(e) => handleInputChange('joiningDate', e.target.value)}
                />
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
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

            {/* Photo and Document Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Employee Picture</label>
                <input 
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload('employeePicture', e.target.files[0])}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
                {formData.employeePicture && (
                  <div className="mt-2">
                    <img 
                      src={formData.employeePicture} 
                      alt="Employee Preview" 
                      className="w-20 h-24 object-cover border rounded"
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Adhaar Card Picture</label>
                <input 
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload('adhaarCardImage', e.target.files[0])}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
                {formData.adhaarCardImage && (
                  <div className="mt-2">
                    <img 
                      src={formData.adhaarCardImage} 
                      alt="Adhaar Card Preview" 
                      className="w-20 h-12 object-cover border rounded"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Work Details Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 border-b-2 border-teal-200 pb-2 mb-4">Work Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-4">
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
                <label className="block text-xs text-gray-600 mb-1">Leave Days</label>
                <input 
                  type="number"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.leaveDays}
                  onChange={(e) => handleInputChange('leaveDays', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
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
            </div>

            {/* PF, ESI, WC Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">PF (Provident Fund)</label>
                <input 
                  type="number"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.pf}
                  onChange={(e) => handleInputChange('pf', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">ESI (Employee State Insurance)</label>
                <input 
                  type="number"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.esi}
                  onChange={(e) => handleInputChange('esi', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">WC (Workmen's Compensation)</label>
                <input 
                  type="number"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.wc}
                  onChange={(e) => handleInputChange('wc', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Bank Details Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 border-b-2 border-teal-200 pb-2 mb-4">Bank Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
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
              <div>
                <label className="block text-xs text-gray-600 mb-1">IFSC Code</label>
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.ifscCode}
                  onChange={(e) => handleInputChange('ifscCode', e.target.value)}
                />
              </div>
            </div>

            {/* Bank Document Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Bank Passbook / Cancelled Check</label>
                <input 
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileUpload('bankDocument', e.target.files[0])}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
                {formData.bankDocument && (
                  <div className="mt-2">
                    {formData.bankDocument.startsWith('data:image/') ? (
                      <img 
                        src={formData.bankDocument} 
                        alt="Bank Document Preview" 
                        className="w-20 h-16 object-cover border rounded"
                      />
                    ) : (
                      <span className="text-sm text-green-600">✓ Document uploaded</span>
                    )}
                  </div>
                )}
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
                placeholder="Search by employee name or type..."
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
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Type</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Employee Name</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Salary</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Contact No</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Joining Date</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Department</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Designation</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Blood Group</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Payment Type</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 text-sm">{employee.sl}</td>
                    <td className="py-3 px-2 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        employee.employeeType === 'Permanent Employee' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {employee.employeeType}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-sm font-medium text-teal-600">{employee.employeeName}</td>
                    <td className="py-3 px-2 text-sm">₹{employee.salary}</td>
                    <td className="py-3 px-2 text-sm">{employee.contactNo || '-'}</td>
                    <td className="py-3 px-2 text-sm">{employee.joiningDate}</td>
                    <td className="py-3 px-2 text-sm">{employee.department || '-'}</td>
                    <td className="py-3 px-2 text-sm">{employee.designation || '-'}</td>
                    <td className="py-3 px-2 text-sm">{employee.bloodGroup || '-'}</td>
                    <td className="py-3 px-2 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        employee.paymentType === 'Daily' 
                          ? 'bg-orange-100 text-orange-800' 
                          : employee.paymentType === 'Weekly'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-indigo-100 text-indigo-800'
                      }`}>
                        {employee.paymentType || 'N/A'}
                      </span>
                    </td>
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
                  <label className="block text-xs text-gray-600 mb-1">Employee Type</label>
                  <select 
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={editingEmployee.employeeType || ''}
                    onChange={(e) => setEditingEmployee({...editingEmployee, employeeType: e.target.value})}
                  >
                    <option value="">Select Employee Type</option>
                    <option value="Permanent Employee">Permanent Employee</option>
                    <option value="Sub Contract">Sub Contract</option>
                  </select>
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
                  <label className="block text-xs text-gray-600 mb-1">Blood Group</label>
                  <select 
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={editingEmployee.bloodGroup || ''}
                    onChange={(e) => setEditingEmployee({...editingEmployee, bloodGroup: e.target.value})}
                  >
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Adhaar Number</label>
                  <input 
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={editingEmployee.adhaarNumber || ''}
                    onChange={(e) => setEditingEmployee({...editingEmployee, adhaarNumber: e.target.value})}
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
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
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
              {/* Employee Photo */}
              {viewingEmployee.employeePicture && (
                <div className="text-center mb-6">
                  <img 
                    src={viewingEmployee.employeePicture} 
                    alt="Employee Photo" 
                    className="w-32 h-40 object-cover border-2 border-teal-200 rounded-lg mx-auto"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">Basic Information</h4>
                  <div className="space-y-2">
                    <div><span className="font-medium text-gray-600">Employee Type:</span> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                        viewingEmployee.employeeType === 'Permanent Employee' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {viewingEmployee.employeeType || 'N/A'}
                      </span>
                    </div>
                    <div><span className="font-medium text-gray-600">Name:</span> {viewingEmployee.employeeName}</div>
                    <div><span className="font-medium text-gray-600">Primary Contact:</span> {viewingEmployee.contactNo || 'N/A'}</div>
                    <div><span className="font-medium text-gray-600">Alternate Mobile:</span> {viewingEmployee.alternateMobile || 'N/A'}</div>
                    <div><span className="font-medium text-gray-600">Email:</span> {viewingEmployee.emailAddress || 'N/A'}</div>
                    <div><span className="font-medium text-gray-600">Joining Date:</span> {viewingEmployee.joiningDate}</div>
                    <div><span className="font-medium text-gray-600">Gender:</span> {viewingEmployee.genderType || 'N/A'}</div>
                    <div><span className="font-medium text-gray-600">Payment Type:</span> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                        viewingEmployee.paymentType === 'Daily' 
                          ? 'bg-orange-100 text-orange-800' 
                          : viewingEmployee.paymentType === 'Weekly'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-indigo-100 text-indigo-800'
                      }`}>
                        {viewingEmployee.paymentType || 'N/A'}
                      </span>
                    </div>
                    <div><span className="font-medium text-gray-600">Blood Group:</span> 
                      <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                        {viewingEmployee.bloodGroup || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">Work Information</h4>
                  <div className="space-y-2">
                    <div><span className="font-medium text-gray-600">Department:</span> {viewingEmployee.department || 'N/A'}</div>
                    <div><span className="font-medium text-gray-600">Designation:</span> {viewingEmployee.designation || 'N/A'}</div>
                    <div><span className="font-medium text-gray-600">Salary:</span> ₹{viewingEmployee.salary}</div>
                    <div><span className="font-medium text-gray-600">Updated Salary:</span> {viewingEmployee.updatedSalary === '0' ? 'N/A' : `₹${viewingEmployee.updatedSalary}`}</div>
                    <div><span className="font-medium text-gray-600">PF:</span> ₹{viewingEmployee.pf || '0'}</div>
                    <div><span className="font-medium text-gray-600">ESI:</span> ₹{viewingEmployee.esi || '0'}</div>
                    <div><span className="font-medium text-gray-600">WC:</span> ₹{viewingEmployee.wc || '0'}</div>
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
                    <div><span className="font-medium text-gray-600">Adhaar Number:</span> {viewingEmployee.adhaarNumber || 'N/A'}</div>
                    <div><span className="font-medium text-gray-600">Marital Status:</span> {viewingEmployee.maritalType || 'N/A'}</div>
                    <div><span className="font-medium text-gray-600">Present Address:</span> {viewingEmployee.presentAddress || 'N/A'}</div>
                    <div><span className="font-medium text-gray-600">Permanent Address:</span> {viewingEmployee.permanentAddress || 'N/A'}</div>
                    <div><span className="font-medium text-gray-600">Zip Code:</span> {viewingEmployee.zipCode || 'N/A'}</div>
                  </div>
                  
                  {/* Adhaar Card Image */}
                  {viewingEmployee.adhaarCardImage && (
                    <div className="mt-4">
                      <span className="font-medium text-gray-600">Adhaar Card:</span>
                      <div className="mt-2">
                        <img 
                          src={viewingEmployee.adhaarCardImage} 
                          alt="Adhaar Card" 
                          className="w-64 h-40 object-cover border rounded-lg"
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">Bank Information</h4>
                  <div className="space-y-2">
                    <div><span className="font-medium text-gray-600">Account Number:</span> {viewingEmployee.bankAccNumber || 'N/A'}</div>
                    <div><span className="font-medium text-gray-600">Account Name:</span> {viewingEmployee.bankAccName || 'N/A'}</div>
                    <div><span className="font-medium text-gray-600">Bank Branch:</span> {viewingEmployee.bankBranch || 'N/A'}</div>
                    <div><span className="font-medium text-gray-600">IFSC Code:</span> {viewingEmployee.ifscCode || 'N/A'}</div>
                  </div>
                  
                  {/* Bank Document Preview */}
                  {viewingEmployee.bankDocument && (
                    <div className="mt-4">
                      <span className="font-medium text-gray-600">Bank Document:</span>
                      <div className="mt-2">
                        {viewingEmployee.bankDocument.startsWith('data:image/') ? (
                          <img 
                            src={viewingEmployee.bankDocument} 
                            alt="Bank Document" 
                            className="w-40 h-32 object-cover border rounded-lg"
                          />
                        ) : (
                          <div className="p-3 bg-gray-100 rounded border">
                            <span className="text-sm text-gray-600">📄 Bank Document Uploaded</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button 
                  onClick={handlePrintEmployee}
                  className="bg-blue-600 text-white px-6 py-2 rounded text-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  🖨️ Print
                </button>
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