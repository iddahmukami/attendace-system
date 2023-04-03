import React, { useState } from "react";
import QrCodeButton from "./QrCodeButton";

const MyTable = () => {
  const [showSessionForm, setShowSessionForm] = useState(false);

  const [tableData, setTableData] = useState([
    {
      id: 1,
      courseName: "Introduction to React",
      courseInstructor: "John Doe",
      courseCode: "REACT101",
    },
    {
      id: 2,
      courseName: "Advanced React",
      courseInstructor: "Jane Smith",
      courseCode: "REACT201",
    },
    {
      id: 3,
      courseName: "React Native",
      courseInstructor: "Bob Johnson",
      courseCode: "REACT301",
    },
  ]);

  const [editingRowId, setEditingRowId] = useState(null);

  const [newRowData, setNewRowData] = useState({
    id: "",
    courseName: "",
    courseInstructor: "",
    courseCode: "",
  });

  const handleEditClick = (rowId) => {
    setEditingRowId(rowId);
  };

  const handleDeleteClick = (rowId) => {
    const updatedRowData = tableData.filter((row) => row.id !== rowId);
    setTableData(updatedRowData);
  };

  const handleInputChange = (event, rowId) => {
    const { name, value } = event.target;
    const updatedRowData = tableData.map((row) => {
      if (row.id === rowId) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setTableData(updatedRowData);
  };

  const handleNewInputChange = (event) => {
    const { name, value } = event.target;
    setNewRowData({ ...newRowData, [name]: value });
  };

  const handleAddClick = () => {
    if (
      !newRowData.courseName ||
      !newRowData.courseInstructor ||
      !newRowData.courseCode
    ) {
      alert("Please fill in all fields.");
      return;
    }
    setTableData([...tableData, newRowData]);
    setNewRowData({
      id: "",
      courseName: "",
      courseInstructor: "",
      courseCode: "",
    });
  };
  const styles = {
    row: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginTop: 15,
    },
    inputDiv: {
      display: "inline-block",
      marginRight: 10,
    },
    label: {
      fontWeight: "bold",
    },
  };

  const renderTableRow = (row) => {
    if (editingRowId === row.id) {
      return (
        <tr key={row.id}>
          <td
            style={{
              border: "1px solid black",
              width: "5%",
              padding: 10,
              textAlign: "left",
            }}
          >
            {row.id}
          </td>
          <td
            style={{
              border: "1px solid black",
              width: "80%",
              padding: 10,
              textAlign: "left",
            }}
          >
            <input
              type="text"
              name="courseName"
              value={row.courseName}
              onChange={(event) => handleInputChange(event, row.id)}
            />
          </td>
          <td
            style={{
              border: "1px solid black",
              width: "40%",
              padding: 10,
              textAlign: "left",
            }}
          >
            <input
              type="text"
              name="courseInstructor"
              value={row.courseInstructor}
              onChange={(event) => handleInputChange(event, row.id)}
            />
          </td>
          <td
            style={{
              border: "1px solid black",
              width: "40%",
              padding: 10,
              textAlign: "left",
            }}
          >
            <input
              type="text"
              name="courseCode"
              value={row.courseCode}
              onChange={(event) => handleInputChange(event, row.id)}
            />
          </td>
          <td
            style={{
              border: "1px solid black",
              width: "20%",
              padding: 10,
              textAlign: "left",
            }}
          >
            <button onClick={() => setEditingRowId(null)}>Save</button>
            <button onClick={() => setShowSessionForm(true)}>
              Create Session
            </button>
          </td>
        </tr>
      );
    }

    return (
      <tr key={row.id}>
        <td
          style={{
            border: "1px solid black",
            width: "5%",
            padding: 10,
            textAlign: "left",
          }}
        >
          {row.id}
        </td>
        <td
          style={{
            border: "1px solid black",
            width: "80%",
            padding: 10,
            textAlign: "left",
          }}
        >
          {row.courseName}
        </td>
        <td
          style={{
            border: "1px solid black",
            width: "40%",
            padding: 10,
            textAlign: "left",
          }}
        >
          {row.courseInstructor}
        </td>
        <td
          style={{
            border: "1px solid black",
            width: "40%",
            padding: 10,
            textAlign: "left",
          }}
        >
          {row.courseCode}
        </td>
        <td
          style={{
            border: "1px solid black",
            width: "20%",
            padding: 10,
            textAlign: "left",
          }}
        >
          <button onClick={() => handleEditClick(row.id)}>Edit</button>
          <button onClick={() => handleDeleteClick(row.id)}>Delete </button>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <table style={{ border: "px solid black", width: "100%", marginTop: 15 }}>
        <thead
          style={{
            border: "1px solid black",
            width: "100%",
            padding: 10,
            textAlign: "left",
          }}
        >
          <tr>
            <th
              style={{
                border: "1px solid black",
                width: "5%",
                padding: 10,
                textAlign: "left",
              }}
            >
              ID
            </th>
            <th
              style={{
                border: "1px solid black",
                width: "80%%",
                padding: 10,
                textAlign: "left",
              }}
            >
              CourseName
            </th>
            <th
              style={{
                border: "1px solid black",
                width: "40%",
                padding: 10,
                textAlign: "left",
              }}
            >
              CourseInstructor
            </th>
            <th
              style={{
                border: "1px solid black",
                width: "40%",
                padding: 10,
                textAlign: "left",
              }}
            >
              CourseCode
            </th>
            <th
              style={{
                border: "1px solid black",
                width: "20%%",
                padding: 10,
                textAlign: "left",
              }}
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>{tableData.map(renderTableRow)}</tbody>
      </table>

      {showSessionForm && (
        <div>
          <QrCodeButton />
        </div>
      )}

      <div style={{position:'relative'}}>
        <h3>Add New Course</h3>
        <div style={styles.row}>
          <div style={styles.inputDiv}>
            <label style={styles.label}>ID: </label>
            <input
              type="text"
              name="id"
              value={newRowData.id}
              onChange={handleNewInputChange}
            />
          </div>
          <div style={styles.inputDiv}>
            <label style={styles.label}>CourseName: </label>
            <input
              type="text"
              name="courseName"
              value={newRowData.courseName}
              onChange={handleNewInputChange}
            />
          </div>
          <div style={styles.inputDiv}>
            <label style={styles.label}>CourseInstructor: </label>
            <input
              type="text"
              name="courseInstructor"
              value={newRowData.courseInstructor}
              onChange={handleNewInputChange}
            />
          </div>

          <div style={styles.inputDiv}>
            <label style={styles.label}>CourseCode: </label>
            <input
              type="text"
              name="courseCode"
              value={newRowData.courseCode}
              onChange={handleNewInputChange}
            />
          </div>

          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              marginTop: 18,
            }}
          >
            <button onClick={() => handleAddClick()}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTable;
