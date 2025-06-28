export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      announcements: {
        Row: {
          announcement_id: string
          blog_id: string
          content: string
          created_at: string
          is_pinned: boolean | null
          title: string
          updated_at: string
        }
        Insert: {
          announcement_id?: string
          blog_id: string
          content: string
          created_at?: string
          is_pinned?: boolean | null
          title: string
          updated_at?: string
        }
        Update: {
          announcement_id?: string
          blog_id?: string
          content?: string
          created_at?: string
          is_pinned?: boolean | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "announcements_blog_id_blogs_blog_id_fk"
            columns: ["blog_id"]
            isOneToOne: false
            referencedRelation: "blogs"
            referencedColumns: ["blog_id"]
          },
        ]
      }
      authors: {
        Row: {
          author_id: string
          bio: string | null
          created_at: string
          image: string | null
          name: string
          otp_string: string | null
          role: Database["public"]["Enums"]["author_role"] | null
          short_bio: string | null
          updated_at: string
          username: string
        }
        Insert: {
          author_id: string
          bio?: string | null
          created_at?: string
          image?: string | null
          name: string
          otp_string?: string | null
          role?: Database["public"]["Enums"]["author_role"] | null
          short_bio?: string | null
          updated_at?: string
          username: string
        }
        Update: {
          author_id?: string
          bio?: string | null
          created_at?: string
          image?: string | null
          name?: string
          otp_string?: string | null
          role?: Database["public"]["Enums"]["author_role"] | null
          short_bio?: string | null
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      blog_settings: {
        Row: {
          blog_id: string
          blog_setting_id: string
          key: string
          updated_at: string
          value: string | null
        }
        Insert: {
          blog_id: string
          blog_setting_id?: string
          key: string
          updated_at?: string
          value?: string | null
        }
        Update: {
          blog_id?: string
          blog_setting_id?: string
          key?: string
          updated_at?: string
          value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_settings_blog_id_blogs_blog_id_fk"
            columns: ["blog_id"]
            isOneToOne: false
            referencedRelation: "blogs"
            referencedColumns: ["blog_id"]
          },
        ]
      }
      blogs: {
        Row: {
          author_id: string
          blog_id: string
          created_at: string
          deleted_at: string | null
          description: string | null
          name: string
          settings: Json | null
          slug: string
          updated_at: string
          visibility: Database["public"]["Enums"]["blog_visibility"] | null
        }
        Insert: {
          author_id: string
          blog_id?: string
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          name: string
          settings?: Json | null
          slug: string
          updated_at?: string
          visibility?: Database["public"]["Enums"]["blog_visibility"] | null
        }
        Update: {
          author_id?: string
          blog_id?: string
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          name?: string
          settings?: Json | null
          slug?: string
          updated_at?: string
          visibility?: Database["public"]["Enums"]["blog_visibility"] | null
        }
        Relationships: [
          {
            foreignKeyName: "blogs_author_id_authors_author_id_fk"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "authors"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "blogs_author_id_authors_author_id_fk"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "get_authors"
            referencedColumns: ["author_id"]
          },
        ]
      }
      categories: {
        Row: {
          blog_id: string
          category_id: string
          created_at: string
          name: string
          parent_id: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          blog_id: string
          category_id?: string
          created_at?: string
          name: string
          parent_id?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          blog_id?: string
          category_id?: string
          created_at?: string
          name?: string
          parent_id?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_blog_id_blogs_blog_id_fk"
            columns: ["blog_id"]
            isOneToOne: false
            referencedRelation: "blogs"
            referencedColumns: ["blog_id"]
          },
          {
            foreignKeyName: "categories_parent_id_categories_category_id_fk"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["category_id"]
          },
        ]
      }
      post_comments: {
        Row: {
          author_id: string | null
          author_type:
            | Database["public"]["Enums"]["post_comment_author_type"]
            | null
          blog_id: string
          content: string
          created_at: string
          post_comment_id: string
          post_id: string
          status: Database["public"]["Enums"]["post_comment_status"] | null
          updated_at: string
          visitor_email: string | null
          visitor_hashed_password: string | null
          visitor_name: string | null
        }
        Insert: {
          author_id?: string | null
          author_type?:
            | Database["public"]["Enums"]["post_comment_author_type"]
            | null
          blog_id: string
          content: string
          created_at?: string
          post_comment_id?: string
          post_id: string
          status?: Database["public"]["Enums"]["post_comment_status"] | null
          updated_at?: string
          visitor_email?: string | null
          visitor_hashed_password?: string | null
          visitor_name?: string | null
        }
        Update: {
          author_id?: string | null
          author_type?:
            | Database["public"]["Enums"]["post_comment_author_type"]
            | null
          blog_id?: string
          content?: string
          created_at?: string
          post_comment_id?: string
          post_id?: string
          status?: Database["public"]["Enums"]["post_comment_status"] | null
          updated_at?: string
          visitor_email?: string | null
          visitor_hashed_password?: string | null
          visitor_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_author_id_authors_author_id_fk"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "authors"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "post_comments_author_id_authors_author_id_fk"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "get_authors"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "post_comments_blog_id_blogs_blog_id_fk"
            columns: ["blog_id"]
            isOneToOne: false
            referencedRelation: "blogs"
            referencedColumns: ["blog_id"]
          },
          {
            foreignKeyName: "post_comments_post_id_posts_post_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
        ]
      }
      post_comments_replies: {
        Row: {
          author_email: string | null
          author_hashed_password: string | null
          author_id: string | null
          author_name: string | null
          author_type: string | null
          comment_id: string
          content: string | null
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          author_email?: string | null
          author_hashed_password?: string | null
          author_id?: string | null
          author_name?: string | null
          author_type?: string | null
          comment_id: string
          content?: string | null
          created_at?: string
          id?: string
          updated_at?: string
        }
        Update: {
          author_email?: string | null
          author_hashed_password?: string | null
          author_id?: string | null
          author_name?: string | null
          author_type?: string | null
          comment_id?: string
          content?: string | null
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_replies_author_id_authors_author_id_fk"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "authors"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "post_comments_replies_author_id_authors_author_id_fk"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "get_authors"
            referencedColumns: ["author_id"]
          },
          {
            foreignKeyName: "post_comments_replies_comment_id_post_comments_post_comment_id_"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "post_comments"
            referencedColumns: ["post_comment_id"]
          },
        ]
      }
      post_likes: {
        Row: {
          blog_id: string
          liked_at: string
          post_id: string
          visitor_id: string
        }
        Insert: {
          blog_id: string
          liked_at?: string
          post_id: string
          visitor_id: string
        }
        Update: {
          blog_id?: string
          liked_at?: string
          post_id?: string
          visitor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_blog_id_blogs_blog_id_fk"
            columns: ["blog_id"]
            isOneToOne: false
            referencedRelation: "blogs"
            referencedColumns: ["blog_id"]
          },
          {
            foreignKeyName: "post_likes_post_id_posts_post_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
        ]
      }
      post_revisions: {
        Row: {
          content: string | null
          post_id: string
          post_revision_id: string
          title: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          post_id: string
          post_revision_id?: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          post_id?: string
          post_revision_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_revisions_post_id_posts_post_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
        ]
      }
      post_tags: {
        Row: {
          post_id: string
          tag_id: string
        }
        Insert: {
          post_id: string
          tag_id: string
        }
        Update: {
          post_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_tags_post_id_posts_post_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "post_tags_tag_id_tags_tag_id_fk"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["tag_id"]
          },
        ]
      }
      post_views: {
        Row: {
          blog_id: string
          post_id: string
          user_agent: string | null
          viewed_at: string
          visitor_id: string
        }
        Insert: {
          blog_id: string
          post_id: string
          user_agent?: string | null
          viewed_at?: string
          visitor_id: string
        }
        Update: {
          blog_id?: string
          post_id?: string
          user_agent?: string | null
          viewed_at?: string
          visitor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_views_blog_id_blogs_blog_id_fk"
            columns: ["blog_id"]
            isOneToOne: false
            referencedRelation: "blogs"
            referencedColumns: ["blog_id"]
          },
          {
            foreignKeyName: "post_views_post_id_posts_post_id_fk"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
        ]
      }
      posts: {
        Row: {
          blog_id: string
          category_id: string | null
          content: string | null
          created_at: string
          deleted_at: string | null
          excerpt: string | null
          is_featured: boolean | null
          is_pinned: boolean | null
          like_count: number | null
          locale: string | null
          password: string | null
          post_id: string
          published_at: string | null
          slug: string
          status: Database["public"]["Enums"]["post_status"] | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          view_count: number | null
          visibility: Database["public"]["Enums"]["post_visibility"] | null
        }
        Insert: {
          blog_id: string
          category_id?: string | null
          content?: string | null
          created_at?: string
          deleted_at?: string | null
          excerpt?: string | null
          is_featured?: boolean | null
          is_pinned?: boolean | null
          like_count?: number | null
          locale?: string | null
          password?: string | null
          post_id?: string
          published_at?: string | null
          slug: string
          status?: Database["public"]["Enums"]["post_status"] | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          view_count?: number | null
          visibility?: Database["public"]["Enums"]["post_visibility"] | null
        }
        Update: {
          blog_id?: string
          category_id?: string | null
          content?: string | null
          created_at?: string
          deleted_at?: string | null
          excerpt?: string | null
          is_featured?: boolean | null
          is_pinned?: boolean | null
          like_count?: number | null
          locale?: string | null
          password?: string | null
          post_id?: string
          published_at?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["post_status"] | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          view_count?: number | null
          visibility?: Database["public"]["Enums"]["post_visibility"] | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_blog_id_blogs_blog_id_fk"
            columns: ["blog_id"]
            isOneToOne: false
            referencedRelation: "blogs"
            referencedColumns: ["blog_id"]
          },
          {
            foreignKeyName: "posts_category_id_categories_category_id_fk"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["category_id"]
          },
        ]
      }
      tags: {
        Row: {
          blog_id: string
          created_at: string
          is_featured: boolean | null
          name: string
          tag_id: string
        }
        Insert: {
          blog_id: string
          created_at?: string
          is_featured?: boolean | null
          name: string
          tag_id?: string
        }
        Update: {
          blog_id?: string
          created_at?: string
          is_featured?: boolean | null
          name?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tags_blog_id_blogs_blog_id_fk"
            columns: ["blog_id"]
            isOneToOne: false
            referencedRelation: "blogs"
            referencedColumns: ["blog_id"]
          },
        ]
      }
    }
    Views: {
      get_authors: {
        Row: {
          author_id: string | null
          bio: string | null
          created_at: string | null
          email: string | null
          image: string | null
          name: string | null
          otp_string: string | null
          raw_app_meta_data: Json | null
          role: Database["public"]["Enums"]["author_role"] | null
          short_bio: string | null
          updated_at: string | null
          username: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      author_role: "USER" | "ADMIN" | "SUPER_ADMIN"
      blog_visibility: "PUBLIC" | "PRIVATE"
      post_comment_author_type: "ADMIN" | "VISITOR"
      post_comment_status: "PENDING" | "APPROVED" | "SPAM"
      post_status: "DRAFT" | "PUBLISHED" | "ARCHIVED"
      post_visibility: "PUBLIC" | "PRIVATE" | "PROTECTED"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      author_role: ["USER", "ADMIN", "SUPER_ADMIN"],
      blog_visibility: ["PUBLIC", "PRIVATE"],
      post_comment_author_type: ["ADMIN", "VISITOR"],
      post_comment_status: ["PENDING", "APPROVED", "SPAM"],
      post_status: ["DRAFT", "PUBLISHED", "ARCHIVED"],
      post_visibility: ["PUBLIC", "PRIVATE", "PROTECTED"],
    },
  },
} as const
