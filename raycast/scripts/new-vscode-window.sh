#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title New VS Code Window
# @raycast.mode silent

# Optional parameters:
# @raycast.icon 💻
# @raycast.packageName VS Code

# Documentation:
# @raycast.description 現在の AeroSpace ワークスペースに VS Code の新規ウィンドウを開く（他ワークスペースのウィンドウは動かさない）

"/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code" --new-window
