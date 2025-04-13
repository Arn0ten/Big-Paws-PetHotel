/**
 * Dashboard Export Utilities
 *
 * This file contains functions for exporting dashboard data to various formats
 * and printing charts.
 */

// Export data to CSV format
export function exportToCsv(data: any[], filename: string) {
  if (!data || !data.length) {
    throw new Error("No data to export")
  }

  // Get headers from the first object
  const headers = Object.keys(data[0])

  // Create CSV content
  let csvContent = headers.join(",") + "\n"

  // Add data rows
  data.forEach((item) => {
    const row = headers.map((header) => {
      // Handle values that might contain commas or quotes
      const value = item[header]
      const valueStr = value === null || value === undefined ? "" : String(value)
      return `"${valueStr.replace(/"/g, '""')}"`
    })
    csvContent += row.join(",") + "\n"
  })

  // Create a blob and download link
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)

  // Create download link and trigger click
  const link = document.createElement("a")
  link.setAttribute("href", url)
  link.setAttribute("download", filename)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Print a specific chart
export function printChart(chartId: string, title: string) {
  const chartElement = document.getElementById(chartId)

  if (!chartElement) {
    throw new Error(`Chart element with ID "${chartId}" not found`)
  }

  // Create a new window for printing
  const printWindow = window.open("", "_blank")

  if (!printWindow) {
    throw new Error("Unable to open print window. Please check your popup blocker settings.")
  }

  // Get the chart's SVG content
  const svgElement = chartElement.querySelector("svg")

  if (!svgElement) {
    throw new Error("SVG element not found in chart")
  }

  // Clone the SVG to avoid modifying the original
  const svgClone = svgElement.cloneNode(true) as SVGElement

  // Set width and height attributes explicitly
  svgClone.setAttribute("width", "800")
  svgClone.setAttribute("height", "600")

  // Convert SVG to a data URL
  const svgData = new XMLSerializer().serializeToString(svgClone)
  const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
  const svgUrl = URL.createObjectURL(svgBlob)

  // Write the print document
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
          }
          .chart-container {
            max-width: 800px;
            margin: 0 auto;
          }
          h1 {
            text-align: center;
            color: #333;
          }
          .print-date {
            text-align: right;
            font-size: 12px;
            color: #666;
            margin-bottom: 20px;
          }
          img {
            max-width: 100%;
            height: auto;
          }
          @media print {
            body {
              margin: 0;
              padding: 15px;
            }
          }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <div class="print-date">Printed on: ${new Date().toLocaleString()}</div>
        <div class="chart-container">
          <img src="${svgUrl}" alt="${title}" />
        </div>
      </body>
    </html>
  `)

  // Wait for image to load then print
  printWindow.document.close()

  const img = printWindow.document.querySelector("img")
  if (img) {
    img.onload = () => {
      printWindow.focus()
      printWindow.print()
      // Close the window after printing (optional)
      // printWindow.close();
    }
  } else {
    printWindow.focus()
    printWindow.print()
  }
}

// Export data to Excel format (requires additional library like xlsx)
export function exportToExcel(data: any[], filename: string) {
  // This is a placeholder for Excel export functionality
  // In a real implementation, you would use a library like xlsx or exceljs
  // Example implementation with xlsx:
  //
  // import * as XLSX from 'xlsx';
  //
  // const worksheet = XLSX.utils.json_to_sheet(data);
  // const workbook = XLSX.utils.book_new();
  // XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
  // XLSX.writeFile(workbook, `${filename}.xlsx`);

  console.log("Excel export not implemented yet")
  alert("Excel export functionality requires additional libraries. Please use CSV export for now.")
}
