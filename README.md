# CSE 134B Homework 5

## Web Component
My portfolio contains a custom Web Component that displays
personal facts and retrieves random trivia from a live API.
It supports light and dark themes and remembers the user's
compact view preference using localStorage.

## Design Note
A visitor may want to learn an interesting random fact.
When they click the Get Random Trivia button, an API request
is sent using fetch(). While waiting, a loading message is
displayed and the button is disabled.

If the request succeeds, the returned data is validated
and the DOM is updated using textContent. If the request
fails, an error message is displayed. In either case,
the button is re-enabled so the visitor can try again.

## Static Site Generator
The Eleventy exercise is located in ssg-exercise/.

The two generated pages are Home and Experience and
both pages use a shared footer.

Installation, build, and preview instructions are
available in ssg-exercise/README.md.