function products() {
    document.getElementById('cardHeader').innerHTML = '<h5 class="text-white">Nuestros Productos</h5>';

    fetch('https://dummyjson.com/products')
        .then(response => response.json())
        .then(data => {
            let listProduct = `
          
       <button type="button" class="btn btn-outline-success" onclick="addProduct()">
       <i class="bi bi-bag-plus-fill"></i> agregar producto 
        </button>

        <div class="table-responsive  mt-3">
          <table class="table table-striped table-hover border-success">
            <thead class="table-success text-white">
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Descripción</th>
                <th>Imagen</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>`;

            data.products.forEach(product => {
                listProduct += `
          <tr>
            <td>${product.id}</td>
            <td class="fw-bold text-success">${product.title}</td>
            <td class="text-primary">$${product.price.toFixed(2)}</td>
            <td class="text-secondary">${product.description}</td>
            <td><img src="${product.images[0]}" class="img-thumbnail rounded shadow-sm" style="width: 60px;"></td>
            <td>
              <button class="btn btn-sm btn-outline-success" onclick="getProduct(${product.id})">Ver Detalles</button>
            </td>
          </tr>`;
            });

            listProduct += `</tbody></table></div>`;
            document.getElementById('info').innerHTML = listProduct;
        })
        .catch(error => {
            console.error('Error al obtener productos:', error);
            document.getElementById('info').innerHTML = '<p class="text-danger">Error al cargar productos</p>';
        });
}

function getProduct(idProduct) {
    fetch(`https://dummyjson.com/products/${idProduct}`)
        .then(response => response.json())
        .then(product => {
            const modalProduct = `
        <div class="modal fade" id="modalProduct" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header bg-success text-white">
                <h5 class="modal-title">Detalles del Producto</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body text-center">
                <div class="card shadow-sm border-success">
                  <img src="${product.images[0]}" class="card-img-top rounded mx-auto mt-3" style="width: 200px;">
                  <div class="card-body">
                    <h5 class="card-title text-success">${product.title}</h5>
                    <p class="card-text"><strong>Precio:</strong> $${product.price.toFixed(2)}</p>
                    <p class="card-text text-secondary">${product.description}</p>
                    <p class="card-text"><strong>Marca:</strong> ${product.brand}</p>
                    <p class="card-text"><strong>Disponibilidad:</strong> ${product.availabilityStatus}</p>
                    <p class="card-text"><strong>Política de devoluciones:</strong> ${product.returnPolicy}</p>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>`;

            document.getElementById('viewModal').innerHTML = modalProduct;
            const modal = new bootstrap.Modal(document.getElementById('modalProduct'));
            modal.show();
        })
        .catch(error => {
            console.error('Error al obtener el producto:', error);
            document.getElementById('info').innerHTML = '<h3 class="text-danger">No se encontró el producto</h3>';
        });
}

function addProduct(){
  const modalProduct = `
  <!-- Modal -->

  <div class="modal fade" id="showModalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-md">
  
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel"><i class="fa-solid fa-user-plus"></i> Agregar Producto</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

        <div class="modal-body">
          <div class="card">
              <div class="card-body">

                  <form id="formAddProcut">
                      <div class="row">
                          <div class="col">
                              <input type="text" id="title" class="form-control" placeholder="Nombre Producto" aria-label="title" required>
                          </div>
                          <div class="col">
                              <input type="text" id= "category" class="form-control" placeholder="Categoria" aria-label="category" required>
                          </div>
                      </div>

                      <div class="row mt-3">
                          <div class="col">
                              <input type="text" id="description" class="form-control" placeholder="Agrege una Descripccion Del Produccto" aria-label="title" required>
                          </div>
                          <div class="col">
                              <input type="number" id="price" class="form-control" placeholder="Precio Del Producto" aria-label="Last name" required>
                          </div>
                      </div>

                      <div class="row mt-3 ">
                          <div class="col text-center">
                              <button type="button" class="btn btn-success" onclick="saveProduct()">
                                  <i class="fa-solid fa-floppy-disk"></i> Guardar
                              </button>
                          </div>
                      </div> 

                  </form>
              </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>

      </div>
    </div>
  </div>
  `
  document.getElementById('viewModal').innerHTML = modalProduct
  const modal = new bootstrap.Modal(document.getElementById('showModalUser'))
  modal.show()
}

function saveProduct(){
  const form = document.getElementById('formAddProcut')
  if(form.checkValidity()){
      const title = document.getElementById('title').value
      const category = document.getElementById('category').value
      const description = document.getElementById('description').value
      const price = document.getElementById('price').value
      const product = {title, category, description, price}

      const REQRES_ENDPOINT = 'https://dummyjson.com/products/add'
      fetch(REQRES_ENDPOINT, {
          method: 'POST',
          headers: {
              'Content-type': 'application/json',
          },
          body: JSON.stringify(product)
      })
      .then((response) =>{
          return response.json().then(
              data => {
                  return {
                      status: response.status,
                      info: data
                  }
              }
          )
      })
      .then((result) =>{
          if(result.status === 201){
            console.log('producto agregado', result)
              document.getElementById('info').innerHTML = 
                  '<h3 class="text-success">El Producto se guardo correctamente </h3>'
          }
          else{
              document.getElementById('info').innerHTML = 
                  '<h3 class="text-danger">No se guardo el Producto en la Api</h3>'
          }
          const modalId = document.getElementById('showModalUser')
          const modal = bootstrap.Modal.getInstance(modalId)
          modal.hide()
      })
  }
  else{
      form.reportValidity()
  }
}