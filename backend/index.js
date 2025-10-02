const argum = process.argv.slice(2);

//metodo para obtener los datos de la api
async function get() {
  try {
    const response = await fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => console.log(data));
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Consultas de todos los productos terminado.");
  }
}
//metodo para obtener los datos de un producto especifico api
async function getId(id) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => console.log(data));
  } catch (error) {
    console.error(error);
  } finally {
    console.log("consulta de un producto especifico terminado.");
  }
}
//metodo para crear un producto
async function post(data) {
  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  } catch (error) {
    console.error(error);
  }finally{
    console.log("Nuevo producto generado.");
  }
}
//metodo para eliminar un producto
async function deleteId(id) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`,
       {
      method: "DELETE"
      },
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  } catch (error) {
    console.error("Mi error "+error);
  } finally {
    console.log("Eliminación terminada.");
  }
}
//metodo que permite modificar un producto
async function put(data) {
  try {
    console.log(JSON.stringify(data));
    const response = await fetch(`https://fakestoreapi.com/products/${data.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  } catch (error) {
    console.error(error);
  }
}

//condicional para evaluar los argumentos ingresados por consola
if (argum[0] == "get") {
  if (argum[1].includes("/")) {
    let data = argum[1].split("/");
    if (data[0] == "products") {
      getId(data[1]);
    }
  } else if (argum[1] == "products") {
    get();
  }
} else if (argum[0] == "post") {
  if (argum[1] == "products") {
    let producto = {
      title: argum[2],
      price: parseFloat(argum[3]),
      description: argum[4],
      category: argum[5],
      image: argum[6],
    };
    post(producto);
  }
} else if (argum[0] == "put") {
  if (argum[1].includes("/")) {
    let data = argum[1].split("/");
    if (data[0] == "products") {
      let producto = {
        id: parseInt(data[1]),
        title: argum[2],
        price: parseFloat(argum[3]),
        description: argum[4],
        category: argum[5],
        image: argum[6],
      };
      put(producto);
    }
  }
} else if (argum[0] == "delete") {
  if (argum[1].includes("/")) {
  let id = argum[1].split("/");
  deleteId(id[1]);  
}
}
