function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  function showRecipeDetails(title, nutrition, ingredients, instructions) {
    document.getElementById('recipe-title').innerText = title;

    // Set the nutrition information
    document.getElementById('recipe-nutrition').innerHTML = `<p>Nutritional Facts:</p><ul>${nutrition}</ul>`;

    // Set the ingredients information
    document.getElementById('recipe-ingredients').innerHTML = `<p>Ingredients:</p><ul>${ingredients}</ul>`;

    // Replace newline characters with HTML line break tags
    //instructions = instructions.replace(/\n/g, '<br>');

    document.getElementById('recipe-instructions').innerHTML = `<p>Instructions:</p><ul>${instructions}</ul>`;

    document.getElementById('recipe-details-modal').style.display = 'block';
}


function closeModal() {
    document.getElementById('recipe-details-modal').style.display = 'none';
}

// Close modal if clicked outside the content
window.onclick = function(event) {
    var modal = document.getElementById('recipe-details-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};
