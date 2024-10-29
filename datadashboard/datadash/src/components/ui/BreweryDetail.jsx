// BreweryDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Map, Phone, Globe, ArrowLeft } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const BreweryDetail = () => {
  const { id } = useParams();
  const [brewery, setBrewery] = useState(null);
  const [nearbyBreweries, setNearbyBreweries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBreweryDetails = async () => {
      try {
        const response = await fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`);
        const data = await response.json();
        setBrewery(data);

        // Fetch nearby breweries in the same city
        const nearbyResponse = await fetch(
          `https://api.openbrewerydb.org/v1/breweries?by_city=${encodeURIComponent(data.city)}&per_page=5`
        );
        const nearbyData = await nearbyResponse.json();
        setNearbyBreweries(nearbyData.filter(b => b.id !== id));
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching brewery details:', error);
        setLoading(false);
      }
    };

    fetchBreweryDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading brewery details...</p>
      </div>
    );
  }

  if (!brewery) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <p>Brewery not found</p>
            <Link to="/" className="text-blue-500 hover:underline">
              Return to Dashboard
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Sample data for visualizations
  const monthlyVisitors = [
    { month: 'Jan', visitors: Math.floor(Math.random() * 1000) + 500 },
    { month: 'Feb', visitors: Math.floor(Math.random() * 1000) + 500 },
    { month: 'Mar', visitors: Math.floor(Math.random() * 1000) + 500 },
    { month: 'Apr', visitors: Math.floor(Math.random() * 1000) + 500 },
    { month: 'May', visitors: Math.floor(Math.random() * 1000) + 500 },
    { month: 'Jun', visitors: Math.floor(Math.random() * 1000) + 500 },
  ];

  const beerTypes = [
    { name: 'IPA', value: 35 },
    { name: 'Lager', value: 25 },
    { name: 'Stout', value: 20 },
    { name: 'Ale', value: 20 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center text-blue-500 hover:underline mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg mb-8">
        <h1 className="text-4xl font-bold mb-2">{brewery.name}</h1>
        <p className="text-lg opacity-90">{brewery.brewery_type} brewery</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Location Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <Map className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p>{brewery.street}</p>
                  <p>{brewery.city}, {brewery.state}</p>
                  <p>{brewery.postal_code}</p>
                </div>
              </div>
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyVisitors}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="visitors"
                    stroke="#4F46E5"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Beer Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={beerTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {beerTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nearby Breweries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nearbyBreweries.map(nearby => (
                <Link
                  key={nearby.id}
                  to={`/brewery/${nearby.id}`}
                  className="block p-4 rounded-lg border hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold">{nearby.name}</h3>
                  <p className="text-sm text-gray-500">{nearby.brewery_type}</p>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BreweryDetail;