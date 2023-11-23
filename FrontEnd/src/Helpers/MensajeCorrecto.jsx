import Swal from "sweetalert2";
const mensajeCorrecto = (title, text) => {
  Swal.fire({
    title,
    text,
    icon: "success",
  });
};

export default mensajeCorrecto;
