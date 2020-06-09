const { Schema, model } = require("mongoose");

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    weight: {
        type:Number,
        required:false
    }
  },
  {
    timestamps: true
  }
);

module.exports = model("Category",CategorySchema);
