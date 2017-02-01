(function() {
    'use strict';

    angular
      .module('app')
      .component("messageComponent", {
        controller: MessageController,
        templateUrl: '/js/app/messages/messages.template.html'
    });

    MessageController.$inject=['$http']

    function MessageController($http) {
        const vm = this;

        vm.$onInit = onInit;
        vm.getMessages = getMessages;
        vm.onNewSubmit = onNewSubmit;
        vm.onEditButton = onEditButton;
        vm.postNewClassified = postNewClassified;
        vm.onUpdateSubmit = onUpdateSubmit;
        vm.deleteClassified = deleteClassified;

        function onInit() {
          vm.messages = [];
            vm.getMessages();
        }//end onInit

        function onNewSubmit(data) {
          console.log(data);
          vm.postNewClassified(data);
          vm.newClassifiedButton = false;
          vm.newClassified={};
        }//end onNewSubmit

        function onEditButton(message) {
          console.log('onEditButton');
          message.showEditForm = !message.showEditForm;
          vm.editableData = {
            id: message.id,
            title: message.title,
            description: message.description,
            price: message.price,
            item_image: message.item_image
          };
        };// end onEditButton

        function onUpdateSubmit(input) {
          console.log(input);
          $http.patch(`/classifieds/${input.id}`, input).then((response)=>{
            vm.getMessages();
          })
        }

        function getMessages() {
            $http.get('/classifieds').then((response) => {
                vm.messages = response.data;
                // console.log(response.data);
            });
        }//end getMessage

        function postNewClassified(data) {
          $http.post('/classifieds', data).then((response)=>{
            vm.messages.push(response.data)
          });
        }// end postNewClassified

        function deleteClassified(id) {
          console.log(id);
          $http.delete(`/classifieds/${id}`).then((response)=>{
            vm.getMessages();
          })
        }//end deleteClassified

    }//end controller

}());
