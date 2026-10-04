# dotfiles

macOS 用の個人設定ファイル。

## 内容

| パス | リンク先 | 説明 |
| --- | --- | --- |
| `aerospace/aerospace.toml` | `~/.aerospace.toml` | [AeroSpace](https://github.com/nikitabobko/AeroSpace) タイル型ウィンドウマネージャ |

## セットアップ

```sh
git clone https://github.com/Ryuta-Miyamoto/dotfiles.git ~/dotfiles
~/dotfiles/install.sh
```

既存の設定ファイルは `<name>.backup.<timestamp>` に退避してからシンボリックリンクを作成します。

## AeroSpace

- アルファベットのワークスペース (A–Z) はメインモニターに割り当てます。
- 数字のワークスペース (1–9) はサブモニターに割り当てます。外部モニターがない場合はメイン（内蔵ディスプレイ）に戻ります。
- ウィンドウの枠線表示に [JankyBorders](https://github.com/FelixKratz/JankyBorders) (`borders`) を使います。

設定を変更したら `aerospace reload-config` で反映します。
