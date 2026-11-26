# Eleventy Exercise
This exercise generates the Home and Experience pages
from my existing portfolio using Eleventy and Nunjucks.
Both pages use a shared footer located in
src/_includes/footer.njk.

## Install dependencies
npm install

## Build
npx @11ty/eleventy

## Preview locally
npx @11ty/eleventy --serve

- Home: http://localhost:8080/
- Experience: http://localhost:8080/experience.html

Updating the shared footer and rebuilding updates
the footer on both pages.