# tw-portal-code-angular

##說明   
module name: `twProtalCode`  
type: `bs3`,`base`   
county:`縣市`  
district:`鄉鎮區`  
zipcode:`郵遞區號`  
full-address:`optional`



## Demo   

<a href="https://github.com/ChangYinShung/tw-portal-code-angular/tree/master/src/SamplePorject/wwwroot">Demo Site</a>
### 使用方式   

```` html
  <tw-protal-code type="base"  
                  county="Ctrl.County" 
                  district="Ctrl.District"  
                  zipcode="Ctrl.ZipCode" 
                  full-address="Ctrl.FullAddress">  
  </tw-protal-code>
````  
### Utility    
#### SearchByZipCode
```` javascript
  var app = angular.module('app', ['twZipCode']);  
  app.controller('Main', function(twZipCode) {
    var result = twZipCode.SearchByZipCode(402);
    //result {"County":"台中市","District":"南區","ZipCode":"402"}
  });
````  


