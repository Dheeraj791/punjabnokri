#!/bin/sh
rm ../platforms/android/build/outputs/apk/android-release-unsigned.apk
rm ../platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk
rm WellTrack.apk
ionic cordova build android --device --release --prod
cd ../automatic-build
fastlane android deploy