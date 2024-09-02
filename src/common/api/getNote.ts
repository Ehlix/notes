import { AxiosResponse } from "axios";
import { request } from ".";

let controller: null | AbortController = null;

export const getNote = (
  notePath: string,
): Promise<AxiosResponse<NoteResponse | null>> => {
  controller?.abort();
  controller = new AbortController();
  return request(
    {
      url: `/note?notepath=${notePath}`,
      method: "get",
    },
    controller,
  );
};
