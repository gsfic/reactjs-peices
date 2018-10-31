const express = require('express');
var cors = require('cors');

const app = express();
app.use(cors());
app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(customers);
});

const port = 8082;

app.listen(port, () => `Server running on port ${port}`);