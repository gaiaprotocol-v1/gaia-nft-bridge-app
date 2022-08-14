const DEV_MODE = true;

export default DEV_MODE ? {
    apiURI: "https://localhost:1023",
} : {
    apiURI: "https://api.gaiabridge.com",
};
