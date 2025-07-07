import React from 'react';
import { Clock, BarChart3, Copy, Download } from 'lucide-react';
import { QueryResult } from '../../types';

interface QueryOutputProps {
  result: QueryResult;
}

export default function QueryOutput({ result }: QueryOutputProps) {
  const formatValue = (value: unknown) => {
    if (value === null || value === undefined) {
      return <span className="text-gray-400 italic">null</span>;
    }
    if (typeof value === 'boolean') {
      return <span className={value ? 'text-green-600' : 'text-red-600'}>{String(value)}</span>;
    }
    if (typeof value === 'number') {
      return <span className="text-blue-600">{value}</span>;
    }
    if (typeof value === 'string' && value.includes('T') && value.includes('Z')) {
      // Likely a timestamp
      return <span className="text-purple-600">{new Date(value).toLocaleString()}</span>;
    }
    return String(value);
  };

  const copyQuery = () => {
    navigator.clipboard.writeText(result.query);
  };

  const downloadCSV = () => {
    if (!result.data.length) return;

    const headers = Object.keys(result.data[0]);
    const csvContent = [
      headers.join(','),
      ...result.data.map(row => 
        headers.map(header => {
          const value = row[header];
          return typeof value === 'string' ? `"${value}"` : value;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'query_results.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const columns = result.data.length > 0 ? Object.keys(result.data[0]) : [];

  return (
    <div className="space-y-4">
      {/* Query Header */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900">Query Results</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={copyQuery}
              className="flex items-center space-x-1 px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              <Copy className="w-3 h-3" />
              <span>Copy Query</span>
            </button>
            {result.data.length > 0 && (
              <button
                onClick={downloadCSV}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
              >
                <Download className="w-3 h-3" />
                <span>Download CSV</span>
              </button>
            )}
          </div>
        </div>

        <div className="bg-gray-800 text-gray-100 p-3 rounded font-mono text-sm overflow-x-auto">
          <code>{result.query}</code>
        </div>

        <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <BarChart3 className="w-4 h-4" />
            <span>{result.rowCount} rows</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{result.executionTime}ms</span>
          </div>
        </div>
      </div>

      {/* Results Table */}
      {result.data.length > 0 ? (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {result.data.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-50">
                    {columns.map((column) => (
                      <td
                        key={column}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      >
                        {formatValue(row[column])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 border border-gray-200 rounded-lg">
          <p className="text-gray-500">No results returned</p>
        </div>
      )}
    </div>
  );
}