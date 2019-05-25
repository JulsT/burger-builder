import React, { Component } from "react";
import OrderInfo from "../../components/OrderInfo/OrderInfo";
import axios from "../../axios-orders";
import Loader from "../../components/Loader/Loader";
import { connect } from "react-redux";
import { toast } from "react-toastify";

class OrdersPage extends Component {
  state = { orders: [], loading: false };
  componentDidMount() {
    this.setState({ loading: true });
    const orders = [];
    toast.dismiss();
    const queryParams = `?auth=${this.props.token}&orderBy="userId"&equalTo="${
      this.props.userId
    }"`;
    axios
      .get("/orders.json" + queryParams)
      .then(resp => {
        for (let [key, value] of Object.entries(resp.data)) {
          orders.push(
            Object.assign(
              {},
              { ing: value.ingredients, price: +value.price, id: key }
            )
          );
        }
        this.setState({ orders, loading: false });
      })
      .catch(e => {
        console.log(e);
        toast.error(e.message, { autoClose: 5000 });
        this.setState({ loading: false });
      });
  }
  render() {
    let orders = (
      <React.Fragment>
        {this.state.orders.map(order => (
          <OrderInfo
            key={order.id}
            ingredients={order.ing}
            price={order.price.toFixed(2)}
          />
        ))}
      </React.Fragment>
    );
    if (this.state.loading) {
      orders = <Loader />;
    }
    return (
      <div>
        <h2>My Orders:</h2>
        {orders}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId
  };
};
export default connect(mapStateToProps)(OrdersPage);
