(function(win, doc) {

	function hasValue(txt) {
		return txt && txt.trim().length > 0;
	}

	function IssueRef(letter, id, title) {
		this.letter = letter;
		this.id = id;
		this.title = title;

		this.isValid = function() {
			return hasValue(this.letter) && 
				hasValue(this.id) &&
				hasValue(this.title);
		};
	}

	function displayModal(txt) {
		var modal = win['copyIssueRefModal'];
		if(!modal) {
			win['copyIssueRefModal'] = modal = document.createElement('div');
			modal.style = 'position: absolute; top: 0; left: 0; right: 0; padding: 20px; background: rgba(0,0,0,.8); border: solid 2px silver; color: lime; font-family: monospace; font-size: 20px; text-align: center; transform: translate(0,-100%); transition: transform .25s';
			modal.innerHTML = '<p id="copyIssueRefModalTxt" style="margin: 0 0 10px;"></p><p><button id="copyIssueRefModalBtn" style="display: block; width: 100%; padding: 10px; background: lime; border: none; color: black; font-family: monospace; font-size: 20px; cursor: pointer;">Copy</button></p>';
			document.querySelector('body').appendChild(modal);
			modal.querySelector('#copyIssueRefModalBtn').addEventListener('click', function(e) {
				e.preventDefault();

				copyText(modal.querySelector('#copyIssueRefModalTxt').innerText);
				modal.style.transform = 'translate(0,-100%)';
			});
		}

		modal.querySelector('#copyIssueRefModalTxt').innerText = txt;
		modal.style.transform = 'translate(0,0)';
	}

	function copyText(text) {
	  var textarea = document.createElement('textarea'),
	      successful = false;
	  
	  textarea.value = text;
	  textarea.style.position = 'absolute';
	  textarea.style.opacity = 0;
	  document.body.appendChild(textarea);
	  textarea.select();

	  try {
	    successful = document.execCommand('copy');
	    var msg = successful ? 'successful' : 'unsuccessful';
	  } catch (err) {
	    successful = false;
	  }
	  
	  document.body.removeChild(textarea);
	  
	  return successful;
	}

	function agilezen() {
		var id = doc.querySelector('#story-ref-number').innerText,
			title = doc.querySelector('#story-text').innerText;

		return new IssueRef('A', id, title);
	}

	function zendesk() {
			var id = location.href.split('/').pop(),
			title = getVisible('[name=subject]').value;

		return new IssueRef('Z', id, title);
	}

	function favro() {
		var id = doc.querySelector('.cardpopup-id').innerText.replace('MET-', ''),
			title = doc.querySelector('.card-popup-card-title-wrapper .click-to-edit').innerText;

		return new IssueRef('F', id, title);
	}

	function trello() {
		var id = location.href.split('/').pop().split('-').shift(),
			title = doc.querySelector('.js-card-detail-title-input').value;
		
		return new IssueRef('T', id, title);
	}

	function getVisible(sel) {

		var elements = doc.querySelectorAll(sel);

		for(var i = 0; i < elements.length; i++) {
			if(elements[i].offsetParent) {
				return elements[i];
			}
		}

		return null;

	}

	var ref;

	if(location.hostname.indexOf('favro') != -1) {
		ref = favro();
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

	if(ref && ref.isValid()) {
		displayModal('#' + ref.letter + ref.id + '#' + ' ' + ref.title);
	}
	else {
		alert('Error: This site is not handled.');
	}
	
})(window, document);
