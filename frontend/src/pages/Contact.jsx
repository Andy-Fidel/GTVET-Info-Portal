import { useState } from 'react'
import { contactAPI } from '../services/api'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Textarea } from '../components/ui/Textarea'
import { Label } from '../components/ui/Label'
import { Card, CardContent } from '../components/ui/Card'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  ArrowRight
} from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError('')
      await contactAPI.sendMessage(formData)
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email",
      value: "infoportal@gtvets.gov.gh",
      href: "mailto:infoportal@gtvets.gov.gh",
      description: "Our support team usually responds within 24 hours."
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Phone",
      value: "+233 53 110 0571",
      href: "tel:+233531100571",
      description: "Available Mon-Fri, 8:00 AM - 5:00 PM GMT."
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Office",
      value: "1 Zaire Ave, Accra, Ghana",
      href: "https://maps.google.com",
      description: "Visit us at our headquarters in the capital."
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Working Hours",
      value: "Monday - Friday",
      description: "8:30 AM - 5:00 PM (GMT)"
    }
  ]

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 min-h-[400px] flex items-center">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: "url('/contact-hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-slate-900/70 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.2),transparent_50%)] z-20" />

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Get in touch
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            We're here to <span className="text-primary italic">support</span> you.
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Have questions about GTVET programs or institutions? Reach out and our team will assist you as soon as possible.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 -mt-16 pb-24 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Details Column */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, idx) => (
              <Card key={idx} className="border-none shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden ring-1 ring-slate-200">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">{info.title}</h3>
                      {info.href ? (
                        <a href={info.href} className="text-slate-600 hover:text-primary transition-colors block mb-1">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-slate-600 mb-1">{info.value}</p>
                      )}
                      <p className="text-xs text-slate-400 leading-relaxed font-medium">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Social Connect */}
            <Card className="border-none shadow-sm bg-primary text-white overflow-hidden">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">Connect with us</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-6">
                  Stay updated with the latest news and announcements through our social channels.
                </p>
                <div className="flex gap-4">
                  {[<Facebook />, <Twitter />, <Linkedin />].map((icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                      {icon}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-2">
            <Card className="border-none shadow-xl shadow-slate-200/50 bg-white dark:bg-slate-900 rounded-3xl overflow-hidden ring-1 ring-slate-200">
              <CardContent className="p-8 md:p-12">
                {submitted ? (
                  <div className="py-12 text-center max-w-md mx-auto space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-900/10 mb-2">
                      <CheckCircle2 className="w-10 h-10 text-emerald-500 animate-in zoom-in duration-300" />
                    </div>
                    <div className="space-y-2 px-2">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Message Received!</h3>
                      <p className="text-slate-500 font-medium">
                        Thank you for reaching out. We have received your inquiry and our team will get back to you shortly.
                      </p>
                    </div>
                    <Button
                      onClick={() => setSubmitted(false)}
                      variant="outline"
                      className="mt-4 rounded-xl px-8"
                    >
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-semibold text-slate-700 ml-1">Full Name <span className="text-red-500">*</span></Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="e.g. Samuel Andy-Fidel"
                          className="h-12 bg-slate-50 border-slate-200 rounded-xl focus:ring-primary/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-semibold text-slate-700 ml-1">Email <span className="text-red-500">*</span></Label>
                        <Input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your.email@example.com"
                          className="h-12 bg-slate-50 border-slate-200 rounded-xl focus:ring-primary/20"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-semibold text-slate-700 ml-1">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+233 XX XXX XXXX"
                          className="h-12 bg-slate-50 border-slate-200 rounded-xl focus:ring-primary/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-sm font-semibold text-slate-700 ml-1">Subject <span className="text-red-500">*</span></Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          placeholder="How can we help?"
                          className="h-12 bg-slate-50 border-slate-200 rounded-xl focus:ring-primary/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-semibold text-slate-700 ml-1">Your Message <span className="text-red-500">*</span></Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="6"
                        placeholder="Please describe your inquiry in detail..."
                        className="bg-slate-50 border-slate-200 rounded-2xl focus:ring-primary/20 pt-4"
                      />
                    </div>

                    {error && (
                      <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex items-center gap-3 text-red-600 animate-in fade-in slide-in-from-top-2">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <p className="text-sm font-medium">{error}</p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full md:w-auto h-14 px-12 rounded-2xl bg-primary hover:bg-primary/90 text-sm font-bold shadow-xl shadow-primary/20 transition-all active:scale-[0.98] group"
                    >
                      {loading ? (
                        <Loader className="w-5 h-5 animate-spin mx-auto text-white" />
                      ) : (
                        <div className="flex items-center justify-center gap-3">
                          Send Your Message
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map or Office Section placeholder */}
      <section className="bg-white border-t border-slate-100 py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">Looking for a specific center?</h2>
          <p className="text-slate-500 font-medium mb-10 max-w-xl mx-auto">
            You can also find contact details for individual institutions by browsing our regional directory.
          </p>
          <Button variant="outline" className="h-12 px-8 rounded-xl font-bold" onClick={() => window.location.href = '/institutions'}>
            Browse Institutions
          </Button>
        </div>
      </section>
    </div>
  )
}

function Loader(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}
