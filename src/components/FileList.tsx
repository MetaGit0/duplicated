import React from 'react';
import { Folder } from 'lucide-react';

interface FileListProps {
  path: string;
}

const FileList: React.FC<FileListProps> = ({ path }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-md">
      <div className="flex items-center text-gray-700 mb-2">
        <Folder size={24} className="mr-2 text-blue-500" />
        <span className="font-semibold">Current Directory:</span>
      </div>
      <p className="text-gray-600 break-all">{path || 'No directory selected'}</p>
    </div>
  );
};

export default FileList;