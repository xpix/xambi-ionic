angular.module('starter.services', ['ngResource'])

.factory('Sensor', function ($resource) {
   return $resource('http://78.43.187.187:3081/geras', {}, {jsonpquery: { method: 'JSONP', params: {sub: 'rollup', type: 'timedata', callback: 'JSON_CALLBACK'}, isArray: true} });
})

.factory('Session', function ($resource) {
   return $resource('http://78.43.187.187:3081/geras', {}, {jsonpquery: { method: 'JSONP', params: {sub: 'groups', type: 'sensorgrp', callback: 'JSON_CALLBACK'}, isArray: true} });
});