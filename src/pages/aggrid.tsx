// AgGridTable.tsx
import { createSignal } from 'solid-js';
import AgGrid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const AgGridTable = () => {
  const [rowData] = createSignal([
    { id: 1, username: "john_doe", email: "john@example.com", subscriptionPackage: "Basic", status: "Active", lastLogin: "2024-10-20", phoneNumber: "+123456789" },
    { id: 2, username: "jane_smith", email: "jane@example.com", subscriptionPackage: "Premium", status: "Inactive", lastLogin: "2024-10-15", phoneNumber: "+987654321" },
    { id: 3, username: "bob_brown", email: "bob@example.com", subscriptionPackage: "Standard", status: "Active", lastLogin: "2024-10-18", phoneNumber: "+112233445" },
  ]);

const columnDefs = [
  { field: "id", headerName: "#", width: 50 }, // Set width for ID column
  { field: "username", width: 170 }, // Set width for username column
  { field: "email", width: 200 }, // Set width for email column
  { field: "subscriptionPackage", headerName: "Subscription Package", width: 180 }, // Set width for subscription package
  { field: "status", width: 150 }, // Set width for status column
  { field: "lastLogin", headerName: "Last Login", width: 300 }, // Set width for last login column
  { field: "phoneNumber", headerName: "Phone Number", width: 190 }, // Set width for phone number column
];


  return (
    <div class="ag-grid-section ag-theme-alpine" style={{ width: "935px" }}>
      <AgGrid
        columnDefs={columnDefs}
        rowData={rowData()}
        domLayout='autoHeight'
      />
    </div>
  );
};

export default AgGridTable;
