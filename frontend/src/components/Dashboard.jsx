import { useEffect, useState } from "react";
import { getDashboardMetrics } from "../api/api";

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await getDashboardMetrics();
        setMetrics(data);
      } catch (err) {
        setError("Failed to load dashboard metrics.", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Dashboard Metrics</h2>
      <p><strong>Total Bookings:</strong> {metrics.totalBookings}</p>
      <p><strong>Total Revenue:</strong> ${metrics.totalRevenue}</p>
      <p><strong>Peak Hours:</strong></p>
      <ul>
        {metrics.peakTimes.map((slot, index) => (
          <li key={index}>
            {slot._id} - {slot.count} bookings
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
