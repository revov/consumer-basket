import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import { TopBar } from "./top-bar";
import { SideMenu } from "./side-menu";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <Box sx={{ display: "flex" }}>
      <TopBar />
      <SideMenu />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          "&>*:last-child": { minHeigh: 0, overflowY: "auto" },
        }}
      >
        <Toolbar />

        <Outlet />
      </Box>
    </Box>
  );
}
