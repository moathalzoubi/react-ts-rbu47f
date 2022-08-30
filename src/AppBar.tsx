import * as React from 'react';
import { createTheme, styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Mode from '@mui/icons-material/Mode';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Widgets from '@mui/icons-material/Widgets';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Viewer } from './Viewer';
const drawerWidthR = 200;
const drawerWidthL = 280;
const theme = createTheme({
  spacing: [0, 4, 8, 16, 32, 64],
});

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
  open2?: boolean;
}>(({ theme, open, open2 }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidthL}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  open2?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open, open2 }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidthL}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  // necessary for content to be below app bar
}));

const Box = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: 0,
  margin: 0,
}));
export default function PersistentDrawerLeft() {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
    setOpen2(false);
  };
  const handleDrawerOpen2 = () => {
    setOpen2(true);
    setOpen(false);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleDrawerClose2 = () => {
    setOpen2(false);
  };

  return (
    <Grid container spacing={2}>
      <Box>
        <CssBaseline />
        <Grid container spacing={2}>
          <Grid>
            <AppBar position="fixed" open={open}>
              <Toolbar>
                <Grid container spacing={2} xs={1}>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{ mr: 0, ...(open && { display: 'none' }) }}
                  >
                    <MenuIcon />
                  </IconButton>
                </Grid>
                <Grid xs={10}>
                  <Typography variant="h6" noWrap component="div"></Typography>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="baseline"
                >
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen2}
                    edge="end"
                    sx={{ ml: 0, ...(open2 && { display: 'none' }) }}
                  >
                    <Mode />
                  </IconButton>
                </Grid>
              </Toolbar>
            </AppBar>
          </Grid>

          <Drawer
            sx={{
              width: drawerWidthL,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidthL,
                boxSizing: 'border-box',
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Widgets m={2} />
                <Typography variant="h5" component="h5">
                  Thumbnails
                </Typography>
              </Grid>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </DrawerHeader>
            <Divider />
            <Box id="thumbnails"></Box>
          </Drawer>

          <Drawer
            sx={{
              width: drawerWidthR,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidthR,
                boxSizing: 'border-box',
              },
            }}
            variant="persistent"
            anchor="right"
            open={open2}
          >
            <DrawerHeader>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <BorderColorIcon m={2} />
                <Typography variant="h5" component="h5">
                  Actions
                </Typography>
              </Grid>
              <IconButton onClick={handleDrawerClose2}>
                <ChevronRightIcon />
              </IconButton>
            </DrawerHeader>
            <Divider />
            <Box></Box>
          </Drawer>
        </Grid>
        <Grid xs={12}>
          <Main open={open}>
            <DrawerHeader />
            <Viewer />
          </Main>
        </Grid>
      </Box>
    </Grid>
  );
}
