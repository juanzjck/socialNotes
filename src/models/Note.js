const { Schema, model } = require("mongoose");

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required: true
    },
    categories:{
      type:Array,
      required:false
    },
    score:{
      type:Number,
      required:false
    },
    scores:{
      type:Array,
      required:false,
      default:[0]
    }
  },
  {
    timestamps: true
  }
);

module.exports = model("Note", NoteSchema);
