import type * as Vscode from 'vscode'
import type * as Path from 'path'
import {toCmdParam} from './util'
export const execute = async (args: any) => {
  const vscode: typeof Vscode = args.require('vscode')
  const path = args.require('path') as typeof Path
  try {
    const filename = args.file
      ? vscode.Uri.parse(args.file).path
      : vscode.window.activeTextEditor?.document.fileName
    if (!filename) return
    const input = await vscode.window.showInputBox({
      placeHolder: 'enter atcoder contest id'
    })
    if(!input) return 
    const param=args.options?.params||{config:'../atcodertools.toml'}
    if (param?.config)
        param.config=path.join(__dirname, param.config)
    const terminal =
      vscode.window.terminals.find(t=>t.name==='atcoder')||
      vscode.window.createTerminal({
        name: 'atcoder'
      })
    terminal.show(true)
    terminal.sendText(`atcoder-tools gen ${toCmdParam(param)} ${input}`)
  } catch (e) {
    vscode.window.showErrorMessage(e)
  }
}
