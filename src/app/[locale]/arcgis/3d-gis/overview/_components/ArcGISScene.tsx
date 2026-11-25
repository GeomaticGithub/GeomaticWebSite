"use client";
import { useCommon } from "@/i18n/useCommon";

import { useEffect, useRef, useState } from "react";
import SceneView from "@arcgis/core/views/SceneView";
import Map from "@arcgis/core/Map";

export default function ArcGISScene() {
  const mapDiv = useRef<HTMLDivElement>(null);
  const sceneView = useRef<SceneView | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const t = useCommon().scene3d;

  useEffect(() => {
    if (!mapDiv.current) return;

    const loadScene = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Create a Map with 3D basemap and world elevation
        const map = new Map({
          basemap: "satellite", // High-quality satellite imagery
          ground: "world-elevation", // Global elevation service for 3D terrain
        });

        // Create the SceneView with enhanced 3D capabilities
        const view = new SceneView({
          container: mapDiv.current,
          map: map as any, // Type assertion to bypass complex type issues
          // Start with a nice overview of a major city with 3D buildings
          camera: {
            position: {
              longitude: -74.0059, // New York City
              latitude: 40.7128,
              z: 2000, // Good altitude to see 3D buildings
            },
            heading: 45,
            tilt: 60, // Good angle to see 3D buildings
          },
          // Enable enhanced 3D features
          constraints: {
            altitude: {
              min: 10,
              max: 100000,
            },
          },
          // UI elements configuration
          ui: {
            components: ["zoom", "compass", "navigation-toggle"],
          },
          // Enhanced environment settings for better 3D visualization
          environment: {
            background: {
              type: "color",
              color: [135, 206, 235, 1], // Sky blue
            },
            starsEnabled: false,
            atmosphereEnabled: true,
            lighting: {
              date: new Date(),
              directShadowsEnabled: true,
              ambientOcclusionEnabled: true,
            },
          },
          // Enhanced interaction settings
          highlightOptions: {
            color: "cyan",
            fillOpacity: 0.4,
          },
        });

        sceneView.current = view;

        // Wait for the view to load
        await view.when();

        console.log("3D Scene loaded successfully");
        setIsLoading(false);

        // Add interaction handlers
        view.on("click", (event) => {
          console.log("Clicked at:", event.mapPoint);
        });

        // Enhanced double-click to zoom and tilt for better 3D viewing
        view.on("double-click", (event) => {
          view.goTo({
            target: event.mapPoint,
            zoom: view.zoom + 2,
            tilt: 60, // Maintain good 3D viewing angle
          });
        });
      } catch (err) {
        console.error("Error loading 3D scene:", err);
        setError(t.error);
        setIsLoading(false);
      }
    };

    loadScene();

    // Cleanup function
    return () => {
      if (sceneView.current) {
        sceneView.current.destroy();
        sceneView.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full">
      {/* 3D Scene Container */}
      <div className="relative w-full h-[420px] md:h-[520px] rounded-md overflow-hidden shadow-lg border">
        <div
          ref={mapDiv}
          className="w-full h-full"
          style={{
            background: "linear-gradient(135deg, #87CEEB 0%, #4682B4 100%)", // Sky gradient
          }}
        />

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 text-gray-600">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-sm font-medium">{t.loading}</p>
              <p className="text-xs text-gray-500 mt-1">
                {t.preparing}
              </p>
            </div>
          </div>
        )}

        {/* Error overlay */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 text-gray-600">
            <div className="text-center max-w-md px-4">
              <div className="text-red-500 mb-2 text-2xl" aria-hidden>⚠️</div>
              <p className="text-sm text-red-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
              >
                {t.retry}
              </button>
            </div>
          </div>
        )}

        {/* Instructions overlay (appears after loading) */}
        {!isLoading && !error && (
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-80 text-white p-3 rounded-md text-xs max-w-xs">
            <p className="font-semibold mb-2">{t.title}</p>
            <ul className="space-y-1 text-xs">
              <li>
                • <strong>{t.drag}</strong> {t.dragDesc}
              </li>
              <li>
                • <strong>{t.scroll}</strong> {t.scrollDesc}
              </li>
              <li>
                • <strong>{t.rightDrag}</strong> {t.rightDragDesc}
              </li>
              <li>
                • <strong>{t.dblClick}</strong> {t.dblClickDesc}
              </li>
            </ul>
            <p className="text-xs text-gray-300 mt-2">
              {t.tip}
            </p>
          </div>
        )}
      </div>

      {/* Additional Info */}
      <div className="mt-4 text-center text-sm text-gray-600">
        <p>
          {t.caption}
        </p>
      </div>
    </div>
  );
}
