import { Template } from 'meteor/templating';

Template.ajouterTache.events({
  'submit form': function(event) {
    event.preventDefault();
    var tache = event.target.tache.value;
    TachesCollection.insert({nom: tache});
    event.target.tache.value = '';
    event.stopPropagation();
  }
});
Template.listerTache.helpers({
  'taches': function() {
    var taches = TachesCollection.find();
    var tachesObserve = taches.observe({
      added(tache) {
        if (Notification.permission !== 'denied' || Notification.permission === "default") {
          Notification.requestPermission(function (permission) {
            if(!('permission' in Notification)) {
              Notification.permission = permission;
            }
          });
          if (Notification.permission === "granted") {
            new Notification("Nouveau document: "+tache.nom);
          }
        }
        if (Notification.permission === "granted") {
          new Notification("Nouveau document: "+tache.nom);
        }
        return;
      }
    });
    return taches;
  }
});

