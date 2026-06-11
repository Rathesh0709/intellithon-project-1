import { useState } from 'react';
import { checkApiHealth } from '../utils/api';
import { AlertCircle, CheckCircle, Wifi, WifiOff } from 'lucide-react';

export default function ApiTestComponent() {
  const [apiStatus, setApiStatus] = useState(null);
  const [testing, setTesting] = useState(false);

  const testApiConnection = async () => {
    setTesting(true);
    try {
      const isHealthy = await checkApiHealth();
      setApiStatus(isHealthy ? 'connected' : 'disconnected');
    } catch (error) {
      console.error('API test failed:', error);
      setApiStatus('error');
    } finally {
      setTesting(false);
    }
  };

  const getStatusIcon = () => {
    switch (apiStatus) {
      case 'connected':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'disconnected':
        return <WifiOff className="w-5 h-5 text-red-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Wifi className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusText = () => {
    switch (apiStatus) {
      case 'connected':
        return 'API Connected';
      case 'disconnected':
        return 'API Disconnected';
      case 'error':
        return 'API Error';
      default:
        return 'Test API Connection';
    }
  };

  const getStatusColor = () => {
    switch (apiStatus) {
      case 'connected':
        return 'text-green-600';
      case 'disconnected':
        return 'text-red-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">API Connection Test</h3>
      <div className="flex items-center space-x-4">
        <button
          onClick={testApiConnection}
          disabled={testing}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {testing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Testing...</span>
            </>
          ) : (
            <>
              {getStatusIcon()}
              <span>{getStatusText()}</span>
            </>
          )}
        </button>
        
        {apiStatus && (
          <div className={`flex items-center space-x-2 ${getStatusColor()}`}>
            {getStatusIcon()}
            <span className="text-sm font-medium">
              {apiStatus === 'connected' ? 'Ready for video analysis' : 'Check API server'}
            </span>
          </div>
        )}
      </div>
      
      {apiStatus === 'disconnected' && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            Make sure your video analysis API is running on <code className="bg-yellow-100 px-1 rounded">http://127.0.0.1:7000</code>
          </p>
        </div>
      )}
    </div>
  );
}
