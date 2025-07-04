import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const id = url.pathname.split("/").pop()

    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, { cache: "no-store" })

    if (!response.ok) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const user = await response.json()

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch user" + error }, { status: 500 })
  }
}