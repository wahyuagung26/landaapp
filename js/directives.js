/** Export html to excel */
var saveExcel = (function() {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function(data, fileName) {
        var blob = new Blob([data], {
            type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        });
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
})();
/** End */
/* Html from JSON*/
angular.module("app").filter("thisHtml", [
    "$sce",
    function($sce) {
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }
]);
/** End */
/* Datetime to date object */
angular.module("app").filter("asDate", function() {
    return function(input) {
        if (input == "" || input == null) {
            return "";
        } else {
            return new Date(input);
        }
    };
});
/** End */
angular.module("customFilter", []).filter("filtercari", function() {
    return function(input, search) {
        if (!input) return input;
        if (!search) return input;
        var expected = ("" + search).toLowerCase();
        var result = {};
        angular.forEach(input, function(value, key) {
            var actual = ("" + value).toLowerCase();
            if (actual.indexOf(expected) !== -1) {
                result[key] = value;
            }
        });
        return result;
    };
});
/** range */
angular.module("app").filter("range", function() {
    return function(input, total) {
        total = parseInt(total);
        for (var i = 0; i < total; i++) {
            input.push(i);
        }
        return input;
    };
});
/** Password Cehcker directive */
angular.module("app").directive("checkStrength", [
    function() {
        return {
            replace: false,
            restrict: "EACM",
            scope: { model: "=checkStrength", idx: "=model" },
            link: function(scope, element, attrs) {
                var strength = {
                    colors: ["#F00", "#F90", "#FF0", "#9F0", "#0F0"],
                    mesureStrength: function(p) {
                        var _force = 0;
                        var _regex = /[$-/:-?{-~!"^_`\[\]]/g; //" (Commentaire juste là pour pas pourrir la coloration sous Sublime...)
                        var _lowerLetters = /[a-z]+/.test(p);
                        var _upperLetters = /[A-Z]+/.test(p);
                        var _numbers = /[0-9]+/.test(p);
                        var _symbols = _regex.test(p);
                        var _flags = [
                            _lowerLetters,
                            _upperLetters,
                            _numbers,
                            _symbols
                        ];
                        var _passedMatches = $.grep(_flags, function(el) {
                            return el === true;
                        }).length;

                        _force += 2 * p.length + (p.length >= 10 ? 1 : 0);
                        _force += _passedMatches * 10;

                        // penality (short password)
                        _force = p.length <= 6 ? Math.min(_force, 10) : _force;

                        // penality (poor variety of characters)
                        _force =
                            _passedMatches == 1 ? Math.min(_force, 10) : _force;
                        _force =
                            _passedMatches == 2 ? Math.min(_force, 20) : _force;
                        _force =
                            _passedMatches == 3 ? Math.min(_force, 40) : _force;

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
                        return { idx: idx + 1, col: this.colors[idx] };
                    }
                };

                scope.$watch("model", function(newValue, oldValue) {
                    if (!newValue || newValue === "") {
                        element.css({ display: "none" });
                    } else {
                        var c = strength.getColor(
                            strength.mesureStrength(newValue)
                        );
                        scope.idx = c.idx;
                        element.css({ display: "inline" });
                        element
                            .children(".point")
                            .css({ background: "#DDD" })
                            .slice(0, c.idx)
                            .css({ background: c.col });
                        if (scope.idx <= 3) {
                            scope.text = "Password terlalu lemah";
                        } else if (scope.idx == 4) {
                            scope.text = "Password cukup kuat";
                        } else {
                            scope.text = "Password sangat kuat";
                        }
                    }
                });
            },
            template:
                '<li class="point"></li><li class="point"></li><li class="point"></li><li class="point"></li><li class="point"></li><li class="point-text">{{text}}</li>'
        };
    }
]);

/** Read input type file */
angular.module("app").directive("fileread", [
    function() {
        return {
            scope: {
                fileread: "="
            },
            link: function(scope, element, attributes) {
                element.bind("change", function(changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function(loadEvent) {
                        scope.$apply(function() {
                            scope.fileread = loadEvent.target.result;
                        });
                    };
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        };
    }
]);
/** End */
/** Pagination text */
angular.module("app").directive("pageSelect", function() {
    return {
        restrict: "E",
        template:
            '<input type="text" class="select-page" ng-model="inputPage" ng-change="selectPage(inputPage)">',
        link: function(scope, element, attrs) {
            scope.$watch("currentPage", function(c) {
                scope.inputPage = c;
            });
        }
    };
});
/** End */
/** Directive print */
function printDirective() {
    function link(scope, element, attrs) {
        element.on("click", function() {
            var elemToPrint = document.getElementById(attrs.printElementId);
            if (elemToPrint) {
                printElement(elemToPrint);
            }
        });
    }

    function printElement(elem) {
        var popupWin = window.open("", "_blank", "width=1000,height=700");
        popupWin.document.open();
        popupWin.document.write(
            '<html><head><link rel="stylesheet" type="text/css" href="css/print.css" /></head><body onload="window.print();window.close();">' +
                elem.innerHTML +
                "</html>"
        );
        popupWin.document.close();
    }
    return {
        link: link,
        restrict: "A"
    };
}
angular.module("app").directive("ngPrint", [printDirective]);
/** End */
angular.module("app").config([
    "cfpLoadingBarProvider",
    function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeBar = true;
    }
]);
