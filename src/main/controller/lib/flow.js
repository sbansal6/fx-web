// var Flow = require('../../model').flow;
// var components = require('../../components') ;
//
// var main = function (req, res, next) {
//   var userProfile = req.user ;
//   var flowId = req.query.id ;
//   getFlowById(userProfile._id,flowId,function(err,flowModel){
//   	if (err) {
//   		res.status(500)
//   	} else {
//   		res.render('flow', {
//         title: 'FeedStageStudio',
//         user:req.user,
//         model: JSON.stringify(flowModel)
//         })
//   	}
//   })
// };
//
// /*
// *  Get Flow
// */
// var getFlowById = function(userId, flowId, cb){
// 	if (!flowId || flowId == "") {
//       cb(null,components.BaseModel)
//     } else {
//     	Flow.findOne({userId:userId,_id:flowId},function(err,doc){
//     		if (err){
//     			return cb(err)
//     		} else {
//     			return cb(null,doc)
//     		}
//     	})
//     }
// }
//
// module.exports.main = main;
