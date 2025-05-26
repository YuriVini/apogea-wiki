export as namespace GuidesApiTypes;

export interface Guide {
  id: string;
  title: string;
  description: string;
  steps: GuideStep[];
}

export interface GuideStep {
  title: string;
  description: string;
}
