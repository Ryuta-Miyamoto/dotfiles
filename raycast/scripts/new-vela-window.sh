#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title New Vela Window
# @raycast.mode silent

# Optional parameters:
# @raycast.icon 📁
# @raycast.packageName Vela

# Documentation:
# @raycast.description 現在の AeroSpace ワークスペースに Vela の新規ウィンドウを開く（他ワークスペースのウィンドウは動かさない）

# 起動していなければ普通に起動する（最初のウィンドウは現在のワークスペースに開く）
if ! pgrep -xq Vela; then
  open -a Vela
  exit 0
fi

vela_windows() {
  aerospace list-windows --monitor all --app-bundle-id com.rmiyamot.Vela --format '%{window-id}' | sort
}

before=$(vela_windows)

# Vela をアクティブにすると既存ウィンドウのワークスペースへ飛んでしまうため、
# 前面に出さずにメニューの「New Window」を直接押す（Raycast にアクセシビリティ権限が必要）
osascript -e 'tell application "System Events" to tell process "Vela" to click menu item "New Window" of menu "File" of menu bar 1' >/dev/null

# 新しいウィンドウはフォーカスされないので、現れるのを待って AeroSpace でフォーカスする
for _ in $(seq 20); do
  new=$(comm -13 <(echo "$before") <(vela_windows) | head -1)
  if [ -n "$new" ]; then
    aerospace focus --window-id "$new"
    exit 0
  fi
  sleep 0.1
done
