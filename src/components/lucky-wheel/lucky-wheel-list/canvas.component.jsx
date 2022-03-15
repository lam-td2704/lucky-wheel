import React, { Component, createRef } from "react";

class CanvasLuckyContainer extends Component {
  constructor(props) {
    super(props);
    this.canvas = createRef();
  }

  componentDidMount() {
    const canvas = this.canvas.current;
    const ctx = canvas.getContext("2d");
    this.props.draw(ctx);
  }
  
  render() {
    return (
      <canvas
        ref={this.canvas}
        width={this.props.width}
        height={this.props.height}
        style={this.props.style}
      >
        {this.props.children}
      </canvas>
    );
  }
}

export default CanvasLuckyContainer;
