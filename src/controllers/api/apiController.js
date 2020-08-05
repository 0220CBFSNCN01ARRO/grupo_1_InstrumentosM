let db = require("../../database/models");
//const { json } = require("sequelize/types");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controller = {
    listUsers: async (req, res) => {
        const users = await db.Users.findAll();
        res.json({
            meta: {
                status: 200,
                count: users.length,
                link: "/api/users/",
            },
            data: users.map((user) => {
                return {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    detail: `/api/users/${user.id}`,
                };
            }),
        });
    },

    profileOneUser: async (req, res) => {
        const user = await db.Users.findByPk(req.params.id);
        res.json({
            meta: {
                status: 200,
                link: `/api/users/${user.id}`,
            },
            data: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                avatar: user.avatar,
            },
        });
    },

    listProducts: async (req, res) => {
        let products = await db.Articles.findAll({ include: ["category"] });
        let categories = await db.Categories.findAll();

        let countProd = products.length;
        let productos = products.map((product) => {
            let fixPrice = toThousand(Math.trunc(product.price))
            return {
                id: product.id,
                name: product.name,
                category_id: product.category_id,
                category: product.category.name,
                description: product.description,
                price:fixPrice,
                detail: `/api/products/${product.id}`,
            };
        });

        // array dinamico de obj por categoria
        function ObjCategory(name, cant) {
            this.name = name;
            this.cant = cant;
        }
        let arrayCategories = []
         categories.map((cat)=>{
            let newCat = new ObjCategory(cat.name, 0)
            arrayCategories.push(newCat)
        })

        for (let prod of productos) {
            for (let cat of arrayCategories) {
               if (prod.category === cat.name) {
                    cat.cant = cat.cant + 1;
                }
            };
        };

        res.json({
            meta: {
                status: 200,
                link: `/api/products/`,
                count: countProd,
                countByCategory: arrayCategories
            },
            data: {
                productsList: productos
            },
        });
    },
    oneProduct: async (req, res) => {
        try {
            const article = await db.Articles.findByPk(req.params.id, {
                include: ["category"],
            });
            let fixPrice = toThousand(Math.trunc(article.price))
            res.json({
                meta: {
                    status: 200,
                    link: `/api/users/${article.id}`,
                },
                data: {
                    id: article.id,
                    name: article.name,
                    price: fixPrice,
                    discount: article.discount,
                    category_id: article.category_id,
                    category: article.category.name,
                    outstanding: article.outstanding,
                    imges: JSON.parse(article.image),
                    description: article.description,
                    createdAt: article.createdAt,
                    updatedAt: article.updatedAt,
                    urlFirstImg: `/images/instrumentos/${
                        JSON.parse(article.image)[0]
                    }`,
                },
            });
        } catch (error) {
            res.json({ error: error });
        }
    },
    lastProduct: async (req, res) => {

        let products = await db.Articles.findAll({ include: ["category"], order:[['id','DESC']] });

        let newestIndex = (products[0].id).toString()

        let ultimoProducto = (products.filter((product) => product.id == newestIndex))[0]

        let fixPrice = toThousand(Math.trunc(ultimoProducto.price))

        let firstImage = JSON.parse(ultimoProducto.image)

        let dataUltimoProducto = {
                id: ultimoProducto.id,
                name: ultimoProducto.name,
                discount: ultimoProducto.discount,
                category: ultimoProducto.category.name,
                description: ultimoProducto.description,
                price:fixPrice,
                image: firstImage[0]
            };


        res.json({
            meta: {
                status: 200,
                link: `/api/ultimoProducto`,
            },
            data:dataUltimoProducto
        })
    }
};

module.exports = controller;
