import React, { PureComponent } from 'react';
import { css } from 'emotion';
import { QueryField, TypeaheadInput, TypeaheadOutput } from '@grafana/ui';
import { QueryBuilderProps, QueryBuilderOptions } from '../types';
import { debounce } from 'lodash';

const DRUID_SQL_KEYWORDS = [
  'ALL',
  'AS',
  'ASC',
  'BY',
  'CUBE',
  'DESC',
  'DISTINCT',
  'EXPLAIN',
  'FOR',
  'FROM',
  'GROUP',
  'GROUPING',
  'HAVING',
  'INNER',
  'JOIN',
  'LEFT',
  'LIMIT',
  'OFFSET',
  'ON',
  'ORDER',
  'ROLLUP',
  'SELECT',
  'SETS',
  'UNION',
  'WHERE',
  'WITH',
];

export class Sql extends PureComponent<QueryBuilderProps> {
  constructor(props: QueryBuilderProps) {
    super(props);
    this.resetBuilder(['queryType', 'query']);
    const { builder } = props.options;
    builder.queryType = 'sql';
  }

  resetBuilder = (properties: string[]) => {
    const { builder } = this.props.options;
    for (let key of Object.keys(builder)) {
      if (!properties.includes(key)) {
        delete builder[key];
      }
    }
  };

  onChange = (val: string) => {
    const { options, onOptionsChange } = this.props;
    const { builder } = options;
    builder['query'] = val;
    onOptionsChange({ ...options, builder: builder });
  };

  onOptionsChange = (component: string, componentBuilderOptions: QueryBuilderOptions) => {
    const { options, onOptionsChange } = this.props;
    const { builder, settings } = options;
    builder[component] = componentBuilderOptions.builder;
    onOptionsChange({ ...options, builder, settings });
  };

  onTypeAhead = async (input: TypeaheadInput): Promise<TypeaheadOutput> => {
    return {
      suggestions: [
        {
          label: 'Druid SQL keywords',
          items: DRUID_SQL_KEYWORDS.map((kw) => ({ label: kw })),
        },
      ],
    };
  };

  render() {
    const { builder } = this.props.options;
    return (
      <>
        <div className="gf-form">
          <div
            className={css`
              width: 100%;
            `}
          >
            <label className="gf-form-label">SQL Query</label>
            <QueryField
              portalOrigin=""
              query={builder.query}
              placeholder="The SQL query. e.g: SELECT * FROM datasource"
              onChange={debounce(this.onChange, 100)}
              onTypeahead={this.onTypeAhead}
            />
          </div>
        </div>
      </>
    );
  }
}
