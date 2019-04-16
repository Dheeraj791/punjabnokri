#!/bin/sh
rm ../automatic-build/build/WellTrack.app.dSYM.zip
rm ../automatic-build/build/WellTrack.ipa
ionic cordova build ios --prod
cd ../automatic-build
fastlane ios deploy