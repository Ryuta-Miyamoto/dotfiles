#!/usr/bin/env bash
# dotfiles の設定ファイルをホームディレクトリへシンボリックリンクする。
# 既存ファイルがある場合は <name>.backup.<timestamp> に退避する。
set -euo pipefail

DOTFILES_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

link() {
  local src="$DOTFILES_DIR/$1"
  local dest="$2"

  if [ -L "$dest" ] && [ "$(readlink "$dest")" = "$src" ]; then
    echo "skip: $dest (already linked)"
    return
  fi

  if [ -e "$dest" ] || [ -L "$dest" ]; then
    local backup="$dest.backup.$(date +%Y%m%d%H%M%S)"
    mv "$dest" "$backup"
    echo "backup: $dest -> $backup"
  fi

  mkdir -p "$(dirname "$dest")"
  ln -s "$src" "$dest"
  echo "link: $dest -> $src"
}

link aerospace/aerospace.toml "$HOME/.aerospace.toml"
link borders/bordersrc "$HOME/.config/borders/bordersrc"

# 公開しない値を置くローカルファイル（.gitignore 済み）。なければサンプルから作る。
if [ ! -e "$DOTFILES_DIR/finicky/local.js" ]; then
  cp "$DOTFILES_DIR/finicky/local.sample.js" "$DOTFILES_DIR/finicky/local.js"
  echo "create: finicky/local.js (edit it to set private values)"
fi
link finicky/local.js "$HOME/.config/finicky/local.js"
link finicky/finicky.js "$HOME/.config/finicky/finicky.js"
