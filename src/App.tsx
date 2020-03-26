import React from "react";
import styled from "styled-components/macro";

import "./App.css";
import SideBar from "./Components/SideBar/SideBar";
import Home from "./Components/Home";

const AppWrap = styled.div`
  display: flex;
  height: 100vh;
`;

function App() {
  return (
    <AppWrap className="AppWrap">
      <SideBar />
      <Home />
    </AppWrap>
  );
}

export default App;
