Frame is a JavaScript framework. It consists CORE.js file which consists core functionality. At the moment, frame API offers some useful and handy functions such as registering new modules, starting(initializing) and stopping(uninitializing) all or particular modules. It also offers aggregatedEvents system(inspired from backbonejs events system) and pub/sub. Frame is completely scalable framework which separates modules and ensure loose coupling among modules. COREjs file also acts like an interface between two modules.
<h1>How to use</h1>
In order to create/register new module, simply call CORE.register() function and pass 'name' of the module as first parameter and object literal as second parameter.

<pre>
CORE.register('moduleName', {
  // rest of the code
});
</pre>

Every new module should contain one init function(which acts like a constructor) which is used to initialize that particular module.

<pre>
CORE.register('moduleName', {
  init: function () {
    //initialize this module.
  }
});
</pre>

In order to use aggregatedEvents system, add an events object and pass name of the event and DOM elements on which that event is attached to as keys and callback function as values.

<pre>
CORE.register('moduleName', {
  events: {
    'click #button': 'callbackFunction'
  },
  
  init: function () {
    //initialize this module.
  },
  
  callbackFunction: function () {
    
  }
});
</pre>

To use pub/sub events system, call CORE.Events.trigger() function to trigger and event and CORE.Events.listen() to listen the triggered events.

<pre>
CORE.register('moduleName', {
  events: {
    'click #button': 'callbackFunction'
  },
  
  init: function () {
    CORE.Events.trigger('eventsName');
  }
});

CORE.register('newModuleName', {
  init: function () {
    CORE.Events.listen('eventsName', callback);
  },
  
  callback: function () {
    // callback function.
  }
});
</pre>
A new method i.e. createElement() is added. It allows us to create DOM element by giving proper attributes and even children DOM elements with its own attribute. See example below in action.
<pre>
$('body').append(FRAME.createElement('ul', {
    children: [
        FRAME.createElement('li', { 'class': 'li', text: 'item' }),
        FRAME.createElement('li', { 'class': 'li', text: 'Delete' }),
        FRAME.createElement('li', { 'class': 'li', text: 'Update' })
    ]
}));
</pre>
The above code will create below html markup.
<pre>
&lt;ul&gt;
    &lt;li&gt;Item&lt;/li&gt;
    &lt;li&gt;Delete&lt;/li&gt;
    &lt;li&gt;Update&lt;/li&gt;
&lt;/ul&gt;
</pre>
In order to initialize all modules call CORE.startAll() method.
<pre>
CORE.startAll();
</pre>
In order to start a particular module then simply call start() method and pass the name of the module.
<pre>
CORE.start('moduleName');
</pre>
<h1>Directory structure</h1>
<pre>
example
  js
    core.js
    filter.js
    jquery.js
    search.js
  index.html
src
  core.js
.jshintrc
Gruntfile.js
README.md
package.json
</pre>
