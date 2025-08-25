const stripe = require("../../config/stripe");
const UserModel = require("../../models/userModel");

const paymentController = async (req, res) => {
  try {
    const { cartItems } = req.body;

    // Get user from database
    const user = await UserModel.findOne({ _id: req.userId });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    // Prepare Stripe line_items
    const line_items = cartItems.map((item) => {
      // Ensure images is a non-empty array
      const images = Array.isArray(item.productId.productImage)
        ? item.productId.productImage.filter(img => img) // remove empty strings
        : item.productId.productImage
          ? [item.productId.productImage]
          : [];

      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.productId.productName,
            images: images,
            metadata: {
              productId: item.productId._id.toString(),
            },
          },
          unit_amount: item.productId.selling * 100,
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
        quantity: item.quantity,
      };
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [
        {
          shipping_rate: "shr_1RzZa0CDWWzVafeONpxgCeal", // use your shipping rate ID
        },
      ],
      customer_email: user.email,
      metadata: {
        userId: req.userId, // fixed typo
      },
      line_items: line_items,
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.json({
      message: "Checkout session created successfully",
      sessionId: session.id,
      success: true,
      error: false,
    });

  } catch (err) {
    console.error("Payment Controller Error:", err);
    res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = paymentController;
