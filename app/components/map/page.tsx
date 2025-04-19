"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navigation, ArrowLeft, Crosshair } from "lucide-react";

const MapWithNoSSR = dynamic(() => import("../MapComponent"), {
  ssr: false,
});

const petHotelLocation: [number, number] = [7.4460297, 125.8037527]; // Big Paws Pet Hotel coordinates

export default function MapPage() {
  const router = useRouter();
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null,
  );
  const [route, setRoute] = useState<[number, number][]>([]);
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loadingState, setLoadingState] = useState({
    locateMe: false,
    recalculateRoute: false,
    backToHome: false,
  });
  const [isMapLoading, setIsMapLoading] = useState(false);

  const calculateRoute = useCallback(
    async (start: [number, number], end: [number, number]) => {
      setIsMapLoading(true);
      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`,
        );
        const data = await response.json();
        if (data.routes && data.routes.length > 0) {
          setRoute(
            data.routes[0].geometry.coordinates.map(
              (coord: [number, number]) => [coord[1], coord[0]],
            ),
          );
        }
      } catch (error) {
        console.error("Error calculating route:", error);
        setError("Unable to calculate route. Please try again.");
      }
      setIsMapLoading(false);
    },
    [],
  );

  useEffect(() => {
    if (userLocation) {
      calculateRoute(userLocation, petHotelLocation);
    }
  }, [userLocation, calculateRoute]);

  const handleLocate = useCallback(() => {
    setLoadingState((prev) => ({ ...prev, locateMe: true }));
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
          setError(null);
          setLoadingState((prev) => ({ ...prev, locateMe: false }));
        },
        (error) => {
          console.error("Error getting user location:", error);
          setError(
            "Unable to get your location. Please enter an address or click on the map.",
          );
          setLoadingState((prev) => ({ ...prev, locateMe: false }));
        },
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setLoadingState((prev) => ({ ...prev, locateMe: false }));
    }
  }, []);

  const handleAddressSearch = useCallback(async () => {
    setIsMapLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
      );
      const data = await response.json();
      if (data && data.length > 0) {
        setUserLocation([Number(data[0].lat), Number(data[0].lon)]);
        setError(null);
      } else {
        setError("Address not found. Please try a different address.");
      }
    } catch (error) {
      console.error("Error searching address:", error);
      setError("Unable to search address. Please try again.");
    }
    setIsMapLoading(false);
  }, [address]);

  const handleRecalculateRoute = useCallback(() => {
    setLoadingState((prev) => ({ ...prev, recalculateRoute: true }));
    if (userLocation) {
      calculateRoute(userLocation, petHotelLocation).then(() => {
        setLoadingState((prev) => ({ ...prev, recalculateRoute: false }));
      });
    }
  }, [userLocation, calculateRoute]);

  const handleBackToHome = useCallback(() => {
    setLoadingState((prev) => ({ ...prev, backToHome: true }));
    router.push("/");
  }, [router]);

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full overflow-hidden">
        <div className="relative h-[calc(100vh-2rem)] flex flex-col">
          <div className="p-4 bg-background relative overflow-hidden">
            <h1 className="text-2xl font-bold mb-2">
              Directions to Big Paws Pet Hotel
            </h1>
            <p className="text-muted-foreground mb-2">
              Follow the blue line on the map for the best route.
            </p>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                We're excited to welcome you and your furry friend to Big Paws
                Pet Hotel! Our facility is located in a peaceful area with easy
                access from major roads.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                <strong>Opening Hours:</strong> Monday-Sunday, 8:00 AM - 7:00 PM
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Address:</strong> Bonifacio St., in front of Philhealth,
                Tagum City, Philippines, 8100
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Contact:</strong> +63 950 189 0933
              </p>
            </div>

            {/* Animated pets */}
            <div className="absolute left-0 bottom-0 w-full h-8 overflow-hidden opacity-70 pointer-events-none">
              <div
                className="dog-run absolute h-8 w-8 animate-run-right"
                style={{
                  bottom: "0px",
                  left: "-30px",
                  animation: "runRight 15s linear infinite",
                }}
              >
                <img src="/running.gif" alt="Running Dog" />
              </div>
              <div
                className="cat-run absolute h-8 w-8 animate-run-alternate"
                style={{
                  bottom: "0px",
                  right: "-30px",
                }}
              >
                <img src="/running-cat.gif" alt="Running Cat" />
              </div>
            </div>

            {error && <p className="text-red-500 mb-2">{error}</p>}
          </div>
          <div className="flex-grow relative">
            <MapWithNoSSR
              userLocation={userLocation}
              petHotelLocation={petHotelLocation}
              route={route}
              setUserLocation={setUserLocation}
            />
            {isMapLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <span className="inline-block w-8 h-8 border-4 border-white border-r-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
          <div className="p-4 bg-background flex flex-col sm:flex-row justify-between items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 w-full sm:w-auto"
              onClick={handleBackToHome}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
              {loadingState.backToHome && (
                <span className="ml-2 inline-block w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
              )}
            </Button>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button
                onClick={handleLocate}
                className="flex items-center gap-2 w-full sm:w-auto"
                disabled={loadingState.locateMe}
              >
                <Crosshair className="h-4 w-4" />
                Locate Me
                {loadingState.locateMe && (
                  <span className="ml-2 inline-block w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
                )}
              </Button>
              <Button
                onClick={handleRecalculateRoute}
                disabled={!userLocation || loadingState.recalculateRoute}
                className="flex items-center gap-2 w-full sm:w-auto"
              >
                <Navigation className="h-4 w-4" />
                Recalculate Route
                {loadingState.recalculateRoute && (
                  <span className="ml-2 inline-block w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </Card>
      <style jsx global>{`
        @keyframes runRight {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(100vw + 30px));
          }
        }

        @keyframes runLeft {
          0% {
            transform: translateX(0) scaleX(-1);
          }
          100% {
            transform: translateX(calc(-100vw - 30px)) scaleX(-1);
          }
        }

        @keyframes runAlternate {
          0% {
            transform: translateX(0) scaleX(-1);
          }
          50% {
            transform: translateX(calc(-100vw - 30px)) scaleX(-1);
          }
          50.1% {
            transform: translateX(calc(-100vw - 30px)) scaleX(1);
          }
          100% {
            transform: translateX(calc(100vw + 30px)) scaleX(1);
          }
        }

        .animate-run-right {
          animation: runRight 15s linear infinite;
        }

        .animate-run-left {
          animation: runLeft 20s linear infinite;
          transform: scaleX(-1);
        }

        .animate-run-alternate {
          animation: runAlternate 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
