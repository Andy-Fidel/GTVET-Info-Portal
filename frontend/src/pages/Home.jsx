import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import {
  MapPin,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Briefcase,
  Globe
} from 'lucide-react'
import GhanaMap from '../components/GhanaMap'
import heroFallback from '../assets/workshop_students_hero.png'

export default function Home() {
  return (
    <div className="space-y-0">
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center text-white overflow-hidden">
        {/* Background Media */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster={heroFallback}
          >
            <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=ee9e535e6912389f41b2128a3836166a010471b6&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
          </video>
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-slate-900/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/30" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center max-w-4xl mx-auto space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-white text-xs font-bold uppercase tracking-[0.2em] animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Ghana's TVET Information Hub
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-1000">
              Shape Your Future with <br />
              <span className="text-primary italic relative">
                Industrial Skills
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/30" viewBox="0 0 200 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0,10 Q50,0 100,10 T200,10" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              Discover accredited technical and vocational institutions across Ghana.
              Empowering the youth with world-class training and career-defining opportunities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500 w-full max-w-md sm:max-w-none mx-auto">
              <Link to="/institutions" className="w-full sm:w-auto">
                <Button className="h-6 sm:h-10 px-8 text-lg sm:text-xl font-bold bg-[#ff7b1c] hover:bg-blue-600 text-white shadow-2xl shadow-orange-900/40 hover:shadow-blue-900/30 transition-all active:scale-95 group rounded-2xl border-none w-full">
                  Find Institutions
                  <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              <Link to="/programs" className="w-full sm:w-auto">
                <Button className="h-6 sm:h-10 px-8 text-lg sm:text-xl font-bold bg-[#ff7b1c] hover:bg-blue-600 text-white shadow-2xl shadow-orange-900/40 hover:shadow-blue-900/30 transition-all active:scale-95 group rounded-2xl border-none w-full" variant="outline" size="lg">
                  Browse Programs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 order-2 lg:order-1">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                  <MapPin className="h-5 w-5" />
                  Regional Explorer
                </div>
                <h2 className="text-4xl font-bold tracking-tight text-slate-900 leading-snug">
                  Explore TVET Institutions <br className="hidden md:block" /> Across All 16 Regions
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Our interactive map allows you to discover training opportunities in your specific region. Each region offers unique programs tailored to local industry demands.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { title: 'Local Access', desc: 'Find centers nearest to you' },
                  { title: 'Regional Filters', desc: 'Search by administrative areas' },
                  { title: 'Industry Alignment', desc: 'Programs suited for local needs' },
                  { title: 'Direct Navigation', desc: 'Click any region to see details' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-900">{item.title}</h4>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link to="/institutions">
                  <Button variant="link" className="p-0 h-auto text-primary font-bold hover:no-underline group">
                    View all 16 regions in list view
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <GhanaMap />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl italic">Comprehensive Support</h2>
            <p className="text-lg text-slate-600">Everything you need to kickstart your vocational training journey in Ghana.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-xl shadow-slate-200/50 bg-white hover:-translate-y-2 transition-transform duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Vetted Institutions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-slate-600 leading-relaxed">
                  Gain access to a database of government-approved and accredited technical training centers.
                </CardDescription>
                <Link to="/institutions" className="inline-flex items-center text-sm font-bold text-primary hover:underline">
                  Search directory <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl shadow-slate-200/50 bg-white hover:-translate-y-2 transition-transform duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle className="text-xl">Industry-Driven Programs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-slate-600 leading-relaxed">
                  Browse over 50+ specialized programs from engineering to creative arts and hospitality.
                </CardDescription>
                <Link to="/programs" className="inline-flex items-center text-sm font-bold text-emerald-600 hover:underline">
                  View programs <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl shadow-slate-200/50 bg-white hover:-translate-y-2 transition-transform duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-amber-600" />
                </div>
                <CardTitle className="text-xl">Career Growth</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-slate-600 leading-relaxed">
                  Learn about the impact of TVET on national development and individual economic empowerment.
                </CardDescription>
                <Link to="/about" className="inline-flex items-center text-sm font-bold text-amber-600 hover:underline">
                  Learn more <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.4),transparent)]pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-extrabold mb-2 italic">16</div>
              <div className="text-blue-100 text-sm font-medium uppercase tracking-widest">Regions Covered</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-extrabold mb-2 italic">150+</div>
              <div className="text-blue-100 text-sm font-medium uppercase tracking-widest">Training Institutions</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-extrabold mb-2 italic">20K+</div>
              <div className="text-blue-100 text-sm font-medium uppercase tracking-widest">Annual Graduates</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-extrabold mb-2 italic">40+</div>
              <div className="text-blue-100 text-sm font-medium uppercase tracking-widest">Approved Programmes</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-slate-900 rounded-[3rem] py-16 px-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-20">
            <Globe className="h-32 w-32 text-primary" />
          </div>
          <div className="relative z-10 space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Ready to begin your vocational journey?</h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Whether you are looking for an institution or a specific training program, we are here to guide you every step of the way.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/contact">
                <Button variant="secondary" className="h-14 px-10 text-lg font-bold">Get in Touch</Button>
              </Link>
              <Link to="/institutions">
                <Button variant="outline" className="h-14 px-10 text-lg font-bold text-white border-white/20 hover:bg-white/10">Browse Directory</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
