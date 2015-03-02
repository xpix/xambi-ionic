angular.module('starter.services', ['ngResource'])

.factory('Sensor', function ($resource) {
   return $resource(
      'http://78.43.187.187:3080/topic/rollup/avg/1h', 
      {}, 
      {
         jsonpquery: { 
            method: 'JSONP', 
            params: {
               prepare: 'true', 
               callback: 'JSON_CALLBACK'
            }, 
            isArray: true
         }
      }
   );
})

.factory('Session', function ($resource) {
   return $resource(
      'http://78.43.187.187:3081/geras', 
      {}, 
      {
         jsonpquery: { 
            method: 'JSONP', 
            params: {
               sub: 'groups', 
               type: 'sensorgrp', 
               callback: 'JSON_CALLBACK'
            }, 
            isArray: true
         } 
      }
   );
});