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
    console.log("Proceso terminado.");
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
    console.log("Proceso terminado.");
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
      image: argum[5],
      category: argum[6],
    };
    post(producto);
  }
}

if (argum[0] == "put") {
  let data = argum[1].split("/");
  console.log(data);
  let id = data[0].split("=");
}

if (argum[0] == "delete") {
  let id = argum[1].split("=");
  console.log(id);
}
