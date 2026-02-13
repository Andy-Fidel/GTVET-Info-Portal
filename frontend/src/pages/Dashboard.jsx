import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { dashboardAPI } from '../services/api';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
    Tooltip,
    RadialBarChart,
    RadialBar
} from 'recharts';
import {
    Users,
    Building2,
    BookOpen,
    MapPin,
    School,
    GraduationCap
} from 'lucide-react';
import { cn } from '../lib/utils';

// Custom colors for the charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await dashboardAPI.getStats();
                setStats(response.data);
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return <div className="p-8 text-center">Loading dashboard...</div>;
    }

    if (!stats) return null;

    const { counts, charts } = stats;

    const StatCard = ({ title, value, icon: Icon, description, trend, trendUp }) => (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                    {trend && (
                        <span className={cn("mr-1 font-medium", trendUp ? "text-green-600" : "text-red-600")}>
                            {trend}
                        </span>
                    )}
                    <span>{description}</span>
                </div>
            </CardContent>
        </Card>
    );

    const CategoryCard = ({ title, value, subtext, bgColor, icon: Icon }) => (
        <Card className={cn("border-none shadow-sm", bgColor)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-800">{title}</CardTitle>
                <Icon className="h-4 w-4 text-slate-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-slate-900">{value}</div>
                <p className="text-xs text-slate-600">{subtext}</p>
            </CardContent>
        </Card>
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Overview of Ghana TVET institutions and programmes</p>
            </div>

            {/* Top Stats Row */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Regions"
                    value={16}
                    icon={MapPin}
                    description="All regions covered"
                />
                <StatCard
                    title="Public Institutions"
                    value={counts.public_institutions}
                    icon={Building2}
                    trend="+8%"
                    trendUp={true}
                    description="from last month"
                />
                <StatCard
                    title="Private Institutions"
                    value={counts.private_institutions}
                    icon={School}
                    trend="+12%"
                    trendUp={true}
                    description="from last month"
                />
                <StatCard
                    title="Total Programmes"
                    value={counts.total_programmes}
                    icon={GraduationCap}
                    trend="+5%"
                    trendUp={true}
                    description="from last month"
                />
            </div>

            {/* Category Stats Row */}
            <div className="grid gap-4 md:grid-cols-3">
                <CategoryCard
                    title="Category A Institutions"
                    value={counts.categories.A}
                    subtext="Technical universities"
                    bgColor="bg-blue-50 dark:bg-blue-950"
                    icon={GraduationCap}
                />
                <CategoryCard
                    title="Category B Institutions"
                    value={counts.categories.B}
                    subtext="Technical institutes"
                    bgColor="bg-green-50 dark:bg-green-950"
                    icon={GraduationCap}
                />
                <CategoryCard
                    title="Category C Institutions"
                    value={counts.categories.C}
                    subtext="Vocational centers"
                    bgColor="bg-purple-50 dark:bg-purple-950"
                    icon={Building2}
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Charts Section */}
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Most Programmes by Field</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={charts.programmes_by_field}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {charts.programmes_by_field.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Institutions by Region</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={charts.institutions_by_region}>
                                    <RadialBar
                                        minAngle={15}
                                        label={{ position: 'insideStart', fill: '#fff' }}
                                        background
                                        clockWise
                                        dataKey="count"
                                    />
                                    <Legend iconSize={10} w />
                                    <Tooltip />
                                </RadialBarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
