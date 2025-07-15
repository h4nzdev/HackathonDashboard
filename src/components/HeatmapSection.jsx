import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function HeatmapSection({ riskPoints, riskColor }) {
  return (
    <section
      id="heatmap"
      className="bg-slate-900/50 rounded-xl sm:rounded-2xl border border-slate-800 p-4 sm:p-6 lg:p-8 shadow-xl"
    >
      <div className="text-center mb-6 sm:mb-8 lg:mb-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-100 mb-2 sm:mb-3">
          Geographic Risk Analysis
        </h2>
        <p className="text-slate-400 text-sm sm:text-base lg:text-lg">
          Interactive heatmap showing trafficking risk levels across Cebu
        </p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 sm:gap-8">
        <div className="xl:col-span-3 bg-slate-800/50 rounded-lg sm:rounded-xl border border-slate-700 p-4 sm:p-6">
          <div className="bg-slate-900 rounded-lg border border-slate-700 p-4 sm:p-6">
            <div className="w-full h-64 sm:h-80 lg:h-[500px] rounded-lg overflow-hidden mb-4 sm:mb-6">
              <MapContainer dragging={false} zoom={13} center={[10.3, 123.895]} style={{ height: "100%", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
                {riskPoints.map((point, idx) => (
                  <CircleMarker
                    key={idx}
                    center={[point.lat, point.lng]}
                    radius={20}
                    pathOptions={{
                      color: riskColor[point.risk],
                      fillColor: riskColor[point.risk],
                      fillOpacity: 0.5,
                    }}
                  >
                    <Tooltip>
                      {point.label} ({point.risk.charAt(0).toUpperCase() + point.risk.slice(1)} Risk)
                    </Tooltip>
                  </CircleMarker>
                ))}
              </MapContainer>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 items-center">
              <span className="flex items-center gap-2 sm:gap-3">
                <span className="w-3 sm:w-4 h-3 sm:h-4 bg-red-600 rounded-full"></span>
                <span className="text-slate-300 font-medium text-sm sm:text-base">High Risk</span>
              </span>
              <span className="flex items-center gap-2 sm:gap-3">
                <span className="w-3 sm:w-4 h-3 sm:h-4 bg-yellow-400 rounded-full"></span>
                <span className="text-slate-300 font-medium text-sm sm:text-base">Medium Risk</span>
              </span>
              <span className="flex items-center gap-2 sm:gap-3">
                <span className="w-3 sm:w-4 h-3 sm:h-4 bg-green-500 rounded-full"></span>
                <span className="text-slate-300 font-medium text-sm sm:text-base">Low Risk</span>
              </span>
            </div>
          </div>
        </div>
        <div className="xl:col-span-1 bg-slate-800/50 rounded-lg sm:rounded-xl border border-slate-700 p-4 sm:p-6">
          <div className="bg-slate-900 rounded-lg border border-slate-700 p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-slate-100 mb-4 sm:mb-6 text-center">Risk Locations</h3>
            <div className="space-y-3 sm:space-y-4">
              {riskPoints.map((point, idx) => (
                <div key={idx} className="p-3 sm:p-4 bg-slate-800 rounded-lg border border-slate-600">
                  <div className="text-center">
                    <div className="text-slate-100 text-sm sm:text-base font-medium mb-2">{point.label}</div>
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                        point.risk === "high"
                          ? "bg-red-600/20 text-red-400 border border-red-600/30"
                          : point.risk === "medium"
                          ? "bg-yellow-600/20 text-yellow-400 border border-yellow-600/30"
                          : "bg-green-600/20 text-green-400 border border-green-600/30"
                      }`}
                    >
                      {point.risk.charAt(0).toUpperCase() + point.risk.slice(1)} Risk
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
