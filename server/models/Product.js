const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  sellingprice: {
    type: Number,
    required: true,
  },
  actualprice: {
    type: Number,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  sizes: [
    {
      type: String,
      required: true,
    },
  ],
  category: {
    type: String,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
  },
  deliveryDate: {
    type: Date,
    default: () => {
      const today = new Date();
      today.setDate(today.getDate() + 5);
      return today;
    },
  },
});
