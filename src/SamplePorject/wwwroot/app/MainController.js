(function () {
  angular.module('app')
  .controller('MainController', MainController);

  function MainController($log, twZipCode) {
    var vm = this;
    vm.SearchResult;
    
    vm.SearchAction = SearchAction;

    function SearchAction(zipcode) {
      vm.SearchResult = twZipCode.SearchByZipCode(zipcode);
      console.log(vm.SearchResult);
    }
  };
})();