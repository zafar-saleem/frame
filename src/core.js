/*
 * CORE module/Object that consists of core functions
 * @author Zafar Saleem
 */
var CORE = {
	/**
	 * Main object that consists details for all modules upon registering.
	 * Modules are stored as 
	 * modulesData: {
	 * 		modules: {
	 *			nameofmodule: object
	 * 		}
	 * }
	 */
	modulesData: {},

	/**
	 * Register method registers modules and stores them in
	 * modulesData object.
	 * @param {string} name of module
	 * @param {object} object of module
	 * @return {}
	 */
	register: function (module, obj) {
		if (this._isString(module) && this._isObject(obj)) {
			if (!this._isMethod(obj.init)) {
				this._log(3, 'Module does not have init function');
				return;
			}
			// If modules object inside modulesData does not exist then create one
			if (typeof this.modulesData.modules === 'undefined') this.modulesData['modules'] = {};
			this.modulesData.modules[module] = obj; // Store module's object inside modulesData.modules

			if (typeof this.modulesData.$container === 'undefined') this.modulesData['$container'] = {};
			this.modulesData['$container'] = $('#' + module);

			if (obj.events && typeof obj.events === 'object') {
				CORE.AggregatedEvents.init(obj);
			}
		} else {
			this._log(3, 'Module name should be String & obj should be Object');
		}
	},

	/**
	 * This method initialize single module stored in modulesData: {}
	 * @param {object} Module that iscludes all methods
	 * @return {}
	 */
	start: function (module) {
		if (this._isMethod(module)) return;
		module.init.bind(module).apply();
	},

	/**
	 * This method initializes all modules stored in modulesData: {}
	 * by calling start method
	 * @param {object} Module that iscludes all methods
	 * @return {}
	 */
	startAll: function () {
		var modules = this.modulesData.modules;

		if (typeof modules === 'undefined') return;
		if (Object.keys(modules).length <= 0) return; // if there are no modules registered then do nothing
		for (var keys in modules) {
			if (!modules.hasOwnProperty(keys)) return;
			this.start(modules[keys]);
		}
	},

	/**
	 * This method stop initialization of single modules stored in modulesData: {}
	 * @param {object} Module that iscludes all methods
	 * @return {}
	 */
	stop: function () {
		console.log('stop');
	},

	/**
	 * This method stop initialization of all modules stored in modulesData: {}
	 * by calling stop method
	 * @param {object} Module that iscludes all methods
	 * @return {}
	 */
	stopAll: function () {

	},

	/**
	 * Object that adds events to selectors and call callback functions
	 * in a module. This modules is for following events object
	 * events: {
	 *		'click #selector': 'callback'
	 * }
	 */
	AggregatedEvents: {
		config: {
			context: null,
			callback: null
		},
		
		/**
		 * constructor function that initialize AggregatedEvents object,
		 * it gets callback function from events object and store it in config.callback,
		 * then calls applyEvents method.
		 * @param {object} context of modules where events object is defined
		 */
		init: function (context) {
			var events = context.events, keys;
			if (!CORE._isObject(events)) return;

			this.config.context = context;
			for (keys in events) {
				if (!events.hasOwnProperty(keys)) return;
				this.config.callback = context[events[keys]];
	    		if (!CORE._isMethod(this.config.callback)) return;
	    		this.applyEvents(keys);
			}
		},
		
		/**
		 * Checks for multiple selectors, if given then seperate them and put them
		 * in an array then bind events to all those selectors.
		 * If single selector is given then apply event to that selector.
		 * @param {string} properties of events object
		 * @return {}
		 */
		applyEvents: function (keys) {
			var i, len, selectors = this.getSelectors(keys.split(" "));

			if (selectors.length === 1) {
				this.bindEvents(keys.split(" ")[0], keys.split(" ")[1]);
				return;
			}

			for (i = 0, len = selectors.length; i < len; i++) {
				if (selectors[i] === 0) continue;
				this.bindEvents(keys.split(" ")[0], selectors[i]);
			}
		},
		
		/**
		 * It binds event to selector and call callback function
		 * @param {evt} event name e.g. click, hover etc that needs to attached to selector
		 * @param {string} selector on which event needs to be attached.
		 */
		bindEvents: function (evt, selector) {
	      	$(document).on(evt, selector, this.config.callback.bind(this.config.context));
	    },

		getSelectors: function (arr) {
			return arr.filter(function (item, index) {
				return (index !== 0) || item;
			});
	    }
	},
	
	/**
	 * Pub/Sub system that stores events in object and then triggers them when
	 * requires. 
	 */
	Events: {
		eventsData: {}, // all events are stored here
		
		/**
		 * Stores events and context in eventsData object as key value pair
		 * @param {String} Event name
		 * @param {Object} Context(this) to module from where this events is triggered
		 * @return {}
		 */
		trigger: function (events, context) {
			if (!events && typeof events !== 'string') return;
			if (this.eventsData.hasOwnProperty(events)) {
				CORE._log(2, 'This event name is already taken!');
				return;
			}
			this.eventsData[events] = context;
		},
		
		/**
		 * Calls events when required
		 * @param {String} Event name
		 * @param {Function} Callback function that needs to be called upon
		 * @param {Object} Context(this) to module from where listen() function id called
		 * @return {}
		 */
		listen: function (events, callback, context) {
			if (!events && typeof events !== 'string') return;
			if (this.eventsData.hasOwnProperty(events)) {
				if (typeof callback !== 'function') return;
				callback.bind(this.getContext(this.eventsData[events], context)).apply();
			}
		},

		/**
		 * Get context
		 * @param {Object} Context(this) to module from where this events is triggered
		 * @return {}
		 */
		getContext: function (context, module) {
			if (context && typeof context === 'object') return context;
			if (module && typeof module === 'object') return module;
		}
	},
	
	/**
	 * Check if paramter is a function
	 * @param {Function}
	 * @return {Boolean}
	 */
	_isMethod: function (method) {
		return (method && typeof method === 'function');
	},

	/**
	 * Check if paramter is an Object
	 * @param {Object}
	 * @return {Boolean}
	 */
	_isObject: function (object) {
		return (object && typeof object === 'object');
	},

	/**
	 * Check if paramter is a String
	 * @param {String}
	 * @return {Boolean}
	 */
	_isString: function (str) {
		return (str && typeof str === 'string');
	},

	/**
	 * Log function
	 * @param {Number} 1-3
	 * @param {String} Message
	 */
	_log: function (severity, message) {
		console[(severity === 1 ? 'log' : (severity === 2) ? 'warn' : 'error')](message);
	}
};
