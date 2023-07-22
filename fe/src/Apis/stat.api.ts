import axios from "axios";
import { Stat } from "../Model/stat";

export class StatApi {
  static async updateStat(payload: Stat): Promise<Stat | void> {
    const response = await axios.put("stat/", payload);
    return response.data;
  }

  static async getStatById(id: string): Promise<Stat[]> {
    const response = await axios.get("stat/" + id);
    return response.data;
  }

  static async getAllStats(): Promise<Stat[]> {
    const response = await axios.get("stat");
    return response.data;
  }
}
