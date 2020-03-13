# Mobile development test

Create a cross-platform Cordova application that presents an infinitely scrolling list of sentences to the user.
The app should use the test server as the data source (see below).
The list view should contain 20 sentences. 
The list is returned from the test server as a JSON object that looks like:

~~~~ {.json}

{"random":["Websap wonwigaw lo mucopdu anojeji.","Fipevokud vuj vebataji gajagu sez."]}
    
~~~~

The returned object may be *very* large, so your design should account for this.


# Test server

This repository contains a node.js test server that will listen on port 8900 and returns a streaming JSON response.
Use this to verify your application.

Hint: To setup and run the test server locally, run the following commands from the repository root:
	
	npm install && node index.js