CREATE TABLE IF NOT EXISTS public.customer (
  customerid INT PRIMARY KEY,
  lastname   VARCHAR(100) NOT NULL,
  firstname  VARCHAR(100) NOT NULL,
  mobileno   VARCHAR(20),
  address    TEXT
);

-- Disable RLS so API inserts work immediately (lab use only)
ALTER TABLE public.customer DISABLE ROW LEVEL SECURITY;

-- Make sure the anon/authenticated roles can write
GRANT SELECT, INSERT ON public.customer TO anon, authenticated;

-- BONUS: stored function callable via POST /rest/v1/rpc/insert_customer
CREATE OR REPLACE FUNCTION public.insert_customer(
  p_customerid INT,
  p_lastname   VARCHAR,
  p_firstname  VARCHAR,
  p_mobileno   VARCHAR DEFAULT NULL,
  p_address    TEXT DEFAULT NULL
)
RETURNS SETOF public.customer
LANGUAGE sql
AS $$
  INSERT INTO public.customer (customerid, lastname, firstname, mobileno, address)
  VALUES (p_customerid, p_lastname, p_firstname, p_mobileno, p_address)
  RETURNING *;
$$;
