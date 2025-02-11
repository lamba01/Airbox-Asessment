import { useState, useEffect, forwardRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import DeleteModal from "./ui/DeleteModal";
import { useNavigate } from "react-router-dom";

const Booking = forwardRef((props, ref) => {
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editBooking, setEditBooking] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

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
      const response = await fetch("http://localhost:5000/api/bookings/user", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user bookings");
      }

      const data = await response.json();
      setBookings(data.bookings);
    } catch (error) {
      console.error("Error fetching user bookings:", error);
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
      navigate("/login");
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
      setShowSuccessModal(true); // Show the success modal
      // Hide the modal after 3 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
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
      await axios.delete(
        `http://localhost:5000/api/bookings/${selectedBookingId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

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
    <div ref={ref} className="mx-auto bg-[#E8A9C3] shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold capitalize text-center py-6">
        Book an Appointment
      </h2>
      <div className="flex sm:flex-row flex-col items-center w-screen justify-around pb-6">
        {/* Calendar */}
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileClassName={({ date }) =>
            isDateBooked(date) ? "bg-red-500 text-white" : "bg-green-200"
          }
        />

        <form
          onSubmit={handleSubmit}
          className="space-y-4 mt-4 w-5/6 sm:w-2/5 text-end"
        >
          {/* Service Dropdown */}
          <div>
            <label className="block font-medium text-start">Service</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-200"
            >
              <option value="Haircut">Haircut</option>
              <option value="Lashes & brows">Lashes & brows</option>
              <option value="Makeup">Makeup</option>
              <option value="Manicure">Manicure</option>
            </select>
          </div>

          {/* Time Slot */}
          <div>
            <label className="block font-medium text-start">Time Slot</label>
            <input
              type="time"
              name="timeSlot"
              placeholder="e.g. 10:00 AM"
              value={formData.timeSlot}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-200"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block font-medium text-start">Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-200"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 px-6 py-2 text-sm font-medium bg-transparent cursor-pointer text-[#A10550] hover:text-white border-[#A10550] border-2 hover:border-[#A10550] rounded-sm hover:bg-[#A10550]"
          >
            Book Now
          </button>
        </form>
      </div>

      <div className="bg-gray-200 p-5 overflow-auto max-w-full">
        <h3 className="text-2xl font-bold capitalize py-6">Your Bookings</h3>
        <table className="w-full mt-4 border bg-gray-200">
          <thead>
            <tr>
              <th className="p-2">Service</th>
              <th className="p-2">Date</th>
              <th className="p-2">Time Slot</th>
              <th className="p-2">Price</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => {
                const bookingDate = new Date(booking.date);
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const isPastBooking = bookingDate < today;
                const isDisabled =
                  isPastBooking ||
                  ["Confirmed", "Canceled"].includes(booking.status);

                return (
                  <tr key={booking._id} className="text-center border-b">
                    <td className="p-2">{booking.service}</td>
                    <td className="p-2">{bookingDate.toLocaleDateString()}</td>
                    <td className="p-2">{booking.timeSlot}</td>
                    <td className="p-2">${booking.price}</td>
                    <td className="p-2">{booking.status}</td>
                    <td className="p-2 flex justify-center gap-2">
                      {/* Edit Button */}
                      <button
                        className={`px-4 py-1 rounded cursor-pointer hover:opacity-40 ${
                          isDisabled
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600 text-white"
                        }`}
                        onClick={() => !isDisabled && handleEdit(booking)}
                        disabled={isDisabled}
                      >
                        Edit
                      </button>

                      {/* Cancel Button */}
                      <button
                        className={`px-4 py-1 rounded cursor-pointer  hover:opacity-40 ${
                          isDisabled
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600 text-white"
                        }`}
                        onClick={() => !isDisabled && handleCancel(booking._id)}
                        disabled={isDisabled}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/70">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-green-600 font-semibold text-lg">
              Booking Successful!
            </h2>
            <p>Your appointment has been booked.</p>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
        />
      )}

      {editBooking && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
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
                  className="order-2 mt-6 px-6 py-2 text-sm font-medium bg-transparent cursor-pointer text-[#A10550] hover:text-white border-[#A10550] border-2 hover:border-[#A10550] rounded-sm hover:bg-[#A10550]"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditBooking(null)}
                  className="order-1 mt-6 px-6 py-2 text-sm font-medium bg-red-500 cursor-pointer text-white rounded-sm transition-opacity duration-300 hover:opacity-40"
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
});

//Add a display name to avoid warnings
Booking.displayName = "Booking";
export default Booking;
