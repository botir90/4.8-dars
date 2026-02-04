const { v4 } = require("uuid");
const { read_file, write_file } = require("../api/fs");

const get_all_products = async (req, res) => {
  try {
    const { title, desc } = req.body;

    const products = read_file("product.json");

    res.status(201).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
/////////////////////
const get_one_product = async (req, res) => {
  try {
  
const {id} = req.params
    const products = read_file("product.json");
const founded = products.find((itme)=> itme.id===id)
if (!founded) {
    return res.status(400).json({
        message : "product not found"
    })
    
 }

    res.status(201).json(founded);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
////////////////////////////
const add_product = async (req, res) => {
  try {
    const { title, desc } = req.body;

    const products = read_file("product.json");
products.push({
  id:v4(),
  title,
  desc
})
write_file("product.json",products)
    res.status(201).json({
     message: "added new product" 
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
//////////////////////////////
const update_product = async (req, res) => {
  try {
    const { title, desc } = req.body;
const {id} = req.body
    const products = read_file("product.json");
const founded = products.find((itme) => itme.id === id)
if (!founded) {
  return res.status(400).json({
    message : "product not found"
  })
}

products.forEach((itme)=> {
  if (itme.id === id) {
    itme.title = title ? title: itme.title
      itme.desc = desc ? desc: itme.desc
  }
})

write_file("product.json" ,products)

res.status(201).json({
  message : "update product"
})
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
/////////////////////////////////
const delete_product = async (req, res) => {
  try {
   
const {id} = req.body
    const products = read_file("product.json");
const founded = products.find((itme) => itme.id === id)
if (!founded) {
  return res.status(400).json({
    message : "product not found"
  })
}

products.forEach((itme,idx)=> {
  if (itme.id === id) {
   products.splice(idx,1)
  }
})

write_file("product.json" ,products)

res.status(201).json({
  message : "delete product"
})
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};











module.exports = {
 get_all_products,
get_one_product,
 add_product,
 update_product,
delete_product
};
