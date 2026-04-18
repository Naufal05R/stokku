import { ITEM_CATEGORY_OPTIONS } from './category'
import { ITEM_UNIT_OPTIONS } from './unit'
import { TRANSACTION_TYPE_OPTIONS } from './transaction';

export const ITEM_OPTION: Record<string, { label: string; value: string }[]> = {
  category: ITEM_CATEGORY_OPTIONS,
  unit: ITEM_UNIT_OPTIONS,
  type: TRANSACTION_TYPE_OPTIONS,
}
