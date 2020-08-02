import Swal from "sweetalert2";
import axios from "axios";

const userService = {}
const state = {
  token: localStorage.getItem("token")
}
userService.deleteUser = async (id, fn) => {

  Swal.fire({
    title: '¿Estas seguro de eliminar este producto?',
    text: 'Esta accion puede no ser irreversible',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#dd3333',
    confirmButtonText: 'Si, eliminalo',
  }).then(async (result) => {
    if (result.value) {
      try {
        const res = await axios.put('http://localhost:4000/usuarios/delete/' + id, "", {
          headers: {
            Authorization: 'Bearer ' + state.token,
          },
        });
        if (res.status === 200) {
          await Swal.fire({
            title: 'Eliminado',
            text: 'El usuario ha sido eliminado',
            icon: 'success',
            timer: 2000
          }).then(fn());
        } else {
          await Swal.fire({
            icon: 'error',
            title: 'Algo salio mal',
            text: 'No pudimos eliminar el usuario',
            timer: 2000
          });
        }
      } catch (error) {
        await Swal.fire({
          icon: 'error',
          title: 'Algo salio mal',
          text: 'No pudimos eliminar el usuario',
          timer: 2000
        });
      }
    }
  });
};
userService.getUsers = async (viewAllUsers) => {
  let res;
  if (!viewAllUsers) {
    res = await axios.get("http://localhost:4000/usuarios/disponibles", {
      headers: {
        Authorization: 'Bearer ' + state.token
      }
    })
  } else {
    res = await axios.get("http://localhost:4000/usuarios", {
      headers: {
        Authorization: 'Bearer ' + state.token
      }
    })
  }
  return ({usuarios: res.data, loading: false})
}
userService.searchByCode = async (code) => {
  if (!code) {
    await Swal.fire({
      icon: 'error',
      title: 'Algo salio mal',
      text: 'No pudimos encontrar el usuario',
      timer: 2000
    });
  } else {
    try {
      const res = await axios.get("http://localhost:4000/usuarios/" + code, {
        headers: {
          Authorization: 'Berer ' + state.token
        }
      })
      if (res.status===200){
        return res.data
      }else{
        await Swal.fire({
          icon: 'error',
          title: 'Algo salio mal',
          text: 'No pudimos eliminar el usuario',
          timer: 2000
        });
      }
    } catch (e) {
      await Swal.fire({
        icon: 'error',
        title: 'Algo salio mal',
        text: 'No pudimos encontrar el usuario',
        timer: 2000
      });
    }
  }
}
userService.makeMicroaliado = async (code,fn)=>{
  if (!code || code===''){
    await Swal.fire({
      icon: 'error',
      title: 'Algo salio mal',
      text: 'No ejecutar la tarea, comunicate con el administrador',
      timer: 2000
    });
  }else{
    try {
      const res=await axios.post("http://localhost:4000/usuarios/convert/"+code,null,{
        headers:{
          Authorization:'Bearer '+state.token
        }
      })
      if(res.status===200){
        await Swal.fire({
          title: 'Exitoso',
          text: 'Funcion ejecutada con exito',
          icon: 'success',
          timer: 2000
        }).then(fn());
      }
    }catch (e) {
      await Swal.fire({
        icon: 'error',
        title: 'Algo salio mal',
        text: 'No ejecutar la tarea, comunicate con el administrador',
        timer: 2000
      });
    }
  }
}

export {userService};