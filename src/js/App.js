import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
// import { notifier } from 'node-notifierrr';
import socketIOClient from "socket.io-client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeMute, faVolumeUp } from "@fortawesome/free-solid-svg-icons";

const ENDPOINT = "http://192.168.1.218:5000";

export default function App() {
  const [socket, setSocket] = useState(null);

  const [lengthFaliure, setLengthFaliure] = useState(false);
  const [lengthSuccess, setLengthSuccess] = useState(false);
  const [noFiber, setNoFiber] = useState(false);
  const [errorReq, setErrorReq] = useState(false);

  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (!socket) {
      // console.log("useEffect in Room Screen :");

      const sk = socketIOClient(ENDPOINT);

      setSocket(sk);

      // sk.emit("chooseRoom", roomId);

      // console.log(` sk.emit("chooseRoom", {roomId})`);

      // console.log("room.roomId :", roomId);

      // sk.on("onFiberChange", (data) => {
      //   console.log("onFiberChange");
      //   console.log("data :", data);
      //   if (data.type === "faliure") {
      //     setLengthFaliure(data.length);
      //     setLengthSuccess(false);
      //     setAlert(true);
      //   }

      //   else if (data.type === "success") {
      //     setLengthFaliure(false);
      //     setLengthSuccess(data.length);
      //     setAlert(false);
      //   }
      // });

      sk.on("onFiberChange", (data) => {
        console.log("onFiberChange");
        // console.log("data :", data);

        if (data.type === "success") {
          // console.log("data :", data);
          setLengthFaliure(false);
          setLengthSuccess(data.length);
          setNoFiber(false);
          setErrorReq(false);
          setAlert(false);
        } else {
          if (data.type === "noFiber") {
            setLengthFaliure(false);
            setLengthSuccess(false);
            setNoFiber(true);
            setErrorReq(false);

            setAlert(true);
          } else if (data.type === "faliure") {
            setLengthFaliure(data.length);
            setLengthSuccess(false);
            setNoFiber(false);
            setErrorReq(false);

            setAlert(true);
          }
        }
      });

      sk.on("onError", (data) => {
        console.log("onError");

        setLengthFaliure(false);
        setLengthSuccess(false);
        setNoFiber(false);
        setErrorReq(data.message);

        setAlert(false);
        // setData(data);
      });

      sk.on("onVolumeMute", () => {
        console.log("onVolumeMute");

        setAlert(false);
        // setData(data);
      });
    }
  }, [socket]);

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  }));

  const classes = useStyles();

  return (
    <>
      <div
        style={{
          backgroundImage: `url(images/fiber1.jpg)`,
          height: "640px",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "relative",
        }}
      >
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="sm">
            <h1 className="rainbow-text">OTDR Test </h1>

            <Typography component="div">
              {/* <button
        onClick={() => {
          // electron.notificationApi.sendNotification("My custom notification!");
          setLengthFaliure((prev) => !prev);
          setAlert(true);
        }}
      >
        Notify
      </button> */}

              <div className={classes.root}>
                {errorReq && (
                  <>
                    <Alert className="alert-fail" severity="error">
                      OTDR Error in request - {errorReq}!
                      {alert ? (
                        <>
                          {" "}
                          <FontAwesomeIcon
                            className="vol-icon"
                            icon={faVolumeUp}
                            size="2x"
                            onClick={() => setAlert(false)}
                          />
                        </>
                      ) : (
                        <>
                          {" "}
                          <FontAwesomeIcon
                            className="vol-icon"
                            icon={faVolumeMute}
                            size="2x"
                            onClick={() => setAlert(true)}
                          />
                        </>
                      )}
                    </Alert>

                    {alert && (
                      <>
                        {/* {electron.notificationApi.sendNotification("OTDR Fail at!")}; */}
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

                {noFiber && (
                  <>
                    <Alert className="alert-fail" severity="error">
                      OTDR Faliure - no fiber!
                      {alert ? (
                        <>
                          {" "}
                          <FontAwesomeIcon
                            className="vol-icon"
                            icon={faVolumeUp}
                            size="2x"
                            onClick={() => setAlert(false)}
                          />
                        </>
                      ) : (
                        <>
                          {" "}
                          <FontAwesomeIcon
                            className="vol-icon"
                            icon={faVolumeMute}
                            size="2x"
                            onClick={() => setAlert(true)}
                          />
                        </>
                      )}
                    </Alert>

                    {alert && (
                      <>
                        {/* {electron.notificationApi.sendNotification("OTDR Fail at!")}; */}
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

                {lengthFaliure && (
                  <>
                    <Alert className="alert-fail" severity="error">
                      OTDR Faliure - fiber break at {lengthFaliure} meter!
                      {alert ? (
                        <>
                          {" "}
                          <FontAwesomeIcon
                            className="vol-icon"
                            icon={faVolumeUp}
                            size="2x"
                            onClick={() => setAlert(false)}
                          />
                        </>
                      ) : (
                        <>
                          {" "}
                          <FontAwesomeIcon
                            className="vol-icon"
                            icon={faVolumeMute}
                            size="2x"
                            onClick={() => setAlert(true)}
                          />
                        </>
                      )}
                    </Alert>

                    {alert && (
                      <>
                        {/* {electron.notificationApi.sendNotification("OTDR Fail at!")}; */}
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
                    OTDR Success — fiber length: {lengthSuccess} meter
                  </Alert>
                )}
              </div>
            </Typography>
          </Container>
        </React.Fragment>
      </div>
    </>
  );
}
