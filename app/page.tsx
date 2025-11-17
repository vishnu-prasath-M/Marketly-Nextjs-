import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import LandingPage from "@/components/landing/landing-page"

export default async function Home() {
  const session = await auth()

  if (session) {
    if (session.user.role === "ADMIN") {
      redirect("/admin/dashboard")
    } else if (session.user.role === "SELLER") {
      redirect("/seller/dashboard")
    } else {
      redirect("/buyer/dashboard")
    }
  }

  return <LandingPage />
}


