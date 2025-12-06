import React from 'react';

export interface Project {
  id: string;
  title: string;
  location: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  image: string;
  priceStart?: string;
  type: 'Residential' | 'Commercial';
}

export interface Stat {
  id: number;
  value: string;
  label: string;
  icon: React.ReactNode;
}

export interface Amenity {
  id: number;
  title: string;
  icon: React.ReactNode;
}