var mongoose= require("mongoose");
var plm= require("passport-local-mongoose");




mongoose.connect("mongodb+srv://gdbcodes:QueWtajfEWKhC4vi@pin.wvdwi3g.mongodb.net/?retryWrites=true&w=majority&appName=pin").then(()=>{
 console.log(`connected to DB`);
})
.catch((err)=>{
console.log(`error yah hai => ${err}`);
})









var userSchema=mongoose.Schema({
username:String,
name:String,

 profileImage:{
  type:String,
  default:"default2.jpg"

 },
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
],


saved:[
  {
   type:mongoose.Schema.Types.ObjectId,
     ref:"post",
  }
 ],

 followers: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  }
],
following: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  }
]

})


userSchema.plugin(plm);


module.exports=mongoose.model("user",userSchema);
