# VSCode で Atcoder の問題を効率的に解くためのテンプレ

Atcoder を VSCode 使って解くときに、`atcoder-tools`等を使って問題に集中できるようにしました

## デモ

### コンテスト環境の用意

![generation demo](./gen-demo.gif)

### テスト

![test demo](./test-demo.gif)

### 提出

![submit demo](./submit-demo.gif)

## 必要環境

- VSCode (1.55.2)
- Python (Python 3.7.4)
- Node.JS (v10.15.1)

## 必要ライブラリのインストール

Python

- [atcoder-tools](https://github.com/kyuridenamida/atcoder-tools)

### atcoder-tools のインストール方法

```bash
pip install atcoder-tools
```

VSCode

- [Power Tools](https://marketplace.visualstudio.com/items?itemName=ego-digital.vscode-powertools)

### Power Tools のインストール方法

VSCode の `Extensions` から`vscode-powertools`を探してインストール

## 各種設定

デフォルトでは c++用になっています  
設定は`.vscode/settings.json` を開いて、`ego.power-tools` の中で行えます

例えば、`atcoder.gen`, `atcoder.test`, `atcoder.submit` の中にある `params`を変更して atcoder-tools に渡す引数を変更できます。  
なお、`${activeFile}` には実行するファイル名、 `${workspaceRoot}`にはワークスペースの絶対パスが入ります。
ワークスペースとは今開いて作業しているフォルダのことです
他の変数は[こちら](https://github.com/egodigital/vscode-powertools/wiki/Values)を参照してください

`atcoder.test` や `atcoder.submit` のなかにある `compiler`を変更してコンパイラを変更できます

## AC-Library のインストール

Atcoder には[ac-library](https://github.com/atcoder/ac-library.git)という超便利な
公式ライブラリがあります。それを atcoder で使えるようにします

### C++編

C++の場合は、github からインストールしてインクルードパスに入れればできます。  
インストールは`git submodule add` を使います。

```bash
cd (ワークスペースへのパス)
git submodule add https://github.com/atcoder/ac-library.git ac-library
```

そして`ac-library` がワークスペースにインストールされているのが確認できたら以下のファイルを変更します。
`.vscode/c_cpp_properties.json`の`configurations.includePath`に`"./ac-library/**"`を追加して以下のようにします。

```json
{
  "configurations": [
    {
      "name": "Mac",
      "includePath": ["/usr/local/include/**", "./ac-library/**"],
      "defines": [],
      "macFrameworkPath": [],
      "compilerPath": "/usr/bin/g++",
      "cStandard": "gnu17",
      "intelliSenseMode": "gcc-x64"
    }
  ],
  "version": 4
}
```

そして`.vscode/settings.json` の`ego.power-tools`にある`atcoder.test`と `atcoder.submit`の`options.compiler`を`g++ -std=c++17 -fsanitize=address -D_GLIBCXX_DEBUG -D_GLIBCXX_DEBUG_PEDANTIC -I${workspaceRoot}/ac-library ${activeFile}`に変更することで使えます。
[ドキュメント](https://atcoder.github.io/ac-library/production/document_ja/)
