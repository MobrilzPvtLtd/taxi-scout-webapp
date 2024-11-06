import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Avatar,
  Box,
  Container,
  Stack,
} from "@mui/material";
import { Skeleton} from 'antd';
import { styled } from "@mui/system";
import blogs_img from "../Images/blogs.jpg";
import { useNavigate } from "react-router-dom";
import { id } from "date-fns/locale";
import axios from "axios";
import LoaderSkeleton from "./LoaderSkeleton";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  maxHeight: 400,
  margin: "20px",
  borderRadius: "15px",
  // boxShadow: theme.shadows[3],
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const BlogCard = ({
  title,
  description,
  image,
  author,
  id,
  created_at,
  slug,
}) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    localStorage.setItem("slug", slug);
    navigate(`/blog/${slug}`);
  };

  return (
    <StyledCard onClick={handleReadMore}>
      <CardMedia component="img" height="fit" image={image} alt={title} />
      <CardContent>
        <div className="flex flex-col min-h-[10rem]">
          <div className="text-xs sm:text-sm">
            <Typography gutterBottom variant="h6" component="div">
              {title.slice(0,50)} ....
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description.slice(0,70)} ....
            </Typography>
          </div>
          <div className="flex justify-center">
          <button  id="btn_hover_main"
                  className="w-fit my-2 py-1 px-5 sm:px-10  sm:py-2  font-semibold rounded-lg bg-black text-white hover:bg-white hover:text-black ">Know More</button></div>
          <div className="">
            <Box display="flex" alignItems="center" >
              <Avatar
                alt={author}
                src={`https://ui-avatars.com/api/?name=${author}`}
              />
              <Box marginLeft={2}>
                <Typography variant="subtitle2">{author}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {created_at}
                </Typography>
              </Box>
            </Box>
          </div>
        </div>
      </CardContent>
    </StyledCard>
  );
};

// Demo blog list component using Stack for layout
const BlogList = () => {
  const [blogsData, setBlogsData] = useState(null);
  const [loading, setLoading] = useState(false);
  let url = "https://admin.taxiscout24.com";

  useEffect(() => {
    try {
      const handleBlogs = async () => {
        setLoading(true)
        const response = await axios.get(`${url}/api/v1/blogs`);
        if (response){
          setBlogsData(response.data.data);
          setLoading(false)
        }
      
      };
      handleBlogs();
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="pt-10 fadeInUp" data-wow-delay="0.1s">
        <div className="col-lg-12">
          <h1 className="display-5 mb-0 mt-5 text-center font-semibold">
            Blogs
          </h1>
        </div>
      </div>
      {loading ? <Skeleton active />: 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {blogsData?.map((blog, index) => (
        <BlogCard key={index} {...blog} />
      ))}
    </div>
      }
      
    </div>
  );
};

export default BlogList;
