import { useState, useEffect } from 'react'
import { announcementsAPI } from '../services/api'
import { useAppStore } from '../store/appStore'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import {
  Loader,
  ArrowRight,
  Calendar,
  Tag,
  Megaphone,
  Newspaper,
  Info
} from 'lucide-react'

export default function Announcements() {
  const { announcements, setAnnouncements, loading, setLoading, error, setError } = useAppStore()
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', 'News', 'Event', 'Scholarship', 'General']

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    try {
      setLoading(true)
      const response = await announcementsAPI.getAll()
      setAnnouncements(response.data.data || response.data)
    } catch (err) {
      setError(err.message || 'Failed to load announcements')
    } finally {
      setLoading(false)
    }
  }

  const filteredAnnouncements = activeCategory === 'All'
    ? announcements
    : announcements.filter(a => a.category === activeCategory)

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'News': return <Newspaper size={14} className="mr-1" />
      case 'Event': return <Calendar size={14} className="mr-1" />
      case 'General': return <Megaphone size={14} className="mr-1" />
      default: return <Info size={14} className="mr-1" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-primary py-20 lg:py-28 text-white">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <Badge className="bg-secondary/20 text-secondary border-none mb-4 px-3 py-1">Updates</Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              News & <span className="text-secondary">Announcements</span>
            </h1>
            <p className="text-xl text-blue-100 font-medium leading-relaxed">
              Stay connected with the latest developments, institutional updates, and academic opportunities within the Ghana TVET ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 -mt-10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Sidebar / Filters */}
            <div className="lg:w-1/4 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Tag className="mr-2 text-primary" size={20} /> Categories
                </h3>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeCategory === cat
                          ? 'bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]'
                          : 'text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                <h4 className="text-primary font-bold mb-2">Subscribe</h4>
                <p className="text-sm text-gray-600 mb-4">Get the latest TVET updates delivered straight to your inbox.</p>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter email..."
                    className="w-full px-4 py-2.5 rounded-xl border-none bg-white shadow-sm text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                  <Button className="w-full mt-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold">
                    Join Newsletter
                  </Button>
                </div>
              </div>
            </div>

            {/* List */}
            <div className="lg:flex-1">
              {loading ? (
                <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                  <Loader className="w-12 h-12 animate-spin mx-auto text-primary mb-4 opacity-20" />
                  <p className="text-gray-500 font-medium italic">Synchronizing announcements...</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-100 text-red-600 p-8 rounded-3xl text-center">
                  <p className="font-bold text-lg mb-2">Oops! Something went wrong.</p>
                  <p className="text-sm opacity-80 mb-4">{error}</p>
                  <Button onClick={fetchAnnouncements} variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                    Retry Connection
                  </Button>
                </div>
              ) : filteredAnnouncements.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 border-dashed">
                  <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Newspaper size={32} className="text-gray-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No updates found</h3>
                  <p className="text-gray-500 max-w-xs mx-auto">There are currently no announcements in the "{activeCategory}" category.</p>
                  {activeCategory !== 'All' && (
                    <Button onClick={() => setActiveCategory('All')} variant="link" className="mt-4 text-primary font-bold">
                      View all categories
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredAnnouncements.map(announcement => (
                    <Card key={announcement.id} className="group overflow-hidden border-none shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 rounded-3xl bg-white">
                      <CardContent className="p-0 flex flex-col md:flex-row">
                        {announcement.image_url && (
                          <div className="md:w-64 h-48 md:h-auto overflow-hidden">
                            <img
                              src={announcement.image_url}
                              alt={announcement.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <div className="flex-1 p-8">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="flex items-center text-xs font-bold text-primary uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full">
                              {getCategoryIcon(announcement.category)}
                              {announcement.category}
                            </div>
                            <div className="flex items-center text-xs text-gray-400 font-medium">
                              <Calendar size={12} className="mr-1" />
                              {new Date(announcement.published_at).toLocaleDateString('en-US', {
                                month: 'long', day: 'numeric', year: 'numeric'
                              })}
                            </div>
                          </div>

                          <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors leading-tight">
                            {announcement.title}
                          </h3>

                          <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                            {announcement.content}
                          </p>

                          <div className="flex items-center justify-between">
                            {announcement.link ? (
                              <Button className="rounded-xl px-6 bg-gray-900 hover:bg-primary transition-colors text-white text-sm font-bold group/btn">
                                Full Article
                                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                              </Button>
                            ) : (
                              <div />
                            )}

                            <Badge variant="outline" className="border-gray-100 text-gray-400 font-medium">
                              #{announcement.id.toString().padStart(4, '0')}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
