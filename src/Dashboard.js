import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AgChartsReact } from "ag-charts-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./Dashboard.css";

const Dashboard = ({ spaceMissions }) => {
  const [rowData, setRowData] = useState(spaceMissions);

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

  // Custom cell renderer for Outcome column
  function outcomeCellRenderer(params) {
    return params.value ? "Success" : "Failure";
  }

  // Chart data
  const chartData = spaceMissions.reduce(
    (result, mission) => {
      const outcome = mission.successful ? "Success" : "Failure";
      result[outcome] = (result[outcome] || 0) + 1;
      return result;
    },
    { Success: 0, Failure: 0 }
  );

  // AG-Charts configuration
  const chartOptions = {
    data: Object.entries(chartData).map(([outcome, count]) => ({
      outcome,
      count,
    })),
    series: [
      {
        type: "pie",
        angleKey: "count",
        labelKey: "outcome",
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h2>SpaceVue Dashboard</h2>
      <div
        className="ag-theme-quartz" // applying the grid theme
        style={{ height: 500 }} // the grid will fill the size of the parent container
      >
        <AgGridReact columnDefs={columnDefs} rowData={rowData} />
      </div>
      <div className="chart-container">
        <AgChartsReact options={chartOptions} />
      </div>
    </div>
  );
};

export default Dashboard;
