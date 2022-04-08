interface ResponseInterface {
  code: number;
  message: string;
}
interface MapResCodeInterface {
  [key: string]: ResponseInterface;
}

export const mapResCode: MapResCodeInterface = {
  success: {
    code: 50200,
    message: "Success",
  },
  unauthorizedAuth: {
    code: 50401,
    message: "Unauthorized Auth Token",
  },
  unauthorizedSecret: {
    code: 50402,
    message: "Unauthorized Secret Token",
  },
  duplicateUnique: {
    code: 50403,
    message: "Duplicate Unique",
  }
};
