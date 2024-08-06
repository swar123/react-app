import logo from "./logo.svg";
import "./App.css";
import CheckList from "./component/check-list";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CheckListGrid from "./component/check-list-ag-grid";
import DashBoard from "./component/dashboard-page";
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';


function App() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
      <div className="App">
        <Router>
        <AppBar position="static">
          
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              REACT LEARNING APP
            </Typography>
            <Button color="inherit" onClick={handleMenuClick}>
                Menu
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem component={Link} to="/" onClick={handleMenuClose}>
                  Home
                </MenuItem>
                <MenuItem component={Link} to="/checklist?cookieId=1" onClick={handleMenuClose}>
                  check list
                </MenuItem>
                <MenuItem component={Link} to="/grid?cookieId=1" onClick={handleMenuClose}>
                  Ag-Grid
                </MenuItem>
              </Menu>
          </Toolbar>
        </AppBar>
          <div>
            <div className="container-md mt-5">
              <Routes>
              <Route
                  path="/"
                  element={<DashBoard/>}
                />
                <Route
                  path="/checklist"
                  element={<CheckList/>}
                />
                <Route
                  path="/grid"
                  element={<CheckListGrid/>}
                />
              </Routes>
            </div>
          </div>
        </Router>
      </div>
  );
}

export default App;
