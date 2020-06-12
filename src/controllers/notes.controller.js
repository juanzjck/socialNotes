const notesCtrl = {};

// Models
const Note = require("../models/Note");
const Category = require("../models/Category");

notesCtrl.renderNoteForm = (req, res) => {
  res.render("notes/new-note");
};

notesCtrl.createNewNote = async (req, res) => {
  const { title, description, categories} = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "Escriba un título" });
  }
  if (!description) {
    errors.push({ text: "Escriba una descripción" });
  }
  if (errors.length > 0) {
    res.render("notes/new-note", {
      errors,
      title,
      description
    });
  } else {
    const categoriesInput = categories.split(',')
    let outCategories=[]
    new Promise((responde, reject)=>{
    
      categoriesInput.map(async doc=>{
        new Promise(async(response,rejection)=>{
          let existCategory=  await  Category.findOne({name:doc})
          response(existCategory)
        }).then(async(res)=>{
          if(res===null){
            let newCategory=new Category({name:doc})
            newCategory.weight=0;
            await newCategory.save();
          } 
        }).then(async(s)=>{
          const response=  await  Category.findOne({name:doc})
          console.log(response._id)
          outCategories.push(response._id)
          console.log(`new category created ${response.name}`)
        }).finally(()=>{
          setTimeout(()=>{
            responde(outCategories)
          },1000)
        })
        
       
      })
    }).finally(async (data)=>{
    
      const newNote = new Note({ title, description, categories:outCategories});
      newNote.user = req.user.id;
      await newNote.save();
      console.log('se guardo')
      req.flash("success_msg", "Nota añadida exitosamente");
      res.redirect("/notes");
    })
 

  }
};

notesCtrl.renderNotes = async (req, res) => {
  console.log('Loading... notes')
  const notes= await Note.find({ user: req.user._id }).sort({ date: "desc" , score:'desc'}).then((data)=>{
      const notes = data.map((doc)=>{
        return {
          _id:doc._id,
          title:doc.title,
          description:doc.description,
          user:doc.user
        }
      })
      return notes
   });

  res.render("notes/all-notes", { notes:notes });
};

notesCtrl.renderEditForm = async (req, res) => {
  const note = await Note.findById(req.params.id);
  let outnote={
    _id:note._id,
    title:note.title,
    description:note.description,
    score:note.score,
   };
   let categories=[]
   new Promise((succes,reject)=>{
    console.log("start")
    note.categories.map(async doc=>{
        const nameCategory= await Category.findById({_id:doc})
        console.log(nameCategory.name)
        categories.push(nameCategory.name)
      })
     
      setTimeout(()=>{
        succes('succes')
      },1000)
   }).finally(()=>{
    console.log(categories)
    console.log("end")
    outnote.categories=categories;
    if (note.user != req.user.id) {
      req.flash("error_msg", "No Autorizado");
      return res.redirect("/notes");
    }
    res.render("notes/edit-note", { note:outnote });
  
   })
 
};

notesCtrl.updateNote = async (req, res) => {
  const { title, description, categories } = req.body;
  //category
  const categoriesList=categories.split(",")
  let outCategories=[]
  new Promise((responde, reject)=>{
  
    categoriesList.map(async doc=>{
      new Promise(async(response,rejection)=>{
        let existCategory=  await  Category.findOne({name:doc})
        response(existCategory)
      }).then(async(res)=>{
        if(res===null){
          let newCategory=new Category({name:doc})
          newCategory.weight=0;
          await newCategory.save();
        } 
      }).then(async(s)=>{
        const response=  await  Category.findOne({name:doc})
        console.log(response._id)
        outCategories.push(response._id)
        console.log(`new category created ${response.name}`)
      }).finally(()=>{
        setTimeout(()=>{
          responde(outCategories)
        },1000)
      })
      
     
    })
  }).finally(async (data)=>{
  
    await Note.findByIdAndUpdate(req.params.id, { title, description, categories:outCategories });
    req.flash("success_msg", "Nota actualizada exitosamente");
    res.redirect("/notes");
  })


};

notesCtrl.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Nota borrada exitosamente");
  res.redirect("/notes");
};
notesCtrl.scoredNote=async(req, res)=>{
  const {id,score}=req.params
  let note =await Note.findOne({_id:id})
  let newScore=0
  let scores=[]
  try {
    if(note.scores!=null){
      scores=note.scores
      scores.map((doc)=>{
        newScore=newScore+Number(doc)
      })
      newScore= newScore+Number(score)
      newScore=newScore/scores.length
      scores.push(score)
    }else{
      newScore=Number(score)
      scores.push(score)
    }
    newScore=newScore.toFixed(2)
    await Note.updateOne({_id:id},{score:newScore,scores:scores});
    console.log(` ${req.params.id} ${req.params.score}`)
    res.send(`succes`)
  } catch (error) {
    console.log(error)
  }
 
}
module.exports = notesCtrl;
