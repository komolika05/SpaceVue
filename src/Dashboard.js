import React from "react";
import { AgGridReact } from "ag-grid-react";
import { AgChartsReact } from "ag-charts-react";
import "./Dashboard.css";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Dashboard = ({ spaceMissions }) => {
  // AG-Grid configuration
  const gridOptions = {
    columnDefs: [
      { headerName: "Mission Name", field: "name" },
      { headerName: "Launch Company", field: "launch_company" },
      { headerName: "Location", field: "location" },
      { headerName: "Date", field: "date" },
      { headerName: "Time", field: "time" },
      { headerName: "Rocket Type", field: "rocket_type" },
      { headerName: "Price", field: "price" },
      { headerName: "Outcome", field: "outcome" },
    ],
    rowData: spaceMissions,
  };

  // Chart data
  const chartData = spaceMissions.reduce(
    (result, mission) => {
      result[mission.outcome] += 1;
      return result;
    },
    { Success: 0, Failure: 0, PartialFailure: 0 }
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
      <div className="ag-grid-container">
        <AgGridReact {...gridOptions} />
      </div>
      <div className="chart-container">
        <AgChartsReact options={chartOptions} />
      </div>
    </div>
  );
};

export default Dashboard;
