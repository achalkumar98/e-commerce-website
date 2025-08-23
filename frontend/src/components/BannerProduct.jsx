
import { useEffect, useState } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import image1 from "../assest/banner/img1.webp";
import image2 from "../assest/banner/img2.webp";
import image3 from "../assest/banner/img3.jpg";
import image4 from "../assest/banner/img4.jpg";
import image5 from "../assest/banner/img5.webp";
import image1Mobile from "../assest/banner/img1_mobile.jpg";
import image2Mobile from "../assest/banner/img2_mobile.webp";
import image3Mobile from "../assest/banner/img3_mobile.jpg";
import image4Mobile from "../assest/banner/img4_mobile.jpg";
import image5Mobile from "../assest/banner/img5_mobile.png";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const desktopImages = [image1, image2, image3, image4, image5];
  const mobileImages = [image1Mobile, image2Mobile, image3Mobile, image4Mobile, image5Mobile];

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % desktopImages.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + desktopImages.length) % desktopImages.length);

  useEffect(() => {
    const interval = setInterval(() => nextImage(), 5000);
    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className="container mx-auto px-4 rounded mt-6">
      <div className="relative h-56 md:h-72 overflow-hidden rounded-lg">
        {/* Scroll Buttons for Desktop */}
        <div className="hidden md:flex absolute top-1/2 w-full justify-between items-center z-20 px-2 -translate-y-1/2">
          <button
            onClick={prevImage}
            className="bg-white shadow-lg p-2 rounded-full hover:bg-red-600 hover:text-white transition-colors"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={nextImage}
            className="bg-white shadow-lg p-2 rounded-full hover:bg-red-600 hover:text-white transition-colors"
          >
            <FaAngleRight />
          </button>
        </div>

        {/* Desktop Carousel */}
        <div className="hidden md:flex h-full w-full">
          {desktopImages.map((img, index) => (
            <div
              key={index}
              className="w-full h-full flex-shrink-0 transition-transform duration-500"
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <img src={img} alt={`Banner ${index}`} className="w-full h-full object-cover rounded-lg" />
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="flex md:hidden h-full w-full">
          {mobileImages.map((img, index) => (
            <div
              key={index}
              className="w-full h-full flex-shrink-0 transition-transform duration-500"
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <img src={img} alt={`Banner ${index}`} className="w-full h-full object-cover rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
