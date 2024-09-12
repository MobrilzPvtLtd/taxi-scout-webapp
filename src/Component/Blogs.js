import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Avatar, Box, Container, Stack } from '@mui/material';
import { styled } from '@mui/system';
import blogs_img from "../Images/blogs.jpg"
import { useNavigate } from 'react-router-dom';
import { id } from 'date-fns/locale';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  maxHeight : 400,
  margin: '20px',
  borderRadius: '15px',
  // boxShadow: theme.shadows[3],
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const BlogCard = ({ title, description, image, author, date ,id }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/blog/${id}`);
  };
  return (
    
    <StyledCard onClick={handleReadMore}>
      <CardMedia
        component="img"
        height="180"
        image={image}
        alt={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Box display="flex" alignItems="center" marginTop={2}>
          <Avatar alt={author} src={`https://ui-avatars.com/api/?name=${author}`} />
          <Box marginLeft={2}>
            <Typography variant="subtitle2">{author}</Typography>
            <Typography variant="caption" color="text.secondary">{date}</Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={handleReadMore}>
          Read More
        </Button>
      </CardActions>
    </StyledCard >
  );
};

// Demo blog list component using Stack for layout
const BlogList = () => {
 
  const blogs = [
   
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

  return (
    <div className='container'>
    <Container>
      <Stack direction={{ xs: 'column', xs: 'row' }} spacing={2}>
        {blogs.map((blog, index) => (
          <BlogCard key={index} {...blog} />
        ))}
      </Stack>
    </Container>
    </div>
  );
};

export default BlogList;
