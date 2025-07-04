import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, MapPin, Globe, Phone, Mail, Building, Navigation } from "lucide-react"

interface UserDetail {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

async function getUser(id: string): Promise<UserDetail | null> {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      cache: "no-store",
    })

    if (!res.ok) {
      return null
    }

    return res.json()
  } catch (error) {
    return null
  }
}

export default async function UserDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const user = await getUser(params.id)

  if (!user) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/">
          <Button variant="outline" className="mb-4 bg-transparent">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a la lista
          </Button>
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl font-bold">{user.name}</h1>
          <Badge variant="secondary">#{user.id}</Badge>
        </div>
        <p className="text-xl text-muted-foreground">@{user.username}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Información Personal */}
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

        {/* Dirección */}
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

        {/* Información de la Empresa */}
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
              <p className="text-muted-foreground italic">"{user.company.catchPhrase}"</p>
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
  )
}
