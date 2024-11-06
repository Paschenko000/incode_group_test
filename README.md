Test Project for Incode Group

Project Overview

This app allows users to select from a list of houses, each represented by a hardcoded name, in a simple game format. The house data is stored in a constant due to the lack of an external API. Important: If future API updates change the house names, functionality may be affected without additional error-handling or mapping logic.

Character data is fetched from the https://hp-api.onrender.com/ , which provides information about the characters.

This app includes three screens: HomeScreen, ListScreen, and DetailsScreen.

HomeScreen: Users can play a game to guess the house of a random character by pressing one of the house buttons. After selecting a house, the result will appear instantly on the selected button, turning red for incorrect or green for correct answers. To get a new character, users can either swipe down or press the “Next” button at the bottom of the screen. The top of the screen displays the user’s total score, failures, and successful attempts, which are also visible on the ListScreen.

ListScreen: This screen is initially empty. After a user guesses the house of at least one character, the results will appear in a FlatList showing each completed character and attempts. A search filter is also provided to help users find specific characters among those completed. Each character entry displays a success or failure icon and includes a 
retry button. Tapping retry navigates back to HomeScreen for another attempt. Selecting a completed character navigates to the DetailsScreen.

DetailsScreen: This screen provides detailed information about a character if the user selected the correct house. If not, only the character’s image is shown.

Reset the game: By pressing the “Reset” button at the top of the header on either the HomeScreen or ListScreen, all game data, including score, completed attempts, and history, will be erased.

Important Note!

The current setup relies on static house names stored in the code. If house names differ in future API updates, the game may not work as expected without additional mapping or error-handling logic.

Images & Videos

Images and videos showcasing the app in use and in a simulator are available in the showcase_images folder in this repository. This includes demonstrations of basic navigation and interaction.

Images and videos are also located on google drive at the following link: https://drive.google.com/drive/folders/1ueoehZbaMxyS7Af8aefhTk4pCRkS5m8X?usp=drive_link
