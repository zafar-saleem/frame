CORE.register('filter', {
	init: function () {
		CORE.Events.trigger('events two', this);
	},

	filter: function () {
		console.log('filter function');
	}
});