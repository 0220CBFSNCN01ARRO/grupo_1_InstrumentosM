const fs = require("fs");
const path = require("path");
const db = require("../database/models");
const { check, validationResult, body } = require("express-validator");

//let productsPath = path.join(__dirname, "..", "data", "productos.json");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
let errors;
const controller = {
    list: (req, res) => {
        db.Articles.findAll().then((productos) =>
            res.render("list", {
                productos: productos,
                toThousand: toThousand,
                title: "listadoProductos",
                errors
            })
        );
    },
    detalle: (req, res) => {
        db.Articles.findByPk(req.params.id, { include: ["category"] })
            .then((producto) => {
                pictures = JSON.parse(producto.image);
                return res.render("detalle", {
                    title: `Detalle ${producto.name}`,
                    producto: producto,
                    toThousand: toThousand,
                    pictures: pictures,
                    errors
                });
            })
            .catch((error) => console.log(error));
    },

    delete: async (req, res) => {
        let deletedArticle = await db.Articles.findByPk(req.params.id);
        await db.Articles.destroy({
            where: {
                id: req.params.id,
            },
        });
        let arrayImages = JSON.parse(deletedArticle.image);
        //console.log(arrayImages);
        arrayImages.forEach((image) =>
            fs.unlinkSync(
                path.join(
                    __dirname,
                    `../../public/images/imgInstrumentos/${image}`
                )
            )
        );
        return res.redirect("/products");
    },

    editView: (req, res) => {
        db.Articles.findByPk(req.params.id, { include: ["category"] })
            .then((producto) => {
                return res.render("edit", {
                    title: "Editar Producto",
                    producto: producto,
                    errors
                });
            })
            .catch((error) => console.log(error));
    },

    edit: (req, res) => {
        let errors = validationResult(req);
        let images = [];
        for (let i = 0; i < req.files.length; i++) {
            images.push(req.files[i].filename);
        }
        //console.log(images);
        if (!errors.isEmpty()) {
            //si hay algun error del validator, borra las imagenes que subio previamente el multer en le ruta
            images.forEach((image) => {
                if (image != []) {
                    fs.unlinkSync(
                        path.join(
                            __dirname,
                            `../../public/images/imgInstrumentos/${image}`
                        )
                    );
                }
            });

            console.log(errors);
            res.redirect("/");
        } else {
            //primero borra imagenes de actuales del producto de la carpeta public
            db.Articles.findByPk(req.params.id)
                .then((product) => {
                    let arrayImages = JSON.parse(product.image);
                    return arrayImages.forEach((image) =>
                        fs.unlinkSync(
                            path.join(
                                __dirname,
                                `../../public/images/imgInstrumentos/${image}`
                            )
                        )
                    );
                })
                .catch((error) => console.log(error));

            //despues crea string de nombre de imagenes seleccionadas en el multer para mandar a db

            let images = [];
            for (let i = 0; i < req.files.length; i++) {
                images.push(req.files[i].filename);
            }
            //console.log(images);

            let imagesString = JSON.stringify(images);
            //console.log(imagesString);

            //por ultimo edita el articulo  en la db

            db.Articles.update(
                {
                    name: req.body.name,
                    price: req.body.price,
                    discount: req.body.discount,
                    stock: req.body.stock,
                    category_id: req.body.category,
                    serialNumber: req.body.serialNumber,
                    outstanding: req.body.destacado,
                    description: req.body.description,
                    image: imagesString,
                },
                {
                    where: { id: req.params.id },
                }
            )
                .then(() => res.redirect("/products"))
                .catch((error) => console.log(error));
        }
    },

    productAdd: (req, res) => {
        let categorias = db.Categories.findAll()
            //console.log(categorias)

            .then((categorias) =>
                res.render("productAdd", {
                    categorias: categorias,
                    title: "Agregar Productos",
                    errors
                })
            )
            .catch((error) => console.log(error));
    },
    add: function (req, res) {
        let errors = validationResult(req);
        let images = [];
        for (let i = 0; i < req.files.length; i++) {
            images.push(req.files[i].filename);
        }
        //console.log(images);
        if (!errors.isEmpty()) {
            //si hay algun error del validator, borra las imagenes que subio previamente el multer en le ruta
            images.forEach((image) => {
                if (image != []) {
                    fs.unlinkSync(
                        path.join(
                            __dirname,
                            `../../public/images/imgInstrumentos/${image}`
                        )
                    );
                }
            });
            console.log(errors);
            res.redirect("/");
        } else {
            //crea string de nombre de imagenes para mandar a db

            let imagesString = JSON.stringify(images);
            //console.log(imagesString);

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
                image: imagesString,
            })
                .then(() => res.redirect("/products"))
                .catch((error) => console.log(error));
        }
    },
};

module.exports = controller;
