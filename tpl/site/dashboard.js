app.controller('dashboardCtrl', function ($scope, Data, $state) {
    $scope.authError = null;

    $scope.login = function (form) {
        $scope.authError = null;

        Data.post('site/login/', form).then(function (result) {
            if (result.status == 0) {
                $scope.authError = result.errors;
            } else {
                $state.go('site.dashboard');
            }
        });
    };


    /*Data Line Chart*/
      $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
      $scope.series = ['Series A', 'Series B'];
      $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
      ];
      $scope.onClick = function (points, evt) {
        console.log(points, evt);
      };
      $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
      $scope.options = {
        scales: {
          yAxes: [
            {
              id: 'y-axis-1',
              type: 'linear',
              display: true,
              position: 'left'
            },
            {
              id: 'y-axis-2',
              type: 'linear',
              display: true,
              position: 'right'
            }
          ]
        }
      };

   /*Data Line Chart*/

   /*Doughnut Chart*/

   $scope.labelsdoughnut = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
   $scope.datadoughnut = [300, 500, 100];
   
   /*Doughnut Chart*/

   /*Bar Chart*/

  $scope.labelsbar = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  $scope.seriesbar = ['Series A', 'Series B'];

  $scope.databar = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];

  /*Bar Chart*/


  /*Horisontal*/
   $scope.labelshorisontal = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    $scope.serieshorisontal = ['Series A', 'Series B'];

    $scope.datahorisontal = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];
  /*Horisontal*/

})
