CORE.register('search', {
	events: {
		'click #button #link': 'buttonClicked',
		'click #click': 'iamclicked'
	},

	init: function () {
		CORE.Events.trigger('events name');
	},

	search: function () {
		console.log('search function');
	},

	buttonClicked: function () {
		console.log(this);
	},

	iamclicked: function () {
		console.log('iamclicked function');
	}
});