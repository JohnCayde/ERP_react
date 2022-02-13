import { useHistory } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import MoodIcon from "@mui/icons-material/Mood";
// import { TextSpan } from "typescript";

function CustomCard({ children }: { children: Array<JSX.Element> }) {
  return (
    <Card sx={{ minWidth: 275, height: "100%", backgroundColor: "#EEC989" }}>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function CardTitle({ children }: { children: string }) {
  return (
    <Typography
      variant="h4"
      component="div"
      sx={{ fontWeight: "bold" }}
      gutterBottom
    >
      {children}
    </Typography>
  );
}
function CardSubTitle({ children }: { children: string }) {
  return (
    <ListItem disablePadding>
      <Typography
        variant="subtitle1"
        component="div"
        sx={{ fontWeight: "bold" }}
      >
        {children}
      </Typography>
    </ListItem>
  );
}
function CardDescription({ children }: { children: string }) {
  return (
    <ListItem disablePadding>
      <ListItemIcon>
        <ArrowRightAltIcon />
      </ListItemIcon>
      <Typography variant="body2" gutterBottom>
        {children}
      </Typography>
    </ListItem>
  );
}

function HowTo() {
  const history = useHistory();

  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Guide Manual
          </Typography>
          <Button color="inherit" onClick={() => history.goBack()}>
            Back
          </Button>
        </Toolbar>
      </AppBar>
      <Box my={4}>
        <Typography
          sx={{ textDecoration: "underline" }}
          variant="h2"
          gutterBottom
          component="div"
        >
          Concept
        </Typography>
        <Typography variant="body2" gutterBottom>
          Diagram below show how is the relationship between each department.
          The web app are build based on the relationship shown.
        </Typography>
        <img src="../../img/4862c/concept.png" alt="Concept" width="1100" />
      </Box>
      <Divider />
      <Box my={4}>
        <Typography
          sx={{ textDecoration: "underline" }}
          variant="h2"
          gutterBottom
          component="div"
        >
          Role
        </Typography>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <CustomCard>
                <CardTitle>Store</CardTitle>
                <List>
                  <CardSubTitle>Material Store</CardSubTitle>
                  <CardDescription>
                    Take overview on all available stock in material store
                  </CardDescription>
                  <CardDescription>
                    Take overview on all available stock in material store
                  </CardDescription>
                  <CardDescription>
                    Handle request from production for material
                  </CardDescription>
                  <CardDescription>
                    Handle request/receive to purchasing department for material
                    purchase
                  </CardDescription>
                  <CardSubTitle>Finish Good Store</CardSubTitle>
                  <CardDescription>
                    Receive finish good complete by production into store
                  </CardDescription>
                </List>
              </CustomCard>
            </Grid>
            <Grid item xs={4}>
              <CustomCard>
                <CardTitle>R & D</CardTitle>
                <List>
                  <CardSubTitle>Material</CardSubTitle>
                  <CardDescription>
                    Handle material that are qualified to process product
                  </CardDescription>
                  <CardSubTitle>Process</CardSubTitle>
                  <CardDescription>
                    Handle process that are qualified to process product
                  </CardDescription>
                  <CardDescription>
                    Handle request/receive to purchasing department for material
                    purchase
                  </CardDescription>
                  <CardSubTitle>Product</CardSubTitle>
                  <CardDescription>
                    Handle the process flow for product
                  </CardDescription>
                </List>
              </CustomCard>
            </Grid>
            <Grid item xs={4}>
              <CustomCard>
                <CardTitle>Production Control</CardTitle>
                <List>
                  <CardDescription>Handle orders from sales</CardDescription>
                  <CardDescription>
                    Constrcut planning and provide instruction to production
                  </CardDescription>
                  <CardDescription>Monitor production progress</CardDescription>
                </List>
              </CustomCard>
            </Grid>
            <Grid item xs={4}>
              <CustomCard>
                <CardTitle>Production Control</CardTitle>
                <List>
                  <CardSubTitle>Clerk</CardSubTitle>
                  <CardDescription>
                    Add/remove section in production
                  </CardDescription>
                  <CardDescription>
                    Add/remove machine for each section in production
                  </CardDescription>
                  <CardSubTitle>{"<Process>"}</CardSubTitle>
                  <CardDescription>
                    Process component by check in and out
                  </CardDescription>
                </List>
              </CustomCard>
            </Grid>
            <Grid item xs={4}>
              <CustomCard>
                <CardTitle>Purchasing</CardTitle>
                <List>
                  <CardDescription>
                    Take overview on items that available got purchase
                  </CardDescription>
                  <CardDescription>
                    Handle purchase request from production and maintenance
                  </CardDescription>
                  <CardDescription>
                    Review internal purchase request history
                  </CardDescription>
                  <CardDescription>
                    Create external purchase order to vendor
                  </CardDescription>
                  <CardDescription>
                    Handle external purchase request with vendor
                  </CardDescription>
                  <CardDescription>
                    Review external purchase request history
                  </CardDescription>
                </List>
              </CustomCard>
            </Grid>
            <Grid item xs={4}>
              <CustomCard>
                <CardTitle>Maintenance</CardTitle>
                <List>
                  <CardDescription>
                    Take overview on maintenance request from production
                  </CardDescription>
                  <CardDescription>
                    Review incoming production maintenance request
                  </CardDescription>
                  <CardDescription>
                    Complete existing production maintenance record
                  </CardDescription>
                  <CardDescription>
                    Handle internal tool inventory
                  </CardDescription>
                  <CardDescription>
                    Send tool purchase request to purchasing department
                  </CardDescription>
                  <CardDescription>
                    Receive tool purchased and resolve purchase request
                  </CardDescription>
                </List>
              </CustomCard>
            </Grid>
            <Grid item xs={4}>
              <CustomCard>
                <CardTitle>Quality Control</CardTitle>
                <List>
                  <CardDescription>
                    Take overview on all available issue note
                  </CardDescription>
                  <CardDescription>Create new issue notes</CardDescription>
                  <CardDescription>
                    Resolve/remove existing issue note
                  </CardDescription>
                </List>
              </CustomCard>
            </Grid>
            <Grid item xs={4}>
              <CustomCard>
                <CardTitle>Sales</CardTitle>
                <List>
                  <CardSubTitle>Customer</CardSubTitle>
                  <CardDescription>Handle Customer Profile</CardDescription>
                  <CardSubTitle>Order</CardSubTitle>
                  <CardDescription>
                    Handle order with correspond customer
                  </CardDescription>
                </List>
              </CustomCard>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Divider />
      <Box my={4}>
        <Typography
          sx={{ textDecoration: "underline" }}
          variant="h2"
          gutterBottom
          component="div"
        >
          Limitation
        </Typography>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LinkOffIcon />
              </ListItemIcon>
              <ListItemText primary="This does not involve time calculation" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <LinkOffIcon />
              </ListItemIcon>
              <ListItemText primary=" This does not involve account, transport and logistic/transportation" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <LinkOffIcon />
              </ListItemIcon>
              <ListItemText primary="The interface is  not plan to be mobile friendly" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Divider />
      <Box mt={4} mb={20}>
        <Typography
          sx={{ textDecoration: "underline" }}
          variant="h2"
          gutterBottom
          component="div"
        >
          Message
        </Typography>
        <List>
          <ListItem disablePadding>
            <ListItemText primary="Thank you for pay a visit here" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Let me know if you have any opinion or page error there" />
            <ListItemIcon>
              <MoodIcon />
            </ListItemIcon>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}

export default HowTo;
