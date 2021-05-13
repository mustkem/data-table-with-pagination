import React, { Component } from "react";
import { Link } from "react-router-dom";

class tableItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { item, index } = this.props;
    return (
      <tr>
        <td>
          <Link to={"/user/" + item.id}>U-{item.id}</Link>
        </td>
        <td> {item.name}</td>
        <td> {item.email}</td>
        <td> {item.username}</td>
        <td> {item.website}</td>
        <td>{item.phone}</td>
        <td>{item.address.city}</td>
        <td> {item.company.name}</td>
      </tr>
    );
  }
}

export default tableItem;
