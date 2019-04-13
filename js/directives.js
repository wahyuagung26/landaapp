angular.module("app").directive("includeReplace", includeReplace).directive("a", preventClickDirective).directive("a", bootstrapCollapseDirective).directive("a", navigationDirective).directive("button", layoutToggleDirective).directive("a", layoutToggleDirective).directive("button", collapseMenuTogglerDirective).directive("div", bootstrapCarouselDirective).directive("toggle", bootstrapTooltipsPopoversDirective).directive("tab", bootstrapTabsDirective).directive("button", cardCollapseDirective).directive("checkStrength", passwordChecker).directive("pageSelect", pageSelect);

function includeReplace() {
    var directive = {
        require: "ngInclude",
        restrict: "A",
        link: link
    };
    return directive;

    function link(scope, element, attrs) {
        element.replaceWith(element.children());
    }
}
//Prevent click if href="#"
function preventClickDirective() {
    var directive = {
        restrict: "E",
        link: link
    };
    return directive;

    function link(scope, element, attrs) {
        if (attrs.href === "#") {
            element.on("click", function(event) {
                event.preventDefault();
            });
        }
    }
}
//Bootstrap Collapse
function bootstrapCollapseDirective() {
    var directive = {
        restrict: "E",
        link: link
    };
    return directive;

    function link(scope, element, attrs) {
        if (attrs.toggle == "collapse") {
            element.attr("href", "javascript;;").attr("data-target", attrs.href.replace("index.html", ""));
        }
    }
}
/**
 * @desc Genesis main navigation - Siedebar menu
 * @example <li class="nav-item nav-dropdown"></li>
 */
function navigationDirective() {
    var directive = {
        restrict: "E",
        link: link
    };
    return directive;

    function link(scope, element, attrs) {
        if (element.hasClass("nav-dropdown-toggle") && angular.element("body").width() > 782) {
            element.on("click", function() {
                if (!angular.element("body").hasClass("compact-nav")) {
                    element.parent().toggleClass("open").find(".open").removeClass("open");
                }
            });
        } else if (element.hasClass("nav-dropdown-toggle") && angular.element("body").width() < 783) {
            element.on("click", function() {
                element.parent().toggleClass("open").find(".open").removeClass("open");
            });
        }
    }
}
//Dynamic resize .sidebar-nav
sidebarNavDynamicResizeDirective.$inject = ["$window", "$timeout"];

function sidebarNavDynamicResizeDirective($window, $timeout) {
    var directive = {
        restrict: "E",
        link: link
    };
    return directive;

    function link(scope, element, attrs) {
        if (element.hasClass("sidebar-nav") && angular.element("body").hasClass("fixed-nav")) {
            var bodyHeight = angular.element(window).height();
            scope.$watch(function() {
                var headerHeight = angular.element("header").outerHeight();
                if (angular.element("body").hasClass("sidebar-off-canvas")) {
                    element.css("height", bodyHeight);
                } else {
                    element.css("height", bodyHeight - headerHeight);
                }
            });
            angular.element($window).bind("resize", function() {
                var bodyHeight = angular.element(window).height();
                var headerHeight = angular.element("header").outerHeight();
                var sidebarHeaderHeight = angular.element(".sidebar-header").outerHeight();
                var sidebarFooterHeight = angular.element(".sidebar-footer").outerHeight();
                if (angular.element("body").hasClass("sidebar-off-canvas")) {
                    element.css("height", bodyHeight - sidebarHeaderHeight - sidebarFooterHeight);
                } else {
                    element.css("height", bodyHeight - headerHeight - sidebarHeaderHeight - sidebarFooterHeight);
                }
            });
        }
    }
}
//LayoutToggle
layoutToggleDirective.$inject = ["$interval"];

