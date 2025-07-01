import { useState } from 'react';
import Navigation from '@/components/Navigation';
import RecentClassifications from '@/components/RecentClassifications';
import AlertsAndActions from '@/components/AlertsAndActions';
import AuditTrail from '@/components/AuditTrail';
import AIChatInterface from '@/components/ui/AIChatInterfaceProps';
import { Code, FileText, Truck } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [chatMessage, setChatMessage] = useState('');
  const [activeTab, setActiveTab] = useState('classification');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />

      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Panel - Dashboard & Tools */}
        <div className="w-1/2 p-6 overflow-y-auto bg-slate-50">
          {/* AI Engine Tabs */}
          <div className="mb-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 h-12 bg-slate-50">
                <TabsTrigger value="classification" className="flex items-center space-x-2">
                  <Code className="w-4 h-4" />
                  <span className="hidden sm:inline">HS Code Classification</span>
                  <span className="sm:hidden">Classification</span>
                </TabsTrigger>
                <TabsTrigger value="documents" className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Document Processing</span>
                  <span className="sm:hidden">Documents</span>
                </TabsTrigger>
                <TabsTrigger value="tracking" className="flex items-center space-x-2">
                  <Truck className="w-4 h-4" />
                  <span className="hidden sm:inline">Shipment Tracking</span>
                  <span className="sm:hidden">Tracking</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <RecentClassifications />
          <AlertsAndActions />
          <AuditTrail />
        </div>

        {/* Right Panel - AI Interface */}
        <AIChatInterface 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          chatMessage={chatMessage}
          setChatMessage={setChatMessage}
        />
      </div>
    </div>
  );
};

export default Index;