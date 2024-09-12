import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Avatar } from '@mui/material';
import blogs_img from "../Images/blogs.jpg"

// Sample blog data for demonstration. Ideally, this would come from an API or state.
const blogData = [
   
    {id: 1,
      title: "Building UIs with Material-UI",
      description: "Material-UI offers a set of React components that implement Google's Material Design...",
      image: blogs_img,
      author: "John Smith",
      date: "August 30, 2024"
    },
    {id: 2,
      title: "Building UIs with Material-UI",
      description: "Material-UI offers a set of React components that implement Google's Material Design...",
      image: blogs_img,
      author: "John Smith",
      date: "August 30, 2024"
    },
    {id: 3,
      title: "Building UIs with Material-UI",
      description: "Material-UI offers a set of React components that implement Google's Material Design...",
      image: blogs_img,
      author: "John Smith",
      date: "August 30, 2024"
    },
  ];
const BlogDetail = () => {
  const { id } = useParams();
  const blog = blogData.find((blog) => blog.id === parseInt(id));

  if (!blog) {
    return <Typography variant="h4" align="center">Blog not found</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h3" gutterBottom>{blog.title}</Typography>
      <Box display="flex" alignItems="center" marginBottom={2}>
        <Avatar alt={blog.author} src={`https://ui-avatars.com/api/?name=${blog.author}`} />
        <Box marginLeft={2}>
          <Typography variant="subtitle1">{blog.author}</Typography>
          <Typography variant="caption" color="text.secondary">{blog.date}</Typography>
        </Box>
      </Box>
      <img src={blog.image} alt={blog.title} style={{ width: '100%', height : '10%' , borderRadius: '10px', marginBottom: '20px' }} />
      <Typography variant="body1" paragraph>{blog.description}</Typography>
    </Container>
  );
};

export default BlogDetail;
