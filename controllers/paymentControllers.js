import Room from "../models/room";

import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import absoluteUrl from "next-absolute-url";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Generate stripe checkout session   =>   /api/checkout_session/:roomId
const stripCheckoutSession = catchAsyncErrors(async (req, res) => {
  // Get room details
  const room = await Room.findById(req.query.roomId);

  const { checkInDate, checkOutDate, daysOfStay } = req.query;

  // Get origin
  const { origin } = absoluteUrl(req);

  // Create stripe checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${origin}/bookings/me`,
    cancel_url: `${origin}/room/${room._id}`,
    customer_email: req.user.email,
    client_reference_id: req.query.roomId,
    metadata: { checkInDate, checkOutDate, daysOfStay },
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: req.query.amount * 100,
          product_data: {
            name: room.name,
            images: [`${room.images[0].url}`],
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
  });

  res.status(200).json(session);
});

export { stripCheckoutSession };
