import { useState } from "react";
import { useCart } from "../cartContext";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BuyNow from "@/components/BuyNow";
import { CheckCircle, ShoppingCart } from "lucide-react";

export default function ChildShop() {
    const { addToCart } = useCart();
    const [selectedItem, setSelectedItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showPopup, setShowPopup] = useState(false);
    const itemsPerPage = 6;

    const items = [
        { name: "Teddy Bear", image: "/babyToys/teddy.jpeg", description: "Soft and cuddly teddy bear.", price: "$20" },
        { name: "Lego Set", image: "/babyToys/lego.jpg", description: "Creative Lego building set.", price: "$35" },
        { name: "Doll House", image: "/babyToys/dollHouse.jpg", description: "Beautiful wooden doll house.", price: "$50" },
        { name: "Remote Car", image: "/babyToys/remoteCar.jpeg", description: "Fast remote-controlled car.", price: "$40" },
        { name: "Baby Onesie", image: "/babyToys/babyOnsie.jpeg", description: "Soft cotton onesie for newborns.", price: "$15" },
        { name: "Baby Blanket", image: "/babyToys/babyBlanket.jpeg", description: "Warm and cozy baby blanket.", price: "$25" },
        { name: "Pacifier Set", image: "/babyToys/pacifier.jpeg", description: "Pack of 3 soft silicone pacifiers.", price: "$10" },
        { name: "Stuffed Bunny", image: "/babyToys/stuffedBunny.jpeg", description: "Adorable plush bunny toy.", price: "$18" },
        { name: "Rattle Toy", image: "/babyToys/rattleToy.jpeg", description: "Colorful rattle toy for babies.", price: "$12" },
        { name: "Baby Socks", image: "/babyToys/babySocks.jpg", description: "Set of 5 soft baby socks.", price: "$10" },
        { name: "Baby Bibs", image: "/babyToys/babyBibs.jpg", description: "Set of 4 waterproof baby bibs.", price: "$14" }
    ];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const handleAddToCart = (item) => {
        addToCart(item);
        setShowPopup(true);

        setTimeout(() => {
            setShowPopup(false);
        }, 500); // Blur for 1 sec
    };

    return (
        <div className="relative min-h-screen">
            {/* Background with blur effect when popup is visible */}
            <div className={`bg-pink-50 p-6 transition-all duration-500 ${showPopup ? "blur-md" : ""}`}>
                {selectedItem ? (
                    <BuyNow item={selectedItem} onBack={() => setSelectedItem(null)} />
                ) : (
                    <>
                        <h1 className="text-4xl font-bold text-pink-600 text-center mb-8">Child Shop</h1>
                        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {currentItems.map((item, index) => (
                                <Card key={index} className="rounded-xl shadow-lg">
                                    <img src={item.image} alt={item.name} className="rounded-t-xl w-full h-40 object-cover" />
                                    <CardContent className="p-4">
                                        <CardTitle className="text-lg text-gray-800">{item.name}</CardTitle>
                                        <p className="text-sm text-gray-600">{item.description}</p>
                                        <p className="text-lg font-semibold text-pink-500">{item.price}</p>
                                        <div className="flex gap-2 mt-3">
                                            <Button onClick={() => setSelectedItem(item)} variant="default">
                                                Buy Now
                                            </Button>
                                            <Button onClick={() => handleAddToCart(item)} variant="outline">
                                                Add to Cart
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex justify-center mt-6 gap-3">
                            <Button 
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                                disabled={currentPage === 1}
                                variant="outline"
                            >
                                Previous
                            </Button>
                            <span className="text-lg font-bold">Page {currentPage} of {totalPages}</span>
                            <Button 
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                                disabled={currentPage === totalPages}
                                variant="outline"
                            >
                                Next
                            </Button>
                        </div>
                    </>
                )}
            </div>

            {/* Pop-up Notification */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col items-center justify-center transition-opacity animate-fadeInOut">
                        <CheckCircle className="text-green-500 w-12 h-12" />
                        <p className="text-lg font-semibold mt-2">Item added to cart!</p>
                        <ShoppingCart className="text-gray-600 w-8 h-8 mt-2" />
                    </div>
                </div>
            )}
        </div>
    );
}
