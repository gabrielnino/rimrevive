import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import ProblemSection from '@/components/ProblemSection'
import BeforeAfterSection from '@/components/BeforeAfterSection'
import HowItWorksSection from '@/components/HowItWorksSection'
import PremiumSection from '@/components/PremiumSection'
import FAQSection from '@/components/FAQSection'
import QuoteSection from '@/components/QuoteSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <BeforeAfterSection />
      <HowItWorksSection />
      <PremiumSection />
      <FAQSection />
      <QuoteSection />
      <Footer />
    </main>
  )
}
