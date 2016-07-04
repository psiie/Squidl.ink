# Squidl.ink
A tool for helping to get files from A to B. All without the need for additional software or hardware. Squidlink utilizes Webtorrent as it's core but is geared towards ease of use for the average person.

## Todo
* Delete links on exit from database
* Offer a password lock for links
* incorperate encryption
* Change interface & integrate social networking
* Modify interface (same as above) to incorperate multiple files, pausing, TX on demand
* Make for tests for TDD

## Bugs
* Chrome has a limitation and will not allow users to download blobs larger than 1GB. The solution is to use Firefox.
* Wierd PUT ajax call after unrelated ajax call to a different route: "http://localhost:3005/auth login 404"

## Getting Started
* Run `npm install` to install dependencies
  * Use `npm run lint:js` to lint your JS
  * Use `npm run lint:css` to lint your CSS
  * Use `npm test` to run tests
* Setup the databases
  * Change the database names in `config/config.json` to reflect your project
  * Run `createdb project_name_development` to create the development database
  * Run `createdb project_name_test` to create the test database
* Hints
  * Utilize `foremand run nodemon` to have .env variables easier
