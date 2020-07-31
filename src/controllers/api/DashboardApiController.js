let db = require("../../database/models");
const product = require ("../../database/models/Article")
const { Op } = db.Sequelize;


const controller = {
    widgets: async (req, res) =>{
        const users = await db.Users.findAll();
        const products = await db.Articles.findAll();

        let amount = 0
        products.map(product => amount += product.price);

        res.json({
            meta:{
                status: 200,
                count: users.length,
                link: '/api/dashboard/widgets/'
            },
            data: [
                 {
                    cardName: 'Products in Data Base',
                    value: products.length,
                    icon:'fas fa-clipboard-list',
                },
                {
                    color:'success',
                    cardName: 'Amount in products',
                    value: '$' + amount,
                    icon:'fas fa-dollar-sign',
                },

                {
                    color:'warning',
                    cardName: 'Users quantity',
                    value: users.length,
                    icon:'fas fa-user-check',
                },
            ]
            })
        },

        products: async (req,res) =>{

            const products = await db.Product.findAll({include:['category']});
        }
        
}
  //      })
//
  //  },
//
  //  profile: async (req, res) => {
  //      const user = await db.Users.findByPk(req.params.id)
  //      res.json({
  //          meta:{
  //              status: 200,
  //              link: `/api/profile/${user.id}`
  //          },
  //          data: [
  //          {
  //                  id: user.id,
  //                  email: user.email,
  //                  firstName: user.firstName,
  //                  lastName: user.lastName,
  //                  rating: user.rating,
  //                  avatar: user.avatar,
  //                  
  //              }
  //          });
 //   },
//
//
 //   
 //   
//};
        
module.exports = controller
