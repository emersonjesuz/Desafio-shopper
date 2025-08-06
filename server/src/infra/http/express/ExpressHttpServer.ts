import { IHttpServer } from "../../../interface/http/IHttpServer";
import express, { Response, Request } from "express";
import cors from "cors";
export class ExpressHttpServer implements IHttpServer {
  private app = express();

  constructor() {
    this.app.use(cors());
    this.app.use(express.json());
  }
  register(
    method: "get" | "post" | "put" | "delete",
    path: string,
    handler: (params: any, body: any, query: any) => Promise<any>
  ): void {
    this.app[method](path, async (req: Request, res: Response) => {
      try {
        const result = await handler(req.params, req.body, req.query);
        res.json(result);
      } catch (error: any) {
        res.status(error.code || 500).json({ error: error.message || "Internal Server Error" });
      }
    });
  }
  listen(port: number): void {
    this.app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
  }
}
