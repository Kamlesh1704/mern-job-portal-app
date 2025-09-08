import React from "react";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
  "AI Developer",
  "App Developer",
  "Devops"
];

const CategoryCarausel = () => {
  const dispatch = useDispatch();
const navigate = useNavigate();
  const handleCategoryClick = (cat) => {
dispatch(setSearchedQuery(cat));
navigate("/browse");
  }
  return (
    <div>
      <Carousel className="w-full max-w-xl my-3 mx-auto">
        <CarouselContent>
          {category.map((cat,index) => (
            <CarouselItem key={index} className="md-basis-1/2 lg:basis-1/3">
              <Button variant="outline" className="rounded-full" onClick={() => handleCategoryClick(cat)}>
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarausel;
