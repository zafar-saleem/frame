CORE.register('search', {
	events: {
		'click #button #link': 'buttonClicked',
		'click #click': 'iamclicked'
	},

	init: function () {
		// console.log(this);
		CORE.Events.trigger('events name');
	},

	search: function () {
		console.log('search');
	},

	buttonClicked: function () {
		console.log(this);
	},

	iamclicked: function () {
		console.log('iamclicked');
	}
});

CORE.register('filter', {
	init: function () {
		// console.log(this);
		CORE.Events.trigger('events two', this);
	},

	filter: function () {
		console.log('filter');
	}
});

CORE.register('foo', {

	init: function () {
		// console.log(this);
	},

	foo: function () {
		console.log('foo');
	}
});

CORE.register('bar', {
	init: function () {
		// console.log(this);
		CORE.Events.listen('events name', this.foo, this);
	},

	bar: function () {
		console.log('bar');
	},

	foo: function () {
		console.log('foooooooooooooooooooo');
		console.log(this);
	}
});


// var Mod = {
// 	init: function () {
// 		console.log(this);
// 	}
// }

// Mod.init();
