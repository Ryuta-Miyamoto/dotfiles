#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title New Chrome Window
# @raycast.mode silent

# Optional parameters:
# @raycast.icon 🌐
# @raycast.packageName Chrome
# @raycast.argument1 { "type": "dropdown", "placeholder": "Profile", "data": [{ "title": "Personal", "value": "Default" }, { "title": "Sub", "value": "Profile 1" }] }

# Documentation:
# @raycast.description 現在の AeroSpace ワークスペースに、選択したプロファイルで Chrome の新規ウィンドウを開く

open -na "Google Chrome" --args --profile-directory="$1" --new-window
