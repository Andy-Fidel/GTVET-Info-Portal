import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { institutionsAPI } from '../services/api'
import { useAppStore } from '../store/appStore'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/Select'
import { Search, Loader, MapPin, Building2, ExternalLink, ChevronLeft, ChevronRight, Filter, X } from 'lucide-react'

export default function Institutions() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [regionFilter, setRegionFilter] = useState(searchParams.get('region') || '')
  const [typeFilter, setTypeFilter] = useState(searchParams.get('type') || '')
  const [displayInstitutions, setDisplayInstitutions] = useState([])
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0
  })

  const { loading, setLoading, error, setError } = useAppStore()

  useEffect(() => {
    const search = searchParams.get('search') || ''
    const region = searchParams.get('region') || ''
    const type = searchParams.get('type') || ''
    const programId = searchParams.get('program_id') || ''

    setSearchTerm(search)
    setRegionFilter(region)
    setTypeFilter(type)

    fetchInstitutions(1, search, region, type, programId)
  }, [searchParams])

  const fetchInstitutions = async (page = 1, search = searchTerm, region = regionFilter, type = typeFilter, programId = searchParams.get('program_id')) => {
    try {
      setLoading(true)
      const response = await institutionsAPI.getAll({
        page,
        search,
        region,
        type,
        program_id: programId,
        per_page: 12
      })
      setDisplayInstitutions(response.data.data)
      setPagination({
        current_page: response.data.pagination.current_page,
        last_page: response.data.pagination.last_page,
        total: response.data.pagination.total
      })
      setError(null)
    } catch (err) {
      console.error('Error fetching institutions:', err)
      setError('Failed to load institutions. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // Update URL search params
    const params = {}
    if (searchTerm) params.search = searchTerm
    if (regionFilter) params.region = regionFilter
    if (typeFilter) params.type = typeFilter
    setSearchParams(params)

    fetchInstitutions(1, searchTerm, regionFilter, typeFilter)
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.last_page) {
      fetchInstitutions(newPage)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-r from-primary via-blue-800 to-blue-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">TVET Institutions</h2>
            <p className="text-lg text-blue-100/90 leading-relaxed">
              Explore and find accredited technical and vocational training institutions across Ghana.
              Quality education for a better future.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 -mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-4 rounded-2xl shadow-xl shadow-gray-200/50 mb-10">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    type="text"
                    placeholder="Search by name, location, or region..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-14 text-lg border-none bg-gray-50 focus-visible:ring-1 focus-visible:ring-primary/20 rounded-xl w-full"
                  />
                </div>
                <Button type="submit" size="lg" className="h-14 px-8 rounded-xl font-bold">
                  Search
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-gray-100 mt-4">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-wider">
                  <Filter size={16} /> Filters:
                </div>

                <div className="w-full sm:w-48">
                  <Select value={regionFilter} onValueChange={(val) => {
                    const newVal = val === 'all' ? '' : val
                    setRegionFilter(newVal)
                    fetchInstitutions(1, searchTerm, newVal, typeFilter)
                    // Update URL
                    const params = {}
                    if (searchTerm) params.search = searchTerm
                    if (newVal) params.region = newVal
                    if (typeFilter) params.type = typeFilter
                    setSearchParams(params)
                  }}>
                    <SelectTrigger className="h-11 bg-gray-50 border-none rounded-xl font-medium focus:ring-1 focus:ring-primary/20">
                      <SelectValue placeholder="All Regions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Regions</SelectItem>
                      {[
                        "Ahafo", "Ashanti", "Bono", "Bono East", "Central", "Eastern",
                        "Greater Accra", "North East", "Northern", "Oti", "Savannah",
                        "Upper East", "Upper West", "Volta", "Western", "Western North"
                      ].map(region => (
                        <SelectItem key={region} value={region}>{region}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-full sm:w-48">
                  <Select value={typeFilter} onValueChange={(val) => {
                    const newVal = val === 'all' ? '' : val
                    setTypeFilter(newVal)
                    fetchInstitutions(1, searchTerm, regionFilter, newVal)
                    // Update URL
                    const params = {}
                    if (searchTerm) params.search = searchTerm
                    if (regionFilter) params.region = regionFilter
                    if (newVal) params.type = newVal
                    setSearchParams(params)
                  }}>
                    <SelectTrigger className="h-11 bg-gray-50 border-none rounded-xl font-medium focus:ring-1 focus:ring-primary/20">
                      <SelectValue placeholder="Institution Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Public">Public</SelectItem>
                      <SelectItem value="Private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(searchTerm || regionFilter || typeFilter || searchParams.get('program_id')) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchTerm('')
                      setRegionFilter('')
                      setTypeFilter('')
                      setSearchParams({})
                      fetchInstitutions(1, '', '', '', '')
                    }}
                    className="text-gray-400 hover:text-primary font-bold gap-1"
                  >
                    <X size={14} /> Clear
                  </Button>
                )}
              </div>
            </form>
          </div>

          {loading && (
            <div className="text-center py-20">
              <Loader className="w-10 h-10 animate-spin mx-auto text-primary mb-4" />
              <p className="text-lg text-gray-500 font-medium">Finding institutions...</p>
            </div>
          )}

          {error && (
            <div className="max-w-md mx-auto bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-2xl text-center shadow-sm">
              <p className="font-semibold">{error}</p>
            </div>
          )}

          {!loading && displayInstitutions.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
              <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="text-gray-300" size={40} />
              </div>
              <p className="text-gray-500 text-xl font-medium">No institutions found matching your criteria.</p>
              <Button
                variant="link"
                onClick={() => {
                  setSearchTerm('')
                  setRegionFilter('')
                  setTypeFilter('')
                  setSearchParams({})
                  fetchInstitutions(1, '', '', '')
                }}
                className="text-primary font-bold mt-2"
              >
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className="space-y-12">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayInstitutions.map(institution => (
                  <Card key={institution.id} className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-none bg-white overflow-hidden rounded-3xl">
                    <div className="aspect-video relative overflow-hidden bg-gray-100">
                      {institution.image_url ? (
                        <img
                          src={institution.image_url}
                          alt={institution.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <Building2 size={48} className="text-gray-300" />
                        </div>
                      )}
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/90 text-primary backdrop-blur-md border-none px-3 py-1 font-bold">
                          {institution.type || 'Public'}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl font-bold line-clamp-1 group-hover:text-primary transition-colors">
                        {institution.name}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1.5 text-gray-500 font-medium">
                        <MapPin size={16} className="text-primary/70" />
                        {institution.location}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <p className="text-sm text-gray-500 mb-6 line-clamp-2 leading-relaxed">
                        {institution.description || 'Providing quality technical and vocational education to empower the next generation of professionals.'}
                      </p>

                      <div className="flex items-center justify-between py-4 border-t border-gray-50">
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Programs</span>
                          <span className="text-lg font-bold text-gray-900">
                            {institution.programs_count || 0}
                          </span>
                        </div>

                        {institution.established_year && (
                          <div className="flex flex-col items-end">
                            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Est. Year</span>
                            <span className="text-sm font-bold text-gray-700">{institution.established_year}</span>
                          </div>
                        )}
                      </div>

                      <Button asChild variant="default" className="w-full mt-2 rounded-xl h-11 font-bold shadow-lg shadow-primary/20 group-hover:bg-blue-700">
                        <Link to={`/institutions/${institution.id}`}>
                          View Details <ExternalLink size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination Controls */}
              {pagination.last_page > 1 && (
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-500 font-medium tracking-tight">
                    Showing <span className="font-bold text-gray-900">{displayInstitutions.length}</span> of <span className="font-bold text-gray-900">{pagination.total}</span> institutions
                  </p>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-xl font-bold border-gray-200 hover:bg-gray-50 text-gray-600 disabled:opacity-50"
                      onClick={() => handlePageChange(pagination.current_page - 1)}
                      disabled={pagination.current_page === 1}
                    >
                      <ChevronLeft size={18} className="mr-1" /> Previous
                    </Button>

                    <div className="flex items-center px-4 h-11 bg-gray-50 rounded-xl border border-gray-100 font-bold text-gray-900">
                      Page {pagination.current_page} of {pagination.last_page}
                    </div>

                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-xl font-bold border-gray-200 hover:bg-gray-50 text-gray-600 disabled:opacity-50"
                      onClick={() => handlePageChange(pagination.current_page + 1)}
                      disabled={pagination.current_page === pagination.last_page}
                    >
                      Next <ChevronRight size={18} className="ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
