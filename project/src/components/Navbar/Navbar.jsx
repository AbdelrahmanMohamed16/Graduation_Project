import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputField from "../Input/InputField";
import { useSelector } from "react-redux";

const drawerWidth = 240;

function Navbar(props) {
  const data = useSelector((state) => state.user.data);
  // const options = data.assigned_words.map((word) => word.text);
  const options = [];

  const { window, navItems, setWord } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          background: "linear-gradient(to right, #0F2D4D, #2369B3)",
          paddingY: "10px",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              width: "100%",
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "18px",
                  marginInline: "10px",
                }}
              >
                {item}
              </Button>
            ))}
            <div
              style={{
                marginRight: "auto",
                display: "flex",
                alignItems: "center",
                width: "40%",
                justifyContent: "space-between",
              }}
            >
              <Typography
                noWrap
                component="div"
                sx={{
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                كود المحرر: {data?.code}
              </Typography>
              <Typography
                noWrap
                component="div"
                sx={{
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                لجنة: {data?.committee}
              </Typography>
              <Typography noWrap component="div" sx={{ width: "40%" }}>
                <InputField
                  select={true}
                  label="قائمة المداخل المطلوب تحريرها"
                  options={options}
                  val={setWord}
                  name={"text"}
                />
              </Typography>
            </div>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

Navbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Navbar;
