import React from "react";
import { getBlog } from '../Service/apiService';
import "../Stylesheets/component.css";
import { Carousel } from "flowbite-react";

function CarouselHome() {
  const [dataBlog, setDataBlog] = React.useState([]);
  React.useEffect(() => {
    getBlog().then(setDataBlog);
  }, []);

  return (
    <div id="carouselHome" style={{ height: `calc(100vh - 74px)` }}>
      <Carousel slideInterval={5000}>
        {dataBlog.result?.slice(0, 10).map((item, key) => {
          return (
            <div
              key={key}
              className="image-background w-100"
              style={{
                backgroundImage: `url(
                  https://minpro-blog.purwadhikabootcamp.com/${item.imageURL}
                )`,
                height: `calc(100vh - 74px)`,
              }}>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default CarouselHome;
