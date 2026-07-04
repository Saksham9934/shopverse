import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@shopverse.com",
    password: bcrypt.hashSync("admin123", 10),
    isAdmin: true,
  },
  {
    name: "Jane Shopper",
    email: "jane@example.com",
    password: bcrypt.hashSync("jane123", 10),
    isAdmin: false,
  },
];

export default users;
