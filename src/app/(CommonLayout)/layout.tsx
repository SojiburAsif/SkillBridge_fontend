import FooterPage from '@/components/layout/Fooder'
import NavbarServer from '@/components/modules/Navbar/NavbarServer'
import React, { ReactNode } from 'react'

export default function CommonLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <NavbarServer></NavbarServer>
            {children}
            <FooterPage></FooterPage>
        </div>
    )
}
