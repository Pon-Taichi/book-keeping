export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      accounts: {
        Row: {
          id: number
          name: string
          type: Database["public"]["Enums"]["account_type"]
        }
        Insert: {
          id?: number
          name: string
          type: Database["public"]["Enums"]["account_type"]
        }
        Update: {
          id?: number
          name?: string
          type?: Database["public"]["Enums"]["account_type"]
        }
        Relationships: []
      }
      credit_entries: {
        Row: {
          account_id: number
          amount: number
          created_at: string | null
          id: number
          journal_entry_id: number
          summary: string | null
          updated_at: string | null
        }
        Insert: {
          account_id: number
          amount: number
          created_at?: string | null
          id?: number
          journal_entry_id: number
          summary?: string | null
          updated_at?: string | null
        }
        Update: {
          account_id?: number
          amount?: number
          created_at?: string | null
          id?: number
          journal_entry_id?: number
          summary?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "credit_entries_account_id_fkey"
            columns: ["account_id"]
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credit_entries_journal_entry_id_fkey"
            columns: ["journal_entry_id"]
            referencedRelation: "journal_entries"
            referencedColumns: ["id"]
          }
        ]
      }
      debit_entries: {
        Row: {
          account_id: number
          amount: number
          created_at: string | null
          id: number
          journal_entry_id: number
          summary: string | null
          updated_at: string | null
        }
        Insert: {
          account_id: number
          amount: number
          created_at?: string | null
          id?: number
          journal_entry_id: number
          summary?: string | null
          updated_at?: string | null
        }
        Update: {
          account_id?: number
          amount?: number
          created_at?: string | null
          id?: number
          journal_entry_id?: number
          summary?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "debit_entries_account_id_fkey"
            columns: ["account_id"]
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "debit_entries_journal_entry_id_fkey"
            columns: ["journal_entry_id"]
            referencedRelation: "journal_entries"
            referencedColumns: ["id"]
          }
        ]
      }
      journal_entries: {
        Row: {
          created_at: string | null
          date: string
          id: number
          partner: string
          summary: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: number
          partner: string
          summary?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: number
          partner?: string
          summary?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      journal_entries_test: {
        Row: {
          created_at: string | null
          date: string
          id: number
          partner: string
          summary: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: number
          partner: string
          summary?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: number
          partner?: string
          summary?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      journal_entries_tmp: {
        Row: {
          account_id: number | null
          amount: number | null
          created_at: string | null
          date: string | null
          id: number | null
          partner: string | null
          summary: string | null
          type: Database["public"]["Enums"]["journal_entry_type"] | null
          updated_at: string | null
        }
        Insert: {
          account_id?: number | null
          amount?: number | null
          created_at?: string | null
          date?: string | null
          id?: number | null
          partner?: string | null
          summary?: string | null
          type?: Database["public"]["Enums"]["journal_entry_type"] | null
          updated_at?: string | null
        }
        Update: {
          account_id?: number | null
          amount?: number | null
          created_at?: string | null
          date?: string | null
          id?: number | null
          partner?: string | null
          summary?: string | null
          type?: Database["public"]["Enums"]["journal_entry_type"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      test_tenant: {
        Row: {
          details: string | null
          id: number
        }
        Insert: {
          details?: string | null
          id?: number
        }
        Update: {
          details?: string | null
          id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_journal_entry:
        | {
            Args: {
              param: Json
            }
            Returns: undefined
          }
        | {
            Args: Record<PropertyKey, never>
            Returns: undefined
          }
    }
    Enums: {
      account_type: "asset" | "liability" | "equity" | "revenue" | "expense"
      journal_entry_type: "debit" | "credit"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

