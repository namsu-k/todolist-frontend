import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Root() {
  return (
    <Box mx={8} h="100vh">
      <Header />
      <Outlet />
    </Box>
  );
}
