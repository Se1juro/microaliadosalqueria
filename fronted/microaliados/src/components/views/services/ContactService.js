import Axios from 'axios';
const contactService = {};

contactService.sendEmail = async (name, email, message) => {
  try {
    const data = {
      nombre: name,
      email: email,
      mensaje: message,
    };
    const res = Axios.post('http://localhost:4000/contact/', data);
    return res;
  } catch (error) {
    return error;
  }
};
export { contactService };
