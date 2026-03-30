export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const SUPABASE_URL = 'https://backend.nuasmartrestaurant.com';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE';

  try {
    const payload = {
      codigo: req.body.codigo,
      agencia: req.body.agencia,
      ip: req.body.ip,
      dispositivo: req.body.dispositivo,
      user_agent: req.body.user_agent,
      pantalla: req.body.pantalla,
      pagina: req.body.pagina
    };

    // Add optional fields if present
    if (req.body.tipo) payload.tipo = req.body.tipo;
    if (req.body.version) payload.version = req.body.version;
    if (req.body.duracion_segundos) payload.duracion_segundos = req.body.duracion_segundos;
    if (req.body.duracion_minutos) payload.duracion_minutos = req.body.duracion_minutos;

    const response = await fetch(SUPABASE_URL + '/rest/v1/accesos_memorandum', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(500).json({ error: err });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
