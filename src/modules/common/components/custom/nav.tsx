'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LogOut, LayoutDashboard, Package, PackagePlus, ArrowLeftRight, History } from 'lucide-react'

import { useAuth, useNav } from '@payloadcms/ui'
import { cn } from '@/modules/common/utils'
import { Button, buttonVariants } from '@/modules/common/components'

const navGroups = [
  {
    label: 'Dasbor',
    links: [{ label: 'Rangkuman', href: '/admin', icon: LayoutDashboard }],
  },
  {
    label: 'Tabel',
    links: [
      { label: 'Master Barang', href: '/admin/collections/items', icon: Package },
      { label: 'Riwayat Transaksi', href: '/admin/collections/transactions', icon: History },
    ],
  },
  {
    label: 'Operasi',
    links: [
      { label: 'Tambah Barang', href: '/admin/collections/items/create', icon: PackagePlus },
      {
        label: 'Buat Transaksi',
        href: '/admin/collections/transactions/create',
        icon: ArrowLeftRight,
      },
    ],
  },
]

export const Nav = () => {
  const pathname = usePathname()
  const { refresh } = useRouter()
  const { logOut, user } = useAuth()
  const { navOpen, setNavOpen } = useNav()

  return (
    <>
      <aside
        className={cn(
          'twp w-full md:w-68.75 opacity-0 transition-opacity duration-300 flex flex-col h-screen border-r',
          { 'opacity-100': navOpen },
        )}
      >
        <div className="h-16 px-2  flex items-center">
          <Button
            variant="ghost"
            className="size-8 md:hidden hover:bg-transparent!"
            onClick={() => setNavOpen(!navOpen)}
          >
            <svg
              className="icon icon--menu size-5"
              fill="none"
              height="20"
              viewBox="0 0 20 20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="stroke"
                d="M4.66667 10H15.3333M4.66667 6H15.3333M4.66667 14H15.3333"
                strokeLinecap="square"
              ></path>
            </svg>
          </Button>
        </div>

        <nav className="flex-1 px-2 lg:px-4 flex flex-col gap-4 overflow-y-auto no-scrollbar">
          {navGroups.map((group) => (
            <div key={group.label} className="space-y-2 lg:space-y-4">
              <h3 className="px-2 text-xs font-mono font-semibold tracking-widest uppercase text-nowrap text-sidebar-accent-foreground">
                {group.label}
              </h3>

              <div className="space-y-0.5">
                {group.links.map((link) => {
                  const isActive = pathname === link.href
                  const Icon = link.icon

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={buttonVariants({
                        variant: 'ghost',
                        className: cn(
                          'w-full flex items-center justify-start text-sm no-underline font-semibold hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                          isActive &&
                            'bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent dark:hover:bg-sidebar-accent',
                        ),
                      })}
                    >
                      <Icon className="size-4 shrink-0 transition-colors" />
                      <span className="no-underline text-nowrap">{link.label}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-border">
          <Button
            variant="ghost"
            className="w-full flex items-center justify-start h-auto gap-3 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            onClick={async () => {
              await logOut()
              refresh()
            }}
          >
            <LogOut className="size-4 shrink-0" />
            <div className="flex flex-col items-start leading-tight">
              <span className="text-sm font-semibold">{user?.username || 'Administrator'}</span>
              <span className="text-xs opacity-75">Sign out</span>
            </div>
          </Button>
        </div>
      </aside>
    </>
  )
}
