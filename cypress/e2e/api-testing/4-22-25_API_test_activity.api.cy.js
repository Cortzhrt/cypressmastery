const order = {
  id: 9,
  petId: 12345,
  quantity: 1,
  shipDate: new Date().toISOString(),
  status: 'placed',
  complete: true,
};

describe('Store API Tests', () => {
  // Step 1: GET store inventory
  it('GET - Get store inventory', () => {
    cy.api({
      method: 'GET',
      url: '/store/inventory', // The inventory endpoint
      headers: {
        accept: 'application/json', // Matching the cURL -H 'accept: application/json'
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('object'); // Ensure the response body is an object
    });
  });

  // Step 2: POST - Place an order for a pet
  it('POST - Place an order for a pet', () => {
    cy.api({
      method: 'POST',
      url: '/store/order',
      headers: {
        accept: 'application/json', // Header for accepting JSON
        'Content-Type': 'application/json', // Header for sending JSON
      },
      body: order,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', order.id); // Check order id
      expect(response.body).to.have.property('status', order.status); // Check order status
    });
  });

  // Step 3: GET - Get the order by ID
  it('GET - Get order by ID', () => {
    const orderId = 9; // Example order ID to fetch
    cy.api({
      method: 'GET',
      url: `/store/order/${orderId}`,
      headers: {
        accept: 'application/json', // Header for accepting JSON
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', orderId); // Check the order ID
    });
  });

  // Step 4: DELETE - Delete order by ID
  it('DELETE - Delete order by ID', () => {
    cy.api({
      method: 'DELETE',
      url: `/store/order/${order.id}`,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});

describe('User API Tests', () => {
  const user = {
    id: 1,
    username: 'janedoe',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    password: 'mySecret123',
    phone: '9876543210',
    userStatus: 1,
  };

  it('POST - Create a new user', () => {
    cy.api({
      method: 'POST',
      url: '/user',
      body: user,
    }).then((response) => {
      expect(response.status).to.eq(200)
    });
  });

  const altusers = [
    {...user, username: 'user1', id: 2},
    {...user, username: 'user2', id: 3},
  ]

  it('POST - Create a new user', () => {
    cy.api({
      method: 'POST',
      url: '/user/createWithList',
      body: user,
    }).then((response) => {
      expect(response.status).to.eq(200)
    });
  });

  it('POST - Create a new user', () => {
    cy.api({
      method: 'POST',
      url: '/user/createwithArray',
      body: user,
    }).then((response) => {
      expect(response.status).to.eq(200)
    });
  });

  it('GET - Get user by username', () => {
    cy.api({
      method: 'GET',
      url: `/user/${user.username}`,
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('username', user.username)
    });
  });

  it('PUT - Update user username', () => {
    const updatedUser = { ...user, username: 'updated_username' }; // Update the username

    cy.api({
      method: 'PUT',
      url: `/user/${user.username}`,
      body: updatedUser, 
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(JSON.stringify(response.body));
    });
  });


  it('GET - Log user in', () => {
    cy.api({
      method: 'GET',
      url: `/user/login?username=${user.username}&password=${user.password}`,
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('code', 200)
    })
  })

  it('GET - Log user out', () => {
    cy.api({
      method: 'GET',
      url: '/user/logout',
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('code', 200)
    })
  })


  it('DELETE - Delete user by username', () => {
    cy.api({
      method: 'DELETE',
      url: `/user/${user.username}`,
    }).then((response) => {
      expect(response.status).to.eq(200)
    });
  });

})
