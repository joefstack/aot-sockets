import React from "react";
// import Link from "@material-ui/core/Link";
// import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./pages/Title";

class Payload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payload: []
    };
  }
  ws = new WebSocket("ws://localhost:7575");

  componentDidMount() {
    this.ws.onopen = () => {
      console.log("React WS Connected");
    };

    this.ws.onmessage = evt => {
      let data = JSON.parse(evt.data);
      // console.log(message);
      this.setState(state => ({ payload: [data, ...state.payload] }));
      // console.log(this.state.payload);
    };

    this.ws.onclose = () => {
      console.log("React WS Disconnected");
      this.setState({
        ws: new WebSocket("ws://localhost:7575")
      });
    };

    // let sampleData = [
    //   {
    //     TimeStamp: "2020/01/16 14:23:56",
    //     CameraId: "lhkjcdn",
    //     Severity: 0.4352075,
    //     Activity: [{ CONDITION: "Normal", Confidence: "0.564793" }]
    //   }
    // ];
    // sampleData.map(data => {
    //   console.log(data.Activity[0]);
    //   return data;
    // });
  }

  render() {
    let { payload } = this.state;
    console.log(payload);
    return (
      <React.Fragment>
        <Title>Aot MetaData</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>CameraID</TableCell>
              <TableCell>Severity</TableCell>
              <TableCell>Condition</TableCell>
              <TableCell>Confidence</TableCell>
              <TableCell align="right">Time Stamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payload.map(row => (
              <TableRow key={row.cameraId}>
                <TableCell>{row.CameraId}</TableCell>
                <TableCell>{row.Severity}</TableCell>
                <TableCell>{row.Activity[0].CONDITION}</TableCell>
                <TableCell>{row.Activity[0].Confidence}</TableCell>
                <TableCell align="right">{row.TimeStamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

export default Payload;
