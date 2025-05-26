export as namespace GuidesApiTypes;

export interface GuideStep {
  title: string
  description: string
  hint?: string
  item?: string[]
  note?: string
  benefit?: string
  advice?: string
  image_url?: string
}

export interface Guide {
  id: string
  title: string
  description: string
  steps: GuideStep[]
  footer_text: string
}
