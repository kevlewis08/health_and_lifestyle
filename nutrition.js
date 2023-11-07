const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');

searchButton.addEventListener('click', () => {
    const query = searchInput.value;

    const apiUrl = `https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data?ingr=${query}&nutrition-type=logging`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '772d28c4b9msh8ad4e43e9d37812p1ce076jsn3f1944cd1767',
            'X-RapidAPI-Host': 'edamam-edamam-nutrition-analysis.p.rapidapi.com'
        }
    }
    fetch(apiUrl, options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const conversion = 100 / data.totalWeight;

            searchResults.innerHTML = '';

            const calories = document.createElement('p');
            calories.innerHTML = `Calories: ${(data.calories * conversion).toFixed(0)}`;
            searchResults.appendChild(calories);

            const carbs = document.createElement('p');
            carbs.innerHTML = `Carbs: ${(data.totalNutrients.CHOCDF.quantity * conversion).toFixed(0)}`;
            searchResults.appendChild(carbs);

            const fat = document.createElement('p');
            fat.innerHTML = `Fat: ${(data.totalNutrients.FAT.quantity * conversion).toFixed(0)}`;
            searchResults.appendChild(fat);
            
            const protein = document.createElement('p');
            protein.innerHTML = `Protein: ${(data.totalNutrients.PROCNT.quantity * conversion).toFixed(0)}`;
            searchResults.appendChild(protein);

        })
        .catch(error => {
            console.error('An error occurred:', error);
        });
});
