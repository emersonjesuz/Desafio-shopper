export interface IHttpServer {
  register(
    method: "get" | "post" | "put" | "delete",
    path: string,
    handler: (params: any, body: any, query: any) => Promise<any>
  ): void;
  listen(port: number): void;
}

//  e para usar token
