import { createSignal } from 'solid-js';
import AgGrid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './custom.theme.css';

const AgGridTable = () => {
  const [rowData] = createSignal([
    { id: 1, username: "Sienna00", email: "sienna@gmail.com", subscriptionPackage: "Ulo Family", status: "Active", lastLogin: "213 hari yang lalu MobileApp • Jakarta", phoneNumber: "0895377200378" },
    { id: 2, username: "Sienna01", email: "sienna01@gmail.com", subscriptionPackage: "Ulo Lite", status: "Active", lastLogin: "213 hari yang lalu MobileApp • Jakarta", phoneNumber: "0895377200378" },
    { id: 3, username: "Sienna02", email: "sienna02@gmail.com", subscriptionPackage: "Ulo Plus", status: "Inactive", lastLogin: "213 hari yang lalu MobileApp • Jakarta", phoneNumber: "0895377200378" },
    { id: 4, username: "Sienna03", email: "sienna03@gmail.com", subscriptionPackage: "Ulo Infinity", status: "Active", lastLogin: "213 hari yang lalu MobileApp • Jakarta", phoneNumber: "0895377200378" },
    { id: 5, username: "Sienna04", email: "sienna04@gmail.com", subscriptionPackage: "Free", status: "Inactive", lastLogin: "213 hari yang lalu MobileApp • Jakarta", phoneNumber: "0895377200378" }
  ]);

  const columnDefs = [
    { field: "id", headerName: "#", width: 50 },
    { field: "username", width: 170 },
    { field: "email", width: 200 },
    {
      field: "subscriptionPackage",
      headerName: "Subscription Package",
      width: 180,
      cellStyle: (params) => {
        switch (params.value) {
          case 'Ulo Family':
            return { color: '#CF3AAE', width: '85px' }; 
          case 'Ulo Lite':
            return { color: '#6120EB', width: '85px' }; 
          case 'Ulo Plus':
            return { color: '#6F73DE', width: '85px' }; 
          case 'Ulo Infinity':
            return { color: '#52D5F2', width: '85px' };
          case 'Free':
            return { color: '#9899AD', width: '85px' };
          default:
            return {};
        }
      }, // Optional: setting a default text color
      cellClassRules: {
        'ulo-family': (params) => params.value === 'Ulo Family',
        'ulo-lite': (params) => params.value === 'Ulo Lite',
        'ulo-plus': (params) => params.value === 'Ulo Plus',
        'ulo-infinity': (params) => params.value === 'Ulo Infinity',
        'ulo-free': (params) => params.value === 'Free',
      },
    },
    
    {
      field: "status",
      headerName: "Status",
      width: 150,
      cellStyle: (params) => {
        switch (params.value) {
          case 'Active':
            return { color: '#00B69B', width: '72px'}; // Hijau untuk Active
          case 'Inactive':
            return { color: '#FF3E3E', width: '72px'}; // Merah untuk Inactive
          default:
            return {};
        }
      },
      cellClassRules: {
        'status-active': (params) => params.value === 'Active',
        'status-inactive': (params) => params.value === 'Inactive',
      },
    },    
    { field: "lastLogin", headerName: "Last Login", width: 300 },
    { field: "phoneNumber", headerName: "Phone Number", width: 190 }
  ];
  

  const gridOptions = {
    rowHeight: 43,
    getRowStyle: (params) => ({
      backgroundColor: 'transparent',
      padding: '10px 0'
    })
  };

  return (
    <div class="ag-grid-section ag-theme-custom" style={{ width: "900px", height: "300px" }}>
      <AgGrid
        columnDefs={columnDefs}
        rowData={rowData()}
        gridOptions={gridOptions}
      />
    </div>
  );
};

export default AgGridTable;
