# 👉 convers.ee
## 🎉 Never have any boring conversations again!
## 💬 A random question generator for your next party 

Fun (and spicy) random questions for friends, couples (or even yourself).

*Final project for Harvard's MOOC* "__[CS50x]__"*, 2020-21.*

[![Netlify Status](https://api.netlify.com/api/v1/badges/9c1ee742-e7f5-45a9-b093-d2defe49339c/deploy-status)](https://app.netlify.com/sites/conversee/deploys)

## Features
- Beautiful & functional, mobile-first
- Two languages (English, Estonian)
- +250 questions
- Choose between usual and *spicy* mode 🌶 (for naughtier questions)
- Dark mode available

---
## Technical details
### Stack
Since I didn't want to pay for any hosting, this project is built on the premise that there is no database and backend processing *per se*, so it can be deployed as a static site, e.g. on Netlify's free plan.

- Netlify (free plan)
- GitHub
- HTML/JS/CSS

My local backend: 
- Node.js scripts

About some challenges I encountered:
- different (mobile) browsers acting differently
- how to preload questions to avoid any visible stutter
- efficient CSS animations
- what is actually important

The way questions reach users:
0. **Gathering questions:** Google Forms, friends, other websites...
1. *Sorting & maintaining questions:* Google Sheets
2. *Adding the questions to GitHub folder "public/questions":*
2.a. Download questions to local computer as a .tsv file (*e.g.* "en-spicy.tsv")
2.b. Feed this file to "q-putter.mjs", which overwrites local "public/questions/"

[convers.ee]: <https://convers.ee>
[CS50x]: <https://cs50.harvard.edu/x/2021>