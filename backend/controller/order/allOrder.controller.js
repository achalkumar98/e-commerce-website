const orderModel = require("../../models/orderProductModel");
const UserModel = require("../../models/userModel");

const allOrderController = async (request, response) => {
  const userId = request.userId;

  const user = await UserModel.findById(userId);

  if (user.role !== "ADMIN") {
    return response.json({
      message: "not access",
    });
  }
  const AllOrder = await orderModel.find().sort({ createdAt: -1 });

  return response.json({
    data: AllOrder,
    success: true,
  });
};

module.exports = allOrderController;