# React Firebase Geek Twitter

Remix(React)を使った基本的な認証と Firebase を使ったデータ操作の実装例です。

## ローカルで動かすには

`node_modules`を npm で生成する必要があります。

```bash
npm ci
```

また、アプリケーションを動かすためには以下の変更が必要です。

### firebase.js

`/app/firebase.js` の `firebaseConfig` に Firebase の設定を記述してください。

### Firebase Authentication

Google 認証を使ったログイン機能をサンプルで実装しています。Firebase のコンソールから Google 認証を有効にしてください。
