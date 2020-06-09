const helpers = {};
const Category = require("../models/Category");
helpers.categories = async (req, res, next) => {
    const categories=await  Category.find({})
    const outCategories=categories.map(doc=>{
        return {name:doc.name}
    })
    res.locals.categories=outCategories
    next();
};
sortCategoryByWeight=(a, b)=>{
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
module.exports = helpers;
