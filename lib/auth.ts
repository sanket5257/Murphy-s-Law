import { supabase } from './supabase'

export async function checkAuth() {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error signing out:', error)
    throw error
  }
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
