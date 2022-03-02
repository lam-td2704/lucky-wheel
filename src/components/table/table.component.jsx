import React, { Component } from "react";
import "./table.styles.css";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: this.props.columns,
      rows: this.props.rows,
    };
  }

  _head = () => {
    let cols = Object.values(this.state.columns).map((obj) => {
      return <th>{obj}</th>;
    });
    return cols;
  };

  _rows = () => {
    let cols = Object.keys(this.state.columns);
    return this.state.rows.map((row, idx) => {
      let a = cols.map((col) => {
        return <td>{row[col]}</td>;
      });
      return <tr key={idx}>{a}</tr>;
    });
  };

  render() {
    return (
      <table className="responsive-table">
        <tr>{this._head()}</tr>
        {this._rows()}
      </table>
    );
  }
}
export default Table;
