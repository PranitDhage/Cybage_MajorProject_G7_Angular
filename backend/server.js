const app = require("./app");
const connectDatabase = require("./config/database");

//connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on PORT: ${process.env.PORT}.`);
});
