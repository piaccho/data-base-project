import Category from '#root/src/models/categoryModel.js'
import Product from '#root/src/models/productModel.js'
import Cart from '#root/src/models/cartModel.js'


const userController = {
    getIndex: async (req, res) => {
        const categories = await Category.find({});
        res.render('index', { categories: categories, user: true });
    },

    addProductToCart: async (req, res) => {
        const {
            productid,
            quantity,
        } = req.body;

        console.log(req.body);
        // 

        // const productId = req.query.productid;
        // const product = await Product.find({ _id: productId });
        // res.render('product', { product: product });
    }
};

export default userController;