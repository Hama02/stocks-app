import axios from "axios";

const token = "cf1deq2ad3ie671iu5qgcf1deq2ad3ie671iu5r0";

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token,
  },
});
