'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'

export function MobileNav() {
  const pathname = usePathname()

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/icons/hamburger.svg"
            alt="hamburger icon"
            width={36}
            height={36}
            className="cursor-pointer sm:hidden"
          />
        </SheetTrigger>

        <SheetContent side="left" className="bg-dark-1 border-none">
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/icons/logo.svg"
              alt="Yoom logo"
              width={32}
              height={32}
              className="max-sm:size-10"
            />
            <p className="text-[26px] font-extrabold text-white">Yoom</p>
          </Link>

          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className="flex h-full flex-col gap-6 pt-16 text-white">
                {sidebarLinks.map((link) => {
                  const isActive = pathname === link.route

                  return (
                    <SheetClose asChild key={link.label}>
                      <Link
                        href={link.route}
                        className={cn(
                          'flex w-full max-w-60 items-center gap-4 rounded-lg p-4',
                          {
                            'bg-blue-1': isActive,
                          },
                        )}
                      >
                        <Image
                          src={link.imgURL}
                          alt={link.label}
                          width={20}
                          height={20}
                        />
                        <p className="font-semibold">{link.label}</p>
                      </Link>
                    </SheetClose>
                  )
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}
