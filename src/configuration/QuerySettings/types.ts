export interface QueryContextParameter {
  name: string;
  value: any;
}

export interface QuerySettings {
  format?: string;
  contextParameters?: QueryContextParameter[];
  runQueriesManually?: boolean;
  hideEmptyColumns?: boolean;
  responseLimit?: number;
  logColumnTime?: string;
  logColumnLevel?: string;
  logColumnMessage?: string;
}
export interface QuerySettingsOptions {
  settings: QuerySettings;
}

export interface QuerySettingsProps {
  options: QuerySettingsOptions;
  onOptionsChange: (options: QuerySettingsOptions) => void;
}
