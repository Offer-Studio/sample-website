import React from 'react';
import JsonPageRenderer from '@/components/json-renderer/JsonPageRenderer';
import pageConfig from '@/config/pages/other-notes.json';

export default function OtherNotesPage() {
  return <JsonPageRenderer pageConfig={pageConfig} />;
} 