const Room = require("../models/room");
const mongoose = require("mongoose");

const rooms = require("../data/rooms");

mongoose
  .connect(
    "mongodb+srv://marti:MeDHsKXrNpvdmyZ7@cluster0.ooeshmn.mongodb.net/bookit?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to local database"));

const seedRooms = async () => {
  try {
    await Room.deleteMany();
    console.log("Rooms are deleted");

    await Room.insertMany(rooms);
    console.log("Rooms are inserted");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedRooms();
