//καλώ μεθόδους από την winston
const { format , createLogger, transports } = require('winston');
require('winston-daily-rotate-file');
require('winston-mongodb');

require('dotenv').config();

// Ιδιότητες που υπάρχουν μέσα στις μεθόδους που κάλεσα από τη winston
// Εδώ, οι αναγραφόμενες περιλαμβάνονται στη μέθοδο format που έχω καλέσει παραπάνω
const { combine, timestamp, label, prettyPrint } = format

const fileRotateTransport = new transports.DailyRotateFile({
   level: "info",
   filename: "logs/info-%DATE%.log",
   datePattern: "DD-MM-YYYY",
   maxFiles:"10d"
});

const logger = createLogger({
   level: "debug",
   format: combine (
      label({label: "Logs for Users Products App"}),
      timestamp({
         format:"DD-MM-YYYY HH:mm:ss"
      }),
      format.json(),
      // prettyPrint()
   ),
   transports: [
      new transports.Console(),
      // new transports.File({
      //    filename: "logs/success.log"
      // }),
      new transports.File({
         level: "error",
         filename: "logs/error.log"
      }),
      new transports.File({
         level: "info",
         filename: "logs/info.log"
      }),
      fileRotateTransport,
      new transports.MongoDB({
         level: "debug",
         db: process.env.MONGODB_URI,
         options: {
            useUnifiedTopology: true
         },
         colection: "server_logs",
         format: format.combine(
            format.timestamp(),
            format.json()
         )
      })
   ]
})

module.exports = logger