"use client"

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Users, Coffee, ArrowRight } from "lucide-react";
import CoffeeRegionCard from "@/components/CoffeeRegionCard";
import { CITY_COORDINATES, coffeeRegions } from "@/constants";
import { getUserLocations } from "@/app/actions/user";
import Link from "next/link";
import EthiopiaMapSvg from "@/components/EthiopiaMapSvg";

interface UserLocation {
  city: string;
  count: number;
  x: number;
  y: number;
}

export default function Page() {
  const [userLocations, setUserLocations] = useState<UserLocation[]>([]);
  const [activeLocation, setActiveLocation] = useState<UserLocation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getUserLocations();
      const mapped = data
        .filter((u) => CITY_COORDINATES[u.city])
        .map((u) => ({
          ...u,
          x: CITY_COORDINATES[u.city].cx,
          y: CITY_COORDINATES[u.city].cy,
        }));
      setUserLocations(mapped);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen pt-20 ethiopian-pattern">
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-clay/10 text-clay font-body text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              Community Map
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tightest" style={{ lineHeight: 0.95 }}>
              Our Community
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-md mx-auto">
              Real-time distribution of Buna Mahber members across Ethiopia.
            </p>
          </motion.div>
        </div>

        {/* Interactive Map */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="ceramic-surface p-8 md:p-12">
            <div className="relative aspect-[4/3] bg-secondary/50 rounded-2xl overflow-hidden">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full"
                  />
                </div>
              ) : (
                <EthiopiaMapSvg />
            )}

            <AnimatePresence>
              {activeLocation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:bottom-4 md:w-72 bg-card border border-border rounded-2xl p-5 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-bold text-lg text-foreground">{activeLocation.city}</h3>
                    <div className="bg-clay/10 text-clay px-2 py-0.5 rounded text-xs font-bold font-display">
                      {activeLocation.count} {activeLocation.count === 1 ? 'Member' : 'Members'}
                    </div>
                  </div>
                  <p className="font-body text-sm text-muted-foreground mb-3">
                    Connecting Buna Mahber members in the historic city of {activeLocation.city}.
                  </p>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-clay" />
                    <span className="font-body text-xs text-muted-foreground">Ethiopia</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
        {/* Featured Coffee Regions Cards */}
         <section className="py-24 ethiopian-pattern">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4" style={{ lineHeight: 1.1 }}>
                Featured Coffee Regions
              </h2>
              <p className="font-body text-lg text-muted-foreground max-w-lg mx-auto">
                Explore the birthplace of coffee through its legendary growing regions.
              </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coffeeRegions.map((region, i) => (
              <CoffeeRegionCard  key={region.name} {...region} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>
        {/* <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4" style={{ lineHeight: 1.1 }}>
              Active Communities
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-lg mx-auto">
              Buna Mahber is growing across Ethiopia. Find your local coffee community.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userLocations.map((location, i) => (
              <CoffeeRegionCard 
                key={location.city} 
                name={location.city}
                count={location.count}
                delay={i * 0.05} 
              />
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}
