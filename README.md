[![Build Status](https://travis-ci.com/GeekHijabi/population-management-system.svg?branch=develop)](https://travis-ci.com/GeekHijabi/population-management-system)

# population-management-system
An API that contains list of locations and sublocation and the breakdown of the gender available at each location.

* Deployed on [heroku](https://population-ms.herokuapp.com/api/v1):
---

## Technologies
-------------------
* Nodejs: a JavaScript runtime built on Chrome's V8 JavaScript engine.
* Mocha: a feature-rich JavaScript test framework running on Node.js
* Chai: a BDD / TDD assertion library for node and the browser that can be paired with any javascript testing framework.
* Eslint: provides a pluggable linting utility for JavaScript
* Travis CI: a hosted continuous integration and delivery service for GitHub projects.
* Express js: handles backend routing.
* Coveralls: shows the parts of code that are not covered by test suites.
* Postman: a powerful HTTP client for testing web services.

## Installations
-------------------
* Make sure to have nodeJs installed.
* Clone the repository `git clone https://github.com/GeekHijabi/population-management-system`
* Navigate to directory.
* Install all required dependencies with `npm install`.
* Run `npm start` to start the frontend application and `npm run start-server` to get the server started.

### Website Functionality
  * Add a main Location
  * Add a sublocation under the main location 
  * Edit a sublocation.
  * Get all main locations with their sublocations nested including the population size.
  * Delete a main location which deletes all the nested sublocations
  * Delete a sublocation
---------
 * [API DOC](https://documenter.getpostman.com/view/3105587/S11HtJdu) can be found here. 
---
