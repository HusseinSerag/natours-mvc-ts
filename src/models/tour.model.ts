import mongoose from "mongoose";
import slugify from "slugify";

interface TourDocument {
  name: string;
  ratingsQuantity: number;
  ratingsAverage: number;
  price: number;
  duration: number;
  maxGroupSize: number;
  difficulty: "medium" | "easy" | "difficult";
  discount: number;
  summary: string;
  description: string;
  imageCover: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  startDates: Date[];
  slug: string;
  secretTour: boolean;
}
const tourSchema = new mongoose.Schema<TourDocument>(
  {
    name: {
      type: String,
      required: [true, "A tour must have a name"],
      unique: true,
      trim: true,
      maxlength: [40, "A name should be at most 40 characters"],
      minlength: [10, "A name should be at least 10 characters"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A tour must have a  group size"],
    },
    difficulty: {
      type: String,
      required: [true, "A tour must have a difficulty"],
      enum: {
        values: ["medium", "easy", "difficult"],
        message:
          "A tour must only be of easy or medium or difficult difficulty!",
      },
    },
    duration: {
      type: Number,
      required: [true, "A tour must have a duration"],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "The minimum rating is 1!"],
      max: [5, "The maximum rating is 5!"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },

    price: {
      type: Number,
      required: [true, "A tour must have a price"],
    },
    discount: {
      type: Number,
    },
    summary: {
      type: String,
      trim: true,
      required: [true, "A tour must have a summary"],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "A tour msut have a cover image"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    startDates: [Date],
    slug: String,
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

tourSchema.virtual("durationWeeks").get(function (this) {
  return this.duration / 7;
});

tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

tourSchema.pre(["find", "findOne"], function (next) {
  this.find({
    secretTour: {
      $ne: true,
    },
  });
  this.select("-secretTour");

  next();
});

tourSchema.post("find", function (docs, next) {
  next();
});
tourSchema.pre("aggregate", function (next) {
  this.match({ secretTour: { $ne: true } });
  next();
});
tourSchema.pre(["findOneAndUpdate", "updateOne"], function (next) {
  this.setOptions({ new: true });
  next();
});

const Tour = mongoose.model<TourDocument>("Tour", tourSchema);

export default Tour;
