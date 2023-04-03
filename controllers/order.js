import Order from "../schemas/order.js";
import User from "../schemas/user.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("detalle_pedido.producto");
    res.json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await Order.find({ _id: req.params.id }).populate("products");
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createOrder = async (req, res) => {
  const { name_user, price, number_table, userId, detalle_pedido } = req.body;

  const user = await User.findById(userId);

  if (!name_user || !price || !number_table) {
    return res.json({ mensaje: "Falta un campo por completar" });
  } else {
    const newOrder = new Order({
      name_user,
      price,
      number_table,
      detalle_pedido,
      user: user._id,
    });

    try {
      const savedOrder = await newOrder.save();

      user.orders = user.orders.concat(savedOrder._id);
      await user.save();

      res.json({ mensaje: "Orden tomanda correctamente", savedOrder });
    } catch (error) {
      console.error(error);
    }
  }
};

export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {}
    );
    res.status(200).json({ mensaje: "Orden editada correctamente", order });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ mensaje: "Orden eliminada correctamente", order });
  } catch (error) {
    res.status(500).json(error);
  }
};
