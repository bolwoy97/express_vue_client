module.exports = {
    API_URL:(process.env.NODE_ENV === "production")
    ? 'https://guarded-fjord-13035.herokuapp.com/'
    : 'http://localhost:3000/',
};