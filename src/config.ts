const isProduction = process.env.NODE_ENV === "production";

const Config = {
    BASE_URL: isProduction ? "https://where-is-my-pet.herokuapp.com" : "http://localhost:3000",
}

export default Config;