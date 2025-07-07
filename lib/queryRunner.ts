import { mockData } from './mockData';
import { QueryResult } from '../types';

// Define valid table names
const VALID_TABLES = ['users', 'orders', 'products', 'categories'] as const;
type ValidTableName = typeof VALID_TABLES[number];

function isValidTableName(tableName: string): tableName is ValidTableName {
  return VALID_TABLES.includes(tableName as ValidTableName);
}

export class QueryRunner {
  static async executeQuery(query: string): Promise<QueryResult> {
    const startTime = Date.now();
    
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Basic query parsing (very simplified)
    const normalizedQuery = query.trim().toLowerCase();
    
    // Extract table name from SELECT statement
    const selectMatch = normalizedQuery.match(/select\s+.*?\s+from\s+(\w+)/);
    const tableName = selectMatch ? selectMatch[1] : null;
    
    if (!tableName) {
      throw new Error('Invalid query: Could not parse table name');
    }
    
    if (!isValidTableName(tableName)) {
      const availableTables = VALID_TABLES.join(', ');
      throw new Error(`Table '${tableName}' does not exist. Available tables: ${availableTables}`);
    }
    
    let data = mockData[tableName];
    
    // Handle LIMIT clause
    const limitMatch = normalizedQuery.match(/limit\s+(\d+)/);
    if (limitMatch) {
      const limit = parseInt(limitMatch[1], 10);
      data = data.slice(0, limit);
    }
    
    const endTime = Date.now();
    
    return {
      query,
      data,
      executionTime: endTime - startTime,
      rowCount: data.length,
    };
  }
  
  static validateQuery(query: string): { isValid: boolean; error?: string } {
    const normalizedQuery = query.trim().toLowerCase();
    
    if (!normalizedQuery.startsWith('select')) {
      return { isValid: false, error: 'Only SELECT queries are supported' };
    }
    
    const selectMatch = normalizedQuery.match(/select\s+.*?\s+from\s+(\w+)/);
    if (!selectMatch) {
      return { isValid: false, error: 'Invalid query syntax' };
    }
    
    const tableName = selectMatch[1];
    if (!isValidTableName(tableName)) {
      const availableTables = VALID_TABLES.join(', ');
      return { isValid: false, error: `Table '${tableName}' does not exist. Available tables: ${availableTables}` };
    }
    
    return { isValid: true };
  }
}