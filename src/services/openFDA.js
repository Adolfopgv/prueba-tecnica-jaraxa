import axios from "axios";

const BASE_URL_LABELING = "https://api.fda.gov/drug/label.json";
const BASE_URL_NDC = "https://api.fda.gov/drug/ndc.json";

export const getLabeling = async (query, limit, skip) => {
  try {
    const response = await axios.get(BASE_URL_LABELING, {
      params: {
        search: query ? `openfda.brand_name:${query}` : "",
        limit,
        skip,
      },
    });
    const filteredData = response.data.results.filter(
      (item) => item.openfda?.product_ndc
    );
    return filteredData;
  } catch (error) {
    console.error("Labeling Error: ", error);
  }
};

export const getDrugDetails = async (ncd) => {
  try {
    const response = await axios.get(
      `${BASE_URL_NDC}?search=product_ncd:${ncd}`
    );
    return response.data.results[0];
  } catch (error) {
    console.error("Details Error: ", error);
  }
};
