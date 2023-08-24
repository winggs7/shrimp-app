import axios from "axios";
import { User } from "../Model/user";
import { apiAxios } from "..";

export class AuthApi {
  static async login(email: string, password: string): Promise<User> {
    const response = await apiAxios.post("/user", { email, password });
    return response.data;
  }

  static async register(email: string, password: string): Promise<User> {
    const response = await apiAxios.post("/register", { email, password });
    return response.data;
  }

  static async refreshToken(refreshToken: string): Promise<string> {
    const response = await apiAxios.post("/refreshToken", { refreshToken });
    return response.data;
  }

  static async logout(): Promise<void> {
    localStorage.clear();
    return;
  }
}
