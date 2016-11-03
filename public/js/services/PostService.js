// public/js/services/PostService.js
angular.module('PostService', []).factory('Post', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function() {
            return $http.get('/api/posts');
        },


                // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new nerd
        create : function(postData) {
            return $http.post('/api/posts', postData);
        },

        // call to DELETE a nerd
        delete : function(id) {
            return $http.delete('/api/posts/' + id);
        }
    }       

}]);