// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="introduction.html"><strong aria-hidden="true">1.</strong> Introduction</a></li><li class="chapter-item expanded affix "><li class="part-title">For Users</li><li class="chapter-item expanded "><a href="users/01-getting-started.html"><strong aria-hidden="true">2.</strong> Getting Started</a></li><li class="chapter-item expanded "><a href="users/02-media.html"><strong aria-hidden="true">3.</strong> Media</a></li><li class="chapter-item expanded "><a href="users/03-votes-and-ranking.html"><strong aria-hidden="true">4.</strong> Votes and Ranking</a></li><li class="chapter-item expanded "><a href="users/04-moderation.html"><strong aria-hidden="true">5.</strong> Moderation</a></li><li class="chapter-item expanded "><a href="users/05-censorship-resistance.html"><strong aria-hidden="true">6.</strong> Censorship Resistance</a></li><li class="chapter-item expanded "><a href="users/06-fediverse-interaction.html"><strong aria-hidden="true">7.</strong> Fediverse Interaction</a></li><li class="chapter-item expanded "><a href="users/07-other-features.html"><strong aria-hidden="true">8.</strong> Other Features</a></li><li class="chapter-item expanded "><a href="users/08-history-of-lemmy.html"><strong aria-hidden="true">9.</strong> History of Lemmy</a></li><li class="chapter-item expanded affix "><li class="part-title">For Admins</li><li class="chapter-item expanded "><a href="administration/administration.html"><strong aria-hidden="true">10.</strong> Administration</a></li><li class="chapter-item expanded "><a href="administration/install_docker.html"><strong aria-hidden="true">11.</strong> Install with Docker</a></li><li class="chapter-item expanded "><a href="administration/install_ansible.html"><strong aria-hidden="true">12.</strong> Install with Ansible</a></li><li class="chapter-item expanded "><a href="administration/from_scratch.html"><strong aria-hidden="true">13.</strong> Install from Scratch</a></li><li class="chapter-item expanded "><a href="administration/on_aws.html"><strong aria-hidden="true">14.</strong> Install on AWS</a></li><li class="chapter-item expanded "><a href="administration/first_steps.html"><strong aria-hidden="true">15.</strong> First Steps</a></li><li class="chapter-item expanded "><a href="administration/configuration.html"><strong aria-hidden="true">16.</strong> Configuration</a></li><li class="chapter-item expanded "><a href="administration/theming.html"><strong aria-hidden="true">17.</strong> Theming Guide</a></li><li class="chapter-item expanded "><a href="administration/federation_getting_started.html"><strong aria-hidden="true">18.</strong> Getting started with Federation</a></li><li class="chapter-item expanded "><a href="administration/troubleshooting.html"><strong aria-hidden="true">19.</strong> Troubleshooting</a></li><li class="chapter-item expanded "><a href="administration/backup_and_restore.html"><strong aria-hidden="true">20.</strong> Backup and Restore</a></li><li class="chapter-item expanded "><a href="administration/caddy.html"><strong aria-hidden="true">21.</strong> Using Caddy as a reverse proxy</a></li><li class="chapter-item expanded "><a href="administration/separate_subdomains.html"><strong aria-hidden="true">22.</strong> Lemmy on Separate Subdomains</a></li><li class="chapter-item expanded "><a href="administration/tor_hidden_service.html"><strong aria-hidden="true">23.</strong> Running a Tor Hidden Service</a></li><li class="chapter-item expanded "><a href="administration/prometheus.html"><strong aria-hidden="true">24.</strong> Prometheus Metrics</a></li><li class="chapter-item expanded "><a href="administration/horizontal_scaling.html"><strong aria-hidden="true">25.</strong> Horizontal Scaling</a></li><li class="chapter-item expanded affix "><li class="part-title">For Contributors</li><li class="chapter-item expanded "><a href="contributors/01-overview.html"><strong aria-hidden="true">26.</strong> Overview</a></li><li class="chapter-item expanded "><a href="contributors/02-local-development.html"><strong aria-hidden="true">27.</strong> Local Development</a></li><li class="chapter-item expanded "><a href="contributors/03-docker-development.html"><strong aria-hidden="true">28.</strong> Docker Development</a></li><li class="chapter-item expanded "><a href="contributors/04-api.html"><strong aria-hidden="true">29.</strong> API</a></li><li class="chapter-item expanded "><a href="contributors/05-federation.html"><strong aria-hidden="true">30.</strong> Federation</a></li><li class="chapter-item expanded "><a href="contributors/06-resources.html"><strong aria-hidden="true">31.</strong> Resources</a></li><li class="chapter-item expanded "><a href="contributors/07-ranking-algo.html"><strong aria-hidden="true">32.</strong> Ranking Algorithm</a></li><li class="chapter-item expanded "><a href="contributors/08-plugins.html"><strong aria-hidden="true">33.</strong> Plugins</a></li><li class="chapter-item expanded affix "><li class="part-title">Code of Conduct</li><li class="chapter-item expanded "><a href="code_of_conduct.html"><strong aria-hidden="true">34.</strong> Code of Conduct</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
