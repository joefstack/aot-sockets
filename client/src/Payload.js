import React from "react";

class Payload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }
  ws = new WebSocket("ws://localhost:7575");

  componentDidMount() {
    this.ws.onopen = () => {
      console.log("React WS Connected");
    };

    this.ws.onmessage = evt => {
      let message = evt.data;
      // console.log(message);
      this.setState(state => ({ messages: [message, ...state.messages] }));
      console.log(this.state.messages);
    };

    this.ws.onclose = () => {
      console.log("React WS Disconnected");
      this.setState({
        ws: new WebSocket("ws://localhost:7575")
      });
    };
  }

  render() {
    return <div></div>;
  }
}

export default Payload;
