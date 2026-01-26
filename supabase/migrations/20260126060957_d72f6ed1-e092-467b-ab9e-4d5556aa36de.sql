-- Fix overly permissive policies by adding proper checks

-- Drop and recreate order creation policy with better constraints
DROP POLICY IF EXISTS "Users can create orders" ON public.orders;
CREATE POLICY "Users can create orders" ON public.orders FOR INSERT 
WITH CHECK (
    -- Either authenticated user creating their own order
    (auth.uid() IS NOT NULL AND user_id = auth.uid())
    -- Or guest checkout (user_id is null and email is provided)
    OR (user_id IS NULL AND email IS NOT NULL AND email != '')
);

-- Drop and recreate order items policy
DROP POLICY IF EXISTS "Anyone can create order items" ON public.order_items;
CREATE POLICY "Users can create order items for their orders" ON public.order_items FOR INSERT 
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.orders 
        WHERE orders.id = order_items.order_id 
        AND (
            orders.user_id = auth.uid() 
            OR (orders.user_id IS NULL AND auth.uid() IS NULL)
        )
    )
);

-- Newsletter subscription - require valid email format check in application layer
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;
CREATE POLICY "Anyone can subscribe with valid email" ON public.newsletter_subscribers FOR INSERT 
WITH CHECK (email IS NOT NULL AND email LIKE '%@%.%');