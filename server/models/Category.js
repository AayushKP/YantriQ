const categorySchema = new mongoose.Schema(
  {
    category_name: { type: String, required: true },
  },
  { collection: "categories" }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
