import { createSignal } from 'solid-js';
import AgGrid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Tetap diimpor, tetapi tidak akan digunakan
import './custom.theme.css'; // Impor tema kustom

const AgGridTable = () => {
  const [rowData] = createSignal([
    { id: 1, username: "Sienna00", email: "sienna@gmail.com", subscriptionPackage: "Ulo Family", status: "Active", lastLogin: "213 hari yang lalu MobileApp • Jakarta", phoneNumber: "0895377200378" },
    { id: 2, username: "Sienna01", email: "sienna01@gmail.com", subscriptionPackage: "Ulo Lite", status: "Active", lastLogin: "213 hari yang lalu MobileApp • Jakarta", phoneNumber: "0895377200378" },
    { id: 3, username: "Sienna02", email: "sienna02@gmail.com", subscriptionPackage: "Ulo Plus", status: "Inactive", lastLogin: "213 hari yang lalu MobileApp • Jakarta", phoneNumber: "0895377200378" },
    { id: 4, username: "Sienna03", email: "sienna03@gmail.com", subscriptionPackage: "Ulo Infinity", status: "Active", lastLogin: "213 hari yang lalu MobileApp • Jakarta", phoneNumber: "0895377200378" },
    { id: 5, username: "Sienna04", email: "sienna04@gmail.com", subscriptionPackage: "Free", status: "Active", lastLogin: "213 hari yang lalu MobileApp • Jakarta", phoneNumber: "0895377200378" }
  ]);

  const columnDefs = [
    { field: "id", headerName: "#", width: 50 },
    { field: "username", width: 170 },
    { field: "email", width: 200 },
    { field: "subscriptionPackage", headerName: "Subscription Package", width: 180 },
    { field: "status", width: 150 },
    { field: "lastLogin", headerName: "Last Login", width: 300 },
    { field: "phoneNumber", headerName: "Phone Number", width: 190 },
  ];

  // Opsi untuk Ag-Grid tanpa pagination
  const gridOptions = {
    rowHeight: 43, // Atur tinggi baris
    getRowStyle: (params) => {
      return {
        backgroundColor: 'transparent', // Pastikan latar belakang transparan
        padding: '10px 0', // Padding untuk memberi jarak antar baris
      };
    }
  };

  return (
    <div class="ag-grid-section ag-theme-custom" style={{ width: "900px", height: "300px" }}>
      <AgGrid
        columnDefs={columnDefs}
        rowData={rowData()}
        gridOptions={gridOptions} // Menambahkan gridOptions
      />
    </div>
  );
};

export default AgGridTable;
