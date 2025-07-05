'use client';

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CatData {
    id: string;
    url: string;
    width: number;
    height: number;
}

interface CatDetailPageProps {
    current?: CatData | string;
}

const CatDetailPage = ({ current }: CatDetailPageProps) => {
    const params = useParams<{ id: string }>();
    const router = useRouter();

    const [cat, setCat] = useState<CatData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (current && typeof current === 'object') {
            setCat(current);
            setLoading(false);
            return;
        }

        let idToLookup: string | undefined;

        if (typeof current === 'string') {
            idToLookup = current;
        } else if (params?.id) {
            idToLookup = params.id;
        }

        if (!idToLookup) {
            if (current === undefined) {
                router.push('/cats');
            } else {
                setCat(null);
                setLoading(false);
            }
            return;
        }

        setLoading(true);
        const storedCatString = localStorage.getItem("currentCat");
        let catFromStorage: CatData | null = null;

        if (storedCatString) {
            try {
                catFromStorage = JSON.parse(storedCatString);
            } catch (e) {
                console.error("Error al parsear currentCat desde localStorage:", e);
                catFromStorage = null;
            }
        }

        if (catFromStorage && catFromStorage.id === idToLookup) {
            setCat(catFromStorage);
            setLoading(false);
        } else {
            setCat(null);
            setLoading(false);
            if (current === undefined) {
                router.push('/cats');
            }
        }
    }, [params?.id, router, current]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-10 text-center">
                <p>Loading...</p>
            </div>
        );
    }

    if (!cat) {
        return (
            <div className="container mx-auto px-4 py-10 text-center">
                <p>Not found.</p>
                {current === undefined && (
                    <Link href="/cats" className="text-blue-500 hover:underline mt-4 block">
                        Back to cats
                    </Link>
                )}
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="mt-3 text-center max-h-[65vh] overflow-y-auto">
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group">
                    <div className="relative aspect-square">
                        <Image
                            src={cat.url || "/placeholder.svg"}
                            alt={`Gato ${cat.id}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-height: 300px) 30vh, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        />
                    </div>
                    <CardContent className="p-4">
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold">Cat Detail</h1>
                            <pre className="text-left bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                                {JSON.stringify(cat, null, 2)}
                            </pre>
                            <p className="text-sm text-muted-foreground">ID: {cat.id}</p>
                            <p className="text-sm text-muted-foreground">Width: {cat.width}px</p>
                            <p className="text-sm text-muted-foreground">Height: {cat.height}px</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
            {current === undefined && (
                <div className="text-center mt-6">
                    <Link href="/cats" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Back to cats
                    </Link>
                </div>
            )}
        </div>
    );
};

export default CatDetailPage;
