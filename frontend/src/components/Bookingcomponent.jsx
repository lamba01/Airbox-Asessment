import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import DeleteModal from "./ui/DeleteModal";


const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editBooking, setEditBooking] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const [formData, setFormData] = useState({
    service: "Haircut",
    timeSlot: "",
    price: "",
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId"); // Ensure you store userId in localStorage
  
    if (!userId) {
      alert("User not authenticated");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          date: selectedDate,
          user: userId, // ✅ Send user ID
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "Booking failed");
        return;
      }
  
      const newBooking = await response.json();
      setBookings([...bookings, newBooking]);
      setFormData({ service: "Haircut", timeSlot: "", price: "" });


    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };
  
  const isDateBooked = (date) => {
    return bookings.some((booking) => {
      return new Date(booking.date).toDateString() === date.toDateString();
    });
  };  
  
const handleEdit = (booking) => {
    setEditBooking(booking);    
  };
  
  const updateBooking = async (updatedBooking) => {
    const token = localStorage.getItem("token"); // Retrieve the JWT token
    if (!token) {
      alert("You must be logged in to update a booking.");
      return;
    }
  
    try {
      await axios.put(
        `http://localhost:5000/api/bookings/${updatedBooking._id}`,
        updatedBooking,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send token for authentication
          },
        }
      );
      alert("Booking updated successfully!");
      setEditBooking(null);
      fetchBookings(); // Refresh bookings
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
    }
  };
  
const handleCancel = async (bookingId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to cancel a booking.");
      return;
    }

    // Show delete confirmation modal
    setSelectedBookingId(bookingId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedBookingId) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/bookings/${selectedBookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Booking canceled successfully!");
      fetchBookings(); // Refresh bookings
    } catch (error) {
      console.error("Cancel failed:", error.response?.data || error.message);
    } finally {
      setShowDeleteModal(false);
      setSelectedBookingId(null);
    }
  };


  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Book an Appointment</h2>

      {/* Calendar */}
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileClassName={({ date }) =>
          isDateBooked(date) ? "bg-red-500 text-white" : "bg-green-200"
        }
      />

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        {/* Service Dropdown */}
        <div>
          <label className="block font-medium">Service</label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Haircut">Haircut</option>
            <option value="Lashes & brows">Lashes & brows</option>
            <option value="Makeup">Makeup</option>
            <option value="Manicure">Manicure</option>
          </select>
        </div>

        {/* Time Slot */}
        <div>
          <label className="block font-medium">Time Slot</label>
          <input
            type="time"
            name="timeSlot"
            placeholder="e.g. 10:00 AM"
            value={formData.timeSlot}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium">Price ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Book Now
        </button>
      </form>

      <h3 className="text-lg font-semibold mt-6">Your Bookings</h3>

<table className="w-full mt-4 border">
  <thead>
    <tr className="bg-gray-200">
      <th className="p-2">Service</th>
      <th className="p-2">Date</th>
      <th className="p-2">Time Slot</th>
      <th className="p-2">Price</th>
      <th className="p-2">Status</th>
      <th className="p-2">Actions</th> {/* NEW COLUMN */}
    </tr>
  </thead>
  <tbody>
    {bookings.length > 0 ? (
      bookings.map((booking) => (
        <tr key={booking._id} className="text-center border-b">
          <td className="p-2">{booking.service}</td>
          <td className="p-2">{new Date(booking.date).toLocaleDateString()}</td>
          <td className="p-2">{booking.timeSlot}</td>
          <td className="p-2">${booking.price}</td>
          <td className="p-2">{booking.status}</td>
          <td className="p-2 flex justify-center gap-2">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => handleEdit(booking)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => handleCancel(booking._id)}
            >
              Cancel
            </button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="6" className="p-4 text-center">No bookings found.</td>
      </tr>
    )}
  </tbody>
</table>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
        />
      )}

{editBooking && (
  <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
    <div className="bg-white p-6 rounded shadow-lg w-96">
      <h3 className="text-lg font-semibold">Edit Booking</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateBooking(editBooking);
        }}
        className="space-y-4 mt-4"
      >
        {/* Service Dropdown */}
        <div>
          <label className="block font-medium">Service</label>
          <select
            name="service"
            value={editBooking.service}
            onChange={(e) =>
              setEditBooking({ ...editBooking, service: e.target.value })
            }
            className="w-full p-2 border rounded"
          >
            <option value="Haircut">Haircut</option>
            <option value="Lashes & brows">Lashes & brows</option>
            <option value="Makeup">Makeup</option>
            <option value="Manicure">Manicure</option>
          </select>
        </div>

        {/* Time Slot */}
        <div>
          <label className="block font-medium">Time Slot</label>
          <input
            type="time"
            name="timeSlot"
            value={editBooking.timeSlot}
            onChange={(e) =>
              setEditBooking({ ...editBooking, timeSlot: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium">Price ($)</label>
          <input
            type="number"
            name="price"
            value={editBooking.price}
            onChange={(e) =>
              setEditBooking({ ...editBooking, price: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setEditBooking(null)}
            className="bg-gray-500 text-white px-3 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
};

export default Booking;
