import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, TablePagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import FileUploader from '../components/dataRoom/FileUploader';
import SearchAndFilter from '../components/dataRoom/SearchAndFilter';
import { auth } from '../config/firebase';
import { getDocuments, deleteDocument } from '../services/firestore';
import { FileData } from '../types/fileTypes';
import DeleteIcon from '@mui/icons-material/Delete';
import GetAppIcon from '@mui/icons-material/GetApp';
import { deleteFileFromStorage } from '../services/storage';
import { collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const DataRoom: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const fetchFiles = useCallback(async () => {
    setIsLoading(true);
    try {
      const files = await getDocuments('files', [{ field: 'userId', operator: '==', value: auth.currentUser?.uid }]);
      setUploadedFiles(files as FileData[]);
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/login');
      } else {
        fetchFiles();
      }
    });

    return () => unsubscribe();
  }, [navigate, fetchFiles]);

  const handleFileUploaded = (fileData: Omit<FileData, 'id'>) => {
    setUploadedFiles(prev => [...prev, { ...fileData, id: Date.now().toString() }]);
  };

  const handleDeleteFile = async (fileId: string) => {
    try {
      const fileToDelete = uploadedFiles.find(file => file.id === fileId);
      if (!fileToDelete) {
        throw new Error('파일을 찾을 수 없습니다');
      }

      // Firebase Storage에서 파일 삭제 시도
      if (fileToDelete.filePath) {
        try {
          await deleteFileFromStorage(fileToDelete.filePath);
          console.log('파일이 Firebase Storage에서 성공적으로 삭제되었습니다');
        } catch (storageError) {
          console.warn('Firebase Storage에서 파일 삭제 중 오류 발생:', storageError);
          // 파일이 이미 삭제되었거나 존재하지 않는 경우, 계속 진행
        }
      }

      // Firestore에서 문서 삭제
      await deleteDocument('files', fileId);
      console.log('파일이 Firestore의 files 컬렉션에서 성공적으로 삭제되었습니다');

      // documents 컬렉션에서도 문서 삭제 (만약 존재한다면)
      try {
        const documentsRef = collection(db, 'documents');
        const q = query(documentsRef, where('filePath', '==', fileToDelete.filePath));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const docToDelete = querySnapshot.docs[0];
          await deleteDoc(docToDelete.ref);
          console.log('문서가 Firestore의 documents 컬렉션에서 성공적으로 삭제되었습니다');
        } else {
          console.log('documents 컬렉션에서 삭제할 문서를 찾을 수 없습니다');
        }
      } catch (error) {
        console.error('documents 컬렉션에서 문서를 삭제하는 중 오류 발생:', error);
      }

      // UI에서 파일 제거
      setUploadedFiles(prev => prev.filter(file => file.id !== fileId));

      console.log('파일이 데이터베이스에서 성공적으로 삭제되었습니다');
    } catch (error) {
      console.error('파일 삭제 중 오류 발생:', error);
      // 여기에 사용자에게 오류 메시지를 표시하는 로직을 추가할 수 있습니다.
    }
  };

  const filteredFiles = useMemo(() => {
    return uploadedFiles.filter(file =>
      file.optimizedFileName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || file.category === selectedCategory)
    );
  }, [uploadedFiles, searchTerm, selectedCategory]);

  const categories = useMemo(() => {
    return Array.from(new Set(uploadedFiles.map(file => file.category)));
  }, [uploadedFiles]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Data Room
        </Typography>
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Upload New File
          </Typography>
          <FileUploader onFileUploaded={handleFileUploaded} />
        </Paper>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Uploaded Files
          </Typography>
          <SearchAndFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            category={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categories}
          />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>File Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Upload Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredFiles
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((file) => (
                    <TableRow key={file.id}>
                      <TableCell>{file.optimizedFileName}</TableCell>
                      <TableCell>{file.category}</TableCell>
                      <TableCell>{new Date(file.uploadedAt).toLocaleString()}</TableCell>
                      <TableCell>
                        <IconButton aria-label="download" href={file.downloadURL} target="_blank">
                          <GetAppIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={() => handleDeleteFile(file.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredFiles.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default DataRoom;