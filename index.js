const express = require('express');
const supabaseClient = require('@supabase/supabase-js');

const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'));
app.use(express.json());

// Supabase credentials
const supabaseURL = 'https://uzvvghswcqkwvdjzptjl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6dnZnaHN3Y3Frd3ZkanpwdGpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3NDkwMTAsImV4cCI6MjA0ODMyNTAxMH0.V2x_SM1q66Upi7aS2QowSKlo07RTR57GkLeYRsb3jkk';
const supabase = supabaseClient.createClient(supabaseURL, supabaseKey);

app.get('/', (req, res) => {
  res.sendFile('public/WFHome.html', { root: __dirname });
});

// Route to get top 3 searched cities
app.get('/city_searches', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('city_searches') 
      .select('city_name, search_count')
      .order('search_count', { ascending: false })
      .limit(3);

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to increment search count or insert a new city
app.post('/city_searches', async (req, res) => {
  const { city_name } = req.body;

  if (!city_name) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    // Check if the city exists
    const { data: existingCity, error: selectError } = await supabase
      .from('city_searches')
      .select('id, search_count')
      .eq('city_name', city_name)
      .single();

    if (existingCity) {
      // Update search count
      const { error: updateError } = await supabase
        .from('city_searches')
        .update({ search_count: existingCity.search_count + 1 })
        .eq('id', existingCity.id);

      if (updateError) return res.status(400).json({ error: updateError.message });
      return res.status(200).json({ message: 'Search count updated successfully' });
    } else {
      // Insert new city
      const { error: insertError } = await supabase
        .from('city_searches')
        .insert([{ city_name, search_count: 1 }]);

      if (insertError) return res.status(400).json({ error: insertError.message });
      return res.status(201).json({ message: 'City added successfully' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});