"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, Navigation, Building2, ShieldAlert } from "lucide-react";

// Fix Leaflet marker icons
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const BoothIcon = L.divIcon({
  className: "custom-div-icon",
  html: `<div class="bg-blue-600 p-1.5 rounded-full border-2 border-white shadow-lg"><svg viewBox="0 0 24 24" width="16" height="16" stroke="white" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="m2 22 1-1h3l9-9"></path><path d="M9 14 5 10l-1 1v3l1 1z"></path><path d="m17 7 4-4"></path><path d="m16 12 5-5"></path><rect width="4" height="4" x="11" y="2" rx="1"></rect></svg></div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

const AlertIcon = L.divIcon({
  className: "alert-div-icon",
  html: `<div class="bg-red-600 p-1.5 rounded-full border-2 border-white shadow-lg animate-pulse"><svg viewBox="0 0 24 24" width="16" height="16" stroke="white" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="m2 22 1-1h3l9-9"></path><path d="M9 14 5 10l-1 1v3l1 1z"></path><path d="m17 7 4-4"></path><path d="m16 12 5-5"></path><rect width="4" height="4" x="11" y="2" rx="1"></rect></svg></div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

const UserIcon = L.divIcon({
  className: "user-div-icon",
  html: `<div class="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-xl animate-pulse"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

interface BoothLocation {
  id: number;
  name: string;
  type: "Booth" | "HQ" | "Police";
  lat: number;
  lng: number;
  address: string;
  distance?: string;
  isAlert?: boolean;
}

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function BoothMap({ 
  userLocation, 
  locations,
  onSelect
}: { 
  userLocation: [number, number], 
  locations: BoothLocation[],
  onSelect: (loc: BoothLocation) => void
}) {
  return (
    <MapContainer 
      center={userLocation} 
      zoom={14} 
      className="w-full h-full rounded-[2.5rem] shadow-2xl border-8 border-white dark:border-slate-800 transition-all duration-500"
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      
      <MapUpdater center={userLocation} />

      {/* User Location */}
      <Marker position={userLocation} icon={UserIcon}>
        <Popup className="custom-popup">
          <div className="font-bold text-slate-900">Your Current Intel Node</div>
        </Popup>
      </Marker>

      <Circle 
        center={userLocation} 
        radius={2000} 
        pathOptions={{ fillColor: 'blue', fillOpacity: 0.05, color: 'transparent' }} 
      />

      {/* Booth/HQ Locations */}
      {locations.map((loc) => (
        <Marker 
          key={loc.id} 
          position={[loc.lat, loc.lng]} 
          icon={loc.isAlert ? AlertIcon : BoothIcon}
          eventHandlers={{
            click: () => onSelect(loc)
          }}
        >
          <Popup>
            <div className="p-1">
              <h3 className="font-bold text-slate-900 mb-1">{loc.name}</h3>
              <p className="text-xs text-slate-500 mb-2">{loc.address}</p>
              <button 
                onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`, "_blank")}
                className="w-full bg-blue-600 text-white text-[10px] font-black uppercase py-1.5 rounded-lg"
              >
                Directions
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
