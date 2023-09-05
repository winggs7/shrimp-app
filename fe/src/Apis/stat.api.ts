import axios from "axios";
import { Stat } from "../Model/stat";
import { apiAxios } from "../utils/axios";

export class StatApi {
  static async updateStat(payload: Stat): Promise<Stat> {
    const response = await apiAxios.put("stat/", payload);
    return response.data;
  }

  static async getStatById(id: string): Promise<Stat[]> {
    const response = await apiAxios.get("stat/" + id);
    return response.data;
  }

  static async getAllStats(): Promise<Stat[]> {
    const response = await apiAxios.get("stat");
    return response.data;
  }
}
