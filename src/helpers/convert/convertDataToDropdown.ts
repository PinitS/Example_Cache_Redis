import _ from "lodash";

interface ConvertDataToDropdownInterface {
  [index: number]: { value: number; label: string };
}
export const convertDataToDropdown = async (
  data
): Promise<ConvertDataToDropdownInterface> => {
  const dropdownData = _.map(data, (item) => {
    return { value: item.id, label: item.name };
  });
  return dropdownData;
};
