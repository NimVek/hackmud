# ｈａｃｋｍｕｄ

In this repository i put some scripts i developed for the game hackmud.
Maybe they are useful maybe not, you are free to test, change or fork.

## Diretories

### include

Here are some functions that are useful in a lot of scripts.
To make them reusable they are separated into extra files.
I tried to use some prefixes to do extra grouping.

Prefix | Meaning
fmt_ | formating values or objects, useful for displaying
nfo_ | getting additional info for a value (e.g. level of script)

### tools

Scripts that beautifies your game expirience.

Name | Usage
access_log.js | parses your access log and displays it slightly diffrent
bank_statement.js | parses ypur transactions and displays a bank statement
call.js | calls the given scriptor with the given arguments and displays some additional info
market_browse.js | parses the available upgrades on the market and displays the cheapest item ob each type and rarity
qr_decode.js | decodes a QR code

### hacking

Scripts for hacking usage, e.g. lockpicks, locscraping.

### poc

Proof of concepts, here are some special tools that are not really usefull but
to test some functions.

## example

Some examples like `hello_world` and a mockup for a lib

## Usage

```bash
$ npm install
$ npm run-script build
```

This builds, lints and shrinks the scripts and place the results in `release` directory.
You can copy the file directly to your scripts folder.
Depending on your operating system this is `%APPDATA%\hackmud\<username>\scripts\` (Windows) or `$HOME/.config/hackmud/<username>/scripts/` (Linux & Mac).
The upload them with `#up <scriptname>`.

## Todo

* Automaticly determine include per library (create library)