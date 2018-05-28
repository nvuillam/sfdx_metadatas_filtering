sfdx_metadatas_filtering
========================

Filter metadatas folder with your own package.xml

[![Version](https://img.shields.io/npm/v/sfdx_metadatas_filtering.svg)](https://npmjs.org/package/sfdx_metadatas_filtering)
[![CircleCI](https://circleci.com/gh/nvuillam/sfdx_metadatas_filtering/tree/master.svg?style=shield)](https://circleci.com/gh/nvuillam/sfdx_metadatas_filtering/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/nvuillam/sfdx_metadatas_filtering?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/sfdx_metadatas_filtering/branch/master)
[![Codecov](https://codecov.io/gh/nvuillam/sfdx_metadatas_filtering/branch/master/graph/badge.svg)](https://codecov.io/gh/nvuillam/sfdx_metadatas_filtering)
[![Greenkeeper](https://badges.greenkeeper.io/nvuillam/sfdx_metadatas_filtering.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/nvuillam/sfdx_metadatas_filtering/badge.svg)](https://snyk.io/test/github/nvuillam/sfdx_metadatas_filtering)
[![Downloads/week](https://img.shields.io/npm/dw/sfdx_metadatas_filtering.svg)](https://npmjs.org/package/sfdx_metadatas_filtering)
[![License](https://img.shields.io/npm/l/sfdx_metadatas_filtering.svg)](https://github.com/nvuillam/sfdx_metadatas_filtering/blob/master/package.json)

<!-- toc -->
* [Debugging your plugin](#debugging-your-plugin)
<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g sfdx_metadatas_filtering
$ sfdx_metadatas_filtering COMMAND
running command...
$ sfdx_metadatas_filtering (-v|--version|version)
sfdx_metadatas_filtering/0.0.0 win32-x64 node-v8.9.4
$ sfdx_metadatas_filtering --help [COMMAND]
USAGE
  $ sfdx_metadatas_filtering COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx_metadatas_filtering metadatafilter:execute`](#sfdx-metadatas-filtering-metadatafilterexecute)

## `sfdx_metadatas_filtering metadatafilter:execute`

describe the command here

```
USAGE
  $ sfdx_metadatas_filtering metadatafilter:execute

OPTIONS
  -i, --inputfolder=inputfolder    Input folder (default: current folder)
  -o, --outputfolder=outputfolder  Output folder (default: filteredMetadatas)
  -p, --packagexml=packagexml      Package.xml file

EXAMPLES
  $ oclif-example execute -p myPackage.xml


  $ oclif-example execute -p myPackage.xml -output myDeployFolder
```

_See code: [src/commands/metadatafilter/execute.ts](https://github.com/nvuillam/sfdx_metadatas_filtering/blob/v0.0.0/src/commands/metadatafilter/execute.ts)_
<!-- commandsstop -->
<!-- debugging-your-plugin -->
# Debugging your plugin
We recommend using the Visual Studio Code (VS Code) IDE for your plugin development. Included in the `.vscode` directory of this plugin is a `launch.json` config file, which allows you to attach a debugger to the node process when running your commands.

To debug the `hello:org` command: 
1. Start the inspector
  
If you linked your plugin to the sfdx cli, call your command with the `dev-suspend` switch: 
```sh-session
$ sfdx hello:org -u myOrg@example.com --dev-suspend
```
  
Alternatively, to call your command using the `bin/run` script, set the `NODE_OPTIONS` environment variable to `--inspect-brk` when starting the debugger:
```sh-session
$ NODE_OPTIONS=--inspect-brk bin/run hello:org -u myOrg@example.com
```

2. Set some breakpoints in your command code
3. Click on the Debug icon in the Activity Bar on the side of VS Code to open up the Debug view.
4. In the upper left hand corner of VS Code, verify that the "Attach to Remote" launch configuration has been chosen.
5. Hit the green play button to the left of the "Attach to Remote" launch configuration window. The debugger should now be suspended on the first line of the program. 
6. Hit the green play button at the top middle of VS Code (this play button will be to the right of the play button that you clicked in step #5).
<br><img src=".images/vscodeScreenshot.png" width="480" height="278"><br>
Congrats, you are debugging!
