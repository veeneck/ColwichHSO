
This is a school HSO marketing website.

School events are updated from this shared Google sheet: https://docs.google.com/spreadsheets/d/1-z-cQU0JYcp0DUL8h-qehp_ER3nAa2rH6H3A9OtAlIk/edit?gid=0#gid=0

Each event on the Events tab corresponds to an event on the home page (index.html). If the event has TBD in the day, the pill shows TBD. Otherwise the pill shows day and time if known. If there is a page_link, clicking on the pill redirects to that HTML page instead of opening in a Lightbox. Most events are Lightbox only.

The FAQ for each event can be found in FAQ tab of the sheet. FAQ questions for events show up in the Lightbox that overlays the page on click. Some events shared / display the same FAQ. Those are:





hsomeeting → all four meeting cards



spiritnight → Barn’rds, Chick-fil-A, Gambino’s, Carousel



teacherappreciation → both cart events



conferencemeals → both conference meal events

Last event notes:





Times start_time / end_time on Events drive the pill and the lightbox. Only some rows have them.



Flyers image_file on Events is the lightbox flyer path (e.g. images/flyers/...).

Sponsors tab on the sheet show active sponsors. Banner and Flag sponsors show up on each sponsor section throughout the site. Banner first, alphabetically, then flag alphabetically. On just the Coin Wars page and the Sponsors page, all sponsors show. On the sponsors page, it is an entire list of all sponsors: Banner -> Flag -> Logo -> Text. On Coin Wars, the 1st module of sponsors is the same as the main site (Banner and Flag) then closer to bottom of page there is an additional module with Logo and Text sponsors. The pill sizing for each sponsor is always the same, so even text sponsors get the same size pill.

Sync Your Calendar should auto adjust the link based on the device viewing. It should work on windows, Mac, iPhone, Android, etc.

There is a Fathom analytics event tied to the calendar button. Also website tracking on every page through Fathom.

Try and keep the code clean, organized, modular. Styles and classes and JS should be shared across pages where appropriate.

The site needs to work on all resolutions, so it is responsive in nature.

Each time a stakeholder updates the shared spreadsheet, I will ask you to rebuild the site. Please list every file you touched after the changes. Also, if you have suggestions to change the text on the spreadsheet, you can list those as well.

Final notes:





Polaroid strip on home/Coin Wars (desktop only)



Package lightboxes on the sponsor page



Wufoo embeds on the four form pages

My previous AI agent left these notes for you:

PAGES - index.html (home + event lightboxes) - about.html - sponsor.html - coinwars.html - fundrequest.html - volunteer.html - member.html - marquee.html - 404.html

DEEP LINKS - /#eventid on the home page opens that event’s lightbox (e.g. /#coffeewithcardinals). - Netlify _redirects maps many old live URLs to the new pages or #event hashes.

NAV - Home · About · Sponsor · Forms - Forms dropdown: Request for Funds, Volunteer Signup, HSO Membership, Rent the Marquee - Desktop header also has “Find us on” + Facebook; mobile uses the hamburger menu

DEPLOY (NETLIFY) - Publish directory = site root (folder with index.html, style.css, index.js, images/, redirects, 404.html) - redirects is read automatically - 404.html in that root is used automatically as the not-found page

CONTENT WIDTH (RESPONSIVE) - Phone / small tablet: full width with side padding - Mid (about 1025px–1399px, e.g. iPad landscape → small monitors): ~80% width for main modules - Large (1400px+): ~60% width for main modules - Hero width is separate and should stay as designed

DONATE - Not an on-site page. Footer “Make a donation” (and similar) links out to the Square donation URL.

CALENDAR / EVENTS SECTION (HOME) - Events are grouped by month on the home page - Within a month, sort by day number ascending; TBD entries come last - Pill shows TBD, or date, or date + time when start_time/end_time exist on the Events sheet - If page_link is set, the card goes to that HTML page instead of the lightbox (Coin Wars uses coinwars.html) - Otherwise click opens the full-page event lightbox (flyer if image_file set, body copy, FAQs) - Shared FAQ object_ids (not always 1:1 with event id): - hsomeeting → 1st/2nd/3rd/4th HSO meetings - spiritnight → Barn’rds, Chick-fil-A, Gambino’s, Carousel Skate Night - teacherappreciation → both Teacher Appreciation cart events - conferencemeals → both conference meal events

SPONSORS (RECAP FOR NEW AGENTS) - Most pages: Banner first (A–Z), then Flag (A–Z) - Sponsor page: Banner → Flag → Logo → Text (all same pill size) - Coin Wars: top module = Banner + Flag (same as main site); lower “thanks” module = Logo + Text

ANALYTICS / CALENDAR BUTTON - Fathom site tracking on every page (data-site KENYJOPB) - Sync Your Calendar uses device-aware URL (webcal vs Android Google Calendar link) - Fathom goal BI7I1FAC on calendar sync clicks

SHARED CODE - style.css and index.js are shared across pages; prefer shared classes/patterns over one-off page CSS/JS

REBUILD WORKFLOW - When the shared Google Sheet is updated, rebuild the affected site content from the sheet - After changes, list every file touched - If sheet copy should be improved, list suggested text changes for the spreadsheet
