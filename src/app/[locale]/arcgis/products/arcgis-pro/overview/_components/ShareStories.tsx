"use client";
import { useState } from "react";
import Image from "next/image";
import type { StoriesSection } from "../constants";

interface ShareStoriesProps {
  stories: StoriesSection;
}

export default function ShareStories({ stories }: ShareStoriesProps) {
  const [selectedStory, setSelectedStory] = useState(stories.items[0]);

  return (
    <section className="bg-white py-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {stories.title}
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            {stories.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left side - Story content */}
          <div className="relative min-h-[500px] lg:min-h-[600px] rounded-lg overflow-hidden shadow-lg">
            {/* Background Image */}
            <Image
              src={selectedStory.mainImage}
              alt={selectedStory.title}
              fill
              className="object-cover"
            />
            {/* Content Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 lg:p-8">
              <div className="text-white">
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                  {selectedStory.title}
                </h3>
                <p className="text-white/90 text-lg leading-relaxed mb-6">
                  {selectedStory.description}
                </p>
                {selectedStory.href && (
                  <a
                    href={selectedStory.href}
                    className="inline-flex items-center text-white hover:text-blue-200 font-medium transition-colors"
                  >
                    {selectedStory.linkText}
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right side - Story avatars */}
          <div className="">
            {stories.items.map((story) => (
              <div
                key={story.id}
                onClick={() => setSelectedStory(story)}
                className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                  selectedStory.id === story.id
                    ? "bg-blue-50 border border-blue-200"
                    : "bg-gray-50 hover:bg-gray-100 border"
                }`}
              >
                <div className="flex-shrink-0 mr-4">
                  <Image
                    src={story.avatarImage}
                    alt={story.title}
                    width={60}
                    height={60}
                    className="w-15 h-15 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4
                    className={`font-semibold text-sm ${
                      selectedStory.id === story.id
                        ? "text-blue-900"
                        : "text-gray-900"
                    }`}
                  >
                    {story.title}
                  </h4>
                  <p
                    className={`text-sm mt-1 ${
                      selectedStory.id === story.id
                        ? "text-blue-700"
                        : "text-gray-600"
                    }`}
                  >
                    {story.description.length > 100
                      ? `${story.description.substring(0, 100)}...`
                      : story.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
