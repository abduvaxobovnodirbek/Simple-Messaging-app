import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import StarIcon from "@mui/icons-material/Star";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";

function generate(element) {
  return [0, 1, 2, 3].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

export default function Messages() {
  return (
    <Box className="container px-2">
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Typography
            sx={{ mb: 1 }}
            variant="h6"
            component="h3"
            className="text-slate-600 font-bold italic"
          >
            All messages list
          </Typography>
          <hr className="text-slate-600" />
          <List>
            {generate(
              <div className="mb-1">
                <ListItem
                  style={{ background: "#435e81" }}
                  className=" text-gray-200"
                  secondaryAction={
                    <>
                      Nov 12 14:40
                      <IconButton edge="end" aria-label="delete">
                        <StarIcon className=" text-yellow-500" />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemAvatar>
                    <FolderIcon className="text-white" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Single-line item"
                    secondary={"Secondary text"}
                  />
                </ListItem>
              </div>
            )}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}
