export interface Service {
  id: number
  title: string
  description: string
  enabled: boolean
}

export interface ServiceCardProps {
  title: string
  description: string
  enabled: boolean
  onToggle: (enabled: boolean) => void
}
