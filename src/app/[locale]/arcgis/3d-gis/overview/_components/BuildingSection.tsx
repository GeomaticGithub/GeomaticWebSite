"use client";

import Image from "next/image";
import { useState } from "react";
import { OverviewMessages } from "../constants";
import Link from "next/link";

interface BuildingSectionProps {
  building: OverviewMessages["building"];
}

const BuildingSection = ({ building }: BuildingSectionProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const images = [
    {
      id: "building",
      src: "/3d-gis/large-image-swticher-building.jpg",
      thumbnail: "/3d-gis/large-image-switcher_building-thumbnail.jpg",
      alt: building.images.building.alt,
      title: building.images.building.title,
      description: building.images.building.description,
      href: building.images.building.href,
      link: building.images.building.link,
    },
    {
      id: "campus",
      src: "/3d-gis/large-image-switcher-campus.jpg",
      thumbnail: "/3d-gis/large-image-switcher-campus-thumbnail.jpg",
      alt: building.images.campus.alt,
      title: building.images.campus.title,
      description: building.images.campus.description,
      href: building.images.campus.href,
      link: building.images.campus.link,
    },
    {
      id: "city",
      src: "/3d-gis/large-image-switcher-city.jpg",
      thumbnail: "/3d-gis/large-image-switcher_city-thumbnail.jpg",
      alt: building.images.city.alt,
      title: building.images.city.title,
      description: building.images.city.description,
      href: building.images.city.href,
      link: building.images.city.link,
    },
    {
      id: "region",
      src: "/3d-gis/large-image-switcher-region.jpg",
      thumbnail: "/3d-gis/large-image-switcher-region-thumbnail.jpg",
      alt: building.images.region.alt,
      title: building.images.region.title,
      description: building.images.region.description,
      href: building.images.region.href,
      link: building.images.region.link,
    },
    {
      id: "globe",
      src: "/3d-gis/large-image-switcher-globe.jpg",
      thumbnail: "/3d-gis/large-image-switcher-globe-thumbnail.jpg",
      alt: building.images.globe.alt,
      title: building.images.globe.title,
      description: building.images.globe.description,
      href: building.images.globe.href,
      link: building.images.globe.link,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {building.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            {building.subtitle}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {images[selectedImage].title}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {images[selectedImage].description}
              </p>
              <Link
                href={images[selectedImage].link}
                className="text-blue-600 underline"
              >
                {images[selectedImage].href}
              </Link>
            </div>

            {/* Image Selector Thumbnails */}
            <div className="flex flex-wrap gap-4">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === index
                      ? "border-blue-600 shadow-lg scale-105"
                      : "border-gray-300 hover:border-blue-400"
                  }`}
                  aria-label={`Select ${image.alt}`}
                >
                  <Image
                    src={image.thumbnail}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Main Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-2xl">
              <Image
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                fill
                className="object-cover transition-opacity duration-300"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildingSection;
