import * as Excel from 'exceljs'
import { Member } from '../types'

export const exportMembersToExcel = async (members: Member[], filename: string = 'members.xlsx') => {
  try {
    // Create a new workbook
    const workbook = new Excel.Workbook()
    const worksheet = workbook.addWorksheet('Members')

    // Define columns
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'First Name', key: 'firstName', width: 15 },
      { header: 'Middle Name', key: 'middleName', width: 15 },
      { header: 'Last Name', key: 'lastName', width: 15 },
      { header: 'Gender', key: 'gender', width: 10 },
      { header: 'Date of Birth', key: 'dateOfBirth', width: 15 },
      { header: 'Age', key: 'age', width: 10 },
      { header: 'Email', key: 'email', width: 25 },
      { header: 'WhatsApp No', key: 'whatsappNo', width: 15 },
      { header: 'Address', key: 'address', width: 30 },
      { header: 'Profession', key: 'profession', width: 20 },
      { header: 'Reference', key: 'reference', width: 20 },
      { header: 'Aadhar Card', key: 'aadharCard', width: 15 },
      { header: 'Joined Date', key: 'createdAt', width: 15 },
    ]

    // Style the header row
    const headerRow = worksheet.getRow(1)
    headerRow.font = { bold: true, color: { argb: 'FFFFFF' } }
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '4472C4' }
    }
    headerRow.alignment = { horizontal: 'center' }

    // Calculate age function
    const calculateAge = (dateOfBirth: Date | string) => {
      const today = new Date()
      const birthDate = new Date(dateOfBirth)
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      
      return age
    }

    // Add data rows
    members.forEach(member => {
      worksheet.addRow({
        id: member.id,
        firstName: member.firstName,
        middleName: member.middleName || '',
        lastName: member.lastName,
        gender: member.gender,
        dateOfBirth: new Date(member.dateOfBirth).toLocaleDateString(),
        age: calculateAge(member.dateOfBirth),
        email: member.email,
        whatsappNo: member.whatsappNo,
        address: member.address,
        profession: member.profession,
        reference: member.reference || '',
        aadharCard: member.aadharCard,
        createdAt: new Date(member.createdAt).toLocaleDateString(),
      })
    })

    // Style alternate rows
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1 && rowNumber % 2 === 0) {
        row.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'F2F2F2' }
        }
      }
    })

    // Add borders to all cells
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
      })
    })

    // Generate buffer
    const buffer = await workbook.xlsx.writeBuffer()

    // Create blob and download
    const blob = new Blob([buffer], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    })

    // Create download link
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)

    return true
  } catch (error) {
    console.error('Error exporting to Excel:', error)
    return false
  }
}

export const exportFilteredMembersToExcel = async (
  members: Member[], 
  filters: { search?: string; gender?: string },
  filename?: string
) => {
  const timestamp = new Date().toISOString().split('T')[0]
  const filterSuffix = filters.search || filters.gender ? '_filtered' : ''
  const defaultFilename = `gym_members_${timestamp}${filterSuffix}.xlsx`
  
  return exportMembersToExcel(members, filename || defaultFilename)
}