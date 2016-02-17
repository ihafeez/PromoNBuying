Modal.allowMultiple = true;
/// routing 

Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('welcome', {
    to:"main"

   });
});

Router.route('/products', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('products', {
    to:"main"
  });
});


Router.route('/help', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('help', {
    to:"main"
  });
});


Router.route('/product/:_id', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('product', {
    to:"main", 
    data:function(){
      Session.set("prodid", this.params._id);
      return Products.findOne({_id:this.params._id});
    }
  });
});




/// infiniscroll

Session.set("productLimit", 8);
lastScrollTop = 0; 
$(window).scroll(function(event){
// test if we are near the bottom of the window
if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
  // where are we in the page? 
  var scrollTop = $(this).scrollTop();
  // test if we are going down
  if (scrollTop > lastScrollTop){
    // yes we are heading down...
   Session.set("productLimit", Session.get("productLimit") + 4);
  }

  lastScrollTop = scrollTop;
}
    
})

/////////////////////

Template.body.helpers('currentUser', function () {
    return Meteor.user();
  });// end of current user


//////////////////////


Template.products.helpers({
products:function(){
  if (Session.get("userFilter")){// they set a filter!
    return Products.find({createdBy:Session.get("userFilter")}, {sort:{createdOn: -1, rating:-1}});         
  }
  else {
    return Products.find({}, {sort:{createdOn: -1, rating:-1}, limit:Session.get("productLimit")});         
  }
},
filtering_products:function(){
  if (Session.get("userFilter")){// they set a filter!
    return true;
  } 
  else {
    return false;
  }
},
getFilterUser:function(){
  if (Session.get("userFilter")){// they set a filter!
    var user = Meteor.users.findOne(
      {_id:Session.get("userFilter")});
    return user.username;
  } 
  else {
    return false;
  }
},
getUser:function(user_id){
  var user = Meteor.users.findOne({_id:user_id});
  if (user){
    return user.username;
  }
  else {
    return "anon";
  }
},
getAdmin:function(){
  var admin = Meteor.user().emails[0].address;
  if (admin == 'admin@test.com'){
    return Meteor.user().emails[0].address;;
  }
  else {
    return false;
  }
}
});

////////////////////

Template.body.helpers({username:function(){
if (Meteor.user()){
  return Meteor.user().username;
    //return Meteor.user().emails[0].address;
}
else {
  return "anonymous internet user";
}
}
});

//////////////////////////////

Template.commentList.helpers({
  // find all comments for current doc
  comments:function(){
    return Customers.find({product_id:Session.get("prodid")});
  }
});

////////////////////////////

Template.products.events({
'click .js-product':function(event){
    $(event.target).css("width", "50px");
}, 
'click .js-del-product':function(event){
   var product_id = this._id;
   console.log(product_id);
   // use jquery to hide the product component
   // then remove it at the end of the animation
   $("#"+product_id).hide('slow', function(){
    Products.remove({"_id":product_id});
   })  
}, 
'click .js-rate-product':function(event){
  var rating = $(event.currentTarget).data("userrating");
  console.log(rating);
  var product_id = this.data_id;
  console.log(product_id);

  Products.update({_id:product_id}, 
                {$set: {rating:rating}});
}, 
'click .js-show-product-form':function(event){
   console.log("this is add product form:");
  // $("#product_add_form").modal('show');
   Modal.show('product_add_form');


},
'click .js-set-product-filter':function(event){
    Session.set("userFilter", this.createdBy);
}, 
'click .js-unset-product-filter':function(event){
    Session.set("userFilter", undefined);
}, 
});

Template.product.events({
'click .js-show-product-zoom':function(event){
  //modal to zoom product
   Modal.show('exampleModal');

},
'click .js-show-cusotmer-experience':function(event){
  //modal to zoom product
   Modal.show('customer_comments');

}
});

/*
Template.navbar.events({
'click .js-add-comments':function(event){
  //modal to zoom product
   Modal.show('customer_comments');

}
});
*/


