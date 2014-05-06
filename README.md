Frame is a JavaScript framework. It consists CORE.js file which consists core functionality. At the moment, frame API offers some useful and handy functions such as registering new modules, starting(initializing) and stopping(uninitializing) all or particular modules. It also offers aggregatedEvents system and pub/sub. Frame is completely scalable framework which separates modules and ensure loose coupling among modules. COREjs file also acts like an interface between two modules.

<h1>How to use</h1>
In order to create/register new module, simply call CORE.register() function and pass 'name' of the module as first parameter and anonymous function as second parameter.

<pre>
CORE.register('moduleName', function () {
  // rest of the code
});
</pre>

