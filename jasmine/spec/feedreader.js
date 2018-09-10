/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(Array.isArray(allFeeds)).toBe(true);
            expect(allFeeds.length).not.toBe(0);
        });


        describe('Each Feed', function() {
            /*A test that loops through each feed
            * in the allFeeds object and ensures it has a URL defined
            * and that the URL is not empty.
            */
            it('has a valid URL in a correct format', function() {
                allFeeds.forEach((feed) => {
                    // Test that the feed object has a url property defined
                    expect(feed['url']).toBeDefined();
                    // Test that the url property is a string
                    expect(typeof feed['url'] === 'string').toBe(true);
                    // Check that the url format is valid
                    // https://www.regextester.com/93652
                    expect(feed['url']).toEqual(jasmine
                        .stringMatching(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/));
                });
            });


            /*A test that loops through each feed
            * in the allFeeds object and ensures it has a name defined
            * and that the name is not empty.
            */
            it('has a Name', function() {
                allFeeds.forEach((feed) => {
                    // Test that the feed object has a name property defined
                    expect(feed['name']).toBeDefined();
                    // Test that the name property is a string
                    expect(typeof feed['name'] === 'string').toBe(true);
                    // Test that the name property is not empty
                    // The RegEx prvents strings that has only spaces
                    expect(feed['name']).not.toEqual(jasmine.stringMatching(/^ +$/));
                });
            });
        })
    });


    /* A new test suite named "The menu" */
    describe('The menu', function() {
        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            expect(document.querySelector('body').classList
                .contains('menu-hidden')).toBe(true);
        });
        /*A test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
        it('it opens when clicked and hides when clicked again', function() {
            let body = document.querySelector('body');
            
            // First click, menu should be displayed
            $('.menu-icon-link').click();
            expect(body.classList
                .contains('menu-hidden')).toBe(false);
            
            // Second click, menu should not be displayed
            $('.menu-icon-link').click();
            expect(body.classList
                .contains('menu-hidden')).toBe(true);
        });
    });
       

    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function() {    
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        
        it('have at least one entry in the feed container', function(done) {
            expect(document.querySelectorAll('.feed .entry').length)
                .toBeGreaterThan(0);
            done();
        });
    });
    /*A new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {    
        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * loadFeed() is asynchronous.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        
        it('has the contents change based on the new feed', function(done) {
            // Store the first entry element after the first feed has finished loading
            let originalEntry = document.querySelector('.feed .entry');
            expect(originalEntry).toBeTruthy();
            // Load a different feed
            loadFeed(1, () => {
                /* As the feed container clears its contents before loading a new feed,
                 * compare the innerHTML of the first entry from the previous feed 
                 * with that of the newly loaded feed. 
                 */
                let newEntry = document.querySelector('.feed .entry');
                expect(newEntry).toBeTruthy();
                if (!originalEntry || !newEntry) {
                    fail('Feed container does not have a valid entry');
                    done();
                    return;
                }
                expect(newEntry.innerHTML != originalEntry.innerHTML).toBe(true);
                done();
            });
        });
    });
}());
