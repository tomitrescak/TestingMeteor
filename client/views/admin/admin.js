Template.admin.helpers({
    tutorialModel: function() {
        return TutorialViewModel.create(this._id, this.name, this.capacity, this.currentCapacity);
    }
});

Template.admin.events({
    "submit form": function(e) {
        e.preventDefault();
        this.name = $('#tutorialName').val();
        this.capacity = parseInt($('#tutorialCapacity').val());
        this.currentCapacity = 0;
        this.save();

        Router.go("tutorials");
    }
});