// src/components/CartSummary.jsx
export default function CartSummary({ 
  cart, 
  subtotal, 
  shipping, 
  total, 
  onRemove, 
  onUpdate,
  onCheckout 
}) {
  return (
    <div className="bg-antique/90 border-2 border-nautical/30 rounded-xl p-6 shadow-lg">
      <h2 className="font-title text-2xl text-nautical mb-4">Your Order</h2>
      
      {cart.length === 0 ? (
        <p className="text-nautical/80 text-center py-8">
          Your cart is empty.<br />
          Add some spirits to begin your journey!
        </p>
      ) : (
        <>
          <div className="max-h-96 overflow-y-auto mb-6">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-start py-3 border-b border-nautical/10">
                <div className="flex-1">
                  <h3 className="font-medium text-nautical">{item.name}</h3>
                  <div className="flex items-center mt-2">
                    <button 
                      onClick={() => onUpdate(item.id, item.quantity - 1)}
                      className="w-8 h-8 bg-nautical/20 rounded-full flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="mx-3">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdate(item.id, item.quantity + 1)}
                      className="w-8 h-8 bg-nautical/20 rounded-full flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-blush font-medium">
                    {new Intl.NumberFormat('de-DE', {
                      style: 'currency',
                      currency: 'EUR'
                    }).format(item.price * item.quantity)}
                  </p>
                  <button 
                    onClick={() => onRemove(item.id)}
                    className="mt-2 text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>
                {new Intl.NumberFormat('de-DE', {
                  style: 'currency',
                  currency: 'EUR'
                }).format(subtotal)}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>
                {new Intl.NumberFormat('de-DE', {
                  style: 'currency',
                  currency: 'EUR'
                }).format(shipping)}
              </span>
            </div>
            
            <div className="flex justify-between border-t border-nautical/20 pt-3 font-bold">
              <span>Total</span>
              <span className="text-blush">
                {new Intl.NumberFormat('de-DE', {
                  style: 'currency',
                  currency: 'EUR'
                }).format(total)}
              </span>
            </div>
          </div>
          
          <button
            onClick={onCheckout}
            className="w-full py-3 bg-blush text-nautical rounded-lg font-title text-xl hover:bg-blush-light transition-colors"
          >
            Secure Checkout
          </button>
        </>
      )}
    </div>
  );
}