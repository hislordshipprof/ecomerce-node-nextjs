const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');
// if (process.env.NODE_ENV !== "production") {
//   dotenv.config({ path: "./config.env" });
// }

dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
const connect = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('DB SUCCESSFULLY CONNECTED');
  } catch (error) {
    console.log(error);
  }
};

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected');
});
mongoose.connection.on('error', (err) => {
  console.log(err.message);
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  connect();
  console.log(`listening to server on http://localhost:${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
