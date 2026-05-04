import {
  LandingNavbar,
  HeroSection,
  PainPointsSection,
  FeaturesSection,
  ValuePropositionSection,
  ScreenshotsSection,
  InstallationSection,
  GettingStartedSection,
  CtaSection,
  LandingFooter,
} from '@/modules/home/components'

export function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingNavbar />
      <main className="flex-1">
        <HeroSection />
        <PainPointsSection />
        <FeaturesSection />
        <ValuePropositionSection />
        <ScreenshotsSection />
        <InstallationSection />
        <GettingStartedSection />
        <CtaSection />
      </main>
      <LandingFooter />
    </div>
  )
}
