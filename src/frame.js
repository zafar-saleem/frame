/**
 * (c) 2014 Zafar Saleem
 */
var FRAME = {
    /**
     * 
     * Main object that consists details for all modules upon registering.
     * Modules are stored as 
     * modulesData: {
     *      modules: {
     *          nameofmodule: object
     *      }
     * }
     */
    modulesData: {},

    /**
     * Register method registers modules and stores them in
     * modulesData object.
     * 
     * @param {string} name of module
     * @param {object} object of module
     * @return {}
     */
    register: function (module, obj) {
        if (module && _privateMethods.isString(module) && obj && _privateMethods.isObject(obj)) {
            if (!_privateMethods.isMethod(obj.init)) {
                _privateMethods.log(3, 'Module does not have init method');
                return;
            }

            // If modules object inside modulesData does not exist then create one
            if (typeof this.modulesData.modules === 'undefined') this.modulesData['modules'] = {};
            this.modulesData.modules[module] = obj; // Store module's object inside modulesData.modules

            if (!_privateMethods.isModuleCorrect(obj, module)) {
                return;
            }

            _privateMethods.makeFrameAPI(this, obj);

            if (obj.events && typeof obj.events === 'object') {
                AggregatedEvents.init(obj);
            }
        } else {
            _privateMethods.log(3, 'Module name should be String & obj should be Object');
        }
    },

    /**
     * This method initialize single module stored in modulesData: {}
     * 
     * @param {object} Module that includes all methods
     */
    start: function (module) {
        var mod = null;
        
        if (typeof module === 'string') {
            if (!this.modulesData.modules.hasOwnProperty(module)) return;
            mod = this.modulesData.modules[module];
            mod.init.bind(mod).apply();
            return;
        }
        if (_privateMethods.isMethod(module)) return;
        module.init.bind(module).apply();
    },

    /**
     * This method initializes all modules stored in modulesData: {}
     * by calling start method.
     * 
     * @param {object} Module that includes all methods
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
     * Creates new DOM element and apply all attributes such as
     * Class name, id, href etc.
     * 
     * @param {object} DOM element that will be created by this method
     * @param {object} List of attributes i.e. id, class, href etc.
     * @return {object} Created DOM element
     */
    createElement: function (el, config) {
        var i, text, child;
        el = _privateMethods.create(el);
        if (!config) return;
        if (config.children && _privateMethods.isArray(config.children)) {
            i = 0;
            while (child = config.children[i]) {
                el.appendChild(child);
                i++;
            }
            delete config.children;
        }
        if (config.text) {
            el.appendChild(document.createTextNode(config.text));
            delete config.text;
        }
        _privateMethods.applyAttrs(el, config);
        return el;
    },

    /**
     * Pub/Sub system that stores events in object and then triggers them when
     * requires. 
     */
    Events: {
        eventsData: {}, // all events are stored here

        /**
         * Stores events and context in eventsData object as key value pair
         * 
         * @param {String} Event name
         * @param {Object} Context(this) to module from where this events is triggered
         * @return {}
         */
        trigger: function (events, context) {
            if (!events && typeof events !== 'string') return;
            if (this.eventsData.hasOwnProperty(events)) {
                _privateMethods.log(2, 'This event name is already taken!');
                return;
            }
            this.eventsData[events] = context;
        },

        /**
         * Calls events when required
         * 
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
         * 
         * @param {Object} Context(this) to module from where this events is triggered
         * @return {}
         */
        getContext: function (context, module) {
            if (context && typeof context === 'object') return context;
            if (module && typeof module === 'object') return module;
        }
    }
};

