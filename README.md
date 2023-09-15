# PDF Sheet

![Version](https://img.shields.io/github/v/tag/arcanistzed/pdf-sheet?label=Version&style=flat-square&color=2577a1) ![Latest Release Download Count](https://img.shields.io/github/downloads/arcanistzed/pdf-sheet/latest/module.zip?label=Downloads&style=flat-square&color=9b43a8) ![Supported Foundry Versions](https://img.shields.io/endpoint?url=https://foundryshields.com/version?url=https://raw.githubusercontent.com/arcanistzed/pdf-sheet/main/module.json&style=flat-square&color=ff6400) [![Discord Server](https://img.shields.io/badge/-Discord-%232c2f33?style=flat-square&logo=discord)](https://discord.gg/AAkZWWqVav) [![Patreon](https://img.shields.io/badge/-Patreon-%23141518?style=flat-square&logo=patreon)](https://www.patreon.com/bePatron?u=15896855)

A system agnostic tool to export your Foundry character sheet to a PDF!

## Installation

In the setup screen, use the URL `https://github.com/arcanistzed/pdf-sheet/releases/latest/download/module.json` to install the module.

## Usage

Just click on the button in the header of a character sheet and then it will open the configuration window.
Once you upload a PDF, you'll see a list of each of the PDF's fields alongside an input.
If you have a mapping configured correctly, those fields will automatically be filled out with the values from your character sheet.

### Get a PDF

This module requires you to upload a form-fillable PDF which it will fill out for you. If you need a copy of the PDF, there is a button which will download the correct one for some systems.

You can theoretically use this module with the PDF for any system, but some fields used on other PDFs may not be supported. File a bug if you encounter a PDF that doesn't work.

### Mapping

A mapping is *required* for the module to function as expected. You can edit the current mapping in module settings and there is also a dropdown menu with some [community contributed mappings](https://github.com/arcanistzed/pdf-sheet/tree/main/mappings) which you can load in.

A mapping is a JavaScript object (not JSON) which is saved with a `.mapping` file extension. The mapping provides the information needed to know which PDF fields to associate with which values from your actor. It is also responsible for formatting, calculating, concatenating, etc. those values for display on the PDF character sheet.

**TIP:** Install [Ace Library](https://foundryvtt.com/packages/acelib) if you want to use a proper editor to work on creating your mapping.

The mapping is formatted like this:

```js
[
    {
        "pdf": "CharacterName",
        "foundry": @name
    },
    {
        "pdf": "Check Box 11",
        "foundry": @data.abilities.str.proficient
    },
    {
        "pdf": "Race",
        "foundry": @data.details.race
    },
    {
        pdf: "Speed",
        foundry: Object.entries(actor.data.data.attributes.movement).filter(val => val[1]).map(val => val[0] === "hover" ? Object.entries(actor.data.data.attributes.movement)[6][0] : "" + val[0] !== "units" && val[0] !== "hover" ? val.join(": ") + Object.entries(actor.data.data.attributes.movement)[5][1] : "").filter(String).join(", ")
    },
    {
        pdf: "Backstory",
        foundry: @data.details.biography.value?.replaceAll(/<[^>]*>/g, "").trim()
    },
    { "pdf": "PlayerName", foundry: Object.entries(@permission).filter(entry => entry[1] === 3).map(entry => entry[0]).map(id => !game.users.get(id)?.isGM ? game.users.get(id)?.name : null).filter(x => x).join(", ") }
]
```

This will take care of filling out the character name, strength save proficiency, race, speed, and backstory on a D&D 5e character sheet.

As you can see, the `@` is used to access properties of the Actor data, rather than a fixed value.
You may use any valid JavaScript functions or formulas in the mapping, but it should return a String or [coerce](https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion) into one.

**⚠️WARNING:** Do not use line comments (you can use block comments) since the mapping is saved on one line.

While creating a mapping, it's very helpful to work in the browser console (F12):

https://user-images.githubusercontent.com/82790112/131598024-cfb300d9-57d3-4768-bd01-28b8b93c89be.mp4

Please share any mappings you create with me and I will include them in the module for the benefit of the community. [See the mappings here](https://github.com/arcanistzed/pdf-sheet/blob/main/mappings/README.md).

## Support

Please consider supporting me on [my Patreon](https://patreon.com/arcanistzed) if you like my work. You can see a list of all my projects on [my website](https://arcanist.me).
From september 2023 the module is mantained with the collaboration of Gioppo Luca, you can find me in the arcanistzed discord server

## Bugs

You can submit bugs via [Github Issues](https://github.com/arcanistzed/pdf-sheet/issues/new/choose) or on [my Discord server](https://discord.gg/AAkZWWqVav).

## Contact me

Come hang out on my [my Discord server](https://discord.gg/AAkZWWqVav) or [click here to send me an email](mailto:arcanistzed@gmail.com?subject=Export%20Sheet%20to%20PDF%20module).

## New extended character sheet for 5e
If you use homebrew content or your player does not have access to all the playing data it is useful for the master to print the whole description of spells and equipment in the extended description.
The classic character sheet does not allow to export that content, from now on the master can use the __dnd5ev11extended.mapping__ file together with the pdf in the __/pdf__ folder and give the players a complete character book with all the needed information.

## TODO

- Use PDFlib library instead of pdfform.js (since it's not maintained and can't support images)
- Change the mapping to JSON, evaluating each value instead of the whole file
- Store the JSON as an Object rather than serialized text
- Add a field to the JSON mapping for a link to the PDF which can be put in the App instead of only the D&D link

## License

Copyright © 2021 arcanist

This package is under an [MIT license](LICENSE) and the [Foundry Virtual Tabletop Limited License Agreement for module development](https://foundryvtt.com/article/license/).

This uses some code from [pdfform.js](https://github.com/phihag/pdfform.js) which is under the [Apache 2.0 License](https://github.com/phihag/pdfform.js/blob/master/LICENSE) and heavily modified by me. You may obtain a copy of the license on the [Apache website](http://www.apache.org/licenses/LICENSE-2.0).
