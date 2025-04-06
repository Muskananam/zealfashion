// ❌ Don't do this (this tries to delete using _id)
// Cart.findByIdAndDelete(productId)


// ✅ DO THIS:
router.delete('/cart/:email/:_Id', async (req, res) => {
  const { email, _Id } = req.params;

  try {
    const result = await Cart.deleteOne({ email, _Id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("❌ Error removing item from cart:", error);
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
});
