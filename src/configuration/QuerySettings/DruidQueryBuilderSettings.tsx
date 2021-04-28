import React, { PureComponent, ChangeEvent } from 'react';
import { InlineFieldRow, InlineField, Input } from '@grafana/ui';
import { QuerySettingsProps } from './types';

export class DruidQueryBuilderSettings extends PureComponent<QuerySettingsProps> {
  constructor(props: QuerySettingsProps) {
    super(props);
  }

  onRunManualQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { options, onOptionsChange } = this.props;
    const { settings } = options;
    onOptionsChange({ ...options, settings });
  };

  onQuerySubmitDelayChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { options, onOptionsChange } = this.props;
    const { settings } = options;
    settings.querySubmitDelay = +event!.currentTarget.value;
    onOptionsChange({ ...options, settings });
  };

  render() {
    const { settings } = this.props.options;
    return (
      <div className="gf-form-group">
        <h3 className="page-heading">Query builder options</h3>
        <InlineFieldRow>
          <InlineField
            label="Query submit delay (ms)"
            tooltip="Milliseconds to wait for after input stops until submitting query"
          >
            <Input placeholder="100" value={settings.querySubmitDelay!} onChange={this.onQuerySubmitDelayChange} />
          </InlineField>
        </InlineFieldRow>
      </div>
    );
  }
}
