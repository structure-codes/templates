# structure-templates
This repository contains all premade templates for [structure](https://structure.codes).

Structures must be stored in `tree` format.

This can be generated with the [tree](https://linux.die.net/man/1/tree) command line tool or copied from the main structure site.
```
├── client
|	├── public
|	|	└── templates
|	└── src
|		├── AboutView
|		├── App
|		|	└── Header
|		├── HomeView
|		|	├── CodePanel
|		|	├── Dropdown
|		|	├── ModelPanel
|		|	└── SettingsPanel
|		└── WelcomeModal
├── examples
└── server
	├── dist
	└── src
```

Any and all submissions are welcome, just make sure to follow the below guidelines for creating templates.

The `scripts/genList.js` script will run on every commit to generate `templates.json`. If a change is detected in this file then it will push back to the repo with the changes. *This is the only way `templates.json` should be updated.*