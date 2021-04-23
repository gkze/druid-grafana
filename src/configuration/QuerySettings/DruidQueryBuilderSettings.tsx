import React, { PureComponent, ChangeEvent } from 'react';
import { InlineFieldRow, InlineField, InlineSwitch } from '@grafana/ui';
import { QuerySettingsProps } from './types';

export class DruidQueryBuilderSettings extends PureComponent<QuerySettingsProps> {
  constructor(props: QuerySettingsProps) {
    super(props);

    const { settings } = this.props.options;

    if (settings.runQueriesManually === undefined) {
      settings.runQueriesManually = false;
    }
  }

  onRunManualQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { options, onOptionsChange } = this.props;
    const { settings } = options;
    settings.runQueriesManually = event!.currentTarget.checked;
    onOptionsChange({ ...options, settings });
  };

  render() {
    const { settings } = this.props.options;
    return (
      <div className={'gf-form-group'}>
        <h3 className="page-heading">Query builder options</h3>
        <InlineFieldRow>
          <InlineField
            label="Run queries manually (Shift+Enter)"
            tooltip="Do not run queries automatically when typing, instead only when Shift+Enter are pressed"
          >
            <InlineSwitch value={settings.runQueriesManually} disabled={false} onChange={this.onRunManualQueryChange} />
          </InlineField>
        </InlineFieldRow>
      </div>
    );
  }
}
