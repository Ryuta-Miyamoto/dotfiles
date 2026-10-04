# dotfiles

macOS 用の個人設定ファイル。

## 内容

| パス | リンク先 | 説明 |
| --- | --- | --- |
| `aerospace/aerospace.toml` | `~/.aerospace.toml` | [AeroSpace](https://github.com/nikitabobko/AeroSpace) タイル型ウィンドウマネージャ |
| `borders/bordersrc` | `~/.config/borders/bordersrc` | [JankyBorders](https://github.com/FelixKratz/JankyBorders) ウィンドウ枠線 |

## セットアップ

```sh
git clone https://github.com/Ryuta-Miyamoto/dotfiles.git ~/Work/GitHub/dotfiles
~/Work/GitHub/dotfiles/install.sh
```

clone 先は任意です（`install.sh` は自身の場所を基準にリンクを作成します）。既存の設定ファイルは `<name>.backup.<timestamp>` に退避してからシンボリックリンクを作成します。

## AeroSpace

- アルファベットのワークスペース (A–Z) はメインモニターに割り当てます。
- 数字のワークスペース (1–9) はサブモニターに割り当てます。外部モニターがない場合はメイン（内蔵ディスプレイ）に戻ります。
- ウィンドウの枠線表示に [JankyBorders](https://github.com/FelixKratz/JankyBorders) (`borders`) を使います。AeroSpace 起動時に引数なしで `borders` を実行し、設定は `borders/bordersrc` から読み込みます。

設定を変更したら `aerospace reload-config` で反映します。

## Raycast

`raycast/scripts/` は [Raycast](https://www.raycast.com/) の Script Commands です。シンボリックリンクではなく、Raycast の設定（Extensions → Script Commands → Add Directories）でこのディレクトリを登録して使います。

| スクリプト | 説明 |
| --- | --- |
| `new-chrome-window.sh` | 現在の AeroSpace ワークスペースに、ドロップダウンで選んだプロファイルで Chrome の新規ウィンドウを開く |

ホットキーを割り当てる場合は、AeroSpace が使う `⌥` / `⌥⇧` の組み合わせを避けてください。
