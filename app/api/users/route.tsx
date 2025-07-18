import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch users")
    }

    const users = await response.json()

    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users " + error }, { status: 500 })
  }
}
