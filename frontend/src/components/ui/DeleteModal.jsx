import PropTypes from "prop-types";

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Confirm Cancellation</h2>
        <p>Are you sure you want to cancel this booking?</p>
        <div className="flex justify-end mt-4">
          <button className="bg-gray-300 px-4 py-2 rounded mr-2" onClick={onClose}>
            No, Keep it
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onConfirm}>
            Yes, Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// **Props Validation**
DeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default DeleteModal;

  