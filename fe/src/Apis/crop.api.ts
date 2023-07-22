import axios from "axios";
import { Crop, CreateCrop, updateCrop, CropStat } from "../Model/crop";
import { Stat } from "../Model/stat";
import { CreateHistory, History } from "../Model/history";

export class CropApi {
  static async getAllCropsByPondId(id: string): Promise<Crop[]> {
    const response = await axios.get("crop/pond/" + id);
    return response.data;
  }

  static async getCropById(id: string): Promise<Crop | void> {
    const response = await axios.get("crop/" + id);
    return response.data;
  }

  static async getStatCrop(id: string): Promise<CropStat[]> {
    const response = await axios.get("crop/stat/" + id);
    return response.data;
  }

  static async createCrop(payload: CreateCrop): Promise<Crop | void> {
    const response = await axios.post("crop/", payload);
    return response.data;
  }

  static async deleteCrop(id: string): Promise<boolean | void> {
    const response = await axios.delete("crop/" + id);
    return response.data;
  }

  static async updateCrop(payload: updateCrop): Promise<boolean | void> {
    const { id, ...data } = payload;
    const response = await axios.put("crop/" + id, data);
    return response.data;
  }

  static async createStatCrop(payload: {
    id: string;
    statIds: string;
  }): Promise<boolean | void> {
    const response = await axios.post("crop/stat/" + payload.id, {
      statIds: payload.statIds,
    });
    return response.data;
  }

  static async getCropHistory(id: string): Promise<History[]> {
    const response = await axios.get("crop/history/all/" + id);
    return response.data;
  }

  static async getCropHistoryById(id: string): Promise<History | void> {
    const response = await axios.get("crop/history/" + id);
    return response.data;
  }

  static async createCropHistory(
    payload: CreateHistory
  ): Promise<boolean | void> {
    const response = await axios.post("crop/history", payload);
    return response.data;
  }

  static async deleteCropHistory(id: string): Promise<boolean | void> {
    const response = await axios.delete("crop/history/" + id);
    return response.data;
  }
}
