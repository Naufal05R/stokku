import { ItemCreatePage as ItemCreatePage_a18b3e4e64b1c1039ff3b45c67973c65 } from '@/modules/items/templates'
import { ItemListPage as ItemListPage_a18b3e4e64b1c1039ff3b45c67973c65 } from '@/modules/items/templates'
import { TransactionDetailPage as TransactionDetailPage_8ff29dc3fc5647b4d8353ed7de7e19b5 } from '../../../modules/transactions/templates/transaction-detail-page'
import { TransactionListPage as TransactionListPage_6e868359af900216a638ed12326aa303 } from '../../../modules/transactions/components/transaction-list'
import { Nav as Nav_d39a8ddc58596b9c210173352c972653 } from '@/modules/common/components'
import { SwitchTheme as SwitchTheme_d39a8ddc58596b9c210173352c972653 } from '@/modules/common/components'
import { UserBadges as UserBadges_3e388cc3edbb3bab9fa79fb18cf725d5 } from '@/modules/common/components/custom/user-badges'
import { DashboardPage as DashboardPage_ea1cad2e162a167803a024a1d5632448 } from '@/modules/dashboard/templates/dashboard-page'
import { AccountPage as AccountPage_5b7a663f957bc26aba8f67294a19adb3 } from '@/modules/account/templates'
import { LoginPage as LoginPage_dc53338288fb8108f10edc8a62101995 } from '@/modules/auth/templates'
import { ForgotPasswordPage as ForgotPasswordPage_dc53338288fb8108f10edc8a62101995 } from '@/modules/auth/templates'
import { CollectionCards as CollectionCards_f9c02e79a4aed9a3924487c0cd4cafb1 } from '@payloadcms/next/rsc'

/** @type import('payload').ImportMap */
export const importMap = {
  "@/modules/items/templates#ItemCreatePage": ItemCreatePage_a18b3e4e64b1c1039ff3b45c67973c65,
  "@/modules/items/templates#ItemListPage": ItemListPage_a18b3e4e64b1c1039ff3b45c67973c65,
  "/modules/transactions/templates/transaction-detail-page#TransactionDetailPage": TransactionDetailPage_8ff29dc3fc5647b4d8353ed7de7e19b5,
  "/modules/transactions/components/transaction-list#TransactionListPage": TransactionListPage_6e868359af900216a638ed12326aa303,
  "@/modules/common/components#Nav": Nav_d39a8ddc58596b9c210173352c972653,
  "@/modules/common/components#SwitchTheme": SwitchTheme_d39a8ddc58596b9c210173352c972653,
  "@/modules/common/components/custom/user-badges#UserBadges": UserBadges_3e388cc3edbb3bab9fa79fb18cf725d5,
  "@/modules/dashboard/templates/dashboard-page#DashboardPage": DashboardPage_ea1cad2e162a167803a024a1d5632448,
  "@/modules/account/templates#AccountPage": AccountPage_5b7a663f957bc26aba8f67294a19adb3,
  "@/modules/auth/templates#LoginPage": LoginPage_dc53338288fb8108f10edc8a62101995,
  "@/modules/auth/templates#ForgotPasswordPage": ForgotPasswordPage_dc53338288fb8108f10edc8a62101995,
  "@payloadcms/next/rsc#CollectionCards": CollectionCards_f9c02e79a4aed9a3924487c0cd4cafb1
}
