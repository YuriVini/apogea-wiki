export as namespace GuidesApiTypes;

export interface GuideStep {
  title: string;
  description: string;
  hint?: string;
  items?: string[];
  note?: string;
  benefit?: string;
  advice?: string;
  image_url?: string;
  equipments?: string[] | EquipmentsApiTypes.Equipment[];
}

export interface Guide {
  id: string;
  title: string;
  author: string;
  description: string;
  steps: GuideStep[];
  footer_text: string;
  userId: string;
}

export interface GuideCreateResponse {
  guideId: string;
  message: string;
}
