export interface FAQ {
  id: number
  question: string
  answer: string
  order_index: number
  created_at: string
  updated_at: string
}

export interface PricingPlan {
  id: number
  name: string
  price_monthly: number
  price_yearly: number
  features: string[]
  button_text: string
  is_popular: boolean
  order_index: number
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: number
  text: string
  name: string
  role: string
  order_index: number
  created_at: string
  updated_at: string
}
