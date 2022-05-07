import React from 'react';

interface Props {
  dateAsIso8601: string;
}

export const DateRenderer = React.memo((props: Props) => {
  return <>{new Date(props.dateAsIso8601).toLocaleDateString()}</>;
});
