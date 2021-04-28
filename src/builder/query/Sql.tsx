import { css } from 'emotion';
import { DRUID_SQL_KEYWORDS_FUNCS, DruidSQLPrismGrammar } from './grammar';
import { LanguageMap, languages as prismLanguages } from 'prismjs';
import { QueryBuilderProps, QueryBuilderOptions } from '../types';
import { QueryField, SlatePrism, TypeaheadInput, TypeaheadOutput } from '@grafana/ui';
import React, { PureComponent } from 'react';

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
          label: 'Druid SQL keywords and functions',
          items: DRUID_SQL_KEYWORDS_FUNCS.map((kw) => ({ label: kw })),
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
              additionalPlugins={[
                SlatePrism(
                  {
                    onlyIn: (node: any) => node.type === 'code_block',
                    getSyntax: (_: any) => 'druidsql',
                  },
                  { ...(prismLanguages as LanguageMap), druidsql: DruidSQLPrismGrammar }
                ),
              ]}
              portalOrigin=""
              query={builder.query}
              placeholder="The SQL query. e.g: SELECT * FROM datasource"
              onChange={this.onChange}
              onTypeahead={this.onTypeAhead}
            />
          </div>
        </div>
      </>
    );
  }
}
