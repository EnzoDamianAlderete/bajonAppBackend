import Product from "../schemas/products.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name_product, description_product, category, price, stock } =
      req.body;


    const newProduct = new Product({
      id,
      name_product,
      description_product,
      category,
      price,
      stock,
    });

    if (req.file) {
      const { filename } = req.file;
      newProduct.setImageUrl(filename);
    }

    newProduct
      .save()
      .then((product) => {
        res.json({ mensaje: "Producto agregado correctamente", product });
      })
      .catch((error) => console.error(error));
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateProduct = (req, res) => {
  const productId = req.params.id;
  const update = req.body;

  Product.findByIdAndUpdate(productId, update, (error, productUpdated) => {
    if (error) res.status(500).json({ error });

    res.status(200).send({ product: productUpdated });
  });
};
export const deleteProduct = (req, res) => {
  const productId = req.params.id;
  const update = { available: false };

  Product.findByIdAndUpdate(productId, update, (error, productUpdated) => {
    if (error) res.status(500).json({ error });

    res.status(200).send({ product: productUpdated });
  });
};
