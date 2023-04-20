# WasteNot
Household Kitchen Inventory app tracks pantry, fridge, &amp; freezer items. Shows expiry dates, reminds you to use items &amp; suggests nearest food banks to donate unused items. Help reduce food waste &amp; contribute to community with this simple &amp; easy to use app. 

To run the code please follow the instructions below

# Back-End

cd backend/WasteNot
npm install

Create a .env file in the root folder with and copy paste the following line
JWT_SECRET=glasgowcaledonianuniversityprojectbysyedfaisalimam

Make changes to the SERVER_URL constant in the constants.js file located at frontend/WasteNot/src/constants/constants.js, please follow the steps below:

    - Open the constants.js file using a text editor.

    - Locate the SERVER_URL constant and make changes to its value.

    - If you are running the project on iOS, you can set the SERVER_URL value to either localhost:3001 or your local machine's IP address.

    - If you are running the project on Android, the SERVER_URL value must be set to your local machine's IP address as localhost will not work.

    - Save the changes made to the constants.js file.

Once you have made the necessary changes to the SERVER_URL constant, the frontend will be able to communicate with the backend server using the updated URL.

To run the server type in command
node index.js

# Front-End

cd frontend/WasteNot
npm install

Ensure that your machine is configured to run React Native projects, as the front-end has been developed using the React Native framework.

# ios
Before proceeding with running the project, it is essential to pre-install Node, Watchman, Ruby 2.7.6, Xcode, and Cocoapods. For detailed information on how to install these tools for both iOS and Android environments, please refer to the instructions provided in the link below.

https://reactnative.dev/docs/environment-setup?platform=ios

cd frontend/WasteNot/ios
install pods

# android
Install Node and Watchman on your machine, you can follow the same instructions as for iOS. However, for the Java Development Kit (JDK), it is recommended to install Azul Zulu as per the instructions provided in the link below. Additionally, you should install Android Studio and the Android SDK, and then configure the ANDROID_HOME environment variable according to the instructions provided in the link below.

https://reactnative.dev/docs/environment-setup?platform=android


# Run the project 

cd frontend/WasteNot
npx react-native start

Open another terminal 
ios:
cd frontend/WasteNot
npx react-native run-ios

android: 
cd frontend/WasteNot
npx react-native run-android

test user have already been created for testing purposes which can be accessed with:
username: test4@test.com
password: test