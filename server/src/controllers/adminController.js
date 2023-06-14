import Category from '#root/src/models/categoryModel.js'
import Product from '#root/src/models/productModel.js'
// import { getTokenPayload } from '#root/src/util/utility.js';


const adminController = {
    getIndex: async (req, res) => {
        const categories = await Category.find({});
        const products = await Product.find({});
        res.render('admin', { categories: categories, data: products });
    },

    addProduct: async (req, res) => {
        try {
            const {
                name,
                category,
                description,
                price,
                units,
                image,
            } = req.body;

            // check if product exists
            const existingProduct = await Product.findOne({ $or: [{ name }] });
            if (existingProduct) {
                return res.status(400).json({ error: 'Product already exists.' });
            }
            // create new product
            const product = new Product({
                name,
                category,
                description,
                price,
                units,
                image,
            });

            await product.save();
            res.status(200).json({ status: `Product added.` })
        } catch (error) {
            res.status(500).json({ error: 'Add product error.' });
        }
    },

    modifyProduct: async (req, res) => {
        try {
            const {
                name,
                category,
                description,
                price,
                units,
                image,
                productid,
            } = req.body;

            const productToModify = await Product.findOne({ _id: productid });
            
            if (!productToModify) {
                return res.status(404).json({ error: 'Product not found.' });
            }

            productToModify.name = name;
            productToModify.category = category;
            productToModify.description = description;
            productToModify.price = price;
            productToModify.units = units;
            productToModify.image = image;

            await productToModify.save();
            res.status(200).json({ status: `Product modified.` })
        } catch (error) {
            res.status(500).json({ error: 'Modify product error.' });
        }
    },

    showProductToModify: async (req, res) => {
        const productId = req.query.productid;
        const categories = await Category.find({});
        const product = await Product.findOne({ _id: productId });
        res.render('productModify', { product: product, categories: categories });
    },

    deleteProduct: async (req, res) => {
        const { productid } = req.body;

        await Product.deleteOne({ _id: productid })
            .then(() => {
                res.status(200).json({ status: `Product deleted.` })
            })
            .catch((error) => {
                return res.status(400).json({ error: error });
            });
    },

    addCategory: async (req, res) => {
        const { category } = req.body;

        // check if category exists
        const existingCategory = await Category.findOne({ $or: [{ category }] });
        if (existingCategory) {
            return res.status(400).json({ error: 'Category already exists.' });
        }
        // create new category
        const newCategory = new Category({
            name: category
        });

        await newCategory.save().then(() => {
                res.status(200).json({ status: `Category added.` })
            })
            .catch((error) => {
                return res.status(400).json({ error: error });
            });
    },

    deleteCategory: async (req, res) => {
        const { categoryid } = req.body;

        await Category.deleteOne({ _id: categoryid })
            .then(() => {
                res.status(200).json({ status: `Category deleted.` })
            })
            .catch((error) => {
                return res.status(400).json({ error: error });
            });
    },
};

export default adminController;