import { useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Payment from "./Payment";

export default function BuyNow({ item, onBack }) {
    const [showPayment, setShowPayment] = useState(false);

    return (
        <div className="flex items-center justify-center min-h-screen bg-pink-50 p-6">
            {showPayment ? (
                <Payment item={item} onBack={() => setShowPayment(false)} />
            ) : (
                <Card className="w-full max-w-md p-6 shadow-lg rounded-xl bg-white">
                    <img src={item.image} alt={item.name} className="rounded-t-xl w-full h-40 object-cover" />
                    <CardContent>
                        <CardTitle className="text-lg text-gray-800">{item.name}</CardTitle>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        <p className="text-lg font-semibold text-pink-500">{item.price}</p>
                        <div className="flex gap-2 mt-3">
                            <Button onClick={() => setShowPayment(true)}>Proceed to Payment</Button>
                            <Button variant="outline" onClick={onBack}>Back to Shop</Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
