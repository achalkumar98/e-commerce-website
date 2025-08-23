import BannerProduct from "../components/BannerProduct";
import CategoryList from "../components/CategoryList";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

const Home = () => {
  return (
    <div className="pt-6">
      <CategoryList />
      <BannerProduct />

      {/* Horizontal Cards */}
      <HorizontalCardProduct category="airpodes" heading="Top Airpodes" />
      <HorizontalCardProduct category="watches" heading="Popular Watches" />

      {/* Vertical Cards */}
      <VerticalCardProduct category="mobiles" heading="Mobiles" />
      <VerticalCardProduct category="mouse" heading="Mouse" />
      <VerticalCardProduct category="televisions" heading="Televisions" />
      <VerticalCardProduct category="camera" heading="Camera & Photography" />
      <VerticalCardProduct category="earphones" heading="Wired Earphones" />
      <VerticalCardProduct category="speakers" heading="Bluetooth Speakers" />
      <VerticalCardProduct category="refrigerator" heading="Branded Refrigerators" />
      <VerticalCardProduct category="trimmers" heading="Chargeable Trimmers" />
    </div>
  );
};

export default Home;
