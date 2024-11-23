import { BadRequestError, ServerError } from "../../helpers/Api-error";
import { ApiRouterService } from "./ApiRouter.services";
import axios, { AxiosError } from "axios";

export class GoogleApiRouterService implements ApiRouterService {
  async calculateRoute(destination: string, origin: string) {
    const body = {
      origin: {
        address: origin,
      },
      destination: {
        address: destination,
      },
      travelMode: "DRIVE",
    };

    const { data } = await axios
      .post("https://routes.googleapis.com/directions/v2:computeRoutes", body, {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.GOOGLE_API_KEY,
          "X-Goog-FieldMask": "routes.legs",
        },
      })
      .catch((error: AxiosError) => {
        throw new ServerError(error.message);
      });

    if (!data.routes) {
      throw new BadRequestError(
        "Os dados fornecidos no corpo da requisição são inválidos",
        "INVALID_DATA"
      );
    }

    return data;
  }
}