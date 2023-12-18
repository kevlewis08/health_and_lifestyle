# Health and Lifestyle

## PROJECT DESCRIPTION
  The HKI fitness and lifestyle mobile app will help users reach their fitness goals.
  It will inform users on health issues such as ideal weight, BMI(body-mass index), caloric
  intake, macros(dietary intake), etc. It will also provide tips on how to properly exercise
  according to a targeted goal, as well as what is the proper gear and clothing to match.

## GROUP MEMBERS
  #### Alyssa Roach
    1. Creating landing page
    2. Recipe Page
    3. Tips and articles Page
    4. Creating logo

    When creating the landing page I'll start by creating the Navbar to host all the linked pages and the logo i'll put on the left side of the navbar. I'll then link all the pages to eachother. Also on the landing page I want to implement a carousel that hosts about 3-4 links to articles. The carousel would showcase images that when you click them they'll take you to the link of the article. I want to implement an about section but I am still between including it onto the landing page or create an about page itself, I'll also include profile cards for each team member. At the bottom of each page I will include a footer.For the recipe page, I will host different recipes in cards, when you click the card, it will create a pop up that shows the recipe instructions and nutritional facts. For the tips and articles page, I will implement articles of tips foods, clothing, exercies ETC into columns. These links will be an image, with the URL and the date and time they were created with the author as well. Finally for the logo I want to create a sleeker more professional logo that compelements the pages.
      
  #### Alex Reyes 
    1. creating the Login page
    2. creating the Forum page
    3. choosing a viable CMS

    Creating the Login page to ensure secure access for users and administrators across the website, designing Forum page for interactive discussions so that users may share tips/ accomplishments/ etc. , and selecting a viable Content Management System (CMS) to streamline content management and website maintenance


  #### Jonathan Skeete
    1. creating the food log
    2. creating the exercise log
    3. creating the profile page
    4. setting up the tech stack
    
    For the food and exercise log pages, I'll start by creating a search bar to search for the needed information. I'll need to understand what information the API is giving as well as how to use it. Once I have control over the data, I can then focus on styling the pages. Next, on the same pages, I'll need to create logs that can display the daily content. For each new day, the logs should be cleared, and all previous days should be stored in a database. Next will be creating a profile page that can house all the user's personal information. And lastly, determine and set up our remaining technologies: our database and server.

## Fulfilled Requirements
  #### Alyssa Roach
    type here

  #### Alex Reyes
    type here

  #### Jonathan Skeete
    ✔️ creating the food log
    ✔️ creating the exercise log
    ✔️ creating the profile page
    ✔️ setting up the tech stack

    I was able to successfully set up our server using Express.js and our database using PostgreSQL.
    With properly implemented user authentication, users can log in and view their health and fitness content. On the Fitness page, users can log their exercises for the day which will then be stored in the database. 
    On the nutrition page, users can search for food items and view their nutritional facts. They can then add these items to their food diary which will then be stored in the database. For both the Fitness page and Nutrition page, the inputs for the current day will remain visible for the entire day unless the user chooses to delete an input.On the profile page, users can view their Name, email, BMI and edit their age, height, and weight. All of this information is stored in the database and can be updated at any time.

## Instructions
[First you'll need to install Postgresql and create a database](setupREADME.md)

All necessary instructions can be found using the link above.

For the nutrition facts API you'll need your own API key.
[You can attain that here](https://rapidapi.com/edamam/api/edamam-nutrition-analysis)


Once you've set up your database:
  1. clone the repository
  2. run the command: npm install
  3. Create a .env file using the example.env file as a template
  4. Add in your database credentials as well as api key.
  5. run the command: npm run dev
  6. go to your localhost
  7. sign in/register

Congratulations you've successfully created your fitness account.

You now have access to:

 * Log your workouts in the Fitness page.
 * Look up nutrition information in Nutrition page and store them in a food diary.
 * View your Body Mass Index (BMI) and edit your age, height or weight in the Profile page.