Template.customer_comments.events({
'submit .js-add-customer-comments':function(event){
      var customer_buy, customer_happy, customer_wish, customer_alternative,customer_alternative_reason, customer_experience, customer_recommendations;
      customer_buy= event.target.customer_buy.value;
      customer_happy=event.target.customer_happy.value;
      customer_wish= event.target.customer_wish.value;
      customer_alternative= event.target.customer_alternative.value;
      customer_alternative_reason= event.target.customer_alternative_reason.value;
      customer_experience = event.target.customer_experience.value;
      customer_recommendations = event.target.customer_recommendations.value;
      //prod_Id= Products.findOne()._id; 
      //var prod_Id = Products.findOne({_id:prodid});
      var productId = Session.get("prodid");
     if(Meteor.user()){
        //Customers.insert({customer_name:'Dummy Record',comments:'Dummy Comments',Product_id:Products.findOne()._id});
          Customers.insert({
          customer_id:Meteor.userId(),
          customer_email:Meteor.user().emails[0].address,
          customer_username: Meteor.user().profile.username,
          customer_country:Meteor.user().profile.country,
          customer_gender:Meteor.user().profile.gender,
          customer_buy:customer_buy,
          customer_happy:customer_happy,
          customer_wish:customer_wish,
          customer_alternative:customer_alternative,
          customer_alternative_reason:customer_alternative_reason,
          customer_experience:customer_experience,
          customer_recommendations:customer_recommendations,
          product_id:productId
          
          });
      }

        //$("#product_add_form").modal('show');
        Modal.hide('customer_comments');
      
      return false;
    } 


  });
//});



 Template.product_add_form.events({
    'submit .js-add-product':function(event){
      var prd_src1, prd_alt, prd_promo_token, prd_name, prd_company_name, prd_company_link, prd_category, prd_Reseller_list, prd_spec, prd_launchdate, prd_promo_startdate, prd_promo_enddate;
      prd_src1= event.target.prd_src1.value;
      prd_alt= event.target.prd_alt.value;
      prd_promo_token = event.target.prd_promo_token.value;
      prd_name = event.target.prd_name.value;
      prd_company_name = event.target.prd_company_name.value;
      prd_company_link = event.target.prd_company_link.value;
      prd_category = event.target.prd_category.value;
      prd_Reseller_list = event.target.prd_Reseller_list.value;
      prd_spec = event.target.prd_spec.value;
      prd_launchdate = event.target.prd_launchdate.value;
      prd_promo_startdate = event.target.prd_promo_startdate.value;
      prd_promo_enddate = event.target.prd_promo_enddate.value;


      console.log("src: "+prd_src1+" alt:"+prd_alt);
     if(Meteor.user()){
          Products.insert({
          prd_src1:prd_src1,
          prd_alt:prd_alt,
          createdOn:new Date(),
          createdBy:Meteor.user()._id,
          prd_name:prd_name,
          prd_category:prd_category,
          prd_company_name:prd_company_name,
          prd_company_link:prd_company_link,
          prd_Reseller_list:prd_Reseller_list,
        prd_src2:"",
        prd_src3:"",
        prd_src4:"",
        prd_short_desc:"",
        prd_spec:prd_spec,
        prd_newlaunch:"",
        prd_launchdate:prd_launchdate,
        prd_revisiondate:"",
        prd_enhancements:"",
        prd_promo_startdate:prd_promo_startdate,
        prd_promo_enddate:prd_promo_enddate,
        prd_promo_desc:"",
        prd_promo_token:prd_promo_token
        /*comments:{
          customer_name:"",
          customer_country:"",
          customer_city:"",
          customer_buy:"",
          cusotmer_wanabuy:"",
          customer_happy:"",
          customer_experience_des:"",
          customer_alternative_product_name:"",
          customer_alternative_selection_reasion:"",
          customer_recommendations:"",
          cusotmer_ratings:"",
          customer_share_to:"",
          customer_share_desc:"",
        } */
          
          });
      }

        //$("#product_add_form").modal('show');
      Modal.hide('product_add_form');
      return false;
    }
    
  });

