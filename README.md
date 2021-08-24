# cotree対話シート
## 概要
カウンセリング・コーチングの事前・事後にとるアンケートのvue libraryです。
セッションの内容を充実させること、セッションの評価のために活用します。  
cotree_jp、alpaca両プロダクトで似たような構成/内容であるため、両方の共通ツールとして独立したリポジトリになっています。  
回答結果は、Ajax通信で各プロダクトのエンドポイントにアクセスし、各プロダクトのデータベースに保存します。  
  
※現在は「対話シート」「dialog sheet」に統一していますが、以前は「inspire」と呼ばれていました。

## 開発環境のセットアップ
1. クローン
2. node v11.14.0　をinstall
  - [nコマンド](https://www.npmjs.com/package/n)あたりを使うと便利です
3. リポジトリのルートで `npm install`
4. `npm run serve`
  - http://localhost:8080/ にアクセスすると、コンポーネントの一覧のテンプレート(`src/assets/templates/example.ts`)が表示されます

## 本番での利用方法
- 以下のように、`package.json` の `dependencies` に記載したのち、`npm install` （もしくは `yarn`）してください。
```
  "dependencies": {
    "dialog-sheet": "git+https://[デプロイキー]:x-oauth-basic@github.com/cotree/dialog-sheet.git#master",
  }
```
- 詳しくは、cotree.jpやalpacaの `package.json` を参考にしてください。

## 実際のアンケート質問紙データについて
- カウンセリングやコーチングの事前アンケートの実データは、このコンポーネントではなく、[cotree_jpのレポジトリ](https://github.com/cotree/cotree_jp/tree/master/app/Lib/Json/DialogSheet)や[alpacaのレポジトリ](https://github.com/cotree/api-alpaca/tree/master/lib/dialog_sheet_templates)にあります
    - 見た目を確認したい場合は、対話シートビュワー(https://staff.cotree.jp/dialog_sheets/viewer)を活用してください

## レビュー環境(heroku)
https://dashboard.heroku.com/apps/cotree-inspire  
※対話シート単体デプロイ用。開発状況の共有等に使いました。(稼働させるとお金がかかるので必要な時だけ動かします)  
heroku内にログインし、masterを手動デプロイすることで使えます。

## よく触る設定ファイル群
 - `tslint.json` - lintであまりにも気に入らないルールがあったらrulesに追加して無効にすることができます。errorじゃ重いものをwarningレベルにすることもできます。
 - `types/index.d.ts　types/ambient.d.ts` - 型定義されていないmoduleや、既存オブジェクトを型拡張する場合、こちらで定義します。  
※私(作成者)が未熟なため、これをきちんと活用できていない感があります。。お見知り置きを。。
 - `package.json` - 直接は触らず、確認に使います。追加するときは `npm install -S xxx` or `npm install -D xxx`(開発用) でインストールします。

## コンポーネント構成
`/components/` にアクセスすると、コンポーネント一覧を閲覧できます。  
新しいコンポーネントを追加したり、スタイルが増えたら一覧に追加してください。  
  
ほとんどのコンポーネントは、[ElementUI](https://element.eleme.io/#/en-US)がベースになっています。  
`components/`以下のコンポーネント群は、それぞれのwrapperコンポーネントとなっており、スタイルをレスポンシブ対応したり、特殊な値を扱えるようにしています。  
※オリジナルコンポーネントもあります。  

componentは、`form/` `ui/` に分かれており、formはform部品、uiはそれ以外のパーツとなります。  
  
また、レイアウトのベースのcssとして`uikit.min.css`も読み込んでいます。  
※Element.uiの場合、 レスポンシブ対応していないため  
https://getuikit.com/  
見出しやレイアウトには、`uk-`でスタイルを整えているものもあります。

## templateファイルについて
`static/formTemplates`下に、各セッションタイミングに対応した質問内容のJSONを記載したファイルが置いてあります。  
今後、このテンプレートと同様の型のJSONファイルをAPIから取得することで、動的に質問を出し分けできるものを想定しています。  
`templates` <- `templateGroups` <- `templateItems` の3段構成(上位から1対多)となっています。  
  
## バリデーションについて
`views/index.vue` の `setValidateRules` 参照  
1. 全共通デフォルトで必須バリデーション追加
2. タイプ後ごとのバリデーションルールを追加
3. templateに設定されたバリデーションルール`validate`で1を上書き
の3箇所で設定されています。  

ルール自体の書き方は、ElementUIの記法に沿っています。  
https://element.eleme.io/#/en-US/component/form#validation

## 環境構成(初期に構築した方法)
VueCLI3.0 の `vue create` にてプロジェクトを作成しています。
下記はデフォルトで導入。
 - TypeScript
 - Jest（まだ活用できてない）
 - TSLint
https://cli.vuejs.org/

注意点としては、vueの過去の標準構成だとwebpackの設定は `webpack.config.js` に記載していましたが、   
VueCLI3.0では、 `vue.config.js` を追加することで設定可能になります。  
https://cli.vuejs.org/config/#target-browsers  
今回は、chunk(ファイル分割)設定を変更したく、`webpack.config.js`を追加しています。  
デフォルトは複数ファイルビルドされるのを、1ファイルに統合しています（ビルドされたファイルを別PJから読み込むため）  
参考：[ちゃんと理解するCode Splitting](https://qiita.com/seya/items/06b160adb7801ae9e66f)

### ※package.jsonのscriptに下記加えました 2020/01
```
    "build:copy": ". build.sh",
    "build:copy:user": ". build.sh user",
    "build:copy:staff": ". build.sh staff"
```

各環境内で、ビルドしたファイル群をview上でアセットとして読み込みます。  
window.DialogSheetSettingを、buildしたjsの読み込みより前に読み込ませると、アクセス先を変更することができます。
```
<script>
  window.DialogSheetSetting = {
    apiUrl: "/users/dialog_sheets", // api通信の基点URL
    getPath: "/show", // readmodeで開くときのデータ取得のpath apiURLの下に連結される
    postPath: "", // データ保存時のpath apiURLの下に連結される
    postKeys: "", // getパラメータのどのパラメータを送るか選別するために付けたがまだ未使用
    finishBtnUrl: "/users", // データ送信後、サンクスページに表示されるボタンのURL
  }
</script>
```
※対話シートを開く際、URL(get)パラメータで渡したものはgetとpost両方に自動付与されます。
