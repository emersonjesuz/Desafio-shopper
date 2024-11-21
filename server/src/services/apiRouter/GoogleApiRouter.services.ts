import { ServerError } from "../../helpers/Api-error";
import { ApiRouterService } from "./ApiRouter.services";
import axios, { AxiosError } from "axios";

export class GoogleApiRouterService implements ApiRouterService {
  async calculateRoute(destination: string, origin: string) {
    console.log(destination, origin);

    const body = {
      origin: {
        address: origin,
      },
      destination: {
        address: destination,
      },
      travelMode: "DRIVE",
    };

    const response = await axios
      .post("https://routes.googleapis.com/directions/v2:computeRoutes", body, {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.GOOGLE_API_KEY,
          "X-Goog-FieldMask":
            "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
        },
      })
      .catch((error: AxiosError) => {
        throw new ServerError(error.message);
      });
    console.log(response);

    return response.data;
  }
}
