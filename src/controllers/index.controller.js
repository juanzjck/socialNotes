const indexCtrl = {};
const fetch = require('node-fetch');
const Note = require("../models/Note");
const Category = require("../models/Category");

const sortCategoryByWeight=(a, b)=>{
  console.log('se esta ejcutando')
  // a should come before b in the sorted order
  if(a.weight > b.weight){
      
          return -1;
  // a should come after b in the sorted order
  }else if(a.weight < b.weight){
          return 1;
  // and and b are the same
  }else{
          return 0;
  }
}
indexCtrl.renderIndex = async (req, res) => {
  const notes=await Note.find({},null,{sort:{score:'desc'}})
  const outNotes=notes.map(doc=>{
    return {_id:doc._id,title:doc.title,description:doc.description,score:doc.score}
  })
  //search image of categorries
  const categories=await Category.find({},null,{sort:{weight:'ascending'}})
  let outCategories=[]
  new Promise((success,reject)=>{
    categories.map(async doc=>{
      let respond=await fetch(`https://pixabay.com/api/?lang=es&key=16965951-b0fabfe8b6d90351a73cf1401&q=${doc.name}&image_type=photo&per_page=3`).then(res => res.json()).then(json =>json);
      setTimeout(()=>{
        console.log(respond)
          let img=respond.hits.map(images=>{
            return images.webformatURL
          })
          console.log(img[0])
          outCategories.push({_id:doc._id,name:doc.name,img:img[0], weight:doc.weight})
        })},2000)
      
     setTimeout(()=>{
      success('done')
     },1000)
  }).finally(()=>{
    outCategories=outCategories.sort(sortCategoryByWeight)
    console.log(outCategories)
    console.log(`esto responde ${ outCategories}`)
    res.render('index',{notes:outNotes, bestCategories:outCategories});
  })

  

};

indexCtrl.renderAbout = (req, res) => {
  res.render('about');
};

module.exports = indexCtrl;