Init the Prisma
```sh
npx prisma init --datasource-provider mysql
```

to create migration file the prisma
```sh
npx prisma migrate dev --name init
```

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  avatar    String?
  role      Role     @default(USER)
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  USER
  ADMIN
}