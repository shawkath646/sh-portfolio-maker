'use client'
import Intro from '@/components/portfolio/Intro'
import Dream from '@/components/portfolio/Dream'
import Skills from '@/components/portfolio/Skills'
import Projects from '@/components/portfolio/Projects'
import Contacts from '@/components/portfolio/Contacts'

export default function Page({ params }) {


  return (
    <main className='text-black'>
      <div className='container mx-auto'>
        <Intro username={params.slug} />
        <Dream username={params.slug}  />
        {/* <Skills />
        <Projects />
        <Contacts /> */}
      </div>
    </main>
  )
}
