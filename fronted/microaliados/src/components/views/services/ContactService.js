import Axios from 'axios';
const contactService = {};

contactService.sendEmail = async (name, email, message) => {
  try {
    const data = {
      nombre: name,
      email: email,
      mensaje: message,
    };
    const res = Axios.post('/api/contact/', data);
    return res;
  } catch (error) {
    return error;
  }
};
export { contactService };
