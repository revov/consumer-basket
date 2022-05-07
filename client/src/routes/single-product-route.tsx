import { useParams } from 'react-router-dom';

interface Props {
  isExisting: boolean;
}

export function SingleProductRoute(props: Props) {
  const { productId } = useParams();

  return <div>{props.isExisting ? 'Редактиране ' : 'Добавяне '}на продукт {productId}</div>;
}
