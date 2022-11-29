import * as React from "react";
import Cookies from "universal-cookie";
import { format } from "date-fns";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import useWindowSize from "../../customHook/useWindowSize";

export default function Messages({ user, socket, allMessages, setUser }) {
  const cookies = new Cookies();
  const [messages, setMessages] = React.useState([]);
  const { width } = useWindowSize();

  React.useEffect(() => {
    if (allMessages) {
      socket.emit("getAllMessages", cookies.get("user_id_task7"));
    }
    return () => socket.off("getAllMessages");
  });

  React.useEffect(() => {
    if (allMessages) {
      socket.on("getAllMessages", (data) => {
        setMessages(data);
      });
    }
    return () => socket.off("getAllMessages");
  });

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
            {allMessages ? "All received messages" : "Previous sent Messages"}
          </Typography>
          <hr className="text-slate-600" />
          <List>
            {allMessages
              ? messages?.map((data, idx) => {
                  return (
                    <div className="mb-1" key={idx}>
                      <ListItem
                        style={{ background: "#435e81" }}
                        className=" text-gray-200"
                        secondaryAction={
                          <>
                            {width > 800
                              ? format(
                                  new Date(data.createdAt),
                                  "hh:mm a (MMM do. yyyy)"
                                )
                              : ""}
                          </>
                        }
                      >
                        <ListItemAvatar>
                          <FolderIcon className="text-white" />
                        </ListItemAvatar>
                        <ListItemText>
                          <h3>
                            <span className="text-blue-300 mr-2 font-bold italic">
                              from:
                            </span>
                            <span className="italic">{data.from}</span>
                          </h3>
                          <h3>
                            <span className="text-gray-400 mr-2 font-bold italic">
                              about:
                            </span>
                            <span className="italic">{data.title}</span>
                          </h3>
                          <p>
                            <span className="text-gray-800 mr-2 font-bold italic">
                              message:
                            </span>
                            <span className="italic">{data.body}</span>
                          </p>
                        </ListItemText>
                      </ListItem>
                    </div>
                  );
                })
              : user?.message?.map((data, idx) => {
                  return (
                    <div className="mb-1" key={idx}>
                      <ListItem
                        style={{ background: "#435e81" }}
                        className=" text-gray-200"
                        secondaryAction={
                          <>
                            {width > 800
                              ? format(
                                  new Date(data.createdAt),
                                  "hh:mm a (MMM do. yyyy)"
                                )
                              : ""}
                          </>
                        }
                      >
                        <ListItemAvatar>
                          <FolderIcon className="text-white" />
                        </ListItemAvatar>
                        <ListItemText>
                          <h3>
                            <span className="text-blue-300 mr-2 font-bold italic">
                              to:
                            </span>
                            <span className="italic">{data.recipient}</span>
                          </h3>
                          <h3>
                            <span className="text-gray-400 mr-2 font-bold italic">
                              about:
                            </span>
                            <span className="italic">{data.title}</span>
                          </h3>
                          <p>
                            <span className="text-gray-800  mr-2 font-bold italic">
                              message:
                            </span>
                            <span className="italic">{data.body}</span>
                          </p>
                        </ListItemText>
                      </ListItem>
                    </div>
                  );
                })}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}
