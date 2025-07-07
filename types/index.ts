export interface DatabaseConnection {
    type: 'postgresql' | 'mysql';
    host: string;
    port: number;
    username: string;
    password: string;
    isConnected: boolean;
  }
  
  export interface Column {
    name: string;
    type: string;
    nullable: boolean;
    primaryKey?: boolean;
  }
  
  export interface Table {
    name: string;
    columns: Column[];
  }
  
  export interface Schema {
    tables: Table[];
  }
  
  export interface QueryResult {
    query: string;
    data: Record<string, any>[];
    executionTime: number;
    rowCount: number;
  }
  
  export interface ChatMessage {
    id: string;
    content: string;
    timestamp: Date;
    type: 'user' | 'system';
  }
  
  export type SidebarTab = 'connect' | 'schema' | 'chat';
  
  export interface AppState {
    connection: DatabaseConnection | null;
    schema: Schema | null;
    currentTab: SidebarTab;
    isLoading: boolean;
    error: string | null;
    queryResult: QueryResult | null;
    chatMessages: ChatMessage[];
  }