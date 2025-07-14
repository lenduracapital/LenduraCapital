import { useState, useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart, LineChart, Activity, MousePointer, Clock, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface AnalyticsData {
  ctaClicks: Array<{
    name: string;
    location: string;
    count: number;
    lastClicked: string;
  }>;
  pageViews: Array<{
    page: string;
    views: number;
    avgTimeSpent: number;
  }>;
  topPages: Array<{
    page: string;
    views: number;
    bounceRate: number;
  }>;
  scrollDepth: {
    "25%": number;
    "50%": number;
    "75%": number;
    "90%": number;
  };
}

export default function AnalyticsDashboard() {
  const { data: analyticsData, isLoading } = useQuery<AnalyticsData>({
    queryKey: ['/api/admin/analytics'],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-2">Track user engagement and CTA performance</p>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="cta">CTA Tracking</TabsTrigger>
              <TabsTrigger value="pages">Page Analytics</TabsTrigger>
              <TabsTrigger value="engagement">User Engagement</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {analyticsData?.pageViews.reduce((sum, page) => sum + page.views, 0) || 0}
                    </div>
                    <p className="text-xs text-muted-foreground">All pages combined</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total CTA Clicks</CardTitle>
                    <MousePointer className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {analyticsData?.ctaClicks.reduce((sum, cta) => sum + cta.count, 0) || 0}
                    </div>
                    <p className="text-xs text-muted-foreground">All CTAs combined</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Time on Site</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {analyticsData?.pageViews.length ? 
                        Math.round(analyticsData.pageViews.reduce((sum, page) => sum + page.avgTimeSpent, 0) / analyticsData.pageViews.length) 
                        : 0}s
                    </div>
                    <p className="text-xs text-muted-foreground">Average across all pages</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Scroll Completion</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {analyticsData?.scrollDepth?.["90%"] || 0}%
                    </div>
                    <p className="text-xs text-muted-foreground">Users reaching 90% depth</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="cta" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>CTA Click Tracking</CardTitle>
                  <CardDescription>Monitor which call-to-action buttons are performing best</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {isLoading ? (
                      <p>Loading...</p>
                    ) : (
                      analyticsData?.ctaClicks.map((cta, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">{cta.name}</p>
                            <p className="text-sm text-gray-500">{cta.location}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold" style={{ color: '#85abe4' }}>{cta.count}</p>
                            <p className="text-xs text-gray-500">clicks</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pages" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Top Pages by Views</CardTitle>
                  <CardDescription>See which pages attract the most visitors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {isLoading ? (
                      <p>Loading...</p>
                    ) : (
                      analyticsData?.topPages.map((page, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium">{page.page}</p>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-sm text-gray-500">{page.views} views</span>
                              <span className="text-sm text-gray-500">Bounce: {page.bounceRate}%</span>
                            </div>
                          </div>
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full" 
                              style={{ 
                                width: `${(page.views / (analyticsData?.topPages[0]?.views || 1)) * 100}%`,
                                backgroundColor: '#85abe4'
                              }}
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="engagement" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Engagement Metrics</CardTitle>
                  <CardDescription>Understanding how users interact with your content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Scroll Depth Distribution</h4>
                      <div className="space-y-3">
                        {Object.entries(analyticsData?.scrollDepth || {}).map(([depth, percentage]) => (
                          <div key={depth} className="flex items-center gap-3">
                            <span className="w-12 text-sm font-medium">{depth}</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="h-2 rounded-full" 
                                style={{ 
                                  width: `${percentage}%`,
                                  backgroundColor: '#85abe4'
                                }}
                              />
                            </div>
                            <span className="text-sm text-gray-600 w-12 text-right">{percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Average Time per Page</h4>
                      <div className="space-y-2">
                        {analyticsData?.pageViews.slice(0, 5).map((page, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-sm">{page.page}</span>
                            <span className="text-sm font-medium">{page.avgTimeSpent}s</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 text-center">
            <Button variant="outline" onClick={() => window.location.reload()}>
              Refresh Data
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}