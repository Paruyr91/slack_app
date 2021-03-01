const Sequelize = require('sequelize')
const winston=require('winston')

const PGHOST = process.env.PGHOST
const PGUSER = process.env.PGUSER
const PGDATABASE = process.env.PGDATABASE
const PGPASSWORD = process.env.PGPASSWORD

const logger = winston.createLogger({
  level: 'debug',
  transports: [
   new winston.transports.File({ filename: 'combined.log' })
  ]
});



const sequelize = new Sequelize(`${PGDATABASE}`, `${PGUSER}`, `${PGPASSWORD}`, {
  host: PGHOST,
  dialect: 'postgres',
  logging: msg => logger.log('debug', msg)
});


sequelize.sync({ alter: true })


module.exports = sequelize




 