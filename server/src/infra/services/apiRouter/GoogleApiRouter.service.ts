import axios from "axios";
import { BadRequestError } from "../../../interface/http/errors/Api-error";
import { ApiRouterService } from "./ApiRouter.service";

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
      languageCode: "pt-BR",
      units: "metric",
    };

    const { data } = await axios
      .post("https://routes.googleapis.com/directions/v2:computeRoutes", body, {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.GOOGLE_API_KEY,
          "X-Goog-FieldMask": "routes.legs",
        },
      })
      .catch(() => {
        throw new BadRequestError("Os dados fornecidos no corpo da requisição são inválidos", "INVALID_DATA");
      });

    if (!data.routes) {
      throw new BadRequestError("Os dados fornecidos no corpo da requisição são inválidos", "INVALID_DATA");
    }

    if (!data.routes[0].legs) {
      throw new BadRequestError("Os dados fornecidos no corpo da requisição são inválidos", "INVALID_DATA");
    }

    return {
      origin: data.routes[0].legs[0].startLocation.latLng,
      destination: data.routes[0].legs[0].endLocation.latLng,
      distance: data.routes[0].legs[0].distanceMeters,
      duration: data.routes[0].legs[0].duration,
      routeResponse: data,
    };
  }
}
