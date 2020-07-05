const mongoose = require("mongoose");

const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE } = process.env;
//
//const MONGODB_URI = `mongodb://localhost/notasDaniel`;
const MONGODB_URI = process.env.MONGODB_URI || `mongodb+srv://other:TLhpEuLUrtQ1Ylt6@clusteryapa-aaxxm.mongodb.net/socialNotes?retryWrites=true&w=majority`;
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
  })
  .then(db => console.log("DB is connected"))
  .catch(err => console.error(err));
