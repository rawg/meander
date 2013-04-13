meander
=======

Make a browser "meander" through a site at random.  A great way to put an idle monitor to use to show a WIP site.  The author prefers this approach to cycling through a manually assembled list of URLs at random because Meander strays from the happy path without discerning.

Usage
=====
Point a browser to a copy of meander.html with a starting URL in the querystring, like so:

	http://localhost/misc/meander.html?url=http://localhost/my-project

Meander will load the site and begin idly clicking and scrolling around, occasionally stepping back through it's history.

Notes
-----
* Meander works by manipulating the contents of an iframe.  If meander.html isn't being served from the same origin as your project, you will need to disable cross-origin security policies.  In webkit browsers, this can be done by passing the `--disable-web-security` option at startup. 
* Meander won't follow links to a new origin.  If this is a problem, hack the `followRandomLinks()` function in `meander.js`.


