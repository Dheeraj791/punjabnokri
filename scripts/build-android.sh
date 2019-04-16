#!/bin/sh
rm Hyrskills.apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk alias_name
/Users/jeremiebourque/Library/Android/sdk/build-tools/26.0.2/zipalign -v 4 ./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk Hyrskills.apk
