const Order = require("../models/orders");
const Product = require("../models/product");
const User = require("../models/user");

const createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    let orderItems = [];
    for (const item of items) {
      const { product_id, quantity } = item;
      const product = await Product.findById(product_id);

      if (!product) {
        return res
          .status(404)
          .json({ error: `Product with ID ${product_id} not found` });
      }
      const baseprice = product.baseprice * quantity;
      orderItems.push({
        product_id,
        productname: product.itemname,
        quantity,
        price: product.baseprice,
        baseprice,
      });
    }

    const totalAmount = orderItems.reduce(
      (total, item) => total + item.baseprice,
      0
    );
    const newOrder = new Order({
      items: orderItems,
      totalamount: totalAmount,
      status: req.body.status || "pending",
    });

    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addToCart = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;

    // Validate product_id and quantity
    if (!product_id || !quantity) {
      return res
        .status(400)
        .json({ error: "Product ID and quantity are required" });
    }

    const product = await Product.findById(product_id);

    if (!product) {
      return res
        .status(404)
        .json({ error: `Product with ID ${product_id} not found` });
    }

    const cart = req.session.cart || [];
    const existingItem = cart.find(
      (item) => item.product_id.toString() === product_id
    );

    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.price += product.baseprice * quantity;
    } else {
      cart.push({
        product_id,
        productname: product.itemname,
        quantity,
        price: product.baseprice * quantity,
      });
    }

    req.session.cart = cart;
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { order_id, items, status } = req.body;

    const existingOrder = await Order.findById(order_id);
    if (!existingOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    // const user = await User.findById(user_id);
    // if (!user) {
    //     return res.status(404).json({ error: "User not found" });
    // }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const { product_id, quantity } = item;
      const product = await Product.findById(product_id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const price = product.price * quantity;
      totalAmount += price;

      orderItems.push({
        product_id,
        product_name: product.name,
        quantity,
        price,
      });
    }
    // existingOrder.user_id = user_id;
    existingOrder.items = orderItems;
    existingOrder.total_amount = totalAmount;
    existingOrder.status = status;

    await existingOrder.save();
    res
      .status(200)
      .json({ message: "Order updated successfully", order: existingOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllOrdersByUserId = async (req, res) => {
  const { user_id } = req.body;
  try {
    const orders = await Order.find({ user_id });
    if (!orders) {
      return res.status(404).json("No Orders Found for this User");
    }
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteallorder = async (req, res) => {
  try {
    const orders = await Order.deleteMany();
    if (!orders) {
      return res.status(404).json("No Orders Found for this User");
    }
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteoneproduct = async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await Order.findByIdAndDelete(id);
    if (!orders) {
      return res.status(404).json("No Orders Found for this User");
    }
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
const createOrderbycart = async (req, res) => {
  try {
    const { status } = req.body;
    const cart = req.session.cart || [];

    if (cart.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const orderItems = cart.map((item) => ({
      product_id: item.product_id,
      productname: item.productname,
      quantity: item.quantity,
      price: item.price,
    }));

    const totalAmount = orderItems.reduce(
      (total, item) => total + item.price,
      0
    );
    const newOrder = new Order({
      items: orderItems,
      totalamount: totalAmount,
      status: status || "pending",
    });

    await newOrder.save();
    req.session.cart = []; // Clear the cart after order is created
    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  updateOrder,
  createOrder,
  getAllOrdersByUserId,
  deleteallorder,
  addToCart,
  deleteoneproduct,
  createOrderbycart,
};
