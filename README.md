# 👉 plsaskme.com

**💬 A random question generator for your next party  Never have any boring conversations again!** 🎉
Fun (and spicy) random questions for friends and couples (or maybe even yourself, who knows!).

Final project for Harvard's MOOC "__[CS50x]__", 2020-21.
(As of Dec '21, also going to be submitted to Estonian harpi.com web-app programming competition)

Deployment status:
[![Netlify Status](https://api.netlify.com/api/v1/badges/9c1ee742-e7f5-45a9-b093-d2defe49339c/deploy-status)](https://app.netlify.com/sites/conversee/deploys)

README todo: add some images here
https://github.com/othneildrew/Best-README-Template
https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#links

## Features
- **+250 questions**
- **Beautiful & functional**; **mobile-first**, but responsive for other screen sizes as well
- **Two languages** (English, Estonian)
- Choose between **usual and *spicy* mode** 🌶 (for somewhat naughtier questions)
- **Dark mode** available
- **Automatically detects language** based on country
- **Saves preferences between sessions** (language & spiciness, already asked questions)
---
## Technical details
### Stack
Since I'm a rat (hello!) and didn't want to pay for any hosting, this project is built on the premise that there is no database and backend processing *per se*, so the whole thing can be deployed as a static site. Right now that means:

- Netlify (free plan) / questions are saved from GitHub folder "public/questions" as static assets
- Pure HTML/JS/CSS

I still pay for two custom domain names, because they're cool. Right? askmepls.com and plsaskme.com

### My local "backend": 
- Node.js script `q-putter.js` (uses Node module `fs-extra`) that converts a .tsv file into separate question files and saves count.

Visual Studio Code and Live Extension came in handy.

### About some challenges I encountered:
- Finding a good name (still not sure)
- Different (mobile) browsers acting up differently (*OMG!*, that Safari margin bug that I debugged until 3pm) / responsive design in general
- How to preload questions to avoid wait
- Efficient animations
- Getting my head around async / await / modules (https://addyosmani.com/blog/script-priorities/); still not good at it
- Focusing on the important, not nitpicking details :)

### The way questions reach my happy users:
0. **Gathering questions:** Google Forms, friends (haha), other websites
1. **Sorting & maintaining questions:** Google Sheets
2. **Adding the questions to GitHub folder "public/questions":**
    2.a. Download questions to local computer as a .tsv file (*e.g.* "en-spicy.tsv")
    2.b. Feed this file to "q-putter.mjs", which overwrites local "public/questions/"; add, commit, push.
    2.c. Netlify deploys automatically on every push, saves questions from GitHub folder "public/questons" as static assets
        (e.g. there's a question at plsaskme.com/questions/en-spicy/17)
3. **Fetching & displaying questions:** JavaScript Fetch API + local storage as question history mechanism.

Some stuff for Sheets:
- Data -> Sort Sheet (removes empty rows)
- Data -> Data Cleanup -> Remove duplicates
- To remove "107." from "107. What's your name?" when gathering questions from the interweebz: 
    CTRL F + regex `^\d+(\.|\,)\s+` (also works with commas, uneven spacing)

[convers.ee]: <https://convers.ee>
[CS50x]: <https://cs50.harvard.edu/x/2021>
[fs-extra]: <https://www.npmjs.com/package/fs-extra>