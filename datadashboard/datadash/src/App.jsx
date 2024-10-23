import "./styles/globals.css"
import './index.css'
import { useState, useEffect } from 'react';
import { Search, Filter, Map, Phone, Globe, ArrowUpDown } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const BreweryDashboard = () => {
  const [breweries, setBreweries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [stateFilter, setStateFilter] = useState('all');
  const [hasWebsiteFilter, setHasWebsiteFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [stats, setStats] = useState({
    total: 0,
    byType: {},
    byState: {},
    websiteStats: { with: 0, without: 0 },
    averagePerState: 0
  });

  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        const response = await fetch('https://api.openbrewerydb.org/v1/breweries?per_page=50');
        const data = await response.json();
        setBreweries(data);
        
        // Calculate enhanced statistics
        const typeCount = data.reduce((acc, brewery) => {
          acc[brewery.brewery_type] = (acc[brewery.brewery_type] || 0) + 1;
          return acc;
        }, {});
        
        const stateCount = data.reduce((acc, brewery) => {
          acc[brewery.state] = (acc[brewery.state] || 0) + 1;
          return acc;
        }, {});

        const withWebsite = data.filter(b => b.website_url).length;

        const uniqueStates = [...new Set(data.map(b => b.state))];
        const avgPerState = data.length / uniqueStates.length;

        setStats({
          total: data.length,
          byType: typeCount,
          byState: stateCount,
          websiteStats: {
            with: withWebsite,
            without: data.length - withWebsite
          },
          averagePerState: avgPerState.toFixed(1)
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching breweries:', error);
        setLoading(false);
      }
    };

    fetchBreweries();
  }, []);

  const sortData = (data) => {
    return [...data].sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const filteredBreweries = breweries.filter(brewery => {
    const matchesSearch = brewery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         brewery.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || brewery.brewery_type === typeFilter;
    const matchesState = stateFilter === 'all' || brewery.state === stateFilter;
    const matchesWebsite = hasWebsiteFilter === 'all' || 
                          (hasWebsiteFilter === 'yes' && brewery.website_url) ||
                          (hasWebsiteFilter === 'no' && !brewery.website_url);
    
    return matchesSearch && matchesType && matchesState && matchesWebsite;
  });

  const sortedBreweries = sortData(filteredBreweries);
  const uniqueTypes = [...new Set(breweries.map(b => b.brewery_type))];
  const uniqueStates = [...new Set(breweries.map(b => b.state))];

  // Prepare data for visualizations
  const typeChartData = Object.entries(stats.byType).map(([type, count]) => ({
    name: type,
    count: count
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading brewery data...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg mb-8">
        <h1 className="text-4xl font-bold mb-2">Brewery Dashboard</h1>
        <p className="text-lg opacity-90">Exploring America's Craft Beer Landscape</p>
      </div>
      
      {/* Enhanced Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Total Breweries</CardTitle>
            <CardDescription>In database</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Average per State</CardTitle>
            <CardDescription>Brewery distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.averagePerState}</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Online Presence</CardTitle>
            <CardDescription>Breweries with websites</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.websiteStats.with}</p>
            <p className="text-sm text-gray-500">
              ({((stats.websiteStats.with / stats.total) * 100).toFixed(1)}%)
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Most Common Type</CardTitle>
            <CardDescription>Brewery category</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold capitalize">
              {Object.entries(stats.byType).sort((a, b) => b[1] - a[1])[0][0]}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Visualization */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Brewery Types Distribution</CardTitle>
          <CardDescription>Number of breweries by type</CardDescription>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={typeChartData}>
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Enhanced Search and Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Search and Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search breweries..."
              className="flex-1 p-2 bg-transparent outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-4">
            <select
              className="p-2 rounded-lg border hover:border-blue-500 transition-colors"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              {uniqueTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select
              className="p-2 rounded-lg border hover:border-blue-500 transition-colors"
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
            >
              <option value="all">All States</option>
              {uniqueStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>

            <select
              className="p-2 rounded-lg border hover:border-blue-500 transition-colors"
              value={hasWebsiteFilter}
              onChange={(e) => setHasWebsiteFilter(e.target.value)}
            >
              <option value="all">All Websites</option>
              <option value="yes">Has Website</option>
              <option value="no">No Website</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Breweries List */}
      <Card>
        <CardHeader>
          <CardTitle>Breweries ({sortedBreweries.length})</CardTitle>
          <div className="flex gap-4">
            <button
              onClick={() => handleSort('name')}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600"
            >
              <ArrowUpDown className="w-4 h-4" />
              Sort by Name
            </button>
            <button
              onClick={() => handleSort('state')}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600"
            >
              <ArrowUpDown className="w-4 h-4" />
              Sort by State
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {sortedBreweries.map(brewery => (
            <div 
              key={brewery.id}
              className="p-4 rounded-lg border hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">{brewery.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <Map className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p>{brewery.street}</p>
                    <p>{brewery.city}, {brewery.state}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {brewery.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{brewery.phone}</span>
                    </div>
                  )}
                  {brewery.website_url && (
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <a
                        href={brewery.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-2">
                <span className="inline-block px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
                  {brewery.brewery_type}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default BreweryDashboard;