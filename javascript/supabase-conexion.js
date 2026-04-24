import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://e925fc0e-4d2c-4d15-ba78-3815c618a8e1.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiaGJ1cnFjZXR6aGZmZHJpZHlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2Nzg4MDAsImV4cCI6MjA5MjI1NDgwMH0.haeivcNDkuQRr0m1vnGlPegtayi68Y4GCB0X9r_uzS0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)