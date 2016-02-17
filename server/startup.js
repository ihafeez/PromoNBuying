Meteor.startup(function(){

if (Products.find().count() == 0){
	for (var i=1;i<13;i++){
		Products.insert(
			{
				prd_src1:"prd_"+i+".jpg",
				prd_alt:"Product number "+i,
				prd_name:"Product Name: Product No"+i,
				prd_category:"Product Category: Electorincs",
				prd_company_name:"Product Company of Product No"+i,
				prd_comppany_link:"Company Link of Product No"+i,
				prd_Reseller_list:"Reseller List of Product No"+i,
				prd_src2:"Product URL2 of Product No"+i,
				prd_src3:"Product URL3 of Product No"+i,
				prd_src4:"Product URL4 of Product No"+i,
				prd_short_desc:"Product Short Description of Product No"+i,
				prd_spec:"Product Sepcification of Product No"+i,
				prd_newlaunch:"YES",
				prd_launchdate:"05/02/2016",
				prd_revisiondate:"05/02/2016",
				prd_enhancements:"Newly launched Product",
				prd_promo_startdate:"05/02/2016",
				prd_promo_enddate:"05/04/2016",
				prd_promo_desc:"Buy 1 Get 1 Free if you buy product no"+i,
				prd_promo_token:"1+1",
				createdOn:new Date()
          	//	createdBy:Meteor.user()._id
			/*	comments:{
					customer_name:"Customer Name of Product No"+i,
					customer_country:"Customer Country of Product No"+i,
					customer_city:"Customer City of Porduct No"+i,
					customer_buy:"YES",
					cusotmer_wanabuy:"YES",
					customer_happy:"YES",
					customer_experience_des:"Customer experience of product No"+i,
					customer_alternative_product_name:"Customer suggest alternative product for product No"+i,
					customer_alternative_selection_reasion:"Customer reason for selecting alternative product for product no"+i,
					customer_recommendations:"Customer recommendations for product no"+i,
					cusotmer_ratings:"Customer rating for product no"+i,
					customer_share_to:"Customer Shared this product Friend xyz",
					customer_share_desc:"Customer description for sharing of product no"+i
				} */

			}
		);	
	}// end of for insert products
	// count the products!
	console.log("startup.js says: "+Products.find().count());
}// end of if have no products


});
