/*
 * @param type {string} {Latitude:number,Longitude:number}
 * @param county {string} number
 * @param district {string} number
 * @param zipcode {string} number
 */

(function () {
  'use strict';
  angular.module('twProtalCode')
    .component('twProtalCode', twProtalCode())
    .run(templates);

  function twProtalCode() {
    return {
      templateUrl: getTemplate,
      controller: twZipCodeController,
      controllerAs: 'Ctrl',
      transclude: true,
      bindings: {
        btnStyle: '<',
        county: '=',
        district: '=',
        zipcode: '=',
        fullAddress: '=?'
      }
    };
  }

  /*@ngInject*/
  function getTemplate($element, $attrs) {
    var result = $attrs.type + '.tpl';
    return result;
  }
  
  /*@ngInject*/
  function twZipCodeController($timeout, $log, $scope, SourceData) {
    var vm = this;
    var data = SourceData;
    vm.countyOption = [];
    vm.districtOption = [];

    vm.countyOption = 縣市選項(data);//都市選項



    $scope.$watch('Ctrl.county', function (newValue, oldValue) {
      if (!newValue) return;
      vm.districtOption = 鄉鎮區選項(vm.county);
    });

    //使用者改變縣市
    vm.ChangeCounty = ChangeCounty;
    vm.ChangeDistrict = ChangeDistrict;


    $scope.$watch('Ctrl.shortAddress', function (newValue, oldValue) {
      if (!newValue) return;
      if (newValue == oldValue) return;
      vm.district = newValue.Name;
      vm.zipcode = newValue.ID;
    });
    $scope.$watchGroup(['Ctrl.county', 'Ctrl.shortAddress'], function (newValue) {
      if (!newValue[0]) return;
      if (!vm.shortAddress) return;

      vm.fullAddress = vm.shortAddress.ID + vm.county + vm.shortAddress.Name;
    })


    activate();

    function activate() {
      if (vm.county && vm.district && vm.zipcode) {
        vm.fullAddress = vm.zipcode + vm.county + vm.district;
      }
    }

    //private function

    function 縣市選項(data) {
      return _.keys(data);
    }

    /**
     * @description 選擇縣市後讀取鄉鎮選項
     * @param {string} county 縣市
     */
    function 鄉鎮區選項(county) {
      var result = _.filter(data, function (item, key) { return key == county; });
      return _.map(result[0], function (item, key) { return { ID: item, Name: key } });
    }

    /*
     * @description 縣市重選，需重新選擇鄉鎮已取得新的ZipCode
     */
    function ChangeCounty() {
      vm.zipcode = undefined;
      vm.district = undefined;
      vm.shortAddress = undefined;
      vm.fullAddress = vm.county;
    }
    function ChangeDistrict() {
      if (!vm.shortAddress) {
        vm.zipcode = undefined;
        vm.district = undefined;
        vm.fullAddress = vm.county;
      }
    }
  }

  templates.$inject = ['$templateCache'];
  function templates($templateCache) {
    $templateCache.put('base.tpl',
 '         <select  ng-model="Ctrl.county" ng-options="option for option in Ctrl.countyOption" ng-change="Ctrl.ChangeCounty()">' +
                        '<option  value="">請選擇縣市</option>' +
                      '</select>' +
                      '<select  ng-model="Ctrl.shortAddress" ng-options="option as option.Name for option in Ctrl.districtOption" ng-change="Ctrl.ChangeDistrict()">' +
                        '<option  value="">鄉鎮區</option>' +
                      '</select>' +
                      '<input ng-model="Ctrl.zipcode" disabled>');

    $templateCache.put('bs3.tpl',
'         <div class="row">  ' +
'           <div class="col-sm-4">  ' +
'             <div class="form-group">  ' +
'               <label for="County">縣市</label>  ' +
'               <select class="form-control"  ng-model="Ctrl.county" ng-options="option for option in Ctrl.countyOption" ng-change="Ctrl.ChangeCounty()" >' +
//'                   <option value="">請選擇縣市</option>',
'               </select>  ' +
'             </div>  ' +
'           </div>  ' +
'           <div class="col-sm-4">  ' +
'             <div class="form-group">  ' +
'               <label for="District">鄉鎮區</label>  ' +
'               <select class="form-control"  ng-model="Ctrl.shortAddress" ng-options="option as option.Name for option in Ctrl.districtOption" ng-change="Ctrl.ChangeDistrict()">' +
//'                   <option value="">請選擇鄉鎮區</option>',
'               </select>  ' +
'             </div>  ' +
'           </div>  ' +
'           <div class="col-sm-4">  ' +
'             <div class="form-group">  ' +
'               <label for="ZipCode">郵遞區號</label>  ' +
'               <input class="form-control" id="zipcode" type="text" ng-model="Ctrl.zipcode" disabled />  ' +
'             </div>  ' +
'           </div>  ' +
'        </div>  ');
    $templateCache.put('bs3.search.tpl',
'         <div class="row">  ' +
'           <div class="col-sm-4">  ' +
'             <div class="form-group">  ' +
'               <label for="County">縣市</label>  ' +
'               <select class="form-control"  ng-model="Ctrl.county" ng-options="option for option in Ctrl.countyOption" ng-change="Ctrl.ChangeCounty()" >' +
//'                   <option value="">請選擇縣市</option>',
'               </select>  ' +
'             </div>  ' +
'           </div>  ' +
'           <div class="col-sm-4">  ' +
'             <div class="form-group">  ' +
'               <label for="District">鄉鎮區</label>  ' +
'               <select class="form-control"  ng-model="Ctrl.shortAddress" ng-options="option as option.Name for option in Ctrl.districtOption" ng-change="Ctrl.ChangeDistrict()">' +
//'                   <option value="">請選擇鄉鎮區</option>',
'               </select>  ' +
'             </div>  ' +
'           </div>  ' +
'                 <ng-transclude></ng-transclude>' +
'        </div>  ');

  }

})();