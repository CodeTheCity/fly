angular.module('starter')
.factory('userFactory',function() {
	var allUsers = [
		{id: 1, name: 'Master Ryan', points: 23121},
		{id: 2, name: 'Lukasz the Greate', points: 25355},
		{id: 3, name: 'Przemek - wird name', points: 1090}
	]
	return {
		getUSerByID: function(id) {
			var result = {};
			allUsers.forEach(function(val, index) {
				if(val.id == id){
					result = val;
					console.log(val);
				}
			});
			return result;
		},
		getAllUSers: function() {
			return allUsers;
		}
	}
})