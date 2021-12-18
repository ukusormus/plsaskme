# 👉 [plsaskme.com]

**💬 A random question generator.** 

<br>

Never have any boring conversations again! 🎉 Break that akward silence at your next party.

Fun (and spicy) random questions for friends, couples, or maybe even yourself (who knows!).

<br>

*Deployment status:*
[![Netlify Status](https://api.netlify.com/api/v1/badges/9c1ee742-e7f5-45a9-b093-d2defe49339c/deploy-status)](https://app.netlify.com/sites/conversee/deploys)

<br>

Final project for Harvard's MOOC "__[CS50x]__", 2020-21.

*(As of Dec '21, also going to be submitted to Estonian harpi.com web-app programming competition.)*


README todo: add some images here
https://github.com/othneildrew/Best-README-Template
https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#links
<br>
<br>
## Features
- **+250 questions**
- **Beautiful & functional**; **mobile-first**, but responsive for other screen sizes as well
- **Two languages** (English, Estonian)
- Choose between **usual and *spicy* mode** 🌶 (for somewhat naughtier questions)
- **Dark mode** available
- **Automatically detects language** based on country (IP)
- **Saves preferences between sessions** (language & spiciness, already asked questions)
<br>
<hr>
<br>

## Technical details and a bit about the process

### Stack
This project is built on the premise that __there is no database and backend processing *per se*__, so the whole thing can be deployed as a static site. Why pay for hosting if I don't have to?

- Website: **pure HTML/JS/CSS**
- Static hosting: **Netlify** (free plan)
- *Well, where are the questions?* As static assets, see [The way questions reach my happy users](#the-way-questions-reach-my-happy-users).


For country detection, [ipregistry.co] API.

I still pay for two custom domain names, because they're cool together (at least I hope): __[askmepls.com]__ and __[plsaskme.com]__

<br>

__Visual Studio Code__, __Live Extension__ and __Google Chrome Dev__,  used for local development. 

Still needed to deploy a lot because some things (specifically CSS) didn't work the same way on my laptop and phone. Fortunately that wasn't a problem, since with every push, Netlify builds and deploys automatically, and that takes about 13 seconds.

<br>

### About some challenges I encountered:
- Finding a good name (still not sure)
- KISSing (Keeping It Simple, Stupid) -- at the beginning, overthought my stack needs (tested out Firebase; thought too long if I should use Vue or *insert any other currently popular framework*, etc.)
- Different (mobile) browsers acting up differently and responsive design in general (*OMG!*, that Safari margin bug that I debugged until 3pm)
- Getting my head around async / await / modules, [script loading priorities](https://addyosmani.com/blog/script-priorities/) (not an expert on these, still lots to learn)
- How to preload questions to avoid wait
- How to design a good UI and smooth UX
- Non-laggy animations
- Focusing on what's the most important to the user, not nitpicking insignificant details

A good tool for me is taking a step back, using paper and pencil to sketch out stuff.

<br>

### The way questions reach my happy users:
0. **Gathering questions:** Google Forms, friends, other websites
1. **Sorting & maintaining questions:** Google Sheets
2. **Adding the questions to GitHub folder "public/questions":**
    2.a. Download questions to local computer as a `.tsv` file (*e.g.* `en-spicy.tsv`)
    2.b. Feed this file to `q-putter.mjs`, which overwrites local "public/questions/"; add, commit, push.
    2.c. Netlify deploys automatically on every push, saves questions from GitHub folder "public/questons" as static assets
        (e.g. there's a question at [plsaskme.com/questions/en-spicy/17])
3. **Fetching & displaying questions:** JavaScript Fetch API + local storage as question history mechanism.

`q-putter.mjs` is a Node.js script (uses Node module `[fs-extra]`) that converts a `.tsv` file (downloaded from Google Sheets) into separate question files and a question count file (called `count`, to - well -, save the question count as a static asset). These files are pushed to GitHub folder "public/questions", **Netlify** saves them as static assets.

<br>

### Some useful stuff for Google Sheets:
- Data -> Sort Sheet (removes empty rows)
- Data -> Data Cleanup -> Remove duplicates
- To remove "107." from "107. What's your name?" when gathering questions from the interweebz: 
    CTRL F + regex `^\d+(\.|\,)\s+` (also works with commas, uneven spacing)

### Useful tools not mentioned yet
- https://regexr.com/
- https://realfavicongenerator.net/
    
[plsaskme.com]: <https://plsaskme.com>
[askmepls.com]: <https://askmepls.com>
[CS50x]: <https://cs50.harvard.edu/x/2021>
[fs-extra]: <https://www.npmjs.com/package/fs-extra>
[ipregistry.co]: <https://ipregistry.co>
