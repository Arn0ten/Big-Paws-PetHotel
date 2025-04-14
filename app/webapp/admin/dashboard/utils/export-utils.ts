/**
 * Utility functions for exporting dashboard data
 *
 * BACKEND INTEGRATION POINT:
 * These functions can be enhanced to work with server-side export functionality
 * for larger datasets or more complex export formats (Excel, PDF, etc.)
 */

/**
 * Export data to CSV file
 * @param data Array of data objects to export
 * @param filename Name of the CSV file
 */
export const exportToCsv = (data: any[], filename: string) => {
  if (!data || data.length === 0) {
    console.error("No data to export");
    return;
  }

  // Get headers from the first object
  const headers = Object.keys(data[0]);

  // Create CSV content
  const csvContent = [
    headers.join(","), // Header row
    ...data.map((row) =>
      headers
        .map((header) => {
          // Handle values that might contain commas
          const value = row[header];
          const valueStr =
            value === null || value === undefined ? "" : String(value);
          return valueStr.includes(",") ? `"${valueStr}"` : valueStr;
        })
        .join(","),
    ),
  ].join("\n");

  // Create a blob and download link
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Print a chart by ID
 * @param chartId ID of the chart container element
 * @param title Title to display on the printed page
 */
export const printChart = (chartId: string, title: string) => {
  const chartElement = document.getElementById(chartId);
  if (!chartElement) {
    console.error(`Chart element with ID "${chartId}" not found`);
    return;
  }

  // Create a new window for printing
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    console.error(
      "Failed to open print window. Check if pop-up blocker is enabled.",
    );
    return;
  }

  // Get the chart's HTML content
  const chartHtml = chartElement.innerHTML;

  // Create the print document
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          .chart-container {
            width: 100%;
            height: 500px;
          }
          h1 {
            text-align: center;
            margin-bottom: 20px;
          }
          .print-date {
            text-align: right;
            font-size: 12px;
            color: #666;
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <div class="print-date">Printed on: ${new Date().toLocaleString()}</div>
        <div class="chart-container">
          ${chartHtml}
        </div>
      </body>
    </html>
  `);

  // Trigger print and close the window when done
  printWindow.document.close();
  printWindow.focus();

  // Wait for content to load before printing
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
};
