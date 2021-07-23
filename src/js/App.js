import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
// import { notifier } from 'node-notifier';
import socketIOClient from "socket.io-client";

export default function App() {
  const ENDPOINT =
    window.location.host.indexOf("localhost") >= 0
      ? "http://127.0.0.1:5000"
      : window.location.host;

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!socket) {
      // console.log("useEffect in Room Screen :");

      const sk = socketIOClient(ENDPOINT);

      setSocket(sk);

      // sk.emit("chooseRoom", roomId);

      // console.log(` sk.emit("chooseRoom", {roomId})`);

      // console.log("room.roomId :", roomId);

      sk.on("onClick", (data) => {
        console.log("data :", data);
      });
    }
  }, [socket]);

  const [lengthFaliure, setLengthFaliure] = useState(false);
  const [lengthSuccess, setLengthSuccess] = useState(true);
  const [alert, setAlert] = useState(true);
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  }));

  const classes = useStyles();

  // notifier.notify({
  //   title: "My notification",
  //   message: "Hello, there!",
  // });
  return (
    <>
      <h1> hi I am App Component!!!</h1>
      <button
        onClick={() => {
          // electron.notificationApi.sendNotification("My custom notification!");
          setLengthFaliure((prev) => !prev);
          setAlert(true);
        }}
      >
        Notify
      </button>

      <div className={classes.root}>
        {lengthFaliure && (
          <>
            <Alert severity="error" onClick={() => setAlert((prev) => !prev)}>
              This is an error alert — check it out! {lengthFaliure}{" "}
            </Alert>
            {alert && (
              <>
                {electron.notificationApi.sendNotification("OTDR Fail at!")};
                <div className="alert" style={{ display: "none" }}>
                  <AudioPlayer
                    autoPlay
                    loop
                    showJumpControls={false}
                    showDownloadProgress={false}
                    showFilledProgress={false}
                    hasDefaultKeyBindings={false}
                    src="a1.mp3"
                    onPlay={(e) => console.log("onPlay")}

                    // other props here
                  />
                </div>
              </>
            )}
          </>
        )}
        {/* <Alert severity="warning">This is a warning alert — check it out!</Alert>
      <Alert severity="info">This is an info alert — check it out!</Alert> */}
        {lengthSuccess && (
          <Alert severity="success">
            This is a success alert — check it out {lengthSuccess}!
          </Alert>
        )}
      </div>
    </>
  );
}
