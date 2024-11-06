import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box, Avatar } from "@mui/material";
import blogs_img from "../Images/blogs.jpg";
import axios from "axios";

// Sample blog data for demonstration. Ideally, this would come from an API or state.

const BlogDetail = () => {
  let url = "https://admin.taxiscout24.com";
  const [blogsData, setBlogsData] = useState([]);

  let slug = localStorage.getItem("slug");
  useEffect(() => {
    const handleBlogData = async () => {
      const response = await axios.get(`${url}/api/v1/blog-details/${slug}`);
      setBlogsData(response.data.data);

      console.log("new response", response.data.data);
    };
    handleBlogData();
  }, slug);

  // const { id } = useParams();
  // const blog = blogsData.find((blog) => blog.id === parseInt(id));

  if (!blogsData) {
    return (
      <Typography variant="h4" align="center">
        Blog not found
      </Typography>
    );
  }

  return (
    <div className="container">
      {/* <Container maxWidth="xl"> */}
        <Typography variant="h3" gutterBottom>
          {blogsData.title}
        </Typography>
        <Box display="flex" alignItems="center" marginBottom={2}>
          <Avatar
            alt={blogsData.author}
            src={`https://ui-avatars.com/api/?name=${blogsData.author}`}
          />
          <Box marginLeft={2}>
            <Typography variant="subtitle1">{blogsData.author}</Typography>
            <Typography variant="caption" color="text.secondary">
              {blogsData.created_at}
            </Typography>
          </Box>
        </Box>
        <div className="flex  gap-5 justify-between">
        <img
          src={blogsData.image}
          alt={blogsData.title}
          style={{
            width: "30%",
            height: "2%",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        />
        <Typography variant="body1" paragraph>
          {(blogsData.description).slice(0,1500)}
          <br></br>
          <br></br>
          {(blogsData.description).slice(1500,)}
        </Typography>
        </div>
      {/* </Container> */}
    </div>
  );
};

export default BlogDetail;
