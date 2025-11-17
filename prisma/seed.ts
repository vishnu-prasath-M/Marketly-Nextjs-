import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // Create admin user
  const adminPassword = await bcrypt.hash("Admin123", 10)
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin User",
      password: adminPassword,
      role: "ADMIN",
    },
  })

  console.log("Created admin user:", admin.email)

  // Create categories
  const categories = [
    { name: "SaaS", slug: "saas", description: "Software as a Service businesses" },
    { name: "Ecommerce", slug: "ecommerce", description: "Online stores and marketplaces" },
    { name: "Apps", slug: "apps", description: "Mobile and web applications" },
    { name: "Websites", slug: "websites", description: "Content sites and blogs" },
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    })
  }

  console.log("Created categories")

  console.log("Seeding completed!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


