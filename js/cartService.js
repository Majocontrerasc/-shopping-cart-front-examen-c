function showShoppingCarts() {
    document.getElementById('cardHeader').innerHTML = '<h5 class="text-white"> Sección de Carritos de Compras</h5>';

    fetch('https://dummyjson.com/carts')
        .then(res => res.json())
        .then(data => {
            console.log('Carritos:', data);

            let cartsHtml = '';

            data.carts.forEach(cart => {
                cartsHtml += `
        <div class="mb-5 p-3 border rounded shadow-sm bg-light">
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

function name(params) {
  
}