import React, { useState } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import SidebarSounds from "./SidebarSounds/SidebarSounds";
import RttIcon from "@mui/icons-material/Rtt";
import Texts from "./Texts";
import ImageIcon from "@mui/icons-material/Image";
import UploadPicture from "./SidebarPictures/UploadPicture";
import { Button } from "@mui/material";
import "./SideBar.css";
import { Link } from "react-router-dom";
import Time from "./Time";

const drawerWidth = 220;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

type Props = {
  title: string;
  subtitle: string;
  setTitle: (title: string) => void;
  setSubtitle: (subtitle: string) => void;
  titleFont: string;
  titleFontSize: number;
  setTitleFont: (titleFont: string) => void;
  setSubtitleFont: (subtitleFont: string) => void;
  setTitleFontSize: (titleFontSize: number) => void;
  setSubTitleFontSize: (subTitleFontSize: number) => void;
  subtitleFont: string;
  subTitleFontSize: number;
  setTitleColor: (color: string) => void;
  setSubtitleColor: (color: string) => void;
  titleColor: string;
  subtitleColor: string;
  musicFile: string;
  setMusicFile: (musicFile: string) => void;
  setMusicFX: (musicFX: string) => void;
  musicFX: string;
  setWindows: (windows: string[]) => void;
  windows: string[];
  setSelectedBackground: (background: string) => void;
  selectedBackground: string;
};

const Sidebar: React.FC<Props> = ({
  title,
  subtitle,
  setTitle,
  setSubtitle,
  titleFont,
  titleFontSize,
  subtitleFont,
  subTitleFontSize,
  setTitleFont,
  setSubtitleFont,
  setTitleFontSize,
  setSubTitleFontSize,
  titleColor,
  subtitleColor,
  setTitleColor,
  setSubtitleColor,
  setMusicFile,
  musicFile,
  setMusicFX,
  musicFX,
  setWindows,
  windows,
  setSelectedBackground,
  selectedBackground,
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState<number | null>(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setTitle(event.target.value);
  };

  const handleSubtitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSubtitle(event.target.value);
  };

  // added to open / close the corresponding 'slide' for the icon
  const toggleSlideOpen = (index: number) => {
    if (slideIndex === null) {
      setSlideIndex(index);
    } else if (slideIndex !== index) {
      setSlideIndex(index);
    } else {
      setSlideIndex(null);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ bgcolor: "#10617a" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <div className="button-container">
            <Link to="/preview">
              <Button
                className="preview-button"
                variant="contained"
                style={{ backgroundColor: "#15728e", color: "white" }}
              >
                Preview
              </Button>
            </Link>
            <Link to="/">
              <Button
                className="home-button"
                variant="contained"
                style={{ backgroundColor: "#15728e", color: "white" }}
              >
                Home
              </Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ bgcolor: "gray", height: 760, color: "#fff" }}>
          {["Time", "Text", "Image", "Sound"].map((text, index) => (
            <ListItem
              onClick={() => toggleSlideOpen(index)}
              key={text}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "#fff",
                  }}
                >
                  {index === 0 && <HourglassEmptyIcon />}
                  {/* change the icon here */}
                  {index === 1 && <RttIcon />}
                  {index === 2 && <ImageIcon />}
                  {index === 3 && <AudiotrackIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      {slideIndex !== null && (
        <Box
          component="main"
          p={1}
          sx={{ width: 250, minHeight: 760, bgcolor: "#575757", color: "#fff" }}
        >
          {slideIndex === 0 && (
            /* This is the place for the first icons component etc...*/
            <Time setWindows={setWindows} windows={windows} />
          )}
          {slideIndex === 1 && (
            <Texts
              title={title}
              subtitle={subtitle}
              setTitle={setTitle}
              setSubtitle={setSubtitle}
              titleFont={titleFont}
              titleFontSize={titleFontSize}
              subtitleFont={subtitleFont}
              subTitleFontSize={subTitleFontSize}
              setTitleFont={setTitleFont}
              setSubtitleFont={setSubtitleFont}
              setTitleFontSize={setTitleFontSize}
              setSubTitleFontSize={setSubTitleFontSize}
              onTitleChange={handleTitleChange}
              onSubtitleChange={handleSubtitleChange}
              titleColor={titleColor}
              subtitleColor={subtitleColor}
              setTitleColor={setTitleColor}
              setSubtitleColor={setSubtitleColor}
            />
          )}
          {slideIndex === 2 && (
            <UploadPicture
              setSelectedBackground={setSelectedBackground}
              selectedBackground={selectedBackground}
            />
          )}
          {slideIndex === 3 && (
            <SidebarSounds
              musicFile={musicFile}
              setMusicFile={setMusicFile}
              setMusicFX={setMusicFX}
              musicFX={musicFX}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;
