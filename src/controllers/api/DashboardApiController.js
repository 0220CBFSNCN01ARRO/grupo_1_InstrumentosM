let db = require("../../database/models");
const product = require ("../../database/models/Article")
//const { Op } = db.Sequelize;


const controller = {
    widgets: async (req, res) =>{
        let users = await db.Users.findAll();
        let products = await db.Articles.findAll();

        let amount = 0
        products.map(product => {amount +=Number(product.price)});
        console.log(amount)
        res.json({
            meta:{
                status: 200,
                count: users.length,
                link: '/api/widgets/'
            },
            data: [
                 {
                    name: 'Products in Data Base',
                    value: products.length,
                    icon:'fas fa-clipboard-list',
                },
                {
                    color:'success',
                    name: 'Amount in products',
                    value: `$ ${amount}`,
                    icon:'fas fa-dollar-sign',
                },

                {
                    color:'warning',
                    name: 'Users quantity',
                    value: users.length,
                    icon:'fas fa-user-check',
                },
            ]
            })
        }


        
        
}

        
module.exports = controller
