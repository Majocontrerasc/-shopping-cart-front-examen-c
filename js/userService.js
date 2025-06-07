function users() {
    document.getElementById('cardHeader').innerHTML = '<h5 class="text-white">Lista de Usuarios</h5>';
    const FAKESTORE_ENDPOINT = 'https://dummyjson.com/users';

    fetch(FAKESTORE_ENDPOINT, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            console.log('Usuarios:', data);

            let listUser = `
            <div class="table-responsive">
                <table class="table table-striped table-hover border-success">
                    <thead class="table-success text-white">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">firstName</th>
                            <th scope="col">lastName</th>
                            <th scope="col">maidenName</th>
                            <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>`;

            data.users.forEach(user => {
                listUser += `
                    <tr>
                        <td>${user.id}</td>
                        <td class="text-primary">${user.firstName}</td>
                        <td class="fw-bold text-success">${user.lastName}</td>
                        <td class="text-secondary">${user.maidenName}</td>
      
                        <td>
                            <button type="button" class="btn btn-sm btn-outline-success" onclick="getUser(${user.id})">
                                Ver Detalles
                            </button>
                        </td>
                    </tr>`;
            });

            listUser += `
                    </tbody>
                </table>
            </div>`;

            document.getElementById('info').innerHTML = listUser;
        })
        .catch(error => {
            console.error('Error al obtener los usuarios:', error);
            document.getElementById('info').innerHTML = '<p class="text-danger">Error al cargar usuarios</p>';
        });
}

function getUser(idUser) {
    const FAKESTORE_ENDPOINT = `https://dummyjson.com/users/${idUser}`;

    fetch(FAKESTORE_ENDPOINT, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            console.log('Usuario:', data);
            
            const modalUser = `
            <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header bg-success text-white">
                            <h5 class="modal-title">Detalles del Usuario</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                        </div>
                        <div class="modal-body text-center">
                            <div class="card shadow-sm border-success">
                                <img src="${data.image}" class="card-img-top rounded-circle mx-auto mt-3" style="width: 150px;" alt="Avatar">
                                <div class="card-body">
                                    <h5 class="card-title text-success">${data.name}</h5>
                                    <p class="card-text"><strong>Correo:</strong> ${data.email}</p>
                                    <p class="card-text"><strong>Rol:</strong> ${data.role}</p>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>`;

            document.getElementById('viewModal').innerHTML = modalUser;
            const modal = new bootstrap.Modal(document.getElementById('modalUser'));
            modal.show();
        })
        .catch(error => {
            console.error('Error al obtener el usuario:', error);
            document.getElementById('info').innerHTML = '<h3 class="text-danger">No se encontró el usuario en la API</h3>';
        });
}