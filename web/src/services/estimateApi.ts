import { API } from "./axios";

export async function estimateApi(
  customer_id: string,
  origin: string,
  destination: string,
) {
  return await API.post("/ride/estimate", { customer_id, origin, destination });
}
