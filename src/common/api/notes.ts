import { AxiosResponse } from "axios";
import { request } from ".";

export const getNote = (
  notePath: string,
): Promise<AxiosResponse<NoteResponse | null>> => {
  return request({
    url: `/note?notepath=${notePath}`,
    method: "get",
  });
};
