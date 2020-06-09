const categoryCtrl = {};
const Note = require("../models/Note"); 
const Category = require("../models/Category");
categoryCtrl.searchByCategory = async(req, res) => { 
  const {category} =req.params
  const categorySelected = await Category.findOne({name:category})
  const notes=await Note.find({},null,{sort:{score:'desc'}})
  let outNotes=[]
  notes.map(doc=>{
      doc.categories.map(category=>{
        if(String(categorySelected._id)==category){
            outNotes.push({_id:doc._id,title:doc.title,description:doc.description, score:doc.score}) 
          }
      })    
  })   
  const newWeight=categorySelected.weight+1;
  //increment weight
  console.log(newWeight)
  await Category.updateOne({_id:categorySelected._id},{weight:newWeight})
  res.render('categories/notesByCategory',{notes:outNotes});
};

module.exports = categoryCtrl;