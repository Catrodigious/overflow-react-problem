import axios from "axios";

const baseUrl = "https://api.stage.overflow.co/api/";

export const getCampaigns = async () => {
  try {
    const response = await axios.get(
      baseUrl + "institution/public/vive_church"
    );
    return response?.data?.campaigns;
  } catch (e) {
    return e;
  }
};
