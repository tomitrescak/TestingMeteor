var users = [
    {name:"Normal User",email:"normal@example.com",roles:[]},
    {name:"Admin User",email:"admin@example.com",roles:['admin']}
];

if (Meteor.users.find().count() == 0) {
    _.each(users, function (user) {
        var id;

        id = Accounts.createUser({
            email: user.email,
            password: "apple1",
            profile: { name: user.name }
        });

        if (user.roles.length > 0) {
            // Need _id of existing user record so this call must come
            // after `Accounts.createUser` or `Accounts.onCreate`
            Roles.addUsersToRoles(id, user.roles);
        }

    });
}