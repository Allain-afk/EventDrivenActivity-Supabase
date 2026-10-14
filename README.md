# PostgreSQL Insert API with Supabase

## Setup
1. In Supabase, open **SQL Editor** and run [initialschema.sql](initialschema.sql).
2. Edit `.env` with your **Project URL** and **anon public key** (Project Settings → API).
3. `npm install`, then `npm run dev` (or `npm start`).

## Sample payload
```json
{
  "customerid": 1,
  "lastname": "Dela Cruz",
  "firstname": "Juan",
  "mobileno": "09171234567",
  "address": "123 Rizal St, Manila"
}
```

## Test 1: Express API (Postman)
- Method: `POST`
- URL: `http://localhost:3000/api/customer`
- Headers: `Content-Type: application/json`
- Body → raw → JSON: the sample payload above.
- Expected: `201 Created` with the inserted row. Missing required fields → `400`. Duplicate `customerid` → `400` with a duplicate-key message.

## Test 2: Supabase PostgREST directly (Postman)
- Method: `POST`
- URL: `https://YOUR-PROJECT-REF.supabase.co/rest/v1/customer`
- Headers:
  - `apikey: YOUR_SUPABASE_ANON_KEY`
  - `Authorization: Bearer YOUR_SUPABASE_ANON_KEY`
  - `Content-Type: application/json`
  - `Prefer: return=representation`
- Body → raw → JSON: the sample payload above.
- Expected: `201 Created` with the inserted row as an array.

## Test 3 (bonus): RPC stored function
- Method: `POST`
- URL: `https://YOUR-PROJECT-REF.supabase.co/rest/v1/rpc/insert_customer`
- Headers: same as Test 2.
- Body:
```json
{
  "p_customerid": 2,
  "p_lastname": "Santos",
  "p_firstname": "Maria",
  "p_mobileno": "09181234567",
  "p_address": "45 Mabini Ave, Quezon City"
}
```

## curl equivalent
```bash
curl -X POST http://localhost:3000/api/customer \
  -H "Content-Type: application/json" \
  -d '{"customerid":1,"lastname":"Dela Cruz","firstname":"Juan","mobileno":"09171234567","address":"123 Rizal St, Manila"}'
```
