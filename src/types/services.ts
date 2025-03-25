export interface Service {
  id: number
  name: string
  description: string
  is_active: boolean
  owner?: string
  number_of_sells?: number
  number_of_waiting?: number
  category?: {
    name: string
  }
  hour_service?: number
  hour_price?: number
  reject_reason?: string
  status?: number
  home_service?: boolean
  created_at?: string
  updated_at?: string
}

export interface ServiceCardProps {
  name: string
  description: string
  is_active: boolean
  onToggle: (is_active: boolean) => void
}