var _privateMethods = {
    makeFrameAPI: function (frame, obj) {
        for (var key in frame) {
            if (!frame.hasOwnProperty(key)) return;
            obj[key] = frame[key];
        }
    },

    /**
     * Check if Module begin with Capital letter then convert moduleName
     * to jQuery DOM element and make module's property to make it accessable
     * using $el i.e. this.$el. Then put all descendents of this components
     * in module property and to make them accessable using $tagname inside this
     * particular module.
     *
     * @private
     * @param {object} object of module
     * @param {module} name of module
     * @return {boolean} true/false
     */
    isModuleCorrect: function (obj, module) {
        var els, i, len, counter = 1;

        if (!/^[A-Z]/.test(module)) {
            this.log(3, 'Module must be equal to component ID and must begin with capital letter.');
            return false;
        }

        obj['$el'] = $('#' + module);

        els = $('#' + module + ' *').get();

        for (i = 0, len = els.length; i < len; i++) {
            if (obj.hasOwnProperty('$' + els[i].nodeName.toLowerCase())) {
                obj['$' + els[i].nodeName.toLowerCase() + '' + counter] = $(els[i]);
                counter++;
                continue;
            }
            obj['$' + els[i].nodeName.toLowerCase()] = $(els[i]);
        }
        return true;
    },

    /**
     * Creates DOM element.
     * 
     * @private
     * @param {object} DOM element that will be created by this method
     * @return {object} Created DOM element
     */
    create: function (el) {
        return document.createElement(el);
    },

    /**
     * Apply attributes i.e. id, class, href etc to create element.
     * 
     * @private
     * @param {object} DOM element to which attributes will be applied
     * @param {object} attributes object that has id, class etc.
     * @return {}
     */
    applyAttrs: function (el, attrs) {
        $(el).attr(attrs);
    },

    /**
     * Check for array.
     * 
     * @private
     * @param {array} Array to check if it is array.
     * @return {boolean} true/false
     */
    isArray: function (arr) {
        return (Array.isArray(arr));
    },

    /**
     * Check if paramter is a function
     * 
     * @private
     * @param {Function}
     * @return {Boolean} true/false
     */
    isMethod: function (method) {
        return (method && typeof method === 'function');
    },

    /**
     * Check if paramter is an Object
     * 
     * @private
     * @param {Object}
     * @return {Boolean} true/false
     */
    isObject: function (object) {
        return (object && typeof object === 'object');
    },

    /**
     * Check if paramter is a String
     * 
     * @private
     * @param {String}
     * @return {Boolean} true/false
     */
    isString: function (str) {
        return (str && typeof str === 'string');
    },

    /**
     * Log function
     * 
     * @private
     * @param {Number} 1-3
     * @param {String} Message
     */
    log: function (severity, message) {
        console[(severity === 1 ? 'log' : (severity === 2) ? 'warn' : 'error')](message);
    }
};

/**
 * Object that adds events to selectors and call callback functions
 * in a module. This modules is for following events object
 * events: {
 *      'click #selector': 'callback'
 * }
 */
var AggregatedEvents = {
    config: {
        context: null,
        callback: null
    },

    /**
    * constructor function that initialize AggregatedEvents object,
    * it gets callback function from events object and store it in config.callback,
    * then calls applyEvents method.
    * 
    * @param {object} context of modules where events object is defined
    */
    init: function (context) {
        var events = context.events, keys;
        if (!_privateMethods.isObject(events)) return;

        this.config.context = context;
        for (keys in events) {
            if (!events.hasOwnProperty(keys)) return;
            this.config.callback = context[events[keys]];
            if (!_privateMethods.isMethod(this.config.callback)) return;
            this.applyEvents(keys);
        }
    },

    /**
    * Checks for multiple selectors, if given then seperate them and put them
    * in an array then bind events to all those selectors.
    * If single selector is given then apply event to that selector.
    * 
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
     * 
     * @param {evt} event name e.g. click, hover etc that needs to attached to selector
     * @param {string} selector on which event needs to be attached.
     */
    bindEvents: function (evt, selector) {
        $(document).on(evt, selector, this.config.callback.bind(this.config.context));
    },

    /**
     * Return total number of selectors on which the event will bind
     * 
     * @param {array} Array of selectors
     * @return {array} Array of selectors
     */
    getSelectors: function (arr) {
        return arr.filter(function (item, index) {
            return (index !== 0) || item;
        });
    }
};
