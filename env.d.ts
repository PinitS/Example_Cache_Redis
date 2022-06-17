declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_HOST: string;
    DATABASE_NAME: string;
    DATABASE_USER: string;
    DATABASE_PASS: string;
    SOCKET_IO_PORT:number;
    DATABASE_CONNECTION: enum;
    DATABASE_PORT: number;
    SERVER_SECRET_TOKEN: string;
    END_POINT_CLIENT: string;
  }
}
