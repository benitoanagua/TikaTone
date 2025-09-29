export interface ComponentDiagnostics {
  exists: boolean;
  tagName?: string;
  classes?: string;
  children?: number;
  visible?: boolean;
  clickableElements?: number;
}

export interface ComponentInteractions {
  performInteractions(): Promise<boolean>;
}

export interface ComponentInteractionMap {
  [key: string]: ComponentInteractions;
}
