angular.module('earshotHq', ['ngAnimate'])
    .controller('HomeCtrl', ['$scope', function($scope) {
        $scope.format = 'M/d/yy h:mm:ss a';
    }]) 
    .directive('rotatingHeader', ['$animate', '$interval', '$compile',
                             function ($animate, $interval, $compile) {
                                 return {
                                     restrict: 'E',
                                     link: function(scope, element, attrs) {
                                         var timeoutId;
                                         var text = element.text()
                                         element.text('')

                                         scope.rotHeadIdx = 0;
                                         
                                         var fonts = eval(attrs.fonts);

                                         function rotateHeader() {
                                             angular.forEach(element.children(), function(toRem) {
                                                 $animate.leave(toRem)
                                                 toRem.remove()
                                             })
                                             
                                             var font = fonts[scope.rotHeadIdx++];
                                             
                                             $animate.enter(angular.element('<h1 id="' + font + '">' + text + '</h1>'), element)
                                         }

                                         element.on('$destroy', function() {
                                             $interval.cancel(timeoutId);
                                         });

                                         
                                         rotateHeader();
                                         timeoutId = $interval(function() {
                                             rotateHeader();
                                         }, 5000);
                                         
                                     }
                                 };
                             }])
