'use client'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
import CatDetailPage from "./[id]/page";
import { useRouter } from "next/navigation";

/* 
    "id": "5lo",
    "url": "https://cdn2.thecatapi.com/images/5lo.jpg",
    "width": 480,
    "height": 360
*/


const CatPage = () => {
    const totalPages = 100; // Total number of pages

    const [currentPage, setCurrentPage] = useState(1);
    const [currentCat, setCurrentCat] = useState({ id: "0", url: "", width: 0, height: 0 });
    const [cats, setCats] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const fetchCats = async (page: number) => {
        const catsFetched = await fetch(`https://api.thecatapi.com/v1/images/search?format=json&limit=10&page=${page}`, {
            cache: "no-store",
        });
        setCats(await catsFetched.json());
    };
    const saveCat = (cat: { id: string; url: string; width: number; height: number }) => {
        localStorage.setItem("currentCat", JSON.stringify(cat));
        setCurrentCat(cat);
        setIsOpen(true);
    };
    const handleMore = (id: string) => {
        setIsOpen(false);
        router.push(`/cats/${id}`);
    };
    useEffect(() => {
        fetchCats(currentPage);
    }, [currentPage])

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col items-center space-y-4">
                <div className="flex flex-wrap items-center justify-center gap-1">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>

                <div className="text-sm text-muted-foreground">
                    Showing {(currentPage - 1) * 10 + 1} -{" "}
                    {Math.min(currentPage * 10, currentPage * 10)} of many cats
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cats.map((cat: { id: string; url: string; width: number; height: number }) => (
                    <div key={cat.id} onClick={() => saveCat(cat)}>
                        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group">
                            <div className="relative aspect-square">
                                <Image
                                    priority={cat.id === '0'}
                                    src={cat.url || "/placeholder.svg"}
                                    alt={`Gato ${cat.id}`}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                />
                                <div className="absolute top-2 right-2">
                                    <Badge variant="secondary" className="bg-white/90">
                                        {cat.width} × {cat.height}
                                    </Badge>
                                </div>
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                    <Heart className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            </div>
                            <CardContent className="p-4">
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">ID: {cat.id}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <CatDetailPage current={currentCat.id} />
                <div className="flex justify-between">
                    <Button onClick={() => handleMore(currentCat.id)}>See More</Button> 
                    <Button onClick={() => setIsOpen(false)}>Back</Button>
                </div>
            </Modal>
        </div>
    )
}

export default CatPage;

