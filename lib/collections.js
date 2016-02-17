// this is collection.js
Products = new Mongo.Collection("products");
Customers = new Mongo.Collection("customers");
//Comments = new Mongo.Collection("comments");


// set up security on Products collection
Products.allow({

	// we need to be able to update products for ratings.
	update:function(userId, doc){
		console.log("testing security on products update");
		if (Meteor.user()){// they are logged in
			return true;
		} else {// user not logged in - do not let them update  (rate) the products. 
			return false;
		}
	},

	insert:function(userId, doc){
		console.log("testing security on products insert");
		if (Meteor.user()){// they are logged in
			if (userId != doc.createdBy){// the user is messing about
				return false;
			}
			else {// the user is logged in, the products has the correct user id
				return true;
			}
		}
		else {// user not logged in
			return false;
		}
	}, 
	remove:function(userId, doc){
		return true;
	}
})

