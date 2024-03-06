import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { AgChartsReact } from "ag-charts-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./Dashboard.css";
import { fetchMissionsData } from "./api";

const Dashboard = () => {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    { headerName: "Mission", field: "mission" },
    { headerName: "Company", field: "company" },
    {
      headerName: "Outcome",
      field: "successful",
      cellRenderer: outcomeCellRenderer,
    },
    { headerName: "Date", field: "date" },
    { headerName: "Time", field: "time" },
    { headerName: "Rocket", field: "rocket" },
    { headerName: "Location", field: "location" },
    { headerName: "Price", field: "price" },
  ]);

  function outcomeCellRenderer(params) {
    return params.value ? "Success" : "Failure";
  }

  // Chart data
  const chartData = rowData.reduce(
    (result, mission) => {
      const outcome = mission.successful ? "Success" : "Failure";
      result[outcome] = (result[outcome] || 0) + 1;
      return result;
    },
    { Success: 0, Failure: 0 }
  );

  // AG-Charts configuration
  const chartOutcome = Object.entries(chartData).map(([outcome, count]) => ({
    outcome,
    count,
  }));
  
  const chartOptions = {
    data: chartOutcome.map(({ outcome, count }) => ({ outcome, count })),
    series: [
      {
        type: "pie",
        angleKey: "count",
        legendItemKey: "outcome",
      },
    ],
  };
  async function fetchData() {
    const missionsData = await fetchMissionsData();

    if (missionsData) {
      setRowData(missionsData);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="dashboard-container">
      <h2>SpaceVue Dashboard</h2>
      <p>*click on the labels to sort the data</p>
      <div className="ag-theme-quartz" style={{ height: 500, padding: 10 }}>
        <AgGridReact
          className="columnDefs"
          columnDefs={columnDefs}
          rowData={rowData}
        />
      </div>
      <div className="chart-container">
        <h2>Successful vs Unsuccessful Missions</h2>
        <AgChartsReact options={chartOptions} />
      </div>
    </div>
  );
};

export default Dashboard;
