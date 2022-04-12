const baseUrl =
  process.env.REACT_APP_MODE === "dev" ? "http://localhost:4000/v1/api" : null;

export default baseUrl;
