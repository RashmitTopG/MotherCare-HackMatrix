import { useState, useEffect } from "react";
import { useCart } from "../cartContext";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Payment({ item, onBack }) {
    const { cart } = useCart();
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [formData, setFormData] = useState({ name: "", cardNumber: "", expiry: "", cvv: "", upiId: "" });
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    const isCartCheckout = !item;

    useEffect(() => {
        if (isCartCheckout) {
            const total = cart.reduce((sum, product) => {
                const price = parseFloat(product.price.replace(/[^0-9.]/g, "")) || 0;
                const quantity = parseInt(product.quantity) || 1;
                return sum + price * quantity;
            }, 0);
            setTotalPrice(total);
        } else {
            setTotalPrice(parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0);
        }
    }, [cart, item, isCartCheckout]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePayment = (e) => {
        e.preventDefault();
        setPaymentSuccess(true);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 p-6">
            <Card className="w-full max-w-md p-6 shadow-lg rounded-xl bg-white">
                {paymentSuccess ? (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-green-600">Payment Successful 🎉</h2>
                        <p className="text-gray-600 mt-2">Your order is confirmed!</p>
                        <Button onClick={onBack} className="mt-4">Back to Shop</Button>
                    </div>
                ) : (
                    <>
                        <CardTitle className="text-center text-lg font-semibold text-gray-700">Payment Details</CardTitle>
                        <p className="text-center text-sm text-gray-500">Total Price: ₹{totalPrice.toFixed(2)}</p>
                        
                        {isCartCheckout && (
                            <div className="mt-4">
                                <h3 className="text-md font-medium text-gray-700">Items in Cart:</h3>
                                <ul className="mt-2 text-gray-600">
                                    {cart.map((product, index) => (
                                        <li key={index} className="flex justify-between border-b py-2">
                                            <span>{product.name} (x{product.quantity})</span>
                                            <span>₹{(parseFloat(product.price.replace(/[^0-9.]/g, "")) * parseInt(product.quantity)).toFixed(2)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        
                        <CardContent>
                            <form onSubmit={handlePayment} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-gray-600 font-medium">Select Payment Method:</label>
                                    <Select onValueChange={setPaymentMethod} value={paymentMethod}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose payment method" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="card">Card</SelectItem>
                                            <SelectItem value="upi">UPI</SelectItem>
                                            <SelectItem value="cash">Cash on Delivery</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {paymentMethod === "card" && (
                                    <div className="space-y-3">
                                        <Input name="name" placeholder="Cardholder Name" value={formData.name} onChange={handleChange} required />
                                        <Input name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleChange} required />
                                        <div className="flex gap-4">
                                            <Input name="expiry" placeholder="MM/YY" value={formData.expiry} onChange={handleChange} required />
                                            <Input name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleChange} required />
                                        </div>
                                    </div>
                                )}

                                {paymentMethod === "upi" && (
                                    <Input name="upiId" placeholder="UPI ID (example@upi)" value={formData.upiId} onChange={handleChange} required />
                                )}

                                {paymentMethod === "cash" && (
                                    <p className="text-sm text-gray-600">You can pay in cash when your order arrives. 🎁</p>
                                )}

                                <Button type="submit" className="w-full bg-green-600 text-white">Pay ₹{totalPrice.toFixed(2)}</Button>
                                <Button type="button" variant="outline" className="w-full" onClick={onBack}>Cancel</Button>
                            </form>
                        </CardContent>
                    </>
                )}
            </Card>
        </div>
    );
}