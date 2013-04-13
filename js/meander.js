/**
 * Meander.js
 *
 * Meander through a website at random. Great for using idle displays to show WIP.
 *
 * @author Jeremy Fisher <jeremy@rentawebgeek.com>
 *
 *
 * Copyright (c) <2013> <Jeremy Fisher>
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to 
 * deal in the Software without restriction, including without limitation the 
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or 
 * sell copies of the Software, and to permit persons to whom the Software is 
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in 
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
 * IN THE SOFTWARE.
 * 
 */


$(function () {

	var url = window.location.search.replace(/^\?url\=/, ''),
		$viewport = $('#Viewport'), 
		$status = $('#Status'),
		viewport = $viewport.get(0).contentWindow,
		beginning = window.history.length;
	
	function displayLocation() {
		document.title = viewport.document.title;
		$status.html(viewport.location + "");
	}

	function followRandomLink($links) {
			if ($links.size() == 0) return false;
			
			var index = Math.floor(Math.random() * $links.size()),
				link = $links.get(index),
				href = link.href;

			if (href.match(/^http/) && ! href.match(new RegExp("^" + viewport.location.origin))) {
				return false;
			}
			
			link.click();

	}

	var Meander = {
		MODE_INTERACT: 1,
		MODE_FOLLOW: 2,
		MODE_SCROLL: 3,
		MODE_BACK: 0,
		grossWeight: 0,
		modes: []
	};

	/* Initialize Modes
	 */
	Meander.modes[Meander.MODE_FOLLOW] = {
		weight: 50,
		action: function () {
			var $links = $viewport.contents().find('a[href][href!=""][href!="#"][href!="/"]');
			followRandomLink($links);	

		}
	};

	Meander.modes[Meander.MODE_INTERACT] = {
		weight: 100,
		action: function () {
			var $links = $viewport.contents().find('a[href=""][href="/"][href="#"]');
			followRandomLink($links);	

		}

	};

	Meander.modes[Meander.MODE_BACK] = {
		weight: 20,
		action: function () {
			if (viewport.history.length <= beginning + 1) return false;
			viewport.history.go(-1);
		}
	};

	Meander.modes[Meander.MODE_SCROLL] = {
		weight: 100,
		action: function () {
			var $body = $viewport.contents().find('body'),
				max = $body.height(),
				sections = max / $viewport.height(),
				dest = Math.random() * sections * $viewport.height() + (Math.random() * 50 - 25);
			
			viewport.scrollTo(0, dest);

		}
	};

	for (var mode in Meander.modes) {
		Meander.grossWeight += Meander.modes[mode].weight;
	}
	
	function tick() {
		var die = Math.random() * Meander.grossWeight, 
			tally = 0;
		
		for (var index in Meander.modes) {
			var mode = Meander.modes[index];
			tally += mode.weight;
			
			if (die < tally) {
				if (mode.action() !== false) {
					break;
				}
			}
		}

	}
	setInterval(tick, 5000);
	
	$viewport.load(displayLocation);

	viewport.location = url;

});

