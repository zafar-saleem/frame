var CORE = {

	modulesData: {},

	register: function (module, obj) {
		if (this._isString(module) && this._isObject(obj)) {
			if (!this._isMethod(obj.init)) {
				this._log(3, 'Module does not have init function');
				return;
			}

			if (typeof this.modulesData.modules === 'undefined') this.modulesData['modules'] = {};
			this.modulesData.modules[module] = obj;

			if (typeof this.modulesData.$container === 'undefined') this.modulesData['$container'] = {};
			this.modulesData['$container'] = $('#' + module);

			if (obj.events && typeof obj.events === 'object') {
				this.AggregatedEvents.init(obj);
			}
		} else {
			this._log(3, 'Module name should be String & obj should be Object');
		}
	},

	start: function (module) {
		if (this._isMethod(module)) return;
		module.init.bind(module).apply();
	},

	startAll: function () {
		var modules = this.modulesData.modules;

		if (typeof modules === 'undefined') return;
		if (Object.keys(modules).length <= 0) return;
		for (var keys in modules) {
			if (!modules.hasOwnProperty(keys)) return;
			this.start(modules[keys]);
		}
	},

	stop: function () {
		console.log('stop');
	},

	stopAll: function () {

	},

	AggregatedEvents: {
		config: {
			context: null,
			callback: null
		},

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
    
		bindEvents: function (evt, selector) {
      $(document).on(evt, selector, this.config.callback.bind(this.config.context));
    },

		getSelectors: function (arr) {
      return arr.filter(function (item, index) {
        return (index !== 0) || item;
      });
    }
	},
	
	Events: {
		eventsData: {},
	
		trigger: function (events, context) {
			if (!events && typeof events !== 'string') return;
			if (this.eventsData.hasOwnProperty(events)) {
				CORE._log(2, 'This event name is already taken!');
				return;
			}
			this.eventsData[events] = context;
		},
	
		listen: function (events, callback, context) {
			if (!events && typeof events !== 'string') return;
			if (this.eventsData.hasOwnProperty(events)) {
				if (typeof callback !== 'function') return;
				callback.bind(this.getContext(this.eventsData[events], context)).apply();
			}
		},

		getContext: function (context, module) {
			if (context && typeof context === 'object') return context;
			if (module && typeof module === 'object') return module;
		}
	},

	_isMethod: function (method) {
		return (method && typeof method === 'function');
	},

	_isObject: function (object) {
		return (object && typeof object === 'object');
	},

	_isString: function (str) {
		return (str && typeof str === 'string');
	},

	_log: function (severity, message) {
		console[(severity === 1 ? 'log' : (severity === 2) ? 'warn' : 'error')](message);
	}
};
