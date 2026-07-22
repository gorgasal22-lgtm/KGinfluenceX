import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter'
import { useEffect } from 'react'
import { LangProvider } from '@/lib/LanguageContext'
import { ThemeProvider } from '@/lib/ThemeContext'
import LoginPage from '@/pages/LoginPage'
import DashboardPage from '@/pages/DashboardPage'
import InfluencersPage from '@/pages/InfluencersPage'
import CampaignsPage from '@/pages/CampaignsPage'
import AnalyticsPage from '@/pages/AnalyticsPage'
import BrandsPage from '@/pages/BrandsPage'
import ContentPage from '@/pages/ContentPage'
import SettingsPage from '@/pages/SettingsPage'
import AcademyPage from '@/pages/AcademyPage'
import AiStudioPage from '@/pages/AiStudioPage'

const queryClient = new QueryClient()

function FallbackRoute() {
  const [, navigate] = useLocation()
  useEffect(() => {
    navigate('/login')
  }, [navigate])
  return null
}

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={FallbackRoute} />
      <Route path="/login" component={LoginPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/influencers" component={InfluencersPage} />
      <Route path="/campaigns" component={CampaignsPage} />
      <Route path="/analytics" component={AnalyticsPage} />
      <Route path="/brands" component={BrandsPage} />
      <Route path="/content" component={ContentPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="/academy" component={AcademyPage} />
      <Route path="/ai-studio" component={AiStudioPage} />
      <Route component={FallbackRoute} />
    </Switch>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LangProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <AppRoutes />
          </WouterRouter>
        </LangProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
