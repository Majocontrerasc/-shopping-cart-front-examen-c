function showShoppingCarts() {
  document.getElementById('cardHeader').innerHTML = '<h5 class="text-white"> Sección de Carritos de Compras</h5>';

  fetch('https://dummyjson.com/carts')
    .then(res => res.json())
    .then(data => {
      console.log('Carritos:', data);

      let cartsHtml = '';

      data.carts.forEach(cart => {
        cartsHtml += `

        <button type="button" class="btn btn-outline-success" onclick="addProduct()">
        add
         </button>

        <div class="mb-5 p-3 border rounded shadow-sm bg-light mt-3">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="text-primary m-0"> Carrito #${cart.id}</h5>
            <span class="badge bg-dark text-white"> Usuario: ${cart.userId}</span>
          </div>
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        `;

        cart.products.forEach(product => {
          cartsHtml += `
          <div class="col">
            <div class="card h-100 border-0 shadow-sm">
              <div class="row g-0">
                <div class="col-4 d-flex align-items-center justify-content-center p-2">
                  <img src="${product.thumbnail}" alt="${product.title}" class="img-fluid rounded" style="max-height: 100px;">
                </div>
                <div class="col-8">
                  <div class="card-body p-2">
                    <h6 class="card-title text-success">${product.title}</h6>
                    <p class="card-text mb-1"><strong>Precio:</strong> $${product.price}</p>
                    <p class="card-text mb-1"><strong>Cantidad:</strong> ${product.quantity}</p>
                    <p class="card-text mb-1"><strong>Total:</strong> $${product.total.toFixed(2)}</p>
                    <p class="card-text text-muted small">Descuento: $${product.discountedTotal.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          `;
        });

        cartsHtml += `
          </div>
          <hr>
          <div class="mt-2 d-flex justify-content-end">
            <span class="me-3 fw-bold"> Total sin descuento: $${cart.total.toFixed(2)}</span>
            <span class="fw-bold text-success"> Total con descuento: $${cart.discountedTotal.toFixed(2)}</span>
          </div>
        </div>
        `;
      });

      document.getElementById('info').innerHTML = cartsHtml;
    })
    .catch(error => {
      console.error('Error al cargar los carritos:', error);
      document.getElementById('info').innerHTML = '<p class="text-danger">Ocurrió un error al cargar los carritos.</p>';
    });
}

function createCarrito() {
  const modalCarrito = `
<!-- Modal -->
<div class="modal fade" id="modalCarrito" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-success text-white">
                <h5 class="modal-title fs-5" id="exampleModalLabel">Crear Carrito</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <form id="formCreateCarrito">
                            <div class="row g-3">
                                <div class="col">
                                    <input type="text" class="form-control" id="name" placeholder="id" required>
                                </div>
                                <div class="col">
                                    <input type="url" class="form-control" id="title" placeholder="title" required>
                                </div>
                                <div class="col">
                                    <input type="url" class="form-control" id="price" placeholder="price" required>
                                </div>
                                <div class="col">
                                    <input type="url" class="form-control" id="quantity" placeholder="quantity" required>
                                </div>
                                <div class="col">
                                    <input type="url" class="form-control" id="total" placeholder="total" required>
                                </div>
                                <div class="col">
                                    <input type="url" class="form-control" id="discountPercentage" placeholder="discountPercentage" required>
                                </div>
                                <div class="col">
                                    <input type="url" class="form-control" id="discountedPrice" placeholder="discountedPrice" required>
                                </div>
                            </div>
                            
                            <div class="text-end mt-4">
                                <button type="button" class="btn btn-success" onclick="saveCarrito()">Guardar</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
            `
  document.getElementById('viewModal').innerHTML = modalCarrito
  const modal = new bootstrap.Modal(
    document.getElementById('modalCarrito')
  )
  modal.show()
}
function saveCarrito() {
  const form = document.getElementById('formCreateCarrito')
  if (form.checkValidity()) {
    const id = document.getElementById('id').value
    const title = document.getElementById('title').value
    const price = document.getElementById('price').value
    const quantity = document.getElementById('quantity').value
    const total = document.getElementById('total').value
    const discountPercentage = document.getElementById('discountPercentage').value
    const discountedPrice = document.getElementById('discountedPrice').value



    const categoria = { id, title, price, quantity, total, discountPercentage, discountedPrice }

    const FAKEAPI_ENDPOINT = 'https://dummyjson.com/carts/add'
    fetch(FAKEAPI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',

      },
      body: JSON.stringify({
        userId: 1,
        products: [
          {
            id: 144,
            quantity: 4,

          },
          {
            id: 98,
            quantity: 1,
          }

        ]

      })

    })
      .then(response => response.json())

      .then((data) => {
        console.log("entra", data)

        document.getElementById('info').innerHTML =
          '<h3>Guardado exitosamente</h3>'



        const modalId = document.getElementById('modalCategoria')
        const modal = bootstrap.Modal.getInstance(modalId)
        modal.hide()

      })
      .catch(error => {
        console.error("Error:", error)
        document.getElementById('info').innerHTML =
          '<h3>Error al guardar la categoria</h3>'
      })
  }
  else {
    form.reportValidity()
  }
}

