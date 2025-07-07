import React from 'react';
import { AppProvider } from '../../context/AppContext';
import Sidebar from '../../components/SideBar';
import MainContent from '../../components/MainContent';
import Toast from '../../components/Toast';

export default function NotebookPage() {
  return (
    <AppProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <MainContent />
        <Toast />
      </div>
    </AppProvider>
  );
}