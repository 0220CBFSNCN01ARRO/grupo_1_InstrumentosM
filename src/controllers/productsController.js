const fs = require("fs");
const path = require("path");
const db = require('../database/models')
const {check, validationResult, body} = require ('express-validator');

let productsPath = path.join(__dirname, "..", "data", "productos.json");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

function getProducts() {
  let products = fs.readFileSync(productsPath, "utf8");
  return products != "" ? JSON.parse(products) : [];
}
let productos = getProducts();

const controller = {
    list: (req, res) => {
        res.render("list", {
            title: "Catalogo",
            productos,
            puntoMil: toThousand,
        });
    },
    detalle: (req, res) => {
        db.Articles.findByPk(req.params.id, {include:['category']})
        .then((producto) => {

            pictures = JSON.parse(producto.image)
            return res.render('detalle', {
                title:'detalleProducto',
                producto:producto,
                toThousand:toThousand,
                pictures:pictures
            })
        })

        .catch(error => console.log(error))
        },

    delete: (req, res, next) => {
        let aReescribir = productos.filter(
            (unProducto) => unProducto.id != req.params.id
        );
        //console.log(aReescribir);
        fs.writeFileSync(productsPath, JSON.stringify(aReescribir, null, " "));
        res.redirect("/products");
    },
    editView: (req, res) => {
        let producto = productos.find((prod) => prod.id == req.params.id);
        res.render("edit", { title: "Editar producto", producto });
    },
    edit: (req, res, next) => {
        req.body.price = Number(req.body.price);
        req.body.discount = Number(req.body.discount);
        req.body.destacado = Boolean(req.body.destacado);
        let moded = productos.map((prod) => {
            //busca el prod por id, devuelve un objeto lit con los campos del form
            if (prod.id == req.params.id) {
                let images = [];
                // array con las nuevas img
                for (let i = 0; i < req.files.length; i++) {
                    images.push(req.files[i].filename);
                }

                return {
                    id: prod.id,
                    ...req.body,
                    image: prod.image.concat(images),
                };
            } else {
        return prod;
        }
        });
        //escribe el JSON
        fs.writeFileSync(productsPath, JSON.stringify(moded, null, " "));
        res.redirect("/products");
    },
    productAdd:  (req, res) => {
        let categorias =  db.Categories.findAll()
        //console.log(categorias)
        
        .then((categorias) => res.render('productAdd',{categorias:categorias, title:'prodAdd'}))
        .catch (error => console.log(error))
    },
    add: function (req, res){

        //crea string de nombre de imagenes para mandar a db

        let images = [];
        for (let i = 0; i < req.files.length; i++) {
                images.push(req.files[i].filename);
            }
        let imagesString= JSON.stringify(images)
        console.log(imagesString);

        //crea articulo en la db

        db.Articles.create({
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            stock: req.body.stock,
            category_id: req.body.category,
            serialNumber: req.body.serialNumber,
            outstanding: req.body.destacado,
            description: req.body.description,
            image: imagesString
        })
        .then(() => res.redirect(`/products/${req.params.id}`))
        .catch(error => console.log(error))
    }

};

module.exports = controller;
