import Head from 'next/head'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ProfilSection from '@/components/ProfilSection'
import BeritaSection from '@/components/BeritaSection'
import StaffSection from '@/components/StaffSection'
import Footer from '@/components/Footer'
import InfografikSection from '@/components/InfografikSection'

export default function Home() {
  return (
    <>
      <Head>
        <title>Sistem Informasi Desa Sejahtera</title>
        <meta name="description" content="Website resmi desa Sejahtera" />
      </Head>
      <div data-theme="forest">
        <Header />
        <Hero />
        <ProfilSection />
        <BeritaSection />
        <InfografikSection/>
        <StaffSection />
        <Footer />
      </div>
    </>
  )
}
