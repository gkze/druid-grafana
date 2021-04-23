import React, { FC } from 'react';
import { DruidQueryContextSettings, DruidQueryResponseSettings } from './';
import { DruidQueryBuilderSettings } from './DruidQueryBuilderSettings';
import { QuerySettingsProps } from './types';

export const DruidQuerySettings: FC<QuerySettingsProps> = (props: QuerySettingsProps) => {
  return (
    <>
      <DruidQueryContextSettings {...props} />
      <DruidQueryBuilderSettings {...props} />
      <DruidQueryResponseSettings {...props} />
    </>
  );
};
