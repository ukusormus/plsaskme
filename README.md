[![Netlify Status](https://api.netlify.com/api/v1/badges/9c1ee742-e7f5-45a9-b093-d2defe49339c/deploy-status)](https://app.netlify.com/sites/plsaskme/deploys)
# 👉 [plsaskme.com]

**💬 A fun & spicy random question generator.** 

<br>
<br>

## Video Demo:


<a href="https://youtu.be/TVq9XUjNVKc">
    <img src="https://img.youtube.com/vi/TVq9XUjNVKc/maxresdefault.jpg" width="30%">
    <br>
    https://youtu.be/TVq9XUjNVKc
</a>

<br>
<br>

## Description:

 

Break the akward silence at your next party – never have any boring conversations again! 🎉 For friends, couples, family...

As simple as "swipe up" for a new question ("click" for non-touch devices).

<br>

### Why?

Final project for Harvard's MOOC "__[CS50x]__", 2020-21.

*(As of Dec '21, also going to be submitted to Estonian harpi.com web-app programming competition.)*

<br>
<br>

## Features
✅ +250 questions 

✅ Responsive (mobile-first). Minimalistic 

✅ Two languages – English and Estonian  

✅ Normal and "spicy" 🌶 questions 

✅ Dark mode available 

✅ Automatically detects language based on country (IP-address) and dark mode based on OS settings

✅ Preferences and question history are saved between sessions 

<br>

<br>

# Technical details, rant and a bit about the process
<br>

### Stack
This project is built on the premise that __there is no database and backend processing *per se*__, so the whole thing can be deployed as a static site. Why pay for hosting if I don't have to?

- Website: **pure HTML/JS/CSS**
- Static hosting: **Netlify** (free plan)
- *Well, where are the questions?* As static assets, see [The way questions reach my happy users](#the-way-questions-reach-my-happy-users).


For country detection, [ipregistry.co] API (fast, 100,000 requests for free).

I still pay for two custom domain names, because they're cool together (at least I hope): __[askmepls.com]__ and __[plsaskme.com]__

<br>

__Visual Studio Code__, its __Live Extension__ and __Google Chrome Dev__  used for local development. 

I still have needed to deploy a lot because some things (specifically CSS) don't just work the same way on my laptop (Windows) and iPhone. Fortunately that wasn't a big hustle, since with every push, Netlify builds and deploys automatically, and that takes about 5 to 10 seconds.

<br>
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
<br>

### The way questions reach my happy users:
0. **Gathering questions:** Google Forms, friends, other websites and question cards
1. **Sorting & maintaining questions:** Google Sheets
2. **Adding the questions to as static assets to `/public/questions/(lang)/(question nr)`:**

    2.a. Download questions to local computer as a `.tsv` file (*e.g.* `en-spicy.tsv`)

    2.b. Feed this file to `q-putter.mjs`, which overwrites local `public/questions/...` contents; add, commit, push to GitHub.

    2.c. Netlify deploys automatically on every push, saves questions from GitHub folder `public/questions` as static assets
        (e.g. there's a question at `/questions/en-spicy/17`)
3. **Fetching & displaying questions:** JavaScript Fetch API + local storage as question history mechanism.

`q-putter.mjs` is a Node.js script (uses Node module `fs-extra`) that converts a `.tsv` file (downloaded from Google Sheets) into separate question files and a question count file (called `count`, to - well -, save the question count as a static asset). These files are pushed to GitHub folder "public/questions", **Netlify** saves them as static assets.

<br>
<br>

### Some useful stuff for Google Sheets:
- Data -> Sort Sheet (removes empty rows)
- Data -> Data Cleanup -> Remove duplicates
- To remove "107." from "107. What's your name?" when gathering questions from the interweebz: 
    CTRL F + regex `^\d+(\.|\,)\s+` (also works with commas, uneven spacing)

<br>
<br>

### Useful tools/sites not mentioned yet
- https://regexr.com/
- https://caniuse.com/
- https://realfavicongenerator.net/
- https://pagespeed.web.dev/
- https://tobiasahlin.com/blog/how-to-animate-box-shadow/, https://shadows.brumm.af/
- https://www.html5rocks.com/en/tutorials/speed/high-performance-animations/
... and many others.
    
[plsaskme.com]: <https://plsaskme.com>
[askmepls.com]: <https://askmepls.com>
[CS50x]: <https://cs50.harvard.edu/x/2021>
[ipregistry.co]: <https://ipregistry.co>

<br>
<br>

## Future
I've got some feature requests already, like seeing question history. Let's see.