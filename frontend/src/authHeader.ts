export default function authHeader() {
  // const user = JSON.parse(localStorage.getItem('user') as any);

  // if (user && user.accessToken) {
  //   // for Node.js Express back-end
  //   return { 'x-refresh-token': user.accessToken };
  // } else {
  //   return {};
  // }

  const user = JSON.parse(localStorage.getItem('refreshToken') as any)
  
  if (user) {
    // for Node.js Express back-end
    return { 'x-refresh-token': user };
  } else {
    return {};
  }
}
