// javascript/supabase-conexion.js
const supabaseUrl = 'https://tbhburqcetzhffdridyp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiaGJ1cnFjZXR6aGZmZHJpZHlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2Nzg4MDAsImV4cCI6MjA5MjI1NDgwMH0.haeivcNDkuQRr0m1vnGlPegtayi68Y4GCB0X9r_uzS0'

window.supabaseClient = supabase.createClient(supabaseUrl, supabaseAnonKey);

console.log("Conexión con Supabase preparada");