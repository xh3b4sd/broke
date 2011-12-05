# Broke

  Broke is just a layer for https://github.com/cloudhead/vows,
  to make your tests a little bit nicer. So you can define your
  own process phases and custom assertions, that make your tests
  smarter. Configure your test cases and decide how often a test
  have to repeat, when a test have to time out and so on.

  Further there is a custom processor given to test requests
  easily.

  More information about testing in vows style at http://vowsjs.org/.



## Installation:

  Install broke locally to get **"var broke = require('broke')"**
  to work. Install it globally to make the test runner
  working and you can do **"broke example_test.js --spec"**.

    $ npm install broke
    $ sudo npm install broke -g



## Usage:

  For better documentation and usage look for the examples.
  They are well commented.



## Tests:

  Broke is well tested with vowsjs. Dont be suprised about many
  error loggings. If the result says something like
  **"✓ OK » 37 honored (0.127s)"**, everything is fine.

    $ vows node_modules/broke/tests/cases/* --spec



## Questions and suggestions?

  Send me a message on github.

