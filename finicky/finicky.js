// Finicky: URL をクリックしたときに開くブラウザ／プロファイルを振り分ける
// https://github.com/johnste/finicky
// 型定義: /Applications/Finicky.app/Contents/Resources/finicky.d.ts
//
// このリポジトリは公開しているため、アカウント名（メールアドレス）や会社名（テナント名）は書かない。
// - プロファイルはディレクトリ名（edge://version / chrome://version の「プロファイル パス」の末尾）で指定する。
// - テナント名など公開しない値は finicky/local.js（.gitignore 済み、local.sample.js から作る）に置く。
//   Finicky は設定をキャッシュフォルダに変換してからバンドルするため、相対パスの import は解決できない。
//   install.sh が ~/.config/finicky/local.js にリンクを張り、ここでは絶対パスで読み込む。

import { WORK_SHAREPOINT_TENANTS } from "/Users/ryutamiyamoto/.config/finicky/local.js";

const WORK_EDGE = { name: "Microsoft Edge", profile: "Default" };
const PERSONAL_CHROME = { name: "Google Chrome", profile: "Default" };

// 仕事用テナントの SharePoint / OneDrive for Business（<tenant>.sharepoint.com / <tenant>-my.sharepoint.com）
const isWorkSharePoint = (url) =>
  WORK_SHAREPOINT_TENANTS.some(
    (tenant) => url.hostname === `${tenant}.sharepoint.com` || url.hostname === `${tenant}-my.sharepoint.com`,
  );

// URL から取り除くトラッキング用パラメータ
const TRACKING_PARAMS = [/^utm_/, /^fbclid$/, /^gclid$/, /^dclid$/, /^msclkid$/, /^mc_eid$/, /^igshid$/, /^yclid$/];

/** @type {import("/Applications/Finicky.app/Contents/Resources/finicky.d.ts").FinickyConfig} */
export default {
  defaultBrowser: PERSONAL_CHROME,
  options: {
    // true にすると ~/Library/Logs/Finicky/ に開いた URL が記録される（メールアドレス等を含むため普段は false）
    logRequests: false,
    // メニューバーのアイコンを表示しない（設定ウィンドウは Finicky.app をもう一度開くと表示される）
    hideIcon: true,
  },
  rewrite: [
    // Outlook の Safe Links（*.safelinks.protection.outlook.com/?url=...）から元の URL を取り出す。
    // 後続の rewrite / handlers が元の URL に対して効くように先頭に置く。
    {
      match: (url) => url.hostname.endsWith(".safelinks.protection.outlook.com") && url.searchParams.has("url"),
      url: (url) => new URL(url.searchParams.get("url")),
    },
    // トラッキング用パラメータを取り除く
    {
      match: (url) => [...url.searchParams.keys()].some((key) => TRACKING_PARAMS.some((re) => re.test(key))),
      url: (url) => {
        for (const key of [...url.searchParams.keys()]) {
          if (TRACKING_PARAMS.some((re) => re.test(key))) url.searchParams.delete(key);
        }
        return url;
      },
    },
  ],
  handlers: [
    // 修飾キーを押しながらクリックしたときは、ほかのルールより優先して開くブラウザを変える
    // ⌥: Chrome の個人用プロファイル（Edge 対象のリンクを Chrome で開きたいとき用） / ⇧: Safari
    {
      match: () => finicky.getModifierKeys().option,
      browser: PERSONAL_CHROME,
    },
    {
      match: () => finicky.getModifierKeys().shift,
      browser: "Safari",
    },
    // Slack から開いたリンクは、Teams や Microsoft 365 の URL でも Edge に回さず個人用 Chrome で開く
    {
      match: (url, { opener }) => opener?.bundleId === "com.tinyspeck.slackmacgap",
      browser: PERSONAL_CHROME,
    },
    // 仕事用 Teams は Edge の仕事アカウントのプロファイルで開く。
    // - Teams の URL（会議リンクなど）: Slack 以外のどのアプリから開いても対象
    // - Teams アプリ内のリンク: リンク先に関係なく対象
    //   （Finicky には Teams 内のどのアカウントから開いたかは分からないため、アプリ単位で判定）
    {
      match: [
        finicky.matchHostnames(["teams.microsoft.com", "teams.cloud.microsoft"]),
        (url, { opener }) => opener?.bundleId === "com.microsoft.teams2",
      ],
      browser: WORK_EDGE,
    },
    // 仕事用 Microsoft 365（Outlook / Office / 仕事用テナントの SharePoint・OneDrive）も Edge の仕事用プロファイルで開く。
    // 仕事用以外のテナントの SharePoint（個人アカウントで共有されたものなど）は既定の Chrome で開く。
    {
      match: [
        finicky.matchHostnames([
          "outlook.office.com",
          "outlook.office365.com",
          "outlook.cloud.microsoft",
          "m365.cloud.microsoft",
          "office.com",
          "www.office.com",
        ]),
        isWorkSharePoint,
      ],
      browser: WORK_EDGE,
    },
  ],
};
