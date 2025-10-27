import { IStat, mockData } from "@/components/Stat/Stat";
import { axiosInstance } from "../../../../api";

export const fetchStats = async (pollId: string) => {
  const { data: pollStat } = await axiosInstance.get<IStat>(`/`);
};
