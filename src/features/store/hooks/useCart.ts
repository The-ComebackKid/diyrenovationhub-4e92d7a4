
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  price: number;
  product?: {
    name: string;
    image_url: string;
    price: number;
  };
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const addToCart = async (productId: string, quantity: number = 1) => {
    if (!user) {
      toast.error('Please log in to add items to cart');
      return false;
    }

    try {
      setLoading(true);

      // Get product details
      const { data: product, error: productError } = await supabase
        .from('products')
        .select('price, stock_quantity')
        .eq('id', productId)
        .single();

      if (productError || !product) {
        toast.error('Product not found');
        return false;
      }

      if (product.stock_quantity < quantity) {
        toast.error('Not enough stock available');
        return false;
      }

      // Create or get existing order
      let orderId;
      const { data: existingOrder } = await supabase
        .from('orders')
        .select('id')
        .eq('user_id', user.id)
        .eq('status', 'cart')
        .single();

      if (existingOrder) {
        orderId = existingOrder.id;
      } else {
        const { data: newOrder, error: orderError } = await supabase
          .from('orders')
          .insert({
            user_id: user.id,
            amount: 0,
            status: 'cart'
          })
          .select('id')
          .single();

        if (orderError || !newOrder) {
          toast.error('Failed to create cart');
          return false;
        }

        orderId = newOrder.id;
      }

      // Check if item already exists in cart
      const { data: existingItem } = await supabase
        .from('order_items')
        .select('id, quantity')
        .eq('order_id', orderId)
        .eq('product_id', productId)
        .single();

      if (existingItem) {
        // Update quantity
        const { error: updateError } = await supabase
          .from('order_items')
          .update({ quantity: existingItem.quantity + quantity })
          .eq('id', existingItem.id);

        if (updateError) {
          toast.error('Failed to update cart');
          return false;
        }
      } else {
        // Add new item
        const { error: insertError } = await supabase
          .from('order_items')
          .insert({
            order_id: orderId,
            product_id: productId,
            quantity,
            price: product.price
          });

        if (insertError) {
          toast.error('Failed to add to cart');
          return false;
        }
      }

      await fetchCartItems();
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const fetchCartItems = async () => {
    if (!user) return;

    try {
      const { data: order } = await supabase
        .from('orders')
        .select('id')
        .eq('user_id', user.id)
        .eq('status', 'cart')
        .single();

      if (!order) {
        setCartItems([]);
        return;
      }

      const { data: items, error } = await supabase
        .from('order_items')
        .select(`
          *,
          products (
            name,
            image_url,
            price
          )
        `)
        .eq('order_id', order.id);

      if (error) {
        console.error('Error fetching cart items:', error);
        return;
      }

      setCartItems(items || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      return removeItem(itemId);
    }

    try {
      const { error } = await supabase
        .from('order_items')
        .update({ quantity: newQuantity })
        .eq('id', itemId);

      if (error) {
        toast.error('Failed to update quantity');
        return false;
      }

      await fetchCartItems();
      return true;
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
      return false;
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('order_items')
        .delete()
        .eq('id', itemId);

      if (error) {
        toast.error('Failed to remove item');
        return false;
      }

      await fetchCartItems();
      toast.success('Item removed from cart');
      return true;
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Failed to remove item');
      return false;
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  useEffect(() => {
    if (user) {
      fetchCartItems();
    } else {
      setCartItems([]);
    }
  }, [user]);

  return {
    cartItems,
    loading,
    addToCart,
    updateQuantity,
    removeItem,
    getTotalPrice,
    getTotalItems,
    fetchCartItems
  };
};
