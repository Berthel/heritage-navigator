export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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
      cities: {
        Row: {
          bounds_ne_lat: number
          bounds_ne_lng: number
          bounds_sw_lat: number
          bounds_sw_lng: number
          country: string
          default_zoom: number
          description_da: string
          description_en: string
          description_pt: string
          id: string
          last_updated: string | null
          latitude: number
          longitude: number
          name_da: string
          name_en: string
          name_pt: string
          primary_image: string
          region: string | null
          status: string
        }
        Insert: {
          bounds_ne_lat: number
          bounds_ne_lng: number
          bounds_sw_lat: number
          bounds_sw_lng: number
          country: string
          default_zoom: number
          description_da: string
          description_en: string
          description_pt: string
          id: string
          last_updated?: string | null
          latitude: number
          longitude: number
          name_da: string
          name_en: string
          name_pt: string
          primary_image: string
          region?: string | null
          status: string
        }
        Update: {
          bounds_ne_lat?: number
          bounds_ne_lng?: number
          bounds_sw_lat?: number
          bounds_sw_lng?: number
          country?: string
          default_zoom?: number
          description_da?: string
          description_en?: string
          description_pt?: string
          id?: string
          last_updated?: string | null
          latitude?: number
          longitude?: number
          name_da?: string
          name_en?: string
          name_pt?: string
          primary_image?: string
          region?: string | null
          status?: string
        }
        Relationships: []
      }
      city_images: {
        Row: {
          city_id: string
          image_id: string
        }
        Insert: {
          city_id: string
          image_id: string
        }
        Update: {
          city_id?: string
          image_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "city_images_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "city_images_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "images"
            referencedColumns: ["id"]
          },
        ]
      }
      city_periods: {
        Row: {
          city_id: string
          period_id: string
        }
        Insert: {
          city_id: string
          period_id: string
        }
        Update: {
          city_id?: string
          period_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "city_periods_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "city_periods_period_id_fkey"
            columns: ["period_id"]
            isOneToOne: false
            referencedRelation: "periods"
            referencedColumns: ["id"]
          },
        ]
      }
      city_tags: {
        Row: {
          city_id: string
          tag_id: string
        }
        Insert: {
          city_id: string
          tag_id: string
        }
        Update: {
          city_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "city_tags_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "city_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      detail_sections: {
        Row: {
          content_da: string | null
          content_en: string | null
          content_pt: string | null
          gallery_images: string[] | null
          id: string
          image_layout: string | null
          order_number: number
          site_id: string
          type: string
        }
        Insert: {
          content_da?: string | null
          content_en?: string | null
          content_pt?: string | null
          gallery_images?: string[] | null
          id: string
          image_layout?: string | null
          order_number: number
          site_id: string
          type: string
        }
        Update: {
          content_da?: string | null
          content_en?: string | null
          content_pt?: string | null
          gallery_images?: string[] | null
          id?: string
          image_layout?: string | null
          order_number?: number
          site_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "detail_sections_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "heritage_sites"
            referencedColumns: ["id"]
          },
        ]
      }
      Favorite: {
        Row: {
          createdAt: string
          id: string
          siteId: string
          userId: string
        }
        Insert: {
          createdAt?: string
          id: string
          siteId: string
          userId: string
        }
        Update: {
          createdAt?: string
          id?: string
          siteId?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Favorite_siteId_fkey"
            columns: ["siteId"]
            isOneToOne: false
            referencedRelation: "Site"
            referencedColumns: ["id"]
          },
        ]
      }
      heritage_sites: {
        Row: {
          accessibility_da: string | null
          accessibility_en: string | null
          accessibility_pt: string | null
          address: string | null
          city_id: string
          description_da: string
          description_en: string
          description_pt: string
          id: string
          last_updated: string | null
          latitude: number
          longitude: number
          name_da: string
          name_en: string
          name_pt: string
          primary_period: string
          status: string
          thumbnail_image: string
        }
        Insert: {
          accessibility_da?: string | null
          accessibility_en?: string | null
          accessibility_pt?: string | null
          address?: string | null
          city_id: string
          description_da: string
          description_en: string
          description_pt: string
          id: string
          last_updated?: string | null
          latitude: number
          longitude: number
          name_da: string
          name_en: string
          name_pt: string
          primary_period: string
          status: string
          thumbnail_image: string
        }
        Update: {
          accessibility_da?: string | null
          accessibility_en?: string | null
          accessibility_pt?: string | null
          address?: string | null
          city_id?: string
          description_da?: string
          description_en?: string
          description_pt?: string
          id?: string
          last_updated?: string | null
          latitude?: number
          longitude?: number
          name_da?: string
          name_en?: string
          name_pt?: string
          primary_period?: string
          status?: string
          thumbnail_image?: string
        }
        Relationships: [
          {
            foreignKeyName: "heritage_sites_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      HistoricalPeriod: {
        Row: {
          color: string | null
          createdAt: string
          description: string
          endYear: number
          id: string
          name: string
          startYear: number
          updatedAt: string
        }
        Insert: {
          color?: string | null
          createdAt?: string
          description: string
          endYear: number
          id: string
          name: string
          startYear: number
          updatedAt: string
        }
        Update: {
          color?: string | null
          createdAt?: string
          description?: string
          endYear?: number
          id?: string
          name?: string
          startYear?: number
          updatedAt?: string
        }
        Relationships: []
      }
      Image: {
        Row: {
          caption: string | null
          createdAt: string
          credit: string | null
          id: string
          reviewId: string | null
          siteId: string | null
          updatedAt: string
          url: string
          userId: string | null
        }
        Insert: {
          caption?: string | null
          createdAt?: string
          credit?: string | null
          id: string
          reviewId?: string | null
          siteId?: string | null
          updatedAt: string
          url: string
          userId?: string | null
        }
        Update: {
          caption?: string | null
          createdAt?: string
          credit?: string | null
          id?: string
          reviewId?: string | null
          siteId?: string | null
          updatedAt?: string
          url?: string
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Image_reviewId_fkey"
            columns: ["reviewId"]
            isOneToOne: false
            referencedRelation: "Review"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Image_siteId_fkey"
            columns: ["siteId"]
            isOneToOne: false
            referencedRelation: "Site"
            referencedColumns: ["id"]
          },
        ]
      }
      images: {
        Row: {
          alt_da: string
          alt_en: string
          alt_pt: string
          caption_da: string | null
          caption_en: string | null
          caption_pt: string | null
          contexts: string[]
          credit: string | null
          height: number
          id: string
          large_url: string | null
          medium_url: string | null
          order_number: number
          period_id: string | null
          thumbnail_url: string | null
          url: string
          width: number
          year: number | null
        }
        Insert: {
          alt_da: string
          alt_en: string
          alt_pt: string
          caption_da?: string | null
          caption_en?: string | null
          caption_pt?: string | null
          contexts: string[]
          credit?: string | null
          height: number
          id: string
          large_url?: string | null
          medium_url?: string | null
          order_number: number
          period_id?: string | null
          thumbnail_url?: string | null
          url: string
          width: number
          year?: number | null
        }
        Update: {
          alt_da?: string
          alt_en?: string
          alt_pt?: string
          caption_da?: string | null
          caption_en?: string | null
          caption_pt?: string | null
          contexts?: string[]
          credit?: string | null
          height?: number
          id?: string
          large_url?: string | null
          medium_url?: string | null
          order_number?: number
          period_id?: string | null
          thumbnail_url?: string | null
          url?: string
          width?: number
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "images_period_id_fkey"
            columns: ["period_id"]
            isOneToOne: false
            referencedRelation: "periods"
            referencedColumns: ["id"]
          },
        ]
      }
      opening_hours: {
        Row: {
          id: string
          metadata: Json | null
          site_id: string
          type: string
          valid_from: string | null
          valid_to: string | null
        }
        Insert: {
          id: string
          metadata?: Json | null
          site_id: string
          type: string
          valid_from?: string | null
          valid_to?: string | null
        }
        Update: {
          id?: string
          metadata?: Json | null
          site_id?: string
          type?: string
          valid_from?: string | null
          valid_to?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "opening_hours_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "heritage_sites"
            referencedColumns: ["id"]
          },
        ]
      }
      periods: {
        Row: {
          color: string
          description_da: string
          description_en: string
          description_pt: string
          end_year: number | null
          id: string
          name_da: string
          name_en: string
          name_pt: string
          order_number: number
          start_year: number | null
        }
        Insert: {
          color: string
          description_da: string
          description_en: string
          description_pt: string
          end_year?: number | null
          id: string
          name_da: string
          name_en: string
          name_pt: string
          order_number: number
          start_year?: number | null
        }
        Update: {
          color?: string
          description_da?: string
          description_en?: string
          description_pt?: string
          end_year?: number | null
          id?: string
          name_da?: string
          name_en?: string
          name_pt?: string
          order_number?: number
          start_year?: number | null
        }
        Relationships: []
      }
      Review: {
        Row: {
          comment: string | null
          createdAt: string
          id: string
          rating: number
          siteId: string
          updatedAt: string
          userId: string
        }
        Insert: {
          comment?: string | null
          createdAt?: string
          id: string
          rating: number
          siteId: string
          updatedAt: string
          userId: string
        }
        Update: {
          comment?: string | null
          createdAt?: string
          id?: string
          rating?: number
          siteId?: string
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Review_siteId_fkey"
            columns: ["siteId"]
            isOneToOne: false
            referencedRelation: "Site"
            referencedColumns: ["id"]
          },
        ]
      }
      Site: {
        Row: {
          accessibility: string | null
          address: string
          createdAt: string
          description: string
          facilities: string[] | null
          id: string
          latitude: number
          longitude: number
          name: string
          openHours: string | null
          periodId: string
          updatedAt: string
          website: string | null
        }
        Insert: {
          accessibility?: string | null
          address: string
          createdAt?: string
          description: string
          facilities?: string[] | null
          id: string
          latitude: number
          longitude: number
          name: string
          openHours?: string | null
          periodId: string
          updatedAt: string
          website?: string | null
        }
        Update: {
          accessibility?: string | null
          address?: string
          createdAt?: string
          description?: string
          facilities?: string[] | null
          id?: string
          latitude?: number
          longitude?: number
          name?: string
          openHours?: string | null
          periodId?: string
          updatedAt?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Site_periodId_fkey"
            columns: ["periodId"]
            isOneToOne: false
            referencedRelation: "HistoricalPeriod"
            referencedColumns: ["id"]
          },
        ]
      }
      site_images: {
        Row: {
          image_id: string
          site_id: string
        }
        Insert: {
          image_id: string
          site_id: string
        }
        Update: {
          image_id?: string
          site_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "site_images_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "images"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "site_images_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "heritage_sites"
            referencedColumns: ["id"]
          },
        ]
      }
      site_periods: {
        Row: {
          period_id: string
          site_id: string
        }
        Insert: {
          period_id: string
          site_id: string
        }
        Update: {
          period_id?: string
          site_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "site_periods_period_id_fkey"
            columns: ["period_id"]
            isOneToOne: false
            referencedRelation: "periods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "site_periods_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "heritage_sites"
            referencedColumns: ["id"]
          },
        ]
      }
      site_tags: {
        Row: {
          site_id: string
          tag_id: string
        }
        Insert: {
          site_id: string
          tag_id: string
        }
        Update: {
          site_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "site_tags_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "heritage_sites"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "site_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          id: string
          name_da: string
          name_en: string
          name_pt: string
          type: string | null
        }
        Insert: {
          id: string
          name_da: string
          name_en: string
          name_pt: string
          type?: string | null
        }
        Update: {
          id?: string
          name_da?: string
          name_en?: string
          name_pt?: string
          type?: string | null
        }
        Relationships: []
      }
      time_slots: {
        Row: {
          closes: string
          day_of_week: number
          id: string
          opening_hours_id: string
          opens: string
        }
        Insert: {
          closes: string
          day_of_week: number
          id: string
          opening_hours_id: string
          opens: string
        }
        Update: {
          closes?: string
          day_of_week?: number
          id?: string
          opening_hours_id?: string
          opens?: string
        }
        Relationships: [
          {
            foreignKeyName: "time_slots_opening_hours_id_fkey"
            columns: ["opening_hours_id"]
            isOneToOne: false
            referencedRelation: "opening_hours"
            referencedColumns: ["id"]
          },
        ]
      }
      Tour: {
        Row: {
          accessibility: string | null
          createdAt: string
          description: string
          difficulty: string
          distance: number
          duration: number
          id: string
          name: string
          season: string | null
          theme: string | null
          type: string
          updatedAt: string
        }
        Insert: {
          accessibility?: string | null
          createdAt?: string
          description: string
          difficulty: string
          distance: number
          duration: number
          id: string
          name: string
          season?: string | null
          theme?: string | null
          type: string
          updatedAt: string
        }
        Update: {
          accessibility?: string | null
          createdAt?: string
          description?: string
          difficulty?: string
          distance?: number
          duration?: number
          id?: string
          name?: string
          season?: string | null
          theme?: string | null
          type?: string
          updatedAt?: string
        }
        Relationships: []
      }
      ToursOnSites: {
        Row: {
          createdAt: string
          description: string | null
          order: number
          siteId: string
          tourId: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          description?: string | null
          order: number
          siteId: string
          tourId: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          description?: string | null
          order?: number
          siteId?: string
          tourId?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "ToursOnSites_siteId_fkey"
            columns: ["siteId"]
            isOneToOne: false
            referencedRelation: "Site"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ToursOnSites_tourId_fkey"
            columns: ["tourId"]
            isOneToOne: false
            referencedRelation: "Tour"
            referencedColumns: ["id"]
          },
        ]
      }
      Translation: {
        Row: {
          createdAt: string
          description: string | null
          id: string
          languageCode: string
          name: string | null
          periodId: string | null
          siteId: string | null
          tourId: string | null
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          description?: string | null
          id: string
          languageCode: string
          name?: string | null
          periodId?: string | null
          siteId?: string | null
          tourId?: string | null
          updatedAt: string
        }
        Update: {
          createdAt?: string
          description?: string | null
          id?: string
          languageCode?: string
          name?: string | null
          periodId?: string | null
          siteId?: string | null
          tourId?: string | null
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Translation_periodId_fkey"
            columns: ["periodId"]
            isOneToOne: false
            referencedRelation: "HistoricalPeriod"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Translation_siteId_fkey"
            columns: ["siteId"]
            isOneToOne: false
            referencedRelation: "Site"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Translation_tourId_fkey"
            columns: ["tourId"]
            isOneToOne: false
            referencedRelation: "Tour"
            referencedColumns: ["id"]
          },
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
