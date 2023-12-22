require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');

const { pool } = require('../dbConfig');

function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

router.put('/api/users', async (req, res) => {
  try {
      const { name, email, age, height, weight } = req.body;
      const query = {
          text: 'UPDATE users SET name = $1, age = $2, height = $3, weight = $4 WHERE email = $5 RETURNING *',
          values: [name, age, height, weight, email],
      };
      const result = await pool.query(query);
      const updatedUser = result.rows[0];
      res.json(updatedUser);
  } catch (error) {
      console.error('An error occurred while updating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;