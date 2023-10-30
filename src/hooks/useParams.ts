import { useRoute } from '@react-navigation/native';
import { RootStackParamList, ScreenProps } from '../navigation/type';

export function useParams<T extends keyof RootStackParamList>() {
  type RouteProps = ScreenProps<T>;
  const { params } = useRoute<RouteProps['route']>();
  return params || ({} as RootStackParamList[T]);
}
