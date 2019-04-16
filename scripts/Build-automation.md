fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew cask install fastlane`

----

Below are the instructions in using fastlane for automated IOS/Android builds.

iOS

1. Inside the project directory execute: fastlane match
2. Fastlane match will set up and configure your machine. It will ask the repository of the certificates which can be found in `/automate-build/Matchfile`.
3. Fastlane will ask the passphrase needed to decrypt/encrypt the certificates.
4. Fastlane will ask for your developer account to automated deployment in testflight.
5. Once certificates are successully installed, you can run the following command:

`sh ios_deploy.sh`

This will automatically build the ios platform and upload the IPA to testflight.

6. You can also execute the lane directly by navigating to /automated-build/fastlane and call: 

`fastlane ios deploy`

7. A message will be sent to the slack channel if the build is successfully created.

----

Android

1. Make sure android tools & gradle is added in the CLI.
1. Create a `local.properties` file inside `platforms/android`.
2. Add the following:

`sdk.dir = /Users/your-username/Library/Android/sdk`

3. Execute the following command to generate a build:
 
`sh android_build.sh`
