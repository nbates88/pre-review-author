'use strict';

app.controller('StoryDetailCtrl', function ($scope, story, users, auth) {
  $scope.story = story;
  $scope.users = users;
  $scope.$watch('story', function () {
    $scope.story.save();
  }, true);
  console.log("curr user from story detail",  auth.getCurrentUser());
   $scope.getCurrentUser = auth.getCurrentUser;
});
