import React from 'react';

interface Props {
  value: string | number | null | undefined;
}

const formatter = new Intl.NumberFormat('bg-BG', {
  style: 'currency',
  currency: 'BGN',
});

export const CurrencyRenderer = React.memo((props: Props) => {
  // eslint-disable-next-line eqeqeq
  if (props.value == undefined) {
    return <>-</>;
  }
  return <>{formatter.format(+props.value)}</>;
});
