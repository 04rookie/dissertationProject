export default function AuthHeader() {
    const token = JSON.parse(localStorage.getItem('userID'));
    if (token) {
      // for Node.js Express back-end
      return { Authorization: 'Bearer ' + token};
    } else {
      return {};
    }
  }