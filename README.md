# replace-and-excute README

This is an extension to help replace some string and excute some method base on the string


## Commands
`Replace number and excute`  
Replace the selected number with the string which is excuted.  
Note: before you run this command, please override this default setting with your own setting:  
`"replace-and-excute.replace-number-and-excute-string": "${number - 1}"`  
You can set it as an template which have some excutable js in the ${} blocks:
- Add some string and math the number:  
    `${number / 2}px` : `20` -> `10px`
- Add more than one excutable blocks:  
    `${number} * ${number}` : `100` -> `100 * 100`
- Some complex logic:  
    `${['a','b','c'].join(number)}` : `0` -> `a0b0c`
#### Keybindings
`Alt+C`

## Release Notes

Users appreciate release notes as you update your extension.

### 0.0.1

Initial release of a testing version