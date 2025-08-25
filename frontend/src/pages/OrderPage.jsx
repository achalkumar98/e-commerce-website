import { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Summary_API from "../utils/constants";
import displayINRCurrency from "../helpers/displayCurrency";

dayjs.extend(utc);
dayjs.extend(timezone);

const OrderPage = () => {
  const [data, setData] = useState([]);

  const fetchOrderDetails = async () => {
    const response = await fetch(Summary_API.getOrder.url, {
      method: Summary_API.getOrder.method,
      credentials: "include",
    });
    const responseData = await response.json();
    setData(responseData.data || []);
    console.log("order list", responseData);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  if (!data.length) return <p className="text-center py-8">No Order available</p>;

  return (
    <div className="p-4 w-full flex flex-col gap-6">
      {data.map((item, index) => (
        <div key={String(item.userId) + index} className="border border-gray-300 rounded p-4">
          <p className="font-medium text-lg">
            {dayjs.utc(item.createdAt).tz("Asia/Kolkata").format("D MMMM YYYY, h:mm A")}
          </p>

          <div className="flex flex-col lg:flex-row justify-between mt-2 gap-4">
            <div className="grid gap-2">
              {item.productDetails.map((product, idx) => (
                <div key={String(product.productId) + idx} className="flex gap-3 bg-slate-100 p-2 rounded">
                  <img
                    src={product.image?.[0] || '/fallback.jpg'}
                    alt={product.name}
                    className="w-28 h-28 object-scale-down"
                  />
                  <div>
                    <div className="font-medium text-lg line-clamp-1">{product.name}</div>
                    <div className="flex items-center gap-5 mt-1">
                      <div className="text-lg text-red-500">{displayINRCurrency(product.price)}</div>
                      <p>Qty: {product.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 min-w-[250px]">
              <div>
                <p className="text-lg font-medium">Payment Details:</p>
                <p className="ml-1">Method: {item.paymentDetails.payment_method_type[0]}</p>
                <p className="ml-1">Status: {item.paymentDetails.payment_status}</p>
              </div>
              <div>
                <p className="text-lg font-medium">Shipping Details:</p>
                {item.shipping_options.map((s, idx) => (
                  <p key={s.shipping_rate || idx} className="ml-1">
                    Shipping Amount: {displayINRCurrency(s.shipping_amount)}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="font-semibold mt-2 ml-auto w-fit text-lg">
            Total Amount: {displayINRCurrency(item.totalAmount)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderPage;
