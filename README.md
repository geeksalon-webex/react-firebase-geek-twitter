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

## サンプル実装一覧

- [ログイン機能](https://github.com/geeksalon-webex/react-firebase-geek-twitter/commit/a1f86a04025835d1d38fef35cf9dc09486365c27)
- [投稿機能](https://github.com/geeksalon-webex/react-firebase-geek-twitter/commit/429d0ec66a8e0d1ef8c72e85d17e2d6bc4e54263)
- [投稿一覧表示機能](https://github.com/geeksalon-webex/react-firebase-geek-twitter/commit/d494b6e3e4c5637a8607e2d83baf1b85391a640a)
- [プロフィール作成・ユーザーデータ機能](https://github.com/geeksalon-webex/react-firebase-geek-twitter/commit/76964e1ec729f39c23aeb805dc84ef436db89b2e)
