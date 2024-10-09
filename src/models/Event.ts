import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  imgSrc: { type: String, required: true },
});

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
