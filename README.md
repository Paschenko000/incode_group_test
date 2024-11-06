Test Project for Incode Group

Project Overview

This app allows users to select from a list of houses, each represented by a hardcoded name, in a simple game format. The house data is stored in a constant due to the lack of an external API. Important: If future API updates change the house names, functionality may be affected without additional error-handling or mapping logic.

Character data is fetched from the HP-API, which provides information about students.

This app includes three screens: HomeScreen, ListScreen, and DetailsScreen.

HomeScreen: Users can play a game to guess the house of a random character by pressing one of the house buttons. After selecting a house, the result will appear instantly on the selected button, turning red for incorrect or green for correct answers. To get a new character, users can either swipe down or press the “Next” button at the bottom of the screen. The top of the screen displays the user’s total score, failures, and successful attempts, which are also visible on the ListScreen.

ListScreen: This screen is initially empty. After a user guesses the house of at least one character, the results will appear in a FlatList showing each completed character and attempt. A search filter is also provided to help users find specific characters among those completed. Each character entry displays a success or failure icon and includes a “Retry” button. Tapping “Retry” navigates back to HomeScreen for another attempt. Selecting a completed character navigates to the DetailsScreen.

DetailsScreen: This screen provides detailed information about a character if the user selected the correct house. If not, only the character’s image is shown.

Important Note

The current setup relies on static house names stored in the code. If house names differ in future API updates, the game may not work as expected without additional mapping or error-handling logic.

Features

	•	House Selection Game: Users can pick a house from a predefined list and see their results instantly.
	•	React Context for State Management: Centralized global state management using React’s Context API ensures accessibility throughout the app’s components.
	•	Static Data Storage: House data is stored in a constant as a temporary solution until an API is available.

Technologies Used

	•	React Native: Framework for building cross-platform mobile applications.
	•	React Context API: Used for centralized state management.
	•	JavaScript: Primary language for implementing functionality and app logic.

Images & Videos

Images and videos demonstrating the app’s functionality, navigation, and interactions are located in the showcase_images folder in this repository.

Additional images and videos can also be accessed on Google Drive at the following link: Showcase on Google Drive

This edited version should help convey the information more clearly and accurately for your readers. Let me know if there’s anything specific you’d like to add or adjust!
