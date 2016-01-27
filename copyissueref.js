(function() {

	function IssueRef(letter, id, title) {
		this.letter = letter;
		this.id = id;
		this.title = title;
	}

	function agilezen() {
		var id = document.querySelector('#story-ref-number').innerText,
			title = document.querySelector('#story-text').innerText;

		return new IssueRef('A', id, title);
	}

	function zendesk() {
			var id = location.href.split('/').pop(),
			title = getVisible('[name=subject]').value;

		return new IssueRef('Z', id, title);
	}

	function hansoft() {
		var id = document.querySelector('.cardpopup-id').innerText.replace('MET-', ''),
			title = document.querySelector('.card-popup-card-title-wrapper .click-to-edit').innerText;

		return new IssueRef('H', id, title);
	}

	function trello() {
		var id = location.href.split('/').pop().split('-').unshift(),
			title = document.querySelector('.window-title-text').innerText;
		
		return new IssueRef('T', id, title);
	}

	function getVisible(sel) {

		var elements = document.querySelectorAll(sel);

		for(var i = 0; i < elements.length; i++) {
			if(elements[i].offsetParent) {
				return elements[i];
			}
		}

		return null;

	}

	var ref;

	if(location.hostname.indexOf('hansoft') != -1) {
		ref = hansoft();
	}
	else if(location.hostname.indexOf('agilezen') != -1) {
		ref = agilezen();
	}
	else if(location.hostname.indexOf('zendesk') != -1) {
		ref = zendesk();
	}
	else if(location.hostname.indexOf('trello') != -1) {
		ref = trello();
	}

	alert('#' + ref.letter + ref.id + '#' + ' ' + ref.title);
	
})();