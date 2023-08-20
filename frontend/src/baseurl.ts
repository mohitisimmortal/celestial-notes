const isProduction = process.env.IS_PRODUCTION;
let baseurl:string;

if (isProduction) {
  baseurl = 'https://celestial-notes-backend.vercel.app/user';
} else {
  baseurl = 'http://localhost:3000/user';
}

export default baseurl;