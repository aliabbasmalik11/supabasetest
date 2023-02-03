/* eslint-disable no-unused-vars */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
          desciption: string | null
          last_name: string | null
          company: string | null
          is_available_to_hire: boolean
          is_private_account: boolean
          allow_commenting: boolean
          allow_mentions: boolean
        }
        Insert: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
          desciption: string | null
          last_name: string | null
          company: string | null
          is_available_to_hire: boolean
          is_private_account: boolean
          allow_commenting: boolean
          allow_mentions: boolean
        }
        Update: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
          desciption: string | null
          last_name: string | null
          company: string | null
          is_available_to_hire: boolean
          is_private_account: boolean
          allow_commenting: boolean
          allow_mentions: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

