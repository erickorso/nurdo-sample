import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`, { cache: "no-store" })

    if (!response.ok) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const user = await response.json()

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}
