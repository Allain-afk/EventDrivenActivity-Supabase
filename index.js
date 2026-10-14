require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

app.post('/api/customer', async (req, res) => {
  const { customerid, lastname, firstname, mobileno, address } = req.body || {};

  if (customerid === undefined || customerid === null || customerid === '' || !lastname || !firstname) {
    return res.status(400).json({
      error: 'customerid, lastname and firstname are required.',
    });
  }

  try {
    const { data, error } = await supabase
      .from('customer')
      .insert([{ customerid, lastname, firstname, mobileno, address }])
      .select();

    if (error) {
      // 23505 = duplicate key; other Postgres errors treated as bad request too
      const status = error.code && /^(23|22)/.test(error.code) ? 400 : 500;
      return res.status(status).json({ error: error.message });
    }

    return res.status(201).json({ message: 'Customer inserted', data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
