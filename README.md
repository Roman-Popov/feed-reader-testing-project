# Feed Reader Testing Project
-----------------------------

This is a web-based application that reads RSS feeds. It is necessary to run a number of tests. The original developer has already included [Jasmine](http://jasmine.github.io/). Jasmine is a behavior-driven development framework for testing JavaScript code. Testing is an important part of the development process and many organizations practice a standard of development known as "test-driven development". This is when developers write tests first, before they ever start developing their application. All the tests initially fail and then they start writing application code to make these tests pass.


### Why tests are important?

* Writing effective tests requires analyzing multiple aspects of an application including the HTML, CSS and JavaScript - an extremely important skill when changing teams or joining a new company.
* Good tests give the ability to quickly analyze whether new code breaks an existing feature within a codebase, without having to manually test all of the functionality.


### List of tests


1. RSS Feeds
    * RSS Feeds are defined;
    * Each feed has a URL defined and the URL is not empty;
    * Each feed has a name defined and the name is not empty.


2. The menu
    * The menu is hidden by default.
    * The menu is shown when clicked and it is hidden when clicked again.


3. Initial Entries
    * There is at least a single `.entry` element within the `.feed` container after the loadFeed function completes its work.


4. New Feed Selection
    * The content actually changes when a new feed is loaded by the loadFeed function.


### Important features

1. No test is dependent on the results of another.
2. Custom Jasmine reporter was added to know what spec is running at the moment.
3. Callbacks are used to ensure asynchronous functions were completely executed before they are tested.
