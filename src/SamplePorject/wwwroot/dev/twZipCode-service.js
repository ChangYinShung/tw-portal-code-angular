/// <reference path="module.js" />

(function () {
  'use strict';
  angular.module('twProtalCode')
  .service('twZipCode', twZipCode);

  /*@ngInject*/
  function twZipCode(SourceData) {
    var vm = this;
  

    /**
     * @description 郵遞區號查詢
     * @param targetZipCode {string} 郵遞區號
     * @returns {object} County,District,ZipCode
     */
    
    function SearchByZipCode(targetZipCode) {
      var obj;
      _.forIn(SourceData, function (val, key) {
        _.forIn(val, function (zipkey, district) {
          if (zipkey == targetZipCode) {
            obj = {
              County: key,
              District: district,
              ZipCode: zipkey
            };
          }
        });
        
        if (_.isArray(val)) {
          val.forEach(function (el) {
            if (_.isObject(el)) {
              SearchByZipCode(el);
            }
          });
        }
        if (_.isObject(key)) {
          SearchByZipCode(SourceData[key]);
        }
      });
        return obj;
    }
    return {
      SearchByZipCode: SearchByZipCode
    }


  }
})();