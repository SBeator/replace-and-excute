'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "replace-and-excute" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerTextEditorCommand('extension.replace-number-and-excute', (textEditor, textEditorEdit) => {
        // The code you place here will be executed every time your command is executed

        const config = vscode.workspace.getConfiguration("replace-and-excute");
        const excuteMethod = config.get('replace-number-and-excute-string') as string; 

        if (!excuteMethod) {
            vscode.window.showWarningMessage("The settingreplace-and-excute.replace-number-and-excute-string");
            return;
        }

        const replaceRegex = /^-?([0-9]*\.?[0-9]+)$/;

        replaceAndExcute(
            textEditor, 
            textEditorEdit,
            replaceRegex, 
            (match, $1) => {
                $1 = parseFloat($1);
                let number = $1;
                return excuteMethod.replace(/\$\{([^{}]*)\}/, (...args) => eval(args[1]))
            }
        );
    });

    context.subscriptions.push(disposable);
}

function replaceAndExcute(textEditor, textEditorEdit, regexString, excuteFunction) {
    let regexExp = new RegExp(regexString);
    // Check if there is some text selected
    const selections = textEditor.selections;
    
    if (selections.length == 0 || selections.reduce((acc, val) => acc || val.isEmpty), false) { return; }

    // Declaration of auxiliar variables
    let numOcurrences = 0;

    let count = 0

    selections.forEach(function (selection) {
        if (selection.isEmpty) { return; }
        // Iterates over each selected line

        for (var index = selection.start.line; index <= selection.end.line; index++) {
            let start, end;
            // Gets the first and last selected characters for the line
            start = (index == selection.start.line) ? selection.start.character : 0;
            end = (index == selection.end.line) ? selection.end.character : textEditor.document.lineAt(index).range.end.character;
            // Gets the text of the line
            let text = textEditor.document.lineAt(index).text.slice(start, end);

            // Counts the number of thimes the regex appears in the line
            const matches = text.match(regexExp);
            numOcurrences += matches ? matches.length : 0;

            if (numOcurrences == 0) {
                // No ocurrences, so it's worth continuing
                return;
            }

            // Get new text by excute the excuteFunction
            const newText = text.replace(regexExp, excuteFunction);

            // Replace text in the text file
            const selectionTmp = new vscode.Selection(index, start, index, end);
            textEditorEdit.replace(selectionTmp, newText);

        }
        return;
    }, this);
    if ((numOcurrences == 0)) {
        vscode.window.showWarningMessage("There were no number in the selection");
    }
};

// this method is called when your extension is deactivated
export function deactivate() {
}