function layoutToggleDirective($interval) {
    var directive = {
        restrict: "E",
        link: link
    };
    return directive;

    function link(scope, element, attrs) {
        element.on("click", function() {
            if (element.hasClass("sidebar-toggler")) {
                angular.element("body").toggleClass("sidebar-hidden");
            }
            if (element.hasClass("aside-menu-toggler")) {
                angular.element("body").toggleClass("aside-menu-hidden");
            }
        });
    }
}
//Collapse menu toggler
function collapseMenuTogglerDirective() {
    var directive = {
        restrict: "E",
        link: link
    };
    return directive;

    function link(scope, element, attrs) {
        element.on("click", function() {
            if (element.hasClass("navbar-toggler") && !element.hasClass("layout-toggler")) {
                angular.element("body").toggleClass("sidebar-mobile-show");
            }
        });
    }
}
//Bootstrap Carousel
function bootstrapCarouselDirective() {
    var directive = {
        restrict: "E",
        link: link
    };
    return directive;

    function link(scope, element, attrs) {
        if (attrs.ride == "carousel") {
            element.find("a").each(function() {
                $(this).attr("data-target", $(this).attr("href").replace("index.html", "")).attr("href", "javascript;;");
            });
        }
    }
}
//Bootstrap Tooltips & Popovers
function bootstrapTooltipsPopoversDirective() {
    var directive = {
        restrict: "A",
        link: link
    };
    return directive;

    function link(scope, element, attrs) {
        if (attrs.toggle == "tooltip") {
            angular.element(element).tooltip();
        }
        if (attrs.toggle == "popover") {
            angular.element(element).popover();
        }
    }
}
//Bootstrap Tabs
function bootstrapTabsDirective() {
    var directive = {
        restrict: "A",
        link: link
    };
    return directive;

    function link(scope, element, attrs) {
        element.click(function(e) {
            e.preventDefault();
            angular.element(element).tab("show");
        });
    }
}
//Card Collapse
function cardCollapseDirective() {
    var directive = {
        restrict: "E",
        link: link
    };
    return directive;

    function link(scope, element, attrs) {
        if (attrs.toggle == "collapse" && element.parent().hasClass("card-actions")) {
            if (element.parent().parent().parent().find(".card-body").hasClass("in")) {
                element.find("i").addClass("r180");
            }
            var id = "collapse-" + Math.floor(Math.random() * 1000000000 + 1);
            element.attr("data-target", "#" + id);
            element.parent().parent().parent().find(".card-body").attr("id", id);
            element.on("click", function() {
                element.find("i").toggleClass("r180");
            });
        }
    }
}
/** Password Cehcker directive */
function passwordChecker() {
    var directive = {
        replace: false,
        restrict: "EACM",
        scope: {
            model: "=checkStrength",
            idx: "=model"
        },
        link: link,
        template: '<li class="point"></li><li class="point"></li><li class="point"></li><li class="point"></li><li class="point"></li><li class="point-text">{{text}}</li>'
    };
    return directive;

    function link(scope, element, attrs) {
        var strength = {
            colors: ["#F00", "#F90", "#FF0", "#9F0", "#0F0"],
            mesureStrength: function(p) {
                var _force = 0;
                var _regex = /[$-/:-?{-~!"^_`\[\]]/g; //" (Commentaire juste là pour pas pourrir la coloration sous Sublime...)
                var _lowerLetters = /[a-z]+/.test(p);
                var _upperLetters = /[A-Z]+/.test(p);
                var _numbers = /[0-9]+/.test(p);
                var _symbols = _regex.test(p);
                var _flags = [_lowerLetters, _upperLetters, _numbers, _symbols];
                var _passedMatches = $.grep(_flags, function(el) {
                    return el === true;
                }).length;
                _force += 2 * p.length + (p.length >= 10 ? 1 : 0);
                _force += _passedMatches * 10;
                // penality (short password)
                _force = p.length <= 6 ? Math.min(_force, 10) : _force;
                // penality (poor variety of characters)
                _force = _passedMatches == 1 ? Math.min(_force, 10) : _force;
                _force = _passedMatches == 2 ? Math.min(_force, 20) : _force;
                _force = _passedMatches == 3 ? Math.min(_force, 40) : _force;
                return _force;
            },
            getColor: function(s) {
                var idx = 0;
                if (s <= 10) {
                    idx = 0;
                } else if (s <= 20) {
                    idx = 1;
                } else if (s <= 30) {
                    idx = 2;
                } else if (s <= 40) {
                    idx = 3;
                } else {
                    idx = 4;
                }
                return {
                    idx: idx + 1,
                    col: this.colors[idx]
                };
            }
        };
        scope.$watch("model", function(newValue, oldValue) {
            if (!newValue || newValue === "") {
                element.css({
                    display: "none"
                });
            } else {
                var c = strength.getColor(strength.mesureStrength(newValue));
                scope.idx = c.idx;
                element.css({
                    display: "inline"
                });
                element.children(".point").css({
                    background: "#DDD"
                }).slice(0, c.idx).css({
                    background: c.col
                });
                if (scope.idx <= 3) {
                    scope.text = "Password terlalu lemah";
                } else if (scope.idx == 4) {
                    scope.text = "Password cukup kuat";
                } else {
                    scope.text = "Password sangat kuat";
                }
            }
        });
    }
}
/** Pagination smart table */
function pageSelect() {
    var directive = {
        restrict: "E",
        template: '<input type="text" class="select-page align-center" ng-model="inputPage" ng-change="selectPage(inputPage)" style="width: 50px;">',
        link: link
    };
    return directive;

    function link(scope, element, attrs) {
        scope.$watch("currentPage", function(c) {
            scope.inputPage = c;
        });
    }
}