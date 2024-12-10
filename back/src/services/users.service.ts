import { userRepository } from "../repositories/users.repository";
import { User } from "../entity/Users.entity";

export class UserService {
  // Obtener usuario por ID
  async readById(id: number) {
    try {
      const user = await userRepository.findOne({
        where: { id_users: id },
      });
      if (!user) throw new Error(`User with ID ${id} not found`);
      return user;
    } catch (error) {
      console.error("Error in UserService (readById):", error);
      throw new Error("Failed to fetch user by ID");
    }
  }

  // Obtener usuario por Email
  async readByEmail(email: string): Promise<User | null> {
    try {
      const user = await userRepository.findOne({
        where: { email }, // Asumiendo que tienes un campo 'email' en el modelo.
      });
      return user;
    } catch (error) {
      console.error("Error in UserService (readByEmail):", error);
      throw new Error("Failed to fetch user by email");
    }
  }

  // Obtener todos los usuarios
  async read() {
    try {
      return await userRepository.find();
    } catch (error) {
      console.error("Error in UserService (read):", error);
      throw new Error("Failed to fetch all users");
    }
  }

  // Crear un nuevo usuario
  async createUser(data: any): Promise<any | null> {
    try {
      const newUser = userRepository.create(data);
      await userRepository.save(newUser);
      return newUser
    } catch (error) {
      console.error("Error in UserService (createUser):", error);
      throw new Error("Failed to create user");
    }
  }

  async login(email: string, password: string): Promise<any | null> {
    try {
      const user = await this.readByEmail(email);
      if (!user) {
        return null;
      }

      return user;
    } catch (error) {
      console.error("Error in UserService.authenticateUser:", error);
      throw error;
    }
  }

  // Actualizar un usuario
  async updateUser(id: number, data: Partial<any>) {
    try {
      const user = await userRepository.findOne({ where: { id_users: id } });
      if (!user) throw new Error(`User with ID ${id} not found`);

      // Merge data and save updated user
      userRepository.merge(user, data);
      return await userRepository.save(user);
    } catch (error) {
      console.error("Error in UserService (updateUser):", error);
      throw new Error("Failed to update user");
    }
  }

  // Eliminar un usuario
  async deleteUser(id: number) {
    try {
      const user = await userRepository.findOne({ where: { id_users: id } });
      if (!user) throw new Error(`User with ID ${id} not found`);

      // Remove the user
      return await userRepository.remove(user);
    } catch (error) {
      console.error("Error in UserService (deleteUser):", error);
      throw new Error("Failed to delete user");
    }
  }

  async changeUserRole(id: number, role: string): Promise<User> {
    try {
      const user = await userRepository.findOne({ where: { id_users: id } });
      if (!user) throw new Error(`The user with the id ${id} does not exist`);

      user.role = role as any; //para que typscript no llore

      await userRepository.save(user);

      return user;
    } catch (error) {
      console.error("Error in UserService.changeUserRole:", error);
      throw new Error("Failed to change user role.");
    }
  }

  async updateUserInfo(id: number, data: Partial<any>): Promise<User> {
    try {
      const user = await userRepository.findOne({ where: { id_users: id } });
      if (!user) {
        throw new Error(`The user with the id ${id} does not exist`);
      }

      userRepository.merge(user, data); //guarda solo los campos que se pasan en el data
      await userRepository.save(user);

      return user;
    } catch (error) {
      console.error("Error in UserService.updateUserInfo:", error);
      throw new Error("Failed to change user information.");
    }
  }
}
