// Simple User Manager Class
class UserManager {
  constructor() {
    this.users = [];
  }

  addUser(id, name, email) {
    // Validate inputs
    if (!id || !name || !email) {
      throw new Error("All fields are required.");
    }

    // Check for duplicate ID
    const existingUser = this.users.find(user => user.id === id);

    if (existingUser) {
      throw new Error("User with this ID already exists.");
    }

    // Add user
    const newUser = {
      id,
      name,
      email
    };

    this.users.push({ ...newUser });

    return { ...newUser };
  }

  getUserById(id) {
    const user = this.users.find(user => user.id === id);
    return user ? { ...user } : null;
  }

  removeUser(id) {
    const index = this.users.findIndex(user => user.id === id);

    if (index === -1) {
      return false;
    }

    this.users.splice(index, 1);
    return true;
  }

  listUsers() {
    return this.users.map(user => ({ ...user }));
  }
}

module.exports = UserManager;

if (require.main === module) {
  // Example usage when run directly
  const manager = new UserManager();

  manager.addUser(1, "Nirav", "nirav@example.com");
  manager.addUser(2, "John", "john@example.com");

  console.log("All Users:", manager.listUsers());

  console.log("User ID 1:", manager.getUserById(1));

  manager.removeUser(2);

  console.log("After Removal:", manager.listUsers());
}
