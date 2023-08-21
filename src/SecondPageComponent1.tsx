import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SecondPageComponent2 from './SecondPageComponent2';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'title', headerName: 'Title', width: 250 },
  { field: 'body', headerName: 'Body', width: 400 },
];

const SecondPageComponent1 = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data: Post[] = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const userDetailsString = localStorage.getItem('userDetails');
    if (!userDetailsString) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Second Page Component 1
      </Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={posts} columns={columns} pageSizeOptions={[5]} />
      </div>

      <SecondPageComponent2/>
    </Container>
  );
};

export default SecondPageComponent1;
