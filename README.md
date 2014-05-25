<p>Frame is a JavaScript framework. It consists FRAME.js file which consists CORE functionality. At the moment, frame API offers some useful and handy functions such as registering new modules, starting(initializing) and stopping(uninitializing) all or particular modules. It also offers aggregatedEvents system(inspired from backbonejs events system) and pub/sub. Frame is completely scalable framework which separates modules and ensure loose coupling among modules. FRAMEjs file also acts like an interface between two modules.</p>
<h1>How to use</h1>
<p>In order to create/register new module, simply call FRAME.register() function and pass 'name' of the module as first parameter and object literal as second parameter.</p>
<p>Clone/Fork repo and run "npm install" command to install Grunt plugins. Once done, then execute "Grunt" command to parse JavaScript through .jshintrc and run tests.</p>
<pre>
FRAME.register('moduleName', {
  // rest of the code
});
</pre>

<p>The name of the module must be identical to the id of the component e.g.</p>

<pre>
&lt;div id="Todo"&gt;
  &lt;!-- rest of DOM elements --&gt;
&lt;/div&gt;
// JavaScript module with the name of Todo
FRAME.register('Todo', {
  // rest of the code
});
</pre>

<p>Above is mandatory, this way 'Todo' div element(component) is attached to this module thus, that element could be accessed like below, in entire module.</p>

<pre>
  this.$el;
</pre>

<p>Every new module must contain one init function(which acts like a constructor). It is used to initialize the module.</p>

<pre>
FRAME.register('moduleName', {
  init: function () {
    //initialize this module.
  }
});
</pre>

<p>In order to use aggregatedEvents system, add an events object and pass name of the event and DOM elements on which that event is attached to as keys and callback function as values.</p>

<pre>
FRAME.register('moduleName', {
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

<p>To use pub/sub events system, call FRAME.Events.trigger() function to trigger and event and FRAME.Events.listen() to listen the triggered events.</p>

<pre>
FRAME.register('moduleName', {
  events: {
    'click #button': 'callbackFunction'
  },
  
  init: function () {
    FRAME.Events.trigger('eventsName');
  }
});

FRAME.register('newModuleName', {
  init: function () {
    FRAME.Events.listen('eventsName', callback);
  },
  
  callback: function () {
    // callback function.
  }
});
</pre>
<p>A new method i.e. createElement() is added. It allows us to create DOM element by giving proper attributes and even children DOM elements with its own attribute. See example below in action.</p>
<pre>
$('body').append(FRAME.createElement('ul', {
    children: [
        FRAME.createElement('li', { 'class': 'li', text: 'item' }),
        FRAME.createElement('li', { 'class': 'li', text: 'Delete' }),
        FRAME.createElement('li', { 'class': 'li', text: 'Update' })
    ]
}));
</pre>
<p>The above code will create below html markup.</p>
<pre>
&lt;ul&gt;
    &lt;li&gt;Item&lt;/li&gt;
    &lt;li&gt;Delete&lt;/li&gt;
    &lt;li&gt;Update&lt;/li&gt;
&lt;/ul&gt;
</pre>
<p>In order to initialize all modules call FRAME.startAll() method.</p>
<pre>
FRAME.startAll();
</pre>
<p>To start a single module simple call start() method and pass the name of module as parameter.</p>
<pre>
FRAME.start('moduleName');
</pre>
<p>In order to start a particular module then simply call start() method and pass the name of the module.</p>
<pre>
FRAME.start('moduleName');
</pre>
<h1>Directory structure</h1>
<pre>
example
  js
    scripts
        FRAME.js
        jquery.js
        todo.js
    styles
        bootstrap.min.css
        styles.css
  index.html
src
  FRAME.js
tests
  specs
    frame.js
.jshintrc
Gruntfile.js
README.md
package.json
</pre>
