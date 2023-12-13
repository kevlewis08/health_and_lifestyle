require('dotenv').config();
const fs = require('fs');
const pgp = require('pg-promise')();
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

const db = pgp(dbConfig);

// Function to run SQL file
function runSqlFile(filePath) {
  const sql = fs.readFileSync(filePath, 'utf8');
  return db.none(sql);
}

// Run SQL file on application startup
const sqlFilePath = 'database.sql'; // Replace with the actual path
runSqlFile(sqlFilePath)
  .then(() => {
    console.log('SQL file executed successfully');
  })
  .catch((error) => {
    console.error('Error executing SQL file:', error);
  });

module.exports = { db, runSqlFile };
