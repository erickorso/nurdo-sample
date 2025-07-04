import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">For Users</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Efficiently explore and manage users. Gain detailed insights into contact information, company data, and more for all registered users.
          </p>
          <Link href="/users">
            <Button size="lg" className="text-lg px-8 py-3">
              Users List
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <hr className="my-8 border-gray-300" />
          <h1 className="text-5xl font-bold mb-4 text-gray-900">For Cats</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover and manage your feline friends with ease! Dive into their unique personalities, track their favorite naps, and catalog their purr-fect moments.
          </p>
          <Link href="/cats">
            <Button size="lg" className="text-lg px-8 py-3">
              Cats List
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

      </div>
    </div>
  )
}
