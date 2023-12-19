require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/api/nutrition', async (req, res) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data',
      params: {
        ingr: req.query.ingr,  // Use the query parameter from the request
        'nutrition-type': 'logging',
        grams: req.query.grams
      },
      headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': process.env.RAPID_API_HOST
      }
    };

    const response = await axios.request(options);
    
    // Check if the response indicates success (status code 200)
    if (response.status === 200) {
      console.log(response.data);

      // Process the response and send it back to the client
      const conversion = req.query.grams / response.data.totalWeight;
      const result = {
        calories: (response.data.calories * conversion).toFixed(0),
        carbs: (response.data.totalNutrients.CHOCDF.quantity * conversion).toFixed(0),
        fat: (response.data.totalNutrients.FAT.quantity * conversion).toFixed(0),
        protein: (response.data.totalNutrients.PROCNT.quantity * conversion).toFixed(0),
      };

      console.log(result);
      res.json(result);
    } else if (response.status === 404) {
      // Handle the case where the input isn't found
      console.log('Input not found in the API');
      res.status(404).json({ error: 'Input not found' });
    } else {
      // Handle other non-success status codes
      console.error('Unexpected response status:', response.status);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const { pool } = require('../dbConfig');

function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


router.get('/api/food_log', async (req, res) => {
  try {
    const userEmail = req.user.email;
    const { date = getCurrentDate() } = req.query;
    console.log(date);
    const query = {
      text: 'SELECT * FROM food_log WHERE date = $1 AND user_email = $2',
      values: [date, userEmail],
    };

    const result = await pool.query(query);
    const foodLogData = result.rows;

    // Send the food_log data back to the client
    res.json(foodLogData);
  } catch (error) {
    console.error('An error occurred while fetching food_log data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/api/food_log', async (req, res) => {
  try {
    const { user_id, user_email, date, food_name, calories, carbs, fat, protein } = req.body;
    const query = {
      text: 'INSERT INTO food_log (user_id, user_email, date, food_name, calories, carbs, fat, protein) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      values: [user_id, user_email, date, food_name, calories, carbs, fat, protein],
    };

    const result = await pool.query(query);
    const insertedFood = result.rows[0];

    // Send the inserted food data back to the client
    res.json(insertedFood);
  } catch (error) {
    console.error('An error occurred while adding food to the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/api/food_log', async (req, res) => {
  try {
      const userEmail = req.user.email;
      console.log(userEmail);
      const foodName = req.query.name;
      console.log(foodName);

      // Perform deletion in the database
      const deleteQuery = {
          text: 'DELETE FROM food_log WHERE user_email = $1 AND food_name = $2',
          values: [userEmail, foodName],
      };

      await pool.query(deleteQuery);

      res.json({ success: true });
  } catch (error) {
      console.error('An error occurred while deleting food from the database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
