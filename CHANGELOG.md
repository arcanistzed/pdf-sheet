# Changelog

## 0.23.0 - 27 Ago 2023


**Fixed bugs:**

- \[Bug\]: V11 dnd5e not working [\#81](https://github.com/arcanistzed/pdf-sheet/issues/81)
- \[Bug\]: Empty PDF when exporting PF1e [\#75](https://github.com/arcanistzed/pdf-sheet/issues/75)
- \[Bug\]: german dnd5e: PDF Sheet | Invalid mapping Javascript Object [\#67](https://github.com/arcanistzed/pdf-sheet/issues/67)

**Merged pull requests:**

- Update module.js for pushing next release [\#84](https://github.com/arcanistzed/pdf-sheet/pull/84) ([dyoung418](https://github.com/dyoung418))
- Fixed for v11 and closes \#10 [\#82](https://github.com/arcanistzed/pdf-sheet/pull/82) ([gioppoluca](https://github.com/gioppoluca))
- Fixes pf2e mapping and adds pf2e-extended with full feature descriptions [\#80](https://github.com/arcanistzed/pdf-sheet/pull/80) ([dyoung418](https://github.com/dyoung418))
- Add starfinder mapping [\#70](https://github.com/arcanistzed/pdf-sheet/pull/70) ([Beff42](https://github.com/Beff42))
- Background was not appearing [\#68](https://github.com/arcanistzed/pdf-sheet/pull/68) ([SebaSOFT](https://github.com/SebaSOFT))

## 0.22.4 - 4 Feb 2023

DnD5e mapping: compatibility with Foundry v10.291 & DnD5e 2.1.4 (thanks to @SebaSOFT)

## 0.22.3 - 17 Jan 2023

Pathfinder 2e mapping: comment out Immunities & Resistances (thanks to @FuzzyFlipFlop)

## 0.22.2 - 15 Nov 2022

Fix for The Forge

## 0.22.1 - 15 Nov 2022

Pathfinder 2e mapping: update for system version 4.2.2 (thanks to @BlauKreuz) 

## 0.22.0 - 1 Oct 2022

Pathfinder 2e mapping: update for system version 4.1.3 (thanks to @BlauKreuz) 

## 0.21.0 - 30 Aug 2022

Update to Call of Cthulhu 7th Edition mapping (thanks to @Dick-K)

## 0.20.2 - 11 Jul 2022

### Fixed

* Updated german dnd5e mapping for new PDF v2.8.2 and fix null issue in `htmlToText` function (thanks to @manolitto)
* Code formatting & linting
* Update manifest for v10

## 0.20.1 - 1 Jul 2022

### Fixed

Pathfinder 2e mapping: correct Current Bulk value for system version 3.12.1.9 (thanks to @BlauKreuz) 

## 0.20.0 - 15 Jun 2022

### Fixed

* Make window wider to make the interface less crowded
* Update French localization
* Invalid JSON in English localization

## 0.19.0 - 14 Jun 2022

### Added

* French localization (thanks to @zdaar)
* New SWADE mapping (thanks to @SalmonRain)

### Fixed

Pathfinder 2e mapping: fixes for Pathfinder2e 3.11.0.3 (thanks to @BlauKreuz)

## 0.18.1 - 12 Apr 2022

### Fixed

Pathfinder 2e mapping: fixes for Pathfinder2e 3.8.4.11118 (thanks to @BlauKreuz)

## 0.18.0 - 9 Apr 2022

### Added

German dnd5e mapping: updated mapping for new PDF v2.8.1 (thanks to @manolitto)

### Fixed

Pathfinder 2e mapping: fixes for Pathfinder2e 3.8.2.11047 (thanks to @BlauKreuz)

## 0.17.0 - 20 Mar 2022

### Added

DCC mapping: add 0 level character sheet mapping (thanks to @mphagan)

## 0.16.0 - 19 Mar 2022

### Added

DnD5e mapping: Export entire text from the description field of feats and traits (thanks to @FreakyFerrox)

### Fixed

Pathfinder 2e mapping: fixes for Pathfinder2e 3.7.2.10819 (thanks to @BlauKreuz)

## 0.15.3 - 11 Mar 2022

### Fixed

Thanks to @Jinix16

* Cases where certain properties don't exist
* Spell mappings on 5e character sheet and added spell component indicators (VSMC)

## 0.15.2 - 11 Mar 2022

* Pathfinder 2e mapping: further updates for v9 (thanks to @BlauKreuz)

## 0.15.1 - 20 Feb 2022

### Fixed

* Shadownrun 5e mapping: added condition tracks which had been forgotten (thanks to @BlauKreuz)
* Pathfinder 2e mapping: update for v9 (thanks to @BlauKreuz)

## 0.15.0 - 12 Feb 2022

All thanks to @manolitto:

* Translate and organize proficiencies, respect semicolon in custom lists (#20)
* Use `derivedDamage` strings in attacks (#19)
* Strip HTML chars from personality traits, ideals, bonds, and flaws (compatibility with Tidy5e)
* Include to-hit bonus in attacks
* Asterisk indicates there is additional damage from attack (more than one damage part)
* Equipment sheet includes only weapons, equipment, and tools; containers and consumables moved to treasure for space management
* Spells removed from equipment list
* Strip html from all fields using DOM methods
* Show all damage types, indicating type
* All movement types shown if non-walking or multiple types

## 0.14.0 - 10 Feb 2022

### Added

* Mapping for a german dnd5e character sheet (thanks to @manolitto)
* Pathfinder 2e mapping (thanks to @BlauKreuz)

### Fixed

* PDF select boxes (thanks to @manolitto)

## 0.13.0 - 7 Feb 2022

### Added

* PF1 mapping (thanks to `@Mira#2306`)

### Fixed

* Resize module settings window to fit mapping settings

## 0.12.0 - 28 Jan 2022

### Added

* Name downloaded PDFs with the actor name

## 0.11.2 - 23 Jan 2022

* 0.7.9 compatibility

## 0.11.1 - 12 Jan 2022

### Fixed

* Removed console log
* Works with other languages that don't have localizations

## 0.11.0 - 11 Jan 2022

Removed the default keys for the keybinding for better compatibility (users can define their own)

### Fixed

Shadowrun 5 mapping: fixed SINs lines 1 and 2

Starwars FFG mapping: skip career skill check if removed

## 0.10.1 - 18 Dec 2021

### Fixed

Invalid JSON

## 0.10.0 - 18 Dec 2021

### Added

Shadowrun 5e unofficial mapping (thanks to @BlauKreuz)

## 0.9.0 - 2 Dec 2021

### Added

* Star Wars EOTE (FFG) mapping (thanks to @HaxxonHax)
* Support for other systems in the PDF downloading button

## 0.8.0 - 30 Nov 2021

### Added

* Press `P` with a character sheet open to show the config (requires v9d2 or later)

### Fixed

* Loading mappings into Foundry VTT instances using a route prefix
* Fixed dealing with PDFs containing Acrobat forms

## 0.7.7 - 4 Nov 2021

Rename `node_modules` to `libraries` to work on The Forge

## 0.7.5 - 27 Oct 2021

D&D 5e mapping: Added all spells (thanks to @cadowtin)

## 0.7.4 - 25 Oct 2021

D&D 5e mapping: Added mapping for Spell Casting Class (basic), Spell Casting Ability, Spell Save DC, Spell Attack Bonus, Cantrips and 1st level spell slots (thanks to @cadowtin)

## 0.7.3 - 20 Oct 2021

* CoC7 Mapping (thanks to @Dick-K)
* Disabled inputs as they do nothing currently

## 0.7.2 - 6 Oct 2021

dnd5e mapping: more specific properties for appearance (thanks to @jocolamarco)

## 0.7.1 - 22 Sept 2021

* Fix for Cypher System mapping (thanks to @Fashtas)
* Fix issues with localization of the download PDF button
* Fix window sizing & inner margin

## 0.7.0 - 13 Sept 2021

* Localization for the download PDF button
* Update to the `dnd5e` mapping (thanks to @sneat)
  * Support for classes, weapons, currency, features, equipment, and treasure
  * Fix appearance fields showing `undefined`

## 0.6.2 - 7 Sept 2021

Revert/fix node modules not getting included in package

## 0.6.0 - 6 Sept 2021 - Auto-load mappings

`.mapping` files placed in `Data/modules/pdf-sheet/mappings` are automatically loaded into the list in settings

## 0.5.1 - 6 Sept 2021 - D&D 5e & Error Handling

* Added WIP D&D 5e mapping (thanks to `@Pluto Anatole`)
* Fixed some typos
* Improved error feedback in console to allow you to browse to the location of the error in the evaluated mapping by clicking on the link in the top right of the error message

## 0.4.1 - 29 Aug 2021

Removed comments from Cypher Mapping, since they were causing issues and normalized formatting

## 0.4.0 - 29 Aug 2021 - Load Mappings & Cypher System

* Added Cypher System mapping (thanks to `@Fashtas`)
* Added dropdown menu to the module settings to allow you to load in finished mappings

## 0.3.1 - 29 Aug 2021

Removed log

## 0.3.0 - 29 Aug 2021 - Text Areas

* Switched to `textarea`s for strings to allow them to be multiline
* Made application size more dynamic
* Lined up the inputs & labels in the form and assigned the labels to their inputs
* Improved information displayed in the logs

## 0.2.1 - 27 Aug 2021

Updated terminology used internally

## 0.2.0 - 27 Aug 2021 - Functions

* Added the abiltiy to use full JavaScript syntax in the mapping, unlocking funtionality which uses functions, arrays, and more. Consequently, you must remove the quotes around the "foundry" field's value. See the [README](https://github.com/arcanistzed/pdf-sheet/blob/main/README.md) for details
* Groupped and improved logs
* Better error handling with a link to the [README](https://github.com/arcanistzed/pdf-sheet/blob/main/README.md)
* Stopped attempting to inject an Ace editor for non-GMs when opening the settings menu
* Fix header button not appearing in systems which use "PC" rather than "character" for the player character actor type
* Hide unhelpful Ace annotations and automatically attempt to beautify Ace editor contents
* Clicking the header button while the application is already open, now brings it to the top

## 0.1.5 - 19 Aug 2021 - Publish to Package Listing

## 0.1.4 - 18 Aug 2021

Fixed not bundling the library with the module

## 0.1.3 - 18 Aug 2021

Fixed no default setting for mapping (#2)

## 0.1.2 - 18 Aug 2021 -  Initial Release
