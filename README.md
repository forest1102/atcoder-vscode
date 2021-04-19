# VSCode で Atcoder の問題を効率的に解くためのテンプレ

Atcoder を VSCode 使って解くときに、`atcoder-tools`等を使って問題に集中できるようにしました

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

## 使用方法

### コンテスト環境の用意

![generation demo](./gen-demo.gif)

### テスト

![test demo](./test-demo.gif)

### 提出

![submit demo](./submit-demo.gif)

## 各種設定

コンパイラなどの設定は `./.vscode/settings.json`で行えます。

`${activeFile}` には実行するファイル名、 `${workspaceRoot}`にはワークスペースの絶対パスが入ります。
他の変数は[こちら](https://github.com/egodigital/vscode-powertools/wiki/Values)を参照してください

```json
{
  ...
  "ego.power-tools": {
    "commands": {
      "atcoder.gen": {
        "name": "atcoder.gen",
        "script": "../powertools/lib/gen.js",
        "options": {
          "params": ["--workspace ${workspaceRoot}"] //atcoder-tools genに渡す引数
        }
      },
      "atcoder.test": {
        "name": "atcoder.test",
        "script": "../powertools/lib/test.js",
        "forFile": true,
        "options": {
          "compiler": "g++ -std=c++17 -fsanitize=address -D_GLIBCXX_DEBUG -D_GLIBCXX_DEBUG_PEDANTIC ${activeFile}", // g++などのコンパイラ (${activeFile}は実行するファイル名が入る)
          "params":[]// atcoder-tools test に渡す引数
        }
      },
      "atcoder.submit": {
        "name": "atcoder.submit",
        "script": "../powertools/lib/submit.js",
        "forFile": true,
        "ifFile": true,
        "options": {
          "compiler": "g++ -std=c++17 -fsanitize=address -D_GLIBCXX_DEBUG -D_GLIBCXX_DEBUG_PEDANTIC ${activeFile}",
          "params": ["-u"] // atcoder-tools submit に渡す引数
        }
      }
    },
    ...
  }
}
```
