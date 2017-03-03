var app = angular.module('app');

app.factory('myService', function ($http) {
  return {
    getRates: function () {
      // get запрос на получение последних катировок
      return $http.get("//api.fixer.io/latest?symbols=RUB,JPY");
    }
  };
});


app.controller('HomeController', function (myService, $scope) {
  $scope.translitionCurr = 0; // итоговая сумма перевода
  // Функция запроса данных //
   myService.getRates().then(function (d) {
    $scope.data = d.data; // получение данных
  });

  // Итоговая функция получения суммы перевода //
  $scope.getCurrency = function () {
    var num = $scope.toTransCurr; // сумма для перевода
    $scope.translitionCurr = TranslateCurrency(num, $scope.data.rates);
  };


  // Функция перевода рубли в йены //
  var TranslateCurrency = function (num,   // сумма для перевода
                                    rates) // катировки
  {
    fx.rates = rates; // используем библиотека money.js
    var rate = fx(num).from("RUB").to("JPY"); // делаем запрос на перевод
    return rate.toFixed(4); // возвращаем сумму перевода с 4 числами после запятой
  };

});


