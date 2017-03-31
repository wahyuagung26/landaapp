/** Export html to excel */
var saveExcel = (function() {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function(data, fileName) {
        var blob = new Blob([data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        });
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());
/** End */
/* Html from JSON*/
angular.module('app').filter('thisHtml', ['$sce', function($sce) {
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);
/** End */
/* Datetime to date object */
angular.module('app').filter("asDate", function() {
    return function(input) {
        if (input == "" || input == null) {
            return "";
        } else {
            return new Date(input);
        }
    }
});
/** End */
angular.module('customFilter', []).filter('filtercari', function() {
    return function(input, search) {
        if (!input) return input;
        if (!search) return input;
        var expected = ('' + search).toLowerCase();
        var result = {};
        angular.forEach(input, function(value, key) {
            var actual = ('' + value).toLowerCase();
            if (actual.indexOf(expected) !== -1) {
                result[key] = value;
            }
        });
        return result;
    }
});
/** range */
angular.module('app').filter('range', function() {
    return function(input, total) {
        total = parseInt(total);
        for (var i = 0; i < total; i++) {
            input.push(i);
        }
        return input;
    };
});
/** Read input type file */
angular.module('app').directive("fileread", [function() {
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
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);
/** End */
/** Pagination text */
angular.module('app').directive('pageSelect', function() {
    return {
        restrict: 'E',
        template: '<input type="text" class="select-page" ng-model="inputPage" ng-change="selectPage(inputPage)">',
        link: function(scope, element, attrs) {
            scope.$watch('currentPage', function(c) {
                scope.inputPage = c;
            });
        }
    }
});
/** End */
/** Directive print */
function printDirective() {
    function link(scope, element, attrs) {
        element.on('click', function() {
            var elemToPrint = document.getElementById(attrs.printElementId);
            if (elemToPrint) {
                printElement(elemToPrint);
            }
        });
    }

    function printElement(elem) {
        var popupWin = window.open('', '_blank', 'width=1000,height=700');
        popupWin.document.open()
        popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="css/print.css" /></head><body onload="window.print();window.close();">' + elem.innerHTML + '</html>');
        popupWin.document.close();
    }
    return {
        link: link,
        restrict: 'A'
    };
}
angular.module('app').directive('ngPrint', [printDirective]);
/** End */
/** Scroll to top */
angular.module('app').directive('uiScroll', ['$location', '$anchorScroll', function($location, $anchorScroll) {
    return {
        restrict: 'AC',
        link: function(scope, el, attr) {
            el.on('click', function(e) {
                $location.hash(attr.uiScroll);
                $anchorScroll();
            });
        }
    };
}]);
/** End */
/** Toggle class */
angular.module('app').directive('uiToggleClass', ['$timeout', '$document', function($timeout, $document) {
    return {
        restrict: 'AC',
        link: function(scope, el, attr) {
            el.on('click', function(e) {
                e.preventDefault();
                var classes = attr.uiToggleClass.split(','),
                    targets = (attr.target && attr.target.split(',')) || Array(el),
                    key = 0;
                angular.forEach(classes, function(_class) {
                    var target = targets[(targets.length && key)];
                    (_class.indexOf('*') !== -1) && magic(_class, target);
                    $(target).toggleClass(_class);
                    key++;
                });
                $(el).toggleClass('active');

                function magic(_class, target) {
                    var patt = new RegExp('\\s' + _class.replace(/\*/g, '[A-Za-z0-9-_]+').split(' ').join('\\s|\\s') + '\\s', 'g');
                    var cn = ' ' + $(target)[0].className + ' ';
                    while (patt.test(cn)) {
                        cn = cn.replace(patt, ' ');
                    }
                    $(target)[0].className = $.trim(cn);
                }
            });
        }
    };
}]);
/** End */
/** countdown */
angular.module('app').directive('timer', [function() {
    return {
        restrict: 'EAC',
        replace: false,
        scope: {
            countdown: "=",
            interval: "=",
            active: "=",
            onZeroCallback: "="
        },
        template: "{{formatted}}",
        controller: function($scope, $attrs, $timeout) {
            $scope.format = $attrs.outputFormat;
            var queueTick = function() {
                $scope.timer = $timeout(function() {
                    if ($scope.countdown > 0) {
                        $scope.countdown -= 1;
                        if ($scope.countdown > 0) {
                            queueTick();
                        } else {
                            $scope.countdown = 0;
                            $scope.active = false;
                            if (typeof $scope.onZeroCallback == 'undefined') {} else {
                                $scope.onZeroCallback();
                            }
                        }
                    }
                }, $scope.interval);
            };
            if ($scope.active) {
                queueTick();
            }
            $scope.$watch('active', function(newValue, oldValue) {
                if (newValue !== oldValue) {
                    if (newValue === true) {
                        if ($scope.countdown > 0) {
                            queueTick();
                        } else {
                            $scope.active = false;
                        }
                    } else {
                        $timeout.cancel($scope.timer);
                    }
                }
            });
            $scope.$watch('countdown', function() {
                updateFormatted();
            });
            var updateFormatted = function() {
                var value = ($scope.countdown) / 60;
                var minutes = Math.floor(value),
                    seconds = (value - minutes) * 60;
                var duration = moment.duration(minutes, 'minutes').add(seconds, 'seconds');
                var hasil = moment.utc(duration.asMilliseconds()).format("HH:mm:ss");
                $scope.formatted = hasil;
            };
            updateFormatted();
            $scope.$on('$destroy', function() {
                $timeout.cancel($scope.timer);
            });
        }
    };
}]);
/** countdown */