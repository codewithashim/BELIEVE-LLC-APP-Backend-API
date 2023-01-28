const mongose=require('mongoose');
//const { productSchema } = require("./product");
var Schema = mongose.Schema;
const userSchema=Schema({
name:{
required:true,
type:String,
trim:true

},
email:{required:true,
    type:String,
    trim:true,
validate:{
    validator:(value)=>{
        var validRegex =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
return value.match(validRegex)
},
message:'enter. valid email'

}
},
password:{
    required:true,
    type:String,
    // validate:{
    //     validator:(value)=>{

    // return value.length>6;
    // },
    // message:'password must contain 6 characters'
    // }
},

address:{
    default:'',
    type:String,

},
type:{
    default:'user',
    type:String,

},

});

// const User=mongose.model(
//     'User',userSchema
// );
//module.export=User;
module.exports =  mongose.model('User', userSchema)