// The MIT License (MIT)
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER

/**
 * Is invoked on an event.
 */
import type * as Vscode from 'vscode'
import type * as Path from 'path'
export const execute = async (args: any) => {
  const vscode: typeof Vscode = args.require('vscode')
  const path = args.require('path') as typeof Path
  try {
    let compiler:string |null=args.options?.compiler
    compiler=args.replaceValues(compiler)
    if (!compiler)
      throw new Error('Command Not specified')
    const filename=args.replaceValues('${activeFile}')
    if (!filename)
      throw new Error('File not specified')
    const parsedPath = path.parse(filename)
    
    const terminal =
      vscode.window.terminals.find(t=>t.name==='atcoder')||
      vscode.window.createTerminal({
        name: 'atcoder'
      })
    terminal.show(true)
    terminal.sendText(`cd ${parsedPath.dir}`)
    terminal.sendText(compiler+'&& atcoder-tools submit -u')
  } catch (e) {
    vscode.window.showErrorMessage(e)
  }
}

/**
 * The web view is going to be disposed.
 */
export const onDispose = args => {}

/**
 * This returns the title, which is displayed in the tab
 * of the web view.
 */
export const getTitle = () => {
  return 'AtcoderSubmit'
}
