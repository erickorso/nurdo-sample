'use client';

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, MapPin, Globe, Phone, Mail, Building, Navigation } from "lucide-react";

interface UserDetail {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface UserDetailPageProps {
  current?: UserDetail | string;
}

const UserDetailPage = ({ current }: UserDetailPageProps) => {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (current && typeof current === 'object') {
      setUser(current);
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
      setError("No user ID provided.");
      setLoading(false);
      if (current === undefined) {
        router.push('/users');
      }
      return;
    }

    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${idToLookup}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          if (res.status === 404) {
            setError(`User with ID "${idToLookup}" not found.`);
            if (current === undefined) {
              router.push('/users');
            }
          } else {
            setError(`Failed to fetch user: ${res.statusText}`);
          }
          setUser(null);
          return;
        }

        const userData: UserDetail = await res.json();
        setUser(userData);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("An error occurred while fetching user details.");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [params?.id, router, current]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <p>Cargando detalles del usuario...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <p className="text-lg text-red-600">{error}</p>
        {current === undefined && (
          <Link href="/users">
            <Button variant="outline" className="mt-4 bg-transparent">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a la lista
            </Button>
          </Link>
        )}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <p>Usuario no encontrado o datos no disponibles.</p>
        {current === undefined && (
          <Link href="/users">
            <Button variant="outline" className="mt-4 bg-transparent">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a la lista
            </Button>
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {current === undefined && (
        <div className="mb-6">
          <Link href="/users">
            <Button variant="outline" className="mb-4 bg-transparent">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a la lista
            </Button>
          </Link>
        </div>
      )}

      <div className="flex items-center gap-3 mb-2">
        <h1 className="text-4xl font-bold">{user.name}</h1>
        <Badge variant="secondary">#{user.id}</Badge>
      </div>
      <p className="text-xl text-muted-foreground">@{user.username}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="h-5 w-5" />
              Información Personal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Teléfono</p>
                <p className="text-muted-foreground">{user.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Sitio Web</p>
                <a
                  href={`http://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {user.website}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Dirección
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium">Dirección Completa</p>
              <p className="text-muted-foreground">
                {user.address.street}, {user.address.suite}
              </p>
              <p className="text-muted-foreground">
                {user.address.city}, {user.address.zipcode}
              </p>
            </div>

            <Separator />

            <div className="flex items-center gap-3">
              <Navigation className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Coordenadas</p>
                <p className="text-muted-foreground">
                  Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Información de la Empresa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium text-lg">{user.company.name}</p>
              <p className="text-muted-foreground italic">&quot;{user.company.catchPhrase}&quot;</p>
            </div>

            <Separator />

            <div>
              <p className="font-medium">Área de Negocio</p>
              <p className="text-muted-foreground">{user.company.bs}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDetailPage;
