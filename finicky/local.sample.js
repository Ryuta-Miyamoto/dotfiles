// 公開したくない値をまとめるファイルのサンプル。
// local.js にコピーして値を書き換える（local.js は .gitignore 済み）。
//   cp finicky/local.sample.js finicky/local.js
// install.sh は local.js がなければこのファイルをコピーし、~/.config/finicky/local.js にリンクする。

// 仕事用 SharePoint のテナント名（https://<tenant>.sharepoint.com の <tenant>）。
// OneDrive for Business の <tenant>-my.sharepoint.com も同じテナントとして扱う。
export const WORK_SHAREPOINT_TENANTS = ["contoso"];
