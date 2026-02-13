import { useState, useEffect } from 'react'
import { programsAPI } from '../services/api'
import { useAppStore } from '../store/appStore'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Loader, Building2, Award } from 'lucide-react'

export default function Programs() {
  const [filterCategory, setFilterCategory] = useState('')
  const [filteredPrograms, setFilteredPrograms] = useState([])
  const { programs, setPrograms, loading, setLoading, error, setError } = useAppStore()

  useEffect(() => {
    fetchPrograms()
  }, [])

  useEffect(() => {
    if (filterCategory) {
      const filtered = programs.filter(prog =>
        prog.category.toLowerCase().includes(filterCategory.toLowerCase())
      )
      setFilteredPrograms(filtered)
    } else {
      setFilteredPrograms(programs)
    }
  }, [filterCategory, programs])

  const fetchPrograms = async () => {
    try {
      setLoading(true)
      const response = await programsAPI.getAll()
      setPrograms(response.data.data || response.data)
    } catch (err) {
      setError(err.message || 'Failed to load programs')
    } finally {
      setLoading(false)
    }
  }

  const categories = ['All', 'Engineering', 'Business', 'Agriculture', 'Health', 'ICT', 'Hospitality']

  return (
    <div>
      <section className="bg-gradient-to-r from-primary to-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-2">Training Programs</h2>
          <p className="text-gray-200">Explore diverse TVET training programs</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex gap-2 overflow-x-auto pb-4">
            {categories.map(cat => (
              <Button
                key={cat}
                onClick={() => setFilterCategory(cat === 'All' ? '' : cat)}
                variant={(cat === 'All' && !filterCategory) || filterCategory === cat ? 'default' : 'outline'}
                className="whitespace-nowrap"
              >
                {cat}
              </Button>
            ))}
          </div>

          {loading && (
            <div className="text-center py-12">
              <Loader className="w-8 h-8 animate-spin mx-auto text-primary mb-2" />
              <p className="text-lg text-gray-600">Loading programs...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center">
              {error}
            </div>
          )}

          {!loading && filteredPrograms.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No programs found in this category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredPrograms.map(program => (
                <Card key={program.id} className="border-l-4 border-l-secondary hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{program.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="primary">{program.category}</Badge>
                      <span className="text-xs text-gray-500 font-medium">{program.code}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-primary font-semibold">
                      <Building2 className="w-4 h-4" />
                      <span>Offered by {program.institutions_count || 0} {program.institutions_count === 1 ? 'institution' : 'institutions'}</span>
                    </div>

                    {program.level && (
                      <div className="flex items-start gap-2 text-sm text-gray-700">
                        <Award className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                        <span>Level: {program.level}</span>
                      </div>
                    )}

                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Description</h4>
                      <p className="text-sm text-gray-600 line-clamp-2">{program.description}</p>
                    </div>

                    {program.career_paths && (
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Career Paths</h4>
                        <div className="flex flex-wrap gap-1">
                          {program.career_paths.split(',').map((path, idx) => (
                            <Badge key={idx} variant="outline" className="text-[10px] py-0 px-2 bg-gray-50">
                              {path.trim()}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button
                      variant="default"
                      className="w-full mt-4"
                      onClick={() => window.location.href = `/institutions?program_id=${program.id}`}
                    >
                      View Offering Institutions
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
