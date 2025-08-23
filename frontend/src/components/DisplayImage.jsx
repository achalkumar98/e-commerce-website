import { IoMdClose } from "react-icons/io";

const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full p-4 mx-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-700 hover:text-red-600 transition-colors"
        >
          <IoMdClose />
        </button>

        {/* Image Container */}
        <div className="flex justify-center items-center max-h-[80vh] overflow-hidden">
          <img
            src={imgUrl}
            alt="Full Screen"
            className="object-contain w-full h-full rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
