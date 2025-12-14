import { IStat, mockData } from "@/components/Stat/Stat";
import { axiosInstance } from "../../../../api";

export const fetchBasicStats = async (pollId: string) => {
  const { data: pollStat } = await axiosInstance.get<IStat>(
    `/polls/${pollId}/basicStat`
  );
  return pollStat;
};
