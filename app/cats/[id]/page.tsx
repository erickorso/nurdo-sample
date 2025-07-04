'use client';
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

interface CatDetailPageProps {
    current?: object;
}

const CatDetailPage = ({ current }: CatDetailPageProps) => {
    const params = useParams<{ id: string }>();
    const currentCat = JSON.parse(localStorage.getItem("currentCat") || "{}");
    const router = useRouter();

    useEffect(() => {
        if (!current && params?.id && params.id !== currentCat.id) {
            router.push('/cats');
        }
    }, [params?.id, currentCat.id, router, current]);

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="mt-3 text-center max-h-[65vh] overflow-y-auto">
                <Link href={`/cats/${currentCat.id}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group">
                        <div className="relative aspect-square">
                            <Image
                                src={currentCat.url || "/placeholder.svg"}
                                alt={`Gato ${currentCat.id}`}
                                fill
                                priority={currentCat.id === '0'}
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                sizes="(max-height: 300px) 30vh, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                            />
                        </div>
                        <CardContent className="p-4">
                            <div className="space-y-2">
                                <h1>Cat Detail</h1>
                                <pre>{JSON.stringify(currentCat, null, 2)}</pre>
                                <p className="text-sm text-muted-foreground">ID: {currentCat.id}</p>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </div>
    );
};

export default CatDetailPage;