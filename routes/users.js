var mongoose= require("mongoose");
var plm= require("passport-local-mongoose");




mongoose.connect("mongodb://127.0.0.1:27017/PINTREST-CHOTTU").then(()=>{
 console.log(`connected to DB`);
})
.catch((err)=>{
console.log(`error yah hai => ${err}`);
})



var userSchema=mongoose.Schema({
username:String,
name:String,

 profileImage:String,
email:String,
boards:{
  typr:Array,
  default:[],
},
userposts:[
 {
  type:mongoose.Schema.Types.ObjectId,
    ref:"post",
 }
]

})


userSchema.plugin(plm);


module.exports=mongoose.model("user",userSchema);
