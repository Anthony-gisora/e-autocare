import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ReportGenerator = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const reportType = queryParams.get("type");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let url = "";

        if (reportType === "usage")
          url = "https://roadmateassist.onrender.com/api/admin/usage-report";
        if (reportType === "revenue")
          url = "https://roadmateassist.onrender.com/api/admin/revenue-report";
        if (reportType === "performance")
          url =
            "https://roadmateassist.onrender.com/api/admin/performance-report";

        const { data } = await axios.get(url);
        setReportData(data);
      } catch (error) {
        console.error("Error fetching report:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [reportType]);

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text(`${reportType.toUpperCase()} REPORT`, 14, 15);
    doc.autoTable({
      startY: 25,
      head: [Object.keys(reportData[0] || {})],
      body: reportData.map((item) => Object.values(item)),
    });
    doc.save(`${reportType}-report.pdf`);
  };

  const exportToCSV = () => {
    const csv =
      Object.keys(reportData[0] || {}).join(",") +
      "\n" +
      reportData.map((row) => Object.values(row).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${reportType}-report.csv`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-[#075538] mb-4">
        {reportType?.toUpperCase()} Report
      </h1>
      {loading ? (
        <p className="text-gray-600">Generating report...</p>
      ) : (
        <>
          <div className="flex gap-4 mb-4">
            <button
              onClick={exportToPDF}
              className="bg-[#075538] text-white px-4 py-2 rounded hover:bg-[#06452e]"
            >
              Download PDF
            </button>
            <button
              onClick={exportToCSV}
              className="bg-[#CED46A] text-[#075538] px-4 py-2 rounded hover:bg-[#bfb54e]"
            >
              Download CSV
            </button>
          </div>

          <div className="overflow-x-auto bg-white rounded-xl shadow p-4">
            <table className="min-w-full border">
              <thead className="bg-[#CED46A] text-[#075538]">
                <tr>
                  {Object.keys(reportData[0] || {}).map((key) => (
                    <th key={key} className="border px-3 py-2 text-left">
                      {key.toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reportData.map((item, i) => (
                  <tr key={i} className="hover:bg-gray-100">
                    {Object.values(item).map((val, j) => (
                      <td key={j} className="border px-3 py-2">
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ReportGenerator;
