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
    // Add jasmine reporter To know what spec is running at the moment
    const reporterCurrentSpec = {
        specStarted: function (result) {
            this.name = result.description;
        }
    };
    jasmine.getEnv().addReporter(reporterCurrentSpec);


    describe('FeedReader Testing', () => {
        // For blinking dots in pop-up message
        const popUp = $('.popup');
        let blinkInterval;

        // Before all tests: show modal window, implement blinking dots cycle
        beforeAll(() => {
            const waitDots = document.querySelectorAll('.popup #msg-popup i');
            let i = 0;

            popUp.removeClass('hidden');

            blinkInterval = setInterval(() => {
                if (i > waitDots.length - 1) {
                    waitDots.forEach(dot => dot.classList.add('hidden'))
                    i = 0;
                    return;
                }
                waitDots[i].classList.remove('hidden');
                i += 1;
            }, 500);
        });

        // After all tests - ask user if he wants to see results of tests or just hide them
        afterAll(() => {
            const buttons = $('.popup .btn-wrapper'),
                popUpText = $('.popup #msg-popup'),
                jasmineReport = $('.jasmine_html-reporter');

            clearInterval(blinkInterval);
            popUpText.html('All tests are complete. <br> Do you want to see results?');
            buttons.removeClass('hidden');

            buttons.click( e => {
                switch (e.target.id) {
                    case 'btn-yes':
                        popUp.addClass('hidden');
                        $('html, body').stop().animate({ scrollTop: jasmineReport.offset().top }, 1000);
                        break;
                    case 'btn-no':
                        popUp.addClass('hidden');
                        jasmineReport.css('display', 'none');
                        break;
                    default:
                        break;
                };
            });

        });

        /* This is our first test suite - a test suite just contains
        * a related set of tests. This suite is all about the RSS
        * feeds definitions, the allFeeds variable in our application.
        */
        describe('1. RSS Feeds', () => {
            /* This is our first test - it tests to make sure that the
            * allFeeds variable has been defined and that it is not
            * empty. Experiment with this before you get started on
            * the rest of this project. What happens when you change
            * allFeeds in app.js to be an empty array and refresh the
            * page?
            */
            it('1.1 RSS Feeds are defined;', () => {
                expect(allFeeds).toBeDefined();
                expect(allFeeds.length).not.toBe(0);
            });


            /* TODO: Write a test that loops through each feed
            * in the allFeeds object and ensures it has a URL defined
            * and that the URL is not empty.
            */
            it('1.2 Each feed has a URL defined and the URL is not empty;', () => {
                allFeeds.forEach( feed => {
                    expect(feed.url).toBeDefined();
                    expect(feed.url.length).not.toBe(0);
                });
            });

            /* TODO: Write a test that loops through each feed
            * in the allFeeds object and ensures it has a name defined
            * and that the name is not empty.
            */
            it('1.3 Each feed has a name defined and the name is not empty.', () => {
                allFeeds.forEach( feed => {
                    expect(feed.name).toBeDefined();
                    expect(feed.name.length).not.toBe(0);
                });
            });
        });


        /* TODO: Write a new test suite named "The menu" */
        describe('2. The menu', () => {

            const menuIcon = $('.menu-icon-link'),
                menu = $('.slide-menu');
            let firstVisibleChange,
                secondVisibleChange;

            function isMenuHidden () {
                return (menu.offset().left + menu.width() < 0 ||
                    menu.css('visibility') != 'visible' ||
                    menu.css('display') === 'none');
            }

            function isMenuVisible () {
                return (menu.offset().left + menu.width() > 0 &&
                    menu.css('visibility') === 'visible' &&
                    menu.css('display') != 'none');
            }

            beforeEach(done => {
                if (reporterCurrentSpec.name
                    .indexOf('The menu is shown when clicked and it is hidden when clicked again') === -1) {
                    done();
                } else {
                    menuIcon.click();
                    menu.on('transitionend', () => {
                        menu.off('transitionend');
                        firstVisibleChange = isMenuVisible();
                        menuIcon.click();
                        menu.on('transitionend', () => {
                            menu.off('transitionend');
                            secondVisibleChange = isMenuHidden();
                            done();
                        });
                    });
                }
            });

            /* TODO: Write a test that ensures the menu element is
            * hidden by default. You'll have to analyze the HTML and
            * the CSS to determine how we're performing the
            * hiding/showing of the menu element.
            */
            it('2.1 The menu is hidden by default.', () => {
                expect(isMenuHidden()).toBe(true);
            });

            /* TODO: Write a test that ensures the menu changes
            * visibility when the menu icon is clicked. This test
            * should have two expectations: does the menu display when
            * clicked and does it hide when clicked again.
            */
            it('2.2 The menu is shown when clicked and it is hidden when clicked again.', () => {
                expect(firstVisibleChange).toBeDefined();
                expect(secondVisibleChange).toBeDefined();
                expect(firstVisibleChange).toBe(secondVisibleChange);
            });
        });


        /* TODO: Write a new test suite named "Initial Entries" */
        describe ('3. Initial Entries', () => {
            const feed = $('.feed');

            /* TODO: Write a test that ensures when the loadFeed
            * function is called and completes its work, there is at least
            * a single .entry element within the .feed container.
            * Remember, loadFeed() is asynchronous so this test will require
            * the use of Jasmine's beforeEach and asynchronous done() function.
            */
            beforeEach (done => {
                loadFeed(0, () => {
                    done();
                });
            });

            it('3.1 There is at least a single .entry element within the .feed container' +
                ' after the loadFeed function completes its work.', () => {
                expect(feed.find('.entry').length != 0).toBe(true);
            });
        });


        /* TODO: Write a new test suite named "New Feed Selection" */
        describe ('4. New Feed Selection', () => {
            const feed = $('.feed');
            let firstHtml = '',
                secondHtml = '';

            /* TODO: Write a test that ensures when a new feed is loaded
            * by the loadFeed function that the content actually changes.
            * Remember, loadFeed() is asynchronous.
            */
            beforeEach (done => {
                loadFeed(1, () => {
                    firstHtml = feed.html();
                    loadFeed(0, () => {
                        secondHtml = feed.html();
                        done();
                    });
                });
            });

            it('4.1 The content actually changes when a new feed is loaded by the loadFeed function.', () => {
                expect(firstHtml).not.toBe(secondHtml);
            });
        });
    });
}());
