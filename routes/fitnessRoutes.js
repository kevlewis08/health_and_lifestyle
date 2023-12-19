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

router.get('/api/exercise_log', async (req, res) => {
    try {
        const userEmail = req.user.email;
        const { date = getCurrentDate() } = req.query;
        const query = {
        text: 'SELECT * FROM exercise_log WHERE date = $1 AND user_email = $2',
        values: [date, userEmail],
        };
    
        const result = await pool.query(query);
        const exerciseLogData = result.rows;
    
        // Send the exercise_log data back to the client
        res.json(exerciseLogData);
    } catch (error) {
        console.error('An error occurred while fetching exercise_log data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
 
router.post('/api/exercise_log', async (req, res) => {
    try {
      const { user_id, user_email, date, exercise_name, description } = req.body;
      const query = {
        text: 'INSERT INTO exercise_log (user_id, user_email, date, exercise_name, description) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        values: [user_id, user_email, date, exercise_name, description],
      };
  
      const result = await pool.query(query);
      const insertedExercise = result.rows[0];
  
      res.json(insertedExercise);
    } catch (error) {
      console.error('An error occurred while adding exercise to the database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
  
router.delete('/api/exercise_log', async (req, res) => {
    try {
        const userEmail = req.user.email;
        console.log(userEmail);
        const exerciseName = req.query.name;
        console.log(exerciseName);
  
        // Perform deletion in the database
        const deleteQuery = {
            text: 'DELETE FROM exercise_log WHERE user_email = $1 AND exercise_name = $2',
            values: [userEmail, exerciseName],
        };
  
        await pool.query(deleteQuery);
  
        res.json({ success: true });
    } catch (error) {
        console.error('An error occurred while deleting exercise from the database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;