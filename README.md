# PDF Sheet

![Version](https://img.shields.io/github/v/tag/arcanistzed/pdf-sheet?label=Version&style=flat-square&color=2577a1) ![Latest Release Download Count](https://img.shields.io/github/downloads/arcanistzed/pdf-sheet/latest/module.zip?label=Downloads&style=flat-square&color=9b43a8) ![Foundry Core Compatible Version](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2Farcanistzed%2Fpdf-sheet%2Fmain%2Fmodule.json&label=Foundry%20Core%20Compatible%20Version&query=$.compatibleCoreVersion&style=flat-square&color=ff6400)

Export your Foundry character sheet to a PDF!

## Installation

In the setup screen, use the URL `https://github.com/arcanistzed/pdf-sheet/releases/latest/download/module.json` to install the module.

## Usage

Just click on the button in the header of a character sheet and then it will open the configuration window.
Once you upload a PDF, you'll see a list of each of the PDF's fields alongside an input.
You can either fill in the fields manually with what is on your character sheet or you can use a "mapping" (described later) to fill them in automatically with the values from your character sheet.

### Get a PDF

If you need a copy of the PDF for D&D 5th edition, there is a button to take you to the official one.

You can theoretically use this module with the PDF for any system, but some fields used on other PDFs may not be supported. File a bug if you encounter a PDF that doesn't work.

### Mapping

In order to automatically fill out the sheet with values, you will need a JSON mapping of the PDF fields to the values on your character sheet. This is known as a "mapping" and can be edited in the module settings.

**TIP:** Install [Ace Library](https://foundryvtt.com/packages/acelib) if you want to use a proper editor to work on creating your mapping.

The mapping is formatted like this:

```json
[
    {
        "pdf": "CharacterName",
        "foundry": "@name"
    },
    {
        "pdf": "Check Box 11",
        "foundry": "@data.abilities.str.proficient"
    },
    {
        "pdf": "Race",
        "foundry": "@data.details.race"
    }
]
```

This will take care of filling out the character name, strength save proficiency, and race on a D&D 5e character sheet.
As you can see, the `@` is used to access properties of the Actor data, rather than a fixed value.

Please share any mappings you create with me and I will list them here for the benefit of the community.

## License

Copyright © 2021 arcanist

This package is under an [MIT license](LICENSE) and the [Foundry Virtual Tabletop Limited License Agreement for module development](https://foundryvtt.com/article/license/).

This uses some code from [pdfform.js](https://github.com/phihag/pdfform.js) which is under the [Apache 2.0 License](https://github.com/phihag/pdfform.js/blob/master/LICENSE) and heavily modified by me. You may obtain a copy of the license on the [Apache website](http://www.apache.org/licenses/LICENSE-2.0).

## Bugs

You can submit bugs via [Github Issues](https://github.com/arcanistzed/pdf-sheet/issues/new/choose) or on [my Discord server](https://discord.gg/AAkZWWqVav).

## Contact me

Come hang out on my [my Discord server](https://discord.gg/AAkZWWqVav) or [click here to send me an email](mailto:arcanistzed@gmail.com?subject=pdf-sheet%20module%20for%20Foundry%20VTT).
