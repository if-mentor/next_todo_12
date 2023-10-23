# チーム開発（第12期）
## 開発メンバー
  - baba
  - hozu
  - サンシーロ
  - テラジマコウヘイ
  
## 使用技術
- React.js (https://github.com/facebook/react)
- Next.js (https://github.com/vercel/next.js)

## 推奨 VScode 拡張機能
- [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph&ssr=false#qna) コミットの一覧 → 詳細を閲覧できる
- [Git History](https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory) ファイルの履歴などを確認できる
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) 視覚的にリポジトリ、ブランチ、ファイル、コミットの状態を確認や操作することができる

※ おすすめしたいものがあれば適宜追加する

## バージョン情報
volta で管理
https://volta.sh

```
"node": "18.18.2",
https://nodejs.org/ja

"npm": "9.8.1"
https://docs.npmjs.com/cli/v9/commands/npm-version
```

## ライブラリ
```
"storybook": "7.2.1"
https://storybook.js.org

チュートリアル
https://storybook.js.org/tutorials/intro-to-storybook/react/ja/get-started
```

## プロジェクトの概要
Todo リストの作成を通じて、React.js、Next.js の基礎、Git,github の使い方に慣れ、チーム開発を体験する。
チームメンバー同士でのコードレビュー、毎週 MTG での issue ついての議論など個人開発では行えない内容をカバーしていきます。

## 環境構築手順
1. `git clone https://github.com/if-mentor/next_todo_12.git`

2. **github アカウントを 2 つ以上持っている方のみ、確認**
   - clone したリポジトリのディレクトリに移動
   - `git config --list`を実行する
   - vscode で github と連携をおこなっているユーザー名がプロジェクトに招待してもらっているユーザー名と同じになっているか確認
   - 同じになっていない場合は、ログインを変更する（※方法がわからない場合は、shinagawaに連絡すること）

3. リポジトリのディレクトリへ移動

4. `npm install`
    - package.jsonにある各パッケージの install
    
5. `npm run dev`
   - 上記を実行し、`http://localhost:3000`が起動できるか確認をよろしくお願いします。

## 開発 Tips

### 1. プルリクエスト前の作業
プルリクエストを上げる前に必ず、自分が作業を行なっているブランチで`git pull origin main`を行うこと
もし、コンフリクトが発生したら、ローカル上で解決する、解決の仕方がわからない場合は、メンバーに相談すること

### 2. `git pull origin main`を行なった後の作業
remote に変更があった場合は、`git pull origin main`のコマンドを実行し、remote の変更を取り込む
package に更新がないか、確認するため、`npm install`コマンドを実行する
`found 0 vulnerabilities`と表示されれば OK。

### 3. プルリクのレビュー後のマージについて
プルリクエストを作成し、レビューが終わった後は、マージを github 上で行ってください。
もし、この際に github 上でコンフリクトが発生していることがわかった場合は、ローカル環境で
`git pull origin main`を行い、ローカル環境でコンフリクトを解消するようにしてください。

---

## 自主的な貢献を歓迎
チームにとっていいことを考え行動してくれる方を尊重します。
やりたいことや試してみたいことなどを自主的に提案していただき、どんどんチーム開発を盛り上げていきましょう！
基本的にはチームとして行いたいものを自由にやってもらうスタンスで進めていきます。

### Issue の作成
自主的な貢献の一環として、Issue の作成は各自で自由に作成して、構いません。
ルールとして、作成した Issue を必ず開発 MTG で提案し、いつ対応するのかをチームで決めましょう。
また、Issue とすべきか、曖昧な場合は、Discussion に内容を記述し、メンバーから意見をもらいましょう。

### Git/gitHub
毎週 MTG の際にメンバーの中で翌週のプルリクに対して、誰が誰のレビューをするのか決めて、順番に回していく。
コードに対して、批評をするのではなく、自分がわからないコードや理解できないコードを質問するようにレビューを進めることで
実装者のレベルは関係なくレビューを行っていけるかと思います。
明らかに実装に問題がある場合は、指摘しましょう。

#### ブランチ命名規則
- **プレフィックス**をつける
  - feature: 機能追加
  - fix: バグ修正
  - config: 設定
  - refactor: リファクタリング

**＜具体例＞**
issue#３ Todo の作成画面の実装の場合

`git checkout -b 'feature/todotop_layout'`

#### コミットメッセージ
プレフィックス + 日本語で端的に

**＜具体例＞**
`git commit -m 'feature/todotop 作成' `
