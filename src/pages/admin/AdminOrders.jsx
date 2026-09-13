import React from "react";
import { useOrders, DELIVERY_STAGES } from "../../context/OrderContext.jsx";
import { formatINR, formatDate } from "../../utils/format.js";

export default function AdminOrders() {
  const { orders, updateStatus } = useOrders();

  return (
    <div className="admin-page">
      <h1>Orders &amp; delivery</h1>
      {orders.length === 0 ? (
        <p className="admin-note">No orders placed yet.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Placed</th><th>Delivery status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>
                    <strong>{o.id}</strong>
                    <div className="muted-sm">Ticket {o.ticketNumber}</div>
                  </td>
                  <td>
                    {o.address.fullName}
                    <div className="muted-sm">{o.address.city}, {o.address.state}</div>
                  </td>
                  <td>{o.items.length}</td>
                  <td>{formatINR(o.total)}</td>
                  <td>{formatDate(o.createdAt)}</td>
                  <td>
                    <select value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)}>
                      {DELIVERY_STAGES.map((stage) => <option key={stage} value={stage}>{stage}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
