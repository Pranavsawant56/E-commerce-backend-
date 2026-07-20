const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const roles = await Promise.all([
    prisma.role.upsert({
      where: { name: 'ADMIN' },
      update: {},
      create: { name: 'ADMIN', description: 'Administrator with full access' },
    }),
    prisma.role.upsert({
      where: { name: 'CUSTOMER' },
      update: {},
      create: { name: 'CUSTOMER', description: 'Regular customer' },
    }),
  ]);
  console.log('  Roles created:', roles.map(r => r.name).join(', '));

  const adminRole = roles.find(r => r.name === 'ADMIN');
  const passwordHash = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@ecommerce.com' },
    update: {},
    create: {
      roleId: adminRole.id,
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@ecommerce.com',
      passwordHash,
      phone: '9999999999',
    },
  });
  console.log('  Admin user created:', adminUser.email);

  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'electronics' },
      update: {},
      create: { name: 'Electronics', slug: 'electronics', description: 'Electronic devices and accessories' },
    }),
    prisma.category.upsert({
      where: { slug: 'clothing' },
      update: {},
      create: { name: 'Clothing', slug: 'clothing', description: 'Apparel and fashion wear' },
    }),
    prisma.category.upsert({
      where: { slug: 'home-kitchen' },
      update: {},
      create: { name: 'Home & Kitchen', slug: 'home-kitchen', description: 'Home appliances and kitchen essentials' },
    }),
    prisma.category.upsert({
      where: { slug: 'books' },
      update: {},
      create: { name: 'Books', slug: 'books', description: 'Books and educational materials' },
    }),
    prisma.category.upsert({
      where: { slug: 'sports' },
      update: {},
      create: { name: 'Sports', slug: 'sports', description: 'Sports equipment and fitness gear' },
    }),
  ]);
  console.log('  Categories created:', categories.map(c => c.name).join(', '));

  const electronics = categories.find(c => c.slug === 'electronics');
  const clothing = categories.find(c => c.slug === 'clothing');
  await Promise.all([
    prisma.category.upsert({
      where: { slug: 'mobile-phones' },
      update: {},
      create: { name: 'Mobile Phones', slug: 'mobile-phones', parentId: electronics.id, description: 'Smartphones and accessories' },
    }),
    prisma.category.upsert({
      where: { slug: 'laptops' },
      update: {},
      create: { name: 'Laptops', slug: 'laptops', parentId: electronics.id, description: 'Laptops and notebooks' },
    }),
    prisma.category.upsert({
      where: { slug: 'mens-clothing' },
      update: {},
      create: { name: "Men's Clothing", slug: 'mens-clothing', parentId: clothing.id, description: "Men's fashion and apparel" },
    }),
    prisma.category.upsert({
      where: { slug: 'womens-clothing' },
      update: {},
      create: { name: "Women's Clothing", slug: 'womens-clothing', parentId: clothing.id, description: "Women's fashion and apparel" },
    }),
  ]);
  console.log('  Sub-categories created');

  const brands = await Promise.all([
    prisma.brand.upsert({
      where: { slug: 'apple' },
      update: {},
      create: { name: 'Apple', slug: 'apple', description: 'Premium electronics and technology' },
    }),
    prisma.brand.upsert({
      where: { slug: 'samsung' },
      update: {},
      create: { name: 'Samsung', slug: 'samsung', description: 'Consumer electronics and appliances' },
    }),
    prisma.brand.upsert({
      where: { slug: 'nike' },
      update: {},
      create: { name: 'Nike', slug: 'nike', description: 'Sportswear and athletic shoes' },
    }),
    prisma.brand.upsert({
      where: { slug: 'adidas' },
      update: {},
      create: { name: 'Adidas', slug: 'adidas', description: 'Sportswear and accessories' },
    }),
    prisma.brand.upsert({
      where: { slug: 'sony' },
      update: {},
      create: { name: 'Sony', slug: 'sony', description: 'Electronics and entertainment' },
    }),
    prisma.brand.upsert({
      where: { slug: 'penguin' },
      update: {},
      create: { name: 'Penguin Books', slug: 'penguin', description: 'Book publishing' },
    }),
  ]);
  console.log('  Brands created:', brands.map(b => b.name).join(', '));

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
