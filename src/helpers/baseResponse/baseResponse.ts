interface BaseResponseInterface {
  code: number;
  data: any;
  message: string;
}

export const baseResponse = (
  code: number,
  data: any,
  message: string
): BaseResponseInterface => {
  return { code, data, message };
};
