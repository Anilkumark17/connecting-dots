import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://irwphkvoaunvnenpgiam.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlyd3Boa3ZvYXVudm5lbnBnaWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ3MjQxOTgsImV4cCI6MjAyMDMwMDE5OH0.Lt9BUQLyqQMlVUOd-2FNyUOl3pUu6i4ij_Jk8qdCMNU'
export const supabase = createClient(supabaseUrl, supabaseKey)

