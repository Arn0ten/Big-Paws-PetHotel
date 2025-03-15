"use client"

import { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Navigation } from "lucide-react"
import Link from "next/link"

// Fix for default marker icon
useEffect(() => {
  if (typeof window !== "undefined" && typeof L !== "undefined") {
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/images/marker-icon-2x.png",
      iconUrl: "/images/marker-icon.png",
      shadowUrl: "/images/marker-shadow.png",
    })
  }
}, [])

const petHotelLocation: [number, number] = [7.4460297, 125.8037527] // Big Paws Pet Hotel coordinates

function ChangeView({
  center,
  zoom,
}: {
  center: [number, number]
  zoom: number
}) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, zoom)
  }, [center, zoom, map])
  return null
}

export default function InteractiveMap() {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const [geoPermission, setGeoPermission] = useState<"granted" | "denied" | "prompt">("prompt")

  useEffect(() => {
    if (typeof window !== "undefined" && navigator?.permissions) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        setGeoPermission(result.state)
      })
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined" && navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude])
          setGeoPermission("granted")
        },
        (error) => {
          console.error("Error getting user location:", error)
          setGeoPermission("denied")
        },
      )
    }
  }, [])

  return (
    <Card className="w-full overflow-hidden">
      <div className="relative h-[400px]">
        {/* Step 2: Render the map */}
        <MapContainer center={petHotelLocation} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {userLocation && (
            <>
              <Marker position={userLocation}>
                <Popup>Your Location</Popup>
              </Marker>
              <ChangeView center={userLocation} zoom={13} />
            </>
          )}
          <Marker position={petHotelLocation}>
            <Popup>Big Paws Pet Hotel</Popup>
          </Marker>
        </MapContainer>

        {/* Step 3: Add a button to navigate to the custom map page */}
        <div className="absolute bottom-4 left-4 z-[1000]">
          <Link href="/map">
            <Button className="flex items-center gap-2">
              <Navigation className="h-4 w-4" />
              Get Directions
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}

