# dotfiles

macOS 用の個人設定ファイル。

## 内容

| パス | リンク先 | 説明 |
| --- | --- | --- |
| `aerospace/aerospace.toml` | `~/.aerospace.toml` | [AeroSpace](https://github.com/nikitabobko/AeroSpace) タイル型ウィンドウマネージャ |
| `borders/bordersrc` | `~/.config/borders/bordersrc` | [JankyBorders](https://github.com/FelixKratz/JankyBorders) ウィンドウ枠線 |
| `finicky/finicky.js` | `~/.config/finicky/finicky.js` | [Finicky](https://github.com/johnste/finicky) URL ごとのブラウザ振り分け |

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

## Finicky

- 既定のブラウザは Chrome の `Default`（Personal）プロファイルです。
- 次のリンクは Edge の仕事用プロファイル（`Default`）で開きます。
  - Teams の URL（`teams.microsoft.com` / `teams.cloud.microsoft`）
  - Teams アプリ（`com.microsoft.teams2`）内でクリックしたリンク。Finicky には Teams のどのアカウントから開いたかが分からないため、アプリ単位で判定します。
  - Microsoft 365（Outlook Web / Office）と、仕事用テナントの SharePoint / OneDrive for Business。ほかのテナントの SharePoint は Chrome で開きます。
- Slack（`com.tinyspeck.slackmacgap`）から開いたリンクは、Teams や Microsoft 365 の URL でも Chrome の個人用プロファイルで開きます。
- 修飾キーを押しながらクリックすると、ほかのルールより優先して開くブラウザを変えます。
  - `⌥`: Chrome の個人用プロファイル（`Default`）。Teams や仕事用 SharePoint など Edge で開くリンクを Chrome で開きたいときに使います。
  - `⇧`: Safari
- 開く前に URL を書き換えます（`rewrite`）。
  - Outlook の Safe Links（`*.safelinks.protection.outlook.com`）から元の URL を取り出します。
  - `utm_*` / `fbclid` / `gclid` などのトラッキング用パラメータを取り除きます。
- URL ごとの振り分けは `handlers` に追加します。このリポジトリは公開しているため、プロファイルはアカウント名（メールアドレス）ではなくディレクトリ名（`edge://version` / `chrome://version` の「プロファイル パス」の末尾、`Default` / `Profile 1` など）で指定します。
- テナント名など公開しない値は `finicky/local.js`（`.gitignore` 済み）に置きます。`install.sh` が `local.sample.js` から作成し、`~/.config/finicky/local.js` にリンクします。Finicky は相対パスの `import` を解決できないため、`finicky.js` はこのリンクを絶対パスで読み込みます。
- メニューバーのアイコンは非表示です（`hideIcon: true`）。設定やログを見たいときは Finicky.app をもう一度開きます。
- Finicky を macOS のデフォルトブラウザに設定しておく必要があります。
- プロファイルの指定を効かせるには、Finicky に「フルディスクアクセス」を許可します（ブラウザの `Local State` を読むため）。
- 設定ファイルを変更しても再読み込みされないことがあります。その場合は Finicky を再起動します。

## Raycast

`raycast/scripts/` は [Raycast](https://www.raycast.com/) の Script Commands です。シンボリックリンクではなく、Raycast の設定（Extensions → Script Commands → Add Directories）でこのディレクトリを登録して使います。

| スクリプト | 説明 |
| --- | --- |
| `new-chrome-window.sh` | 現在の AeroSpace ワークスペースに、ドロップダウンで選んだプロファイルで Chrome の新規ウィンドウを開く |

ホットキーを割り当てる場合は、AeroSpace が使う `⌥` / `⌥⇧` の組み合わせを避けてください。
