import React, { Component, Fragment } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    "16 Mar, 2019",
    "Elvis Presley",
    "Tupelo, MS",
    "VISA ⠀•••• 3719",
    312.44
  ),
  createData(
    1,
    "16 Mar, 2019",
    "Paul McCartney",
    "London, UK",
    "VISA ⠀•••• 2574",
    866.99
  ),
  createData(
    2,
    "16 Mar, 2019",
    "Tom Scholz",
    "Boston, MA",
    "MC ⠀•••• 1253",
    100.81
  ),
  createData(
    3,
    "16 Mar, 2019",
    "Michael Jackson",
    "Gary, IN",
    "AMEX ⠀•••• 2000",
    654.39
  ),
  createData(
    4,
    "15 Mar, 2019",
    "Bruce Springsteen",
    "Long Branch, NJ",
    "VISA ⠀•••• 5919",
    212.79
  )
];


const preventDefault = event => {
  event.preventDefault();
};
const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  }
}));

class MetaData extends Component {
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
      let data = evt.data;
      this.setState(state => ({ payload: [data, ...state.payload] }));
      console.log(this.state.payload);
    };

    this.ws.onclose = () => {
      console.log("React WS Disconnected");
      this.setState({
        ws: new WebSocket("ws://localhost:7575")
      });
    };
  }

  render() {
    const classes = useStyles();
    // let { payload } = this.state;
    // let payloadDemo = [
    //   {
    //     "2020/01/16 12:04:30": [
    //       {
    //         "Camera Id": "lhkjcdn",
    //         Severity: 0.01581445,
    //         Activity: [{ CONDITION: "Normal", Confidence: "0.984186" }]
    //       }
    //     ]
    //   }
    // ];
    return (
      <Fragment>
        <Title>Recent Orders</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Ship To</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell align="right">Sale Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.shipTo}</TableCell>
                <TableCell>{row.paymentMethod}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className={classes.seeMore}>
          <Link color="primary" href="#" onClick={preventDefault}>
            See more orders
          </Link>
        </div>
      </Fragment>
    );
  }
}

export default MetaData;
