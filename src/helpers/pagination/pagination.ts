import _ from "lodash";

interface ValidatePaginationInterface {
  page: number;
  size: number;
}

export const validatePagination = (
  reqPage: any,
  reqSize: any
): ValidatePaginationInterface => {
  const pageNumber: number = parseInt(reqPage);
  const pageSize: number = parseInt(reqSize);
  let page: number = 1;
  let size: number = 20;
  if (!_.isNaN(pageNumber) || pageNumber > 0) {
    page = pageNumber;
  }
  if (!_.isNaN(pageSize) || pageSize > 0 || pageSize < 100) {
    size = pageSize;
  }
  return { page, size };
};

export const calTotalPage = (pageCount: number, pageSize: number) => {
  return Math.ceil(pageCount / pageSize);
};
