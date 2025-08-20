import BannerProduct from "../components/BannerProduct";
import CategoryList from "../components/CategoryList";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

const Home = () => {
  return (
  <div>
  <CategoryList />
  <BannerProduct />
  <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"} />
  <HorizontalCardProduct category={"watches"} heading={"Popular's Watches"} />
  <VerticalCardProduct category={"mobiles"} heading={"Mobiles"} />
  <VerticalCardProduct category={"mouse"} heading={"Mouse"} />
  <VerticalCardProduct category={"televisions"} heading={"Television's"} />
  <VerticalCardProduct category={"camera"} heading={"Camera & Photography"} />
  <VerticalCardProduct category={"earphones"} heading={"Wired Earphone's"} />
  <VerticalCardProduct category={"speakers"} heading={"Bluetooth Speaker's"} />
  <VerticalCardProduct category={"refrigerator"} heading={"Branded Refrigerator's"} />
  <VerticalCardProduct category={"trimmers"} heading={"Chargeable Trimmers"} />
  </div>

)};

export default Home;
