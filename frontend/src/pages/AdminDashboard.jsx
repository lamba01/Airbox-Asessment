import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    peakTimes: [],
  });
  const [role, setRole] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    fetchBookings();
    fetchMetrics();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve stored token
      const response = await axios.get("http://localhost:5000/api/bookings", {
        headers: { Authorization: `Bearer ${token}` }, // Attach token
      });
      console.log(response.data.bookings)
      setBookings(response.data.bookings); // Ensure it's always an array
      setRole(response.data.role || null);
    } catch (error) {
      console.error("Error fetching bookings:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Redirect non-admin users
  useEffect(() => {
    if (role === "admin") return; // Allow access if admin
  
    if (role && role !== "admin") {
      navigate("/"); // Redirect only if role is explicitly non-admin
    }
  }, [role, navigate]);
  


  const fetchMetrics = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/dashboard/metrics", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMetrics(response.data);
    } catch (error) {
      console.error("Error fetching metrics", error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/bookings/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update state
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b))
      );
    } catch (error) {
      console.error("Error updating booking status:", error.response?.data || error.message);
    }
  };

  const chartData = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [
      {
        label: "Bookings per Day",
        data: bookings.reduce((acc, booking) => {
          const dayIndex = new Date(booking.date).getDay();
          acc[dayIndex] += 1;
          return acc;
        }, [0, 0, 0, 0, 0, 0, 0]), // Only real data, no dummy fallback
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-500 text-white rounded-lg shadow-md">
          Total Bookings: {metrics.totalBookings}
        </div>
        <div className="p-4 bg-green-500 text-white rounded-lg shadow-md">
          Weekly Revenue: ${metrics.totalRevenue}
        </div>
        <div className="p-4 bg-yellow-500 text-white rounded-lg shadow-md">
          Peak Slot: {metrics.peakTimes.length ? metrics.peakTimes[0]._id : "N/A"}
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <Bar data={chartData} />
      </div>

      {/* Bookings Table */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-3">Upcoming Bookings</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">User</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border">
                  <td className="border p-2">{booking.user.name}</td>
                  <td className="border p-2">{new Date(booking.date).toLocaleDateString()}</td>
                  <td className="border p-2">{booking.status}</td>
                  <td className="border p-2">
                    <button
                      className={`px-3 py-1 rounded mr-2 ${
                        booking.status === "Confirmed"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-500 text-white"
                      }`}
                      onClick={() => handleStatusChange(booking._id, "Confirmed")}
                      disabled={booking.status === "Confirmed"} // Disable when confirmed
                    >
                      Confirm
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleStatusChange(booking._id, "Canceled")}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
