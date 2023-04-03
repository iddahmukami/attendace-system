import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FiMenu, FiBookOpen, FiBarChart2 } from "react-icons/fi";
import { TbUserCircle } from "react-icons/tb";
import Button from "@mui/material/Button";
import Table from "./MyTable"; // Import your Table component
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { db } from "../Firebase";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

function Home() {
  const [open, setOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [showTable, setShowTable] = useState(false); // Add a state variable to track whether the table should be displayed

  // firebase state
  const [attend, setAttend] = useState([]);
  const [csvData, setCsvData] = useState("");

  async function getRegister() {
    const attendance = collection(db, "scans");
    const attendSnapshot = await getDocs(attendance);
    const attendList = attendSnapshot.docs.map((doc) => doc.data());
    setAttend(attendList);
    console.log(attendList);

    const headers = [
      "Student Email",
      "Registration",
      "Course",
      "Time",
      "Academic Year",
    ];
    const rows = attendList.map((record) => [
      record.email,
      record.regNo,
      record.courseTaken,
      record.timestamp,
      record.yearOfStudy,
    ]);
    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    setCsvData(csv);
  }

  const handleDownloadCsv = async()=> {
    await getRegister()
    // create a Blob object with the CSV data
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    // create a temporary link element to trigger the download
    const link = document.createElement('a');
    if (link.download !== undefined) { // feature detection
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'attendance.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
  

  const toggleDrawer = (isOpen) => (event) => {
    setOpen(isOpen);
  };

  const handleMenuClick = (menuTitle) => {
    setSelectedMenu(menuTitle);
    toggleDrawer(false)();
  };

  const handleAddNewCourseClick = () => {
    setShowTable(true); // Show the table when the button is clicked
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <FiMenu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Attendance Management
          </Typography>
          <TbUserCircle size={25} />
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        variant="temporary"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <List>
          <ListItem button onClick={() => handleMenuClick("Manage Courses")}>
            <ListItemIcon>
              <FiBookOpen />
            </ListItemIcon>
            <ListItemText primary="Manage Courses" />
          </ListItem>
          <ListItem button onClick={() => handleMenuClick("Reports")}>
            <ListItemIcon>
              <FiBarChart2 />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItem>
        </List>
      </Drawer>

      {selectedMenu === "Manage Courses" && (
        <div>
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={6}>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddNewCourseClick}
                >
                  Add new course
                </Button>
              </Box>
              {showTable && <Table title="Course List" />}
            </Grid>
          </Grid>
        </div>
      )}

      {selectedMenu === "Reports" && (
        <div>
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={6}>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleDownloadCsv}
                >
                  Download CSV
                </Button>
              </Box>

              <div>
                {attend.map((record, index) => (
                  <div key={index}>
                    <p>Student Email: {record.email}</p>
                    <p>Registration: {record.regNo}</p>
                    <p>course: {record.courseTaken}</p>
                    <p>Time: {record.timestamp}</p>
                    <p>Academic Year: {record.yearOfStudy}</p>
                  </div>
                ))}
              </div>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}

export default Home;
