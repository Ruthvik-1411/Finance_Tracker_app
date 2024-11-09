### Development
1. Install the npm and expo cli and login
   ```sh
   npm install -g expo eas-cli
   eas login
   eas whoami
   ```
1. Initialize a folder/project as expo app using expo cli with bare minimum dependencies
   ```sh
   npx create-expo-app <app-name> --template blank
   ```
2. cd to the app directory i.e `<app-name>` folder and start developing
3. Install the expo app from playstore. Build the development server using below command and open the expo app to see the development server.
   ```sh
   npx expo start
   ```
Visit [Expo Docs](https://docs.expo.dev/more/expo-cli/) for any issues.
### Production/Build
Expo gives the users a free quota to build and package the applications to some extent using the service EAS. To do that an expo dev account is required, it's free. To learn more about the eas - visit [EAS](https://docs.expo.dev/tutorial/eas/introduction/)
1. Initialize/Connect the local setup to a project in expo dev account.
   - Create a project in the [expo.dev](expo.dev) and get the project id.
   - ```sh
     eas init --id <project id>
      ```
2. Configure the project using the following command, it will add a eas.json file defaulting to internal development build details.
   ```sh
   eas build:configure
   ```
3. To build an apk version of the application modify the eas.json file, modify the values in `build.preview`
  ```sh
    "preview": {
    "android": {
      "buildType": "apk"
      }
    },
```
4. To submit the build to eas as an apk, use this
   ```
   eas build -p android --profile preview
   ```
   This will build an apk version of the application and can be downloaded on the device and used. It can also be sent to playstore, but that requires additional setup. Visit the EAS docs for more info.